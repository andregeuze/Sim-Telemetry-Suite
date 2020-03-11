using Moq;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Repositories;
using SimTelemetrySuite.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace SimTelemetry.Receiver.Tests
{
    public class RepositoryTests
    {
        #region Test Setup

        private Vehicle Input_DrivingVehicleInSector3
        {
            get {
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
                    TotalLaps = 1
                };
            }
        }

        #endregion

        [Fact]
        public void GenericRepository_GetAllReturnsListOfVehicle()
        {
            // Arrange
            var repository = new Mock<GenericRepository<Vehicle>>();
            repository
                .Setup(v => v.GetAll())
                .Returns(new List<Vehicle> { Input_DrivingVehicleInSector3 }.AsQueryable());

            // Act
            var vehicles = repository.Object.GetAll().ToList();

            // Assert
            Assert.NotNull(vehicles);
            Assert.True(vehicles.Count == 1);
            Assert.True(vehicles[0].Id == Input_DrivingVehicleInSector3.Id);
        }

        [Fact]
        public async Task GenericRepository_GetByIdReturnsOneVehicle()
        {
            // Arrange
            var repository = new Mock<GenericRepository<Vehicle>>();
            repository
                .Setup(v => v.GetById(It.IsAny<int>()))
                .Returns(Task.FromResult(Input_DrivingVehicleInSector3));

            // Act
            var vehicle = await repository.Object.GetById(0);

            // Assert
            Assert.NotNull(vehicle);
            Assert.True(vehicle.Id == Input_DrivingVehicleInSector3.Id);
        }

        [Fact]
        public async Task GenericRepository_CreateReturnsCreatedVehicle()
        {
            // Arrange
            var repository = new Mock<GenericRepository<Vehicle>>();
            repository
                .Setup(v => v.Create(It.IsAny<Vehicle>()))
                .Returns(Task.FromResult(Input_DrivingVehicleInSector3));

            // Act
            var vehicle = await repository.Object.Create(Input_DrivingVehicleInSector3);

            // Assert
            Assert.NotNull(vehicle);
            Assert.True(vehicle.Id == Input_DrivingVehicleInSector3.Id);
        }

        [Fact]
        public async Task GenericRepository_SaveDoesNothing()
        {
            // Arrange
            var repository = new Mock<GenericRepository<Vehicle>>();
            repository
                .Setup(v => v.Save())
                .Returns(Task.CompletedTask);

            // Act
            await repository.Object.Save();

            // Assert
            Assert.NotNull(repository.Object);
        }

        //[Fact]
        //public async Task NamedRepository_ReturnsObjectByName()
        //{
        //    // Arrange
        //    var repository = new Mock<SessionRepository>();
        //    repository
        //        .Setup(v => v.GetByName(It.IsAny<string>()))
        //        .Returns(Task.FromResult(Input_DrivingVehicleInSector3));

        //    // Act
        //    var vehicle = await repository.Object.GetByName(Input_DrivingVehicleInSector3.Name);

        //    // Assert
        //    Assert.NotNull(vehicle);
        //    Assert.True(vehicle.Id == Input_DrivingVehicleInSector3.Id);
        //}
    }
}
