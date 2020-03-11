using Microsoft.EntityFrameworkCore;
using SimTelemetrySuite.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories.Interfaces
{
    public interface IExtensionsWrapper
    {
        Task<Session> GetByName(DbSet<Session> dbSet, string name);
    }
}
