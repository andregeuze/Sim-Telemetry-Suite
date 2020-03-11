using SimTelemetrySuite.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class, IEntity
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetById(int id);
        Task<TEntity> Create(TEntity entity);
        Task Save();
    }
}
