using Microsoft.EntityFrameworkCore;
using SimTelemetrySuite.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IEntity
    {
        protected readonly TelemetryContext _dbContext;

        public GenericRepository()
        {
        }

        public GenericRepository(TelemetryContext context)
        {
            _dbContext = context;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>();
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            return await _dbContext.Set<TEntity>()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual async Task<TEntity> Create(TEntity entity)
        {
            return (await _dbContext.Set<TEntity>().AddAsync(entity)).Entity;
        }

        public virtual async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
