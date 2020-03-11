using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using SimTelemetrySuite.Data;
using SimTelemetrySuite.Logging;
using System;
using System.IO;
using System.Threading;

namespace SimTelemetrySuite
{
    public class Program
    {
        protected Program()
        {
        }

        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureLogging(log => log.AddSerilog())
            .UseConfiguration(Configuration)
            .UseStartup<Startup>()
            .ConfigureAppConfiguration((context, builder) =>
            {
                Log.Information($"HostingEnvironmentName: '{context.HostingEnvironment.EnvironmentName}'");
            })
            .UseApplicationInsights()
            .Build();

        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .Enrich.FromLogContext()
                .Enrich.WithCaller()
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] ({Caller}) {Message:lj}{NewLine}{Exception}")
                .CreateLogger();

            try
            {
                Log.Information("#######################################################");
                Log.Information("Sim Telemetry Suite - Receiver started.");
                Log.Information("Press any key to shutdown...");
                Log.Information("#######################################################");

                // Create the webhost for signalr hubs and the client apps
                var webHost = BuildWebHost(args);

                // Use the webhost scope to resolve and Start the logic
                using (var scope = webHost.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;

                    //    // Prepare the database
                    var context = services.GetRequiredService<TelemetryContext>();
                    Startup.InitializeDatabase(context);

                    //    // Run the receiver
                    var receiver = services.GetRequiredService<TelemetryReceiver>();
                    receiver.Start();
                }

                // Start the webhost
                webHost.Start();

                var key = Console.Read();
                while (key != (int)ConsoleKey.Enter)
                {
                    Thread.Sleep(2000);
                    key = Console.Read();
                }
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
                Console.WriteLine($"Receiver exception occurred: {ex.Message}");
            }
            finally
            {
                Console.Read();
                Log.CloseAndFlush();
            }
        }
    }
}
