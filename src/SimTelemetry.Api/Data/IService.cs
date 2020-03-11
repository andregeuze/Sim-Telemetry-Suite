using SimTelemetry.Api.Models;
using System.Collections.Generic;

namespace SimTelemetry.Api.Data
{
    public interface IService<T> where T : class
    {
        string Create(T create);

        List<T> Get();

        T Get(string id);

        void Update(string id, T update);

        void Delete(string id);
    }
}
