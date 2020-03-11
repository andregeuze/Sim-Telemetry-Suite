using SimTelemetrySuite.Data;
using Xunit;

namespace SimTelemetrySuite.Tests.Data
{
    public class WaypointFacts
    {
        [Theory]
        [InlineData(123.345f, 100.501f, 109.123f)]
        [InlineData(-123.345f, -100.501f, -109.123f)]
        [InlineData(-1f, -1f, -1f)]
        [InlineData(5f, 5f, 5f)]
        public void Position_SavedAsString(float x, float y, float z)
        {
            // Arrange
            var pos = new[] { x, y, z };
            var waypoint = new Waypoint();

            // Act
            waypoint.Position = pos;

            // Assert
            Assert.NotEqual(0f, waypoint.InternalX);
            Assert.NotEqual(0f, waypoint.InternalY);
            Assert.NotEqual(0f, waypoint.InternalZ);
            Assert.Equal(x, waypoint.InternalX);
            Assert.Equal(y, waypoint.InternalY);
            Assert.Equal(z, waypoint.InternalZ);
        }

        [Theory]
        [InlineData(123.345f, 100.501f, 109.123f)]
        [InlineData(-123.345f, -100.501f, -109.123f)]
        [InlineData(-1f, -1f, -1f)]
        [InlineData(5f, 5f, 5f)]
        public void Position_LoadFromString(float x, float y, float z)
        {
            // Arrange
            var pos = new[] { x, y, z };
            var waypoint = new Waypoint
            {
                InternalX = x,
                InternalY = y,
                InternalZ = z
            };

            // Act
            var position = waypoint.Position;

            // Assert
            Assert.NotNull(position);
            Assert.Equal(pos, position);
        }
    }
}
