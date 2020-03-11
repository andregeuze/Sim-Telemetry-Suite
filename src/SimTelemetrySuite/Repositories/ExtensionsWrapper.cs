using Microsoft.EntityFrameworkCore;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Repositories.Interfaces;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories
{
    public class ExtensionsWrapper : IExtensionsWrapper
    {
        public async Task<Session> GetByName(DbSet<Session> dbSet, string name)
        {
            return await dbSet
                .Include("Vehicles.Laps")
                .Include("Waypoints")
                .LastOrDefaultAsync(x => x.Name == name);
        }
    }
}
