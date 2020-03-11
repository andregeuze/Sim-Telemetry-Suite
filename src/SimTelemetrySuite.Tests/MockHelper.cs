using Microsoft.EntityFrameworkCore;
using Moq;
using SimTelemetrySuite.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SimTelemetrySuite.Tests
{
    public static class MockHelper
    {
        public static Mock<DbSet<T>> GetQueryableMockDbSet<T>(List<T> sourceList = null) where T : class
        {
            if (sourceList == null) sourceList = new List<T>();

            var queryable = sourceList.AsQueryable();

            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            dbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>((s) => sourceList.Add(s));

            return dbSet;
        }

        public static Mock<TelemetryContext> GetDataContext(Mock<DbSet<Session>> sessionMockSet)
        {
            var mockContext = new Mock<TelemetryContext>();

            mockContext.Setup(m => m.Sessions).Returns(sessionMockSet.Object);
            mockContext.Setup(x => x.Set<Session>()).Returns(sessionMockSet.Object);
            mockContext.Setup(m => m.SetModified(It.IsAny<object>())).Callback(() => Console.WriteLine("SetModified called"));

            return mockContext;
        }
    }
}
