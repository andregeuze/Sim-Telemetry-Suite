using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// The add.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        Task<T> Add(T entity);

        /// <summary>
        /// The update.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        void Update(T entity);

        /// <summary>
        /// The delete.
        /// </summary>
        /// <param name="entity">
        /// The entity.
        /// </param>
        void Delete(T entity);

        /// <summary>
        /// The delete.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        void Delete(Expression<Func<T, bool>> where);

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        T GetById(int id);

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        T GetById(Guid id);

        /// <summary>
        /// The get by id.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        T GetById(string id);

        /// <summary>
        /// The get.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        T Get(Expression<Func<T, bool>> where);

        /// <summary>
        /// The get all.
        /// </summary>
        /// <returns>
        /// The List.
        /// </returns>
        IEnumerable<T> GetAll();

        /// <summary>
        /// The get many.
        /// </summary>
        /// <param name="where">
        /// The where.
        /// </param>
        /// <returns>
        /// The List.
        /// </returns>
        IEnumerable<T> GetMany(Expression<Func<T, bool>> where);

        /// <summary>
        /// Commit changes to the database
        /// </summary>
        /// <returns></returns>
        Task Save();

    }
}