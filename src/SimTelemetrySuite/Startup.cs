using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Hubs;
using SimTelemetrySuite.Mappings;
using SimTelemetrySuite.Repositories;
using SimTelemetrySuite.Repositories.Interfaces;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading;

namespace SimTelemetrySuite
{
    public class Startup
    {
        private const string reactDevServerUrl = "http://localhost:3000";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static void InitializeDatabase(TelemetryContext context)
        {
            context.Database.Migrate();

            // Look for any data
            if (context.Sessions.Any())
            {
                return;   // DB has been seeded
            }

            // Add a dummy session
            context.Add(new Session
            {
                Id = 0,
                Name = "Dummy"
            });

            context.SaveChanges();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();

            // Entity Framework
            services.AddDbContext<TelemetryContext>(options => ConfigureDbContextOptions<TelemetryContext>(options), ServiceLifetime.Singleton);

            // Repositories
            services.AddSingleton<IExtensionsWrapper, ExtensionsWrapper>();
            services.AddSingleton(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddSingleton<ISessionRepository, SessionRepository>();

            // Singleton types
            services.AddSingleton<HubService>();
            services.AddSingleton<TelemetryReceiver>();

            // Mappers
            services.AddSingleton<IMapper, RFactor2Mapper>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSignalR(routes =>
            {
                routes.MapHub<TelemetryHub>(TelemetryHub.Path, options =>
                {
                    options.ApplicationMaxBufferSize = 512000;
                    options.TransportMaxBufferSize = 512000;
                });
            });

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    if (IsReactServerRunning())
                    {
                        spa.UseProxyToSpaDevelopmentServer(reactDevServerUrl);
                    }
                    else
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                }
            });

        }

        public void ConfigureDbContextOptions<T>(DbContextOptionsBuilder builder)
            where T : DbContext
        {
            var connectionType = Program.Configuration.GetSection("Receiver:ConnectionType").Value;
            var connectionString = Program.Configuration.GetConnectionString(connectionType);

            switch (connectionType)
            {
                case "SqlServer":
                    builder.UseSqlServer(connectionString);
                    break;
                default:
                    builder.UseSqlite(connectionString);
                    break;
            }
        }

        private bool IsReactServerRunning()
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.Timeout = TimeSpan.FromSeconds(3);

                try
                {
                    var result = httpClient.GetAsync(reactDevServerUrl, new CancellationTokenSource(TimeSpan.FromSeconds(3)).Token)
                        .GetAwaiter()
                        .GetResult();

                    return result.IsSuccessStatusCode;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
