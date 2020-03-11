using SimTelemetrySuite.Data;
using SimTelemetrySuite.Json;
using System;
using System.Linq;

namespace SimTelemetrySuite.Mappings
{
    public class RFactor2Mapper : IMapper
    {
        public void MapSession(Session session, TrackState json)
        {
            // Map the session type
            session.Type = MapSessionType(json.session);
            session.Phase = (GamePhase)json.gamePhase;
            session.TrackName = json.trackName;
            session.TrackDistance = json.lapDist;
            session.Duration = json.endET;
            session.CurrentTime = json.currentET;
        }

        public void MapVehicle(Vehicle vehicle, VehicleState vehicleJson)
        {
            if (vehicle == null) { throw new ArgumentNullException("vehicle", "Vehicle should not be null in a mapper method."); }

            // Update the "previous" properties
            vehicle.PreviousPosition = vehicle.Position;
            vehicle.PreviousSector = vehicle.Sector;
            vehicle.PreviousStatus = vehicle.Status;
            vehicle.PreviousVelocity = vehicle.Velocity;

            // Update the other properties
            vehicle.Name = vehicleJson.vehicleName;
            vehicle.IsPlayer = vehicleJson.isPlayer;
            vehicle.DriverName = vehicleJson.driverName;
            vehicle.Place = vehicleJson.place;
            vehicle.Position = vehicleJson.Pos;
            vehicle.Velocity = vehicleJson.metersPerSecond;
            vehicle.Sector = (Sector)vehicleJson.sector;
            vehicle.TotalLaps = vehicleJson.totalLaps;
            vehicle.LastRefresh = DateTime.Now;

            // Map status
            if (vehicleJson.inPits == 1)
            {
                vehicle.Status = Status.Pit;
            }
            else
            {
                vehicle.Status = Status.Driving;
            }

            // Calculate the top speed
            vehicle.TopVelocity = vehicle.Velocity > vehicle.TopVelocity ? vehicle.Velocity : vehicle.TopVelocity;
        }

        public Lap MapLapToVehicle(Vehicle vehicle, VehicleState vehicleJson)
        {
            var lapNumber = vehicleJson.totalLaps + 1;

            // Get the lap
            if (!vehicle.Laps.Exists(l => l.Number == lapNumber))
            {
                vehicle.Laps.Add(new Lap { Number = lapNumber, Status = LapStatus.NewLap });
            }
            var lap = vehicle.Laps.FirstOrDefault(l => l.Number == lapNumber);

            lap.Sector1 = vehicleJson.currentSector1;
            lap.Sector2 = vehicleJson.currentSector2;
            lap.Sector3 = -1;

            return lap;
        }

        public SessionType MapSessionType(int sessionType)
        {
            SessionType type = SessionType.Unknown;
            switch (sessionType)
            {
                case 0:
                    type = SessionType.Testday;
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    type = SessionType.Practice;
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                    type = SessionType.Qualifying;
                    break;
                case 9:
                    type = SessionType.Warmup;
                    break;
                case 10:
                case 11:
                case 12:
                case 13:
                    type = SessionType.Race;
                    break;
            }
            return type;
        }
    }
}
