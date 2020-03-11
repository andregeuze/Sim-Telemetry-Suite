using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Serilog;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Mappings;
using SimTelemetrySuite.Repositories.Interfaces;
using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SimTelemetrySuite
{
    public class TelemetryReceiver
    {
        private readonly IMapper _mapper;
        private readonly ISessionRepository _sessionRepository;
        private readonly int _dbUpdateInterval;
        private readonly int _trackLayoutUpdateInterval;
        private readonly IPEndPoint _iPEndPoint;
        private readonly HubService _hubService;

        private readonly bool _hotSeatMode;
        private bool _dbUpdating;
        private bool _refLapUpdating;
        private Session _currentSession;

        private string HotSeatNickName;

        public TelemetryReceiver(IConfiguration configuration, IMapper mapper, ISessionRepository sessionRepository, HubService hubService)
        {
            _mapper = mapper;
            _sessionRepository = sessionRepository;
            _hubService = hubService;

            // Set up the udp endpoint
            _iPEndPoint = new IPEndPoint(IPAddress.Any, Convert.ToInt32(configuration.GetSection("Receiver:Port").Value));

            // Set the db update interval
            _dbUpdateInterval = Convert.ToInt32(configuration.GetSection("Receiver:DatabaseUpdateInterval").Value);

            // Set the TrackLayoutUpdateInterval
            _trackLayoutUpdateInterval = Convert.ToInt32(configuration.GetSection("Receiver:TrackLayoutUpdateInterval").Value);

            // Set the hotseat mode
            _hotSeatMode = Convert.ToBoolean(configuration.GetSection("Receiver:HotSeatMode").Value);

            // Events
            _hubService.ClientConnected += Hub_ClientConnected;
            _hubService.ClientDisconnected += Hub_ClientDisconnected;
            _hubService.ClientNickNameChanged += _hubService_ClientNickNameChanged;

            Log.Information("Initialized");
        }

        public void Start()
        {
            // Create the Observer
            var observer = Observer.Create<string>(
                (string json) => Task.Run(() => HandleJson(json)),
                HandleException,
                HandleCompleted);

            // Set up the udp stream
            UdpStream(_iPEndPoint).Subscribe(observer);

            Log.Information("Receiver started. Ready for simulation messages...");
        }

        private async void Hub_ClientConnected(object sender, Hubs.Events.ClientEventArgs e)
        {
            await _hubService.Send(e.ConnectionId, EventType.Welcome, $"Welcome {e.ConnectionId}");

            if (_currentSession == null) { return; }

            Log.Information($"Client '{e.ConnectionId}' connected, sending the track layout.");
            await SendTrackLayout(e.ConnectionId);

            Log.Information($"Client '{e.ConnectionId}' connected, sending all vehicles.");
            foreach (var vehicle in _currentSession.Vehicles.Where(v => v.Status != Status.Disconnected))
            {
                Task.Run(() => _hubService.Send(EventType.Join, vehicle));
            }
        }

        private void Hub_ClientDisconnected(object sender, Hubs.Events.ClientEventArgs e)
        {
            Log.Information($"Client '{e.ConnectionId}' disconnected.");
        }

        private void _hubService_ClientNickNameChanged(object sender, Hubs.Events.ClientNickNameEventArgs e)
        {
            var currentVehicle = _currentSession.Vehicles.FirstOrDefault();
            if (currentVehicle != null)
            {
                currentVehicle.Status = Status.Disconnected;

                // Let's add a new dummy vehicle for this name, then switch the name!
                var vehicle = _currentSession.Vehicles.SingleOrDefault(v => v.DriverName == e.NickName);
                if (vehicle == null)
                {
                    vehicle = new Vehicle
                    {
                        DriverName = e.NickName
                    };
                    _currentSession.Vehicles.Add(vehicle);
                }
                vehicle = _currentSession.Vehicles.SingleOrDefault(v => v.DriverName == e.NickName);

                Task.Run(() => _hubService.Send(EventType.Join, vehicle));
            }

            HotSeatNickName = e.NickName;
        }

        private async Task UpdateDatabase()
        {
            if (_dbUpdating) { return; }
            _dbUpdating = true;

            Log.Verbose("[db] Updating...");

            try
            {
                await _sessionRepository.Save();
            }
            catch (Exception)
            {
                Log.Verbose("[db] Caught the db update during saving. Race condition unhandled.");
            }

            // Artificially wait, because we can be too fast here..
            Thread.Sleep(1000 + _dbUpdateInterval);

            Log.Verbose("[db] Update complete.");
            _dbUpdating = false;
        }

        private async Task SendTrackLayout(string connectionId = "")
        {
            if (_refLapUpdating || _currentSession == null || _currentSession.Waypoints.Count == 0) { return; }
            _refLapUpdating = true;

            // Calculate track bounds
            var minimumX = _currentSession.Waypoints.Min(w => w.Position[0]);
            var maximumX = _currentSession.Waypoints.Max(w => w.Position[0]);
            var minimumY = _currentSession.Waypoints.Min(w => w.Position[2]);
            var maximumY = _currentSession.Waypoints.Max(w => w.Position[2]);

            await _hubService.Send(EventType.TrackBounds, $"{minimumX};{maximumX};{minimumY};{maximumY}");

            if (string.IsNullOrEmpty(connectionId))
            {
                await _hubService.Send(EventType.TrackLayout, _currentSession.Waypoints.OrderBy(w => w.Distance));
            }
            else
            {
                await _hubService.Send(connectionId, EventType.TrackLayout, _currentSession.Waypoints.OrderBy(w => w.Distance));
            }

            Thread.Sleep(_trackLayoutUpdateInterval);
            _refLapUpdating = false;
        }

        private async Task HandleJson(string json)
        {
            var trackState = JsonConvert.DeserializeObject<Json.TrackState>(json);

            // Instantiate the session
            var sessionName = $"{trackState.trackName}";
            if (_currentSession == null)
            {
                // Try to find an existing session with this name
                _currentSession = await _sessionRepository.GetByName(sessionName);

                // If not found, create a new one
                if (_currentSession == null)
                {
                    _currentSession = await _sessionRepository.Add(new Session { Name = sessionName });
                }
            }

            if (_hotSeatMode)
            {
                _currentSession.Mode = "HotSeat";
            }

            // Update the session details
            _mapper.MapSession(_currentSession, trackState);

            // Then handle all the vehicle states
            foreach (var vehicleJson in trackState.vehicles)
            {
                HandleNextVehicleState(vehicleJson);
            }

            // Give each vehicle a place if we're in hotseat mode
            if (_hotSeatMode)
            {
                var orderedVehicles = _currentSession.Vehicles.OrderBy(v => v.GetBestLapTime).ToList();
                for (int i = 0; i < orderedVehicles.Count; i++)
                {
                    var vehicle = orderedVehicles[i];
                    vehicle.Place = i + 1;
                }
            }

            // Handle all the disconnected vehicles
            foreach (var vehicle in _currentSession.Vehicles)
            {
                if (DateTime.Now - vehicle.LastRefresh > TimeSpan.FromSeconds(5) &&
                    vehicle.PreviousStatus != Status.Disconnected)
                {
                    vehicle.PreviousStatus = vehicle.Status;
                    vehicle.Status = Status.Disconnected;
                    Log.Information($"Driver {vehicle.DriverName} has disconnected");
                    Task.Run(() => _hubService.Send(EventType.Disconnect, vehicle));
                }
            }

            // Send session status
            Task.Run(() => _hubService.Send(EventType.TrackStatus, _currentSession));

            // Update the database
            Task.Run(() => UpdateDatabase());
        }

        public void HandleNextVehicleState(Json.VehicleState vehicleJson)
        {
            // We will not register any vehicles if no name is set. Hotseat mode will be with always 1 driver.
            if (string.IsNullOrEmpty(HotSeatNickName) && _hotSeatMode) { return; }

            Vehicle sessionVehicle = null;

            if (_hotSeatMode)
            {
                sessionVehicle = _currentSession.Vehicles.SingleOrDefault(v => v.DriverName == HotSeatNickName);
            }
            else
            {
                sessionVehicle = _currentSession.Vehicles.SingleOrDefault(v => v.DriverName == vehicleJson.driverName);
            }

            // Check if vehicle joined the server
            if (sessionVehicle == null)
            {
                sessionVehicle = new Vehicle();
                _mapper.MapVehicle(sessionVehicle, vehicleJson);
                _currentSession.Vehicles.Add(sessionVehicle);

                Log.Debug($"{sessionVehicle.DriverName} joined the session.");
                Task.Run(() => _hubService.Send(EventType.Join, sessionVehicle));
            }
            else
            {
                // Map the basic fields
                _mapper.MapVehicle(sessionVehicle, vehicleJson);
            }

            // Override the driver name if hotseat mode is enabled
            if (_hotSeatMode)
            {
                sessionVehicle.DriverName = HotSeatNickName;
            }

            // Map the current lap
            var currentLap = _mapper.MapLapToVehicle(sessionVehicle, vehicleJson);

            // Check if driver reconnected
            VehicleReconnected(sessionVehicle);

            // Check if vehicle is entering the pits
            VehicleEnteredPits(sessionVehicle, currentLap);

            // Check if vehicle is currently in pits
            VehicleRemainsInPits(sessionVehicle);

            // Check if vehicle is leaving the pits
            VehicleLeavingPits(sessionVehicle, currentLap);

            // Check if vehicle has entered the first sector
            VehicleEnteredFirstSector(sessionVehicle, currentLap, vehicleJson);

            // Check if vehicle has entered the middle sector
            VehicleEnteredMiddleSector(sessionVehicle, currentLap);

            // Check if vehicle has entered the last sector
            VehicleEnteredLastSector(sessionVehicle, currentLap);

            // Invalidate check on the current lap
            InvalidateLap(currentLap, sessionVehicle);

            // Register the waypoint for track layout
            //RegisterWaypoint(sessionVehicle, currentLap, vehicleJson);
        }

        private void VehicleReconnected(Vehicle vehicle)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Disconnected)
            {
                Log.Information($"Driver {vehicle.DriverName} reconnected");
                Task.Run(() => _hubService.Send(EventType.Join, vehicle));
            }
        }

        private void VehicleEnteredPits(Vehicle sessionVehicle, Lap lap)
        {
            if (sessionVehicle.Status == Status.Pit &&
                sessionVehicle.PreviousStatus == Status.Driving)
            {
                lap.Status = LapStatus.InLap;
                Log.Information($"Driver {sessionVehicle.DriverName} enters the pits");
                Task.Run(() => _hubService.Send(EventType.InLap, sessionVehicle));
            }
        }

        private void VehicleRemainsInPits(Vehicle vehicle)
        {
            if (vehicle.Status == Status.Pit &&
                vehicle.PreviousStatus == Status.Pit)
            {
                Log.Verbose($"Driver {vehicle.DriverName} still in the pits");
            }
        }

        private void VehicleLeavingPits(Vehicle vehicle, Lap lap)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Pit)
            {
                lap.Status = LapStatus.OutLap;
                Log.Information($"Driver {vehicle.DriverName} leaving the pits");
                Task.Run(() => _hubService.Send(EventType.OutLap, vehicle));
            }
        }

        private void VehicleEnteredFirstSector(Vehicle vehicle, Lap lap, Json.VehicleState json)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Driving &&
                vehicle.Sector == Sector.Sector1 &&
                vehicle.PreviousSector == Sector.Sector3)
            {
                lap.Status = LapStatus.Flying;

                if (vehicle.Laps.Count > 1)
                {
                    var lastLap = vehicle.Laps.ElementAtOrDefault(vehicle.Laps.Count - 2);
                    lastLap.Sector3 = json.last[2];
                    lastLap.Vehicle = vehicle;

                    if (lastLap.Status == LapStatus.Flying && lastLap.Sector3 < 1)
                    {
                        lastLap.Status = LapStatus.Invalidated;
                        Log.Information($"Lap {lastLap.Number} invalidated for driver {vehicle.DriverName}");
                    }

                    // New lap started
                    Log.Information($"Driver {vehicle.DriverName} completed a lap: {json.last[2]}");
                    Task.Run(() => _hubService.Send(EventType.TimeUpdateSector3, lastLap));
                }
            }
        }

        private void VehicleEnteredMiddleSector(Vehicle vehicle, Lap lap)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Driving &&
                vehicle.Sector == Sector.Sector2 &&
                vehicle.PreviousSector == Sector.Sector1
                && lap.Status == LapStatus.Flying)
            {
                // Entered Sector 2
                lap.Vehicle = vehicle;
                Task.Run(() => _hubService.Send(EventType.TimeUpdateSector1, lap));
            }
        }

        private void VehicleEnteredLastSector(Vehicle vehicle, Lap lap)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Driving &&
                vehicle.Sector == Sector.Sector3 &&
                vehicle.PreviousSector == Sector.Sector2 &&
                lap.Status == LapStatus.Flying)
            {
                // Entered Sector 3
                lap.Vehicle = vehicle;
                Task.Run(() => _hubService.Send(EventType.TimeUpdateSector2, lap));
            }
        }

        private void InvalidateLap(Lap lap, Vehicle vehicle)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Driving &&
                lap.Status == LapStatus.Flying &&
                ((vehicle.Sector == Sector.Sector2 && lap.Sector1 < 1) ||
                (vehicle.Sector == Sector.Sector3 && lap.Sector2 < 1)))
            {
                lap.Status = LapStatus.Invalidated;
                Log.Information($"Lap {lap.Number} invalidated for driver {vehicle.DriverName}");
            }
        }

        private void RegisterWaypoint(Vehicle vehicle, Lap lap, Json.VehicleState json)
        {
            if (vehicle.Status == Status.Driving &&
                vehicle.PreviousStatus == Status.Driving &&
                vehicle.Laps.Count(l => l.Status == LapStatus.Flying) < 2 &&
                lap.Status == LapStatus.Flying)
            {
                _currentSession.Waypoints.Add(new Waypoint { Distance = json.lapDist, Position = json.Pos, LapNumber = lap.Number });
            }
        }

        private void HandleException(Exception exception)
        {
            Log.Information($"Error: {exception.Message}");
        }

        private void HandleCompleted()
        {
            Log.Information("Completed.");
        }

        /// <summary>
        /// Set up an observable udp stream
        /// </summary>
        /// <typeparam name="T">Type of message</typeparam>
        /// <param name="endpoint">The endpoint to listen to</param>
        /// <param name="processor">Function that handles the resulting buffer</param>
        /// <returns></returns>
        private IObservable<string> UdpStream(IPEndPoint endpoint)
        {
            return Observable.Using(
                () => new UdpClient(endpoint),
                (udpClient) =>
                    Observable.Defer(() => udpClient.ReceiveAsync().ToObservable())
                    .Repeat()
                    .Select((result) =>
                    {
                        return Encoding.UTF8.GetString(result.Buffer).Trim('\0');
                    })
            );
        }
    }
}
