using Microsoft.EntityFrameworkCore;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Repositories.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories
{
    public class SessionRepository : RepositoryBase<Session>, ISessionRepository
    {
        private readonly IExtensionsWrapper _extensionsWrapper;

        public SessionRepository(TelemetryContext dataContext, IExtensionsWrapper extensionsWrapper) : base(dataContext)
        {
            _extensionsWrapper = extensionsWrapper;
        }

        public async Task<Session> GetByName(string name)
        {
            return await _extensionsWrapper.GetByName(DataContext.Set<Session>(), name);
        }
    }
}
