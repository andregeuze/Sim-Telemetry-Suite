using SimTelemetrySuite.Data;
using SimTelemetrySuite.Json;
using SimTelemetrySuite.Mappings;
using System;
using Xunit;

namespace SimTelemetry.Receiver.Tests
{
    public class MapTests
    {
        #region Test Setup

        private TrackState Input_Json_TrackState
        {
            get
            {
                return new TrackState
                {
                    application = "rfactor2",
                    numRedLights = 0,
                    playerName = "PlayerName",
                    plrFileName = "playerFileName",
                    sectorFlags = new[] { 0, 0, 0 },
                    startLight = 0,
                    yellowFlagState = 0,
                    type = "scoring",
                    gamePhase = 5,
                    trackName = "track",
                    session = 0,
                    numVehicles = 2,
                    maxLaps = 100,
                    currentET = 500,
                    endET = 108000,
                    lapDist = 5000,
                    inRealTime = 0,
                    darkCloud = 0,
                    raining = 0,
                    ambientTemp = 30,
                    trackTemp = 30,
                    wind = new[] { 0f, 0f, 0f },
                    minPathWetness = 0,
                    maxPathWetness = 0,
                    vehicles = new[]
                    {
                        new VehicleState {
                            id = 0,
                            driverName = "test",
                            vehicleName = "auto",
                            Pos = new[] {4000f,4000f,4000f},
                            metersPerSecond = 61f,
                            best = new[] { 0f, 0f, 0f },
                            control = 1,
                            currentSector1 = 0f,
                            currentSector2 = 0f,
                            finishStatus = 0,
                            inPits = 0,
                            isPlayer = 1,
                            lapDist = 100,
                            lapsBehindLeader = 0,
                            lapsBehindNext = 0,
                            lapStartET = 0f,
                            last = new[] { 0f, 0f, 0f },
                            numPenalties = 0,
                            numPitstops = 0,
                            pathLateral = 0f,
                            place = 1,
                            relevantTrackEdge = 0f,
                            sector = 0,
                            timeBehindLeader = 0f,
                            timeBehindNext = 0f,
                            totalLaps = 1,
                            vehicleClass = "VehicleClass"
                        },
                        new VehicleState
                        {
                            id = 100,
                            driverName = "test2",
                            vehicleName = "auto2",
                            Pos = new[] {2000f,2000f,2000f},
                            metersPerSecond = 30f,
                            best = new[] { 0f, 0f, 0f },
                            control = 1,
                            currentSector1 = 0f,
                            currentSector2 = 0f,
                            finishStatus = 0,
                            inPits = 1,
                            isPlayer = 1,
                            lapDist = 100,
                            lapsBehindLeader = 0,
                            lapsBehindNext = 0,
                            lapStartET = 0f,
                            last = new[] { 0f, 0f, 0f },
                            numPenalties = 0,
                            numPitstops = 0,
                            pathLateral = 0f,
                            place = 1,
                            relevantTrackEdge = 0f,
                            sector = 0,
                            timeBehindLeader = 0f,
                            timeBehindNext = 0f,
                            totalLaps = 1,
                            vehicleClass = "VehicleClass"
                        }
                    }
                };
            }
        }

        private Vehicle Input_Mapped_Vehicle
        {
            get
            {
                return new Vehicle
                {
                    Id = 0,
                    DriverName = "test",
                    Name = "auto",
                    InternalPosition = "4000;4000;4000",
                    InternalPreviousPosition = "3000;3000;3000",
                    Sector = Sector.Sector3,
                    Status = Status.Driving,
                    Velocity = 60f,
                    IsPlayer = 1,
                    LastRefresh = DateTime.Now,
                    Place = 1,
                    Position = new[] { 4000f, 4000f, 4000f },
                    PreviousPosition = new[] { 3000f, 3000f, 3000f },
                    PreviousSector = Sector.Sector2,
                    PreviousStatus = Status.Driving,
                    PreviousVelocity = 59f,
                    TopVelocity = 60f,
                    TotalLaps = 1,
                    Laps =
                    {
                        Input_Mapped_Lap
                    }
                };
            }
        }

        private Lap Input_Mapped_Lap
        {
            get
            {
                return new Lap
                {
                    Id = 0,
                    Number = 1,
                    Sector1 = 30f,
                    Sector2 = 50f,
                    Sector3 = 80f,
                    Status = LapStatus.Flying
                };
            }
        }

        #endregion

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(8)]
        [InlineData(9)]
        [InlineData(10)]
        [InlineData(13)]
        public void MapSessionType_ReturnsMappedSessionType(int sessionType)
        {
            // Arrange
            var mapper = new RFactor2Mapper();

            // Act
            var mappedSessionType = mapper.MapSessionType(sessionType);

            // Assert
            Assert.True(mappedSessionType != SessionType.Unknown);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(int.MaxValue)]
        [InlineData(int.MinValue)]
        [InlineData(20)]
        [InlineData(999)]
        public void MapSessionType_ReturnsUnknownWhenUnexpectedInt(int sessionType)
        {
            // Arrange
            var mapper = new RFactor2Mapper();

            // Act
            var mappedSessionType = mapper.MapSessionType(sessionType);

            // Assert
            Assert.True(mappedSessionType == SessionType.Unknown);
        }

        [Fact]
        public void MapSession_ReturnsFullyMappedSession()
        {
            // Arrange
            var mapper = new RFactor2Mapper();
            var jsonTrack = Input_Json_TrackState;
            var session = new Session();

            // Act
            mapper.MapSession(session, jsonTrack);

            // Assert
            Assert.Equal(SessionType.Testday, session.Type);
            Assert.Equal(GamePhase.GreenFlag, session.Phase);
            Assert.Equal(jsonTrack.trackName, session.TrackName);
            Assert.Equal(jsonTrack.lapDist, session.TrackDistance);
            Assert.Equal(jsonTrack.endET, session.Duration);
            Assert.Equal(jsonTrack.currentET, session.CurrentTime);
        }

        [Fact]
        public void MapLapToVehicle_ReturnsMappedLapForVehicle()
        {
            // Arrange
            var mapper = new RFactor2Mapper();
            var vehicle = Input_Mapped_Vehicle;
            var jsonTrack = Input_Json_TrackState;
            var vehicleJson = jsonTrack.vehicles[0];

            // Act
            var lap = mapper.MapLapToVehicle(vehicle, vehicleJson);

            // Assert
            Assert.NotNull(lap);
            Assert.Equal(vehicleJson.currentSector1, lap.Sector1);
            Assert.Equal(vehicleJson.currentSector2, lap.Sector2);
            Assert.Equal(-1, lap.Sector3);
        }

        [Fact]
        public void MapVehicle_MapsAllFieldsToVehicle()
        {
            // Arrange
            var mapper = new RFactor2Mapper();
            var vehicle = Input_Mapped_Vehicle;
            var vehicleJson = Input_Json_TrackState.vehicles[0];

            // Act
            mapper.MapVehicle(vehicle, vehicleJson);

            // Assert
            Assert.Equal(vehicleJson.vehicleName, vehicle.Name);
            Assert.Equal(vehicleJson.isPlayer, vehicle.IsPlayer);
            Assert.Equal(vehicleJson.driverName, vehicle.DriverName);
            Assert.Equal(vehicleJson.place, vehicle.Place);
            Assert.Equal(vehicleJson.Pos, vehicle.Position);
            Assert.Equal(vehicleJson.metersPerSecond, vehicle.Velocity);
            Assert.Equal(vehicleJson.sector, (int)vehicle.Sector);
            Assert.Equal(vehicleJson.totalLaps, vehicle.TotalLaps);
            Assert.Equal(Status.Driving, vehicle.Status);
        }

        [Fact]
        public void VehicleInternalPositionEmpty_ReturnsEmptyFloatArray()
        {
            // Arrange
            var vehicle = Input_Mapped_Vehicle;
            vehicle.InternalPosition = string.Empty;

            // Act
            var position = vehicle.Position;

            // Assert
            Assert.Equal(new float[0], position);
        }

        [Fact]
        public void VehicleInternalPreviousPositionEmpty_ReturnsEmptyFloatArray()
        {
            // Arrange
            var vehicle = Input_Mapped_Vehicle;
            vehicle.InternalPreviousPosition = string.Empty;

            // Act
            var previousPosition = vehicle.PreviousPosition;

            // Assert
            Assert.Equal(new float[0], previousPosition);
        }

        [Fact]
        public void VehicleBestLap_ReturnsFastestLapFromListOfLaps()
        {
            // Arrange
            var vehicle = Input_Mapped_Vehicle;

            // Act
            var bestLap = vehicle.BestLap;

            // Assert
            Assert.Equal("1:20.000", bestLap);
        }

        [Fact]
        public void VehicleGetBestLapTime_ReturnsFloatFromFastestSector3()
        {
            // Arrange
            var vehicle = Input_Mapped_Vehicle;

            // Act
            var bestLapTime = vehicle.GetBestLapTime;

            // Assert
            Assert.Equal(80f, bestLapTime);
        }

    }
}
