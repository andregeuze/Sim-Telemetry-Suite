using Microsoft.EntityFrameworkCore;
using Moq;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Repositories;
using SimTelemetrySuite.Repositories.Interfaces;
using System.Threading;
using Xunit;

namespace SimTelemetrySuite.Tests.Repositories
{
    public class RepositoryBaseFacts
    {


        [Fact]
        public void Add_CallsDbSetOnce()
        {
            // Arrange
            var session = new Session { Id = 1 };
            var mockSet = MockHelper.GetQueryableMockDbSet<Session>();
            var mockContext = MockHelper.GetDataContext(mockSet);
            var mockExtensionsWrapper = new Mock<IExtensionsWrapper>();
            var sessionRepository = new SessionRepository(mockContext.Object, mockExtensionsWrapper.Object);

            // Act
            sessionRepository.Add(session);

            // Assert
            mockSet.Verify(x => x.AddAsync(session, new CancellationToken()), Times.Once);
        }

        [Fact]
        public void Delete_CallsDbSetOnce()
        {
            // Arrange
            var session = new Session { Id = 1 };
            var mockSet = MockHelper.GetQueryableMockDbSet<Session>();
            var mockContext = MockHelper.GetDataContext(mockSet);
            var mockExtensionsWrapper = new Mock<IExtensionsWrapper>();
            var sessionRepository = new SessionRepository(mockContext.Object, mockExtensionsWrapper.Object);

            // Act
            sessionRepository.Delete(session);

            // Assert
            mockSet.Verify(x => x.Remove(session), Times.Once);
        }

        [Fact]
        public void Update_CallsDbSetOnce()
        {
            // Arrange
            var mockSet = MockHelper.GetQueryableMockDbSet<Session>();
            var mockContext = MockHelper.GetDataContext(mockSet);
            var mockExtensionsWrapper = new Mock<IExtensionsWrapper>();
            var sessionRepository = new SessionRepository(mockContext.Object, mockExtensionsWrapper.Object);
            var session = new Session { Id = 1 };

            // Act
            sessionRepository.Update(session);

            // Assert
            mockSet.Verify(x => x.Attach(session), Times.Once);
        }

        [Fact]
        public void GetByName_CallsSingleOrDefaultAsyncOnce()
        {
            // Arrange
            var mockSet = MockHelper.GetQueryableMockDbSet<Session>();
            var mockContext = MockHelper.GetDataContext(mockSet);
            var mockExtensionsWrapper = new Mock<IExtensionsWrapper>();
            var sessionRepository = new SessionRepository(mockContext.Object, mockExtensionsWrapper.Object);

            // Act
            sessionRepository.GetByName("Session");

            // Assert
            mockExtensionsWrapper.Verify(x => x.GetByName(It.IsAny<DbSet<Session>>(), It.IsAny<string>()), Times.Once);
        }
    }
}
