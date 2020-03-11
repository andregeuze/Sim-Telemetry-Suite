using SimTelemetrySuite.Data;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories.Interfaces
{
    public interface ISessionRepository : IRepository<Session>
    {
        Task<Session> GetByName(string name);
        Task Save();
    }
}