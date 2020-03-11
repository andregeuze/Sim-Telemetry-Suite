using Microsoft.EntityFrameworkCore;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbset;

        /// <summary>
        /// Initializes a new instance of the <see cref="RepositoryBase{T}"/> class. 
        /// </summary>
        /// <param name="dataContext">
        /// The database context.
        /// </param>
        protected RepositoryBase(TelemetryContext dataContext)
        {
            DataContext = dataContext;
            _dbset = DataContext.Set<T>();
        }

        /// <summary>
        /// Gets the data context.
        /// </summary>
        protected TelemetryContext DataContext { get; }

        /// <summary>
        /// The add.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        public virtual async Task<T> Add(T entity)
        {
            return (await _dbset.AddAsync(entity)).Entity;
        }

        /// <summary>
        /// The update.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        public virtual void Update(T entity)
        {
            _dbset.Attach(entity);
            DataContext.SetModified(entity);
        }

        /// <summary>
        /// The delete.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        public virtual void Delete(T entity)
        {
            _dbset.Remove(entity);
        }

        /// <summary>
        /// The delete.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        public virtual void Delete(Expression<Func<T, bool>> where)
        {
            var objects = _dbset.Where(where).AsEnumerable();
            foreach (var obj in objects)
                _dbset.Remove(obj);
        }

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public virtual T GetById(int id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public virtual T GetById(Guid id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public virtual T GetById(string id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// The get all.
        /// </summary>
        /// <returns>
        /// The list.
        /// </returns>
        public virtual IEnumerable<T> GetAll()
        {
            return _dbset.ToList();
        }

        /// <summary>
        /// The get many.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        /// <returns>
        /// The list.
        /// </returns>
        public virtual IEnumerable<T> GetMany(Expression<Func<T, bool>> where)
        {
            return _dbset.Where(where).ToList();
        }

        /// <summary>
        /// The get.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public T Get(Expression<Func<T, bool>> where)
        {
            return _dbset.Where(where).FirstOrDefault();
        }

        /// <summary>
        /// Commit changes to the database
        /// </summary>
        /// <returns>
        /// Task.
        /// </returns>
        public virtual async Task Save()
        {
            await DataContext.SaveChangesAsync();
        }
    }
}
