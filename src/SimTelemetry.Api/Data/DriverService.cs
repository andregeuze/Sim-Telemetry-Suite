using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Options;
using SimTelemetry.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimTelemetry.Api.Data
{
    public class DriverService : IService<Driver>
    {
        private readonly DocumentClient client;
        private readonly DocDbConfig config;
        private readonly Uri collectionUri;

        public DriverService(IOptions<DocDbConfig> ConfigAccessor)
        {
            config = ConfigAccessor.Value;
            client = new DocumentClient(new Uri(config.Endpoint), config.AuthKey);
            collectionUri = UriFactory.CreateDocumentCollectionUri(config.Database, config.Collection);
            CreateDatabaseIfNotExists(config.Database).Wait();
            CreateDocumentCollectionIfNotExists(config.Database, config.Collection).Wait();
        }

        public string Create(Driver create)
        {
            client.CreateDocumentAsync(collectionUri, create).Wait();
            return create.Name;
        }

        public void Delete(string id)
        {
            client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(config.Database, config.Collection, id)).Wait();
        }

        public void Update(string id, Driver update)
        {
            client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(config.Database, config.Collection, id), update).Wait();
        }

        public List<Driver> Get()
        {
            return client.CreateDocumentQuery<Driver>(collectionUri).ToList();
        }

        public Driver Get(string id)
        {
            return client.CreateDocumentQuery<Driver>(collectionUri)
                .Where(c => c.Name == id)
                .AsEnumerable().FirstOrDefault();
        }

        private async Task CreateDatabaseIfNotExists(string databaseName)
        {
            await client.CreateDatabaseIfNotExistsAsync(new Database { Id = databaseName });
        }

        private async Task CreateDocumentCollectionIfNotExists(string databaseName, string collectionName)
        {
            await client.CreateDocumentCollectionIfNotExistsAsync(
                UriFactory.CreateDatabaseUri(databaseName),
                new DocumentCollection
                {
                    Id = collectionName,
                    IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 }),
                    UniqueKeyPolicy = new UniqueKeyPolicy
                    {
                        UniqueKeys =
                        {
                            new UniqueKey{ Paths = { "/Name" } }
                        }
                    }
                },
                new RequestOptions { OfferThroughput = 400 });
        }
    }
}
