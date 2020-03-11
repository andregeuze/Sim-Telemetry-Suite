using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimTelemetry.Api.Data;
using SimTelemetry.Api.Models;
using Swashbuckle.AspNetCore.Swagger;

namespace SimTelemetry.Api
{
    public class Program
    {
        private const string _swaggerEndpoint = "/swagger/v1/swagger.json";
        private const string _exceptionHandler = "/Error";

        protected Program()
        {
        }

        public static IHostingEnvironment HostingEnvironment { get; set; }
        public static IConfiguration Configuration { get; set; }

        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                HostingEnvironment = hostingContext.HostingEnvironment;
                Configuration = config.Build();
            })
            .ConfigureServices(services =>
            {
                // Adds services required for using options.
                services.AddOptions();

                // Register the IConfiguration instance 
                services.Configure<DocDbConfig>(Configuration);

                //Register the Item service
                services.AddTransient<IService<Driver>, DriverService>();

                // Add framework services.
                services.AddMvc();

                // Register the Swagger generator, defining one or more Swagger documents
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new Info { Title = "Sim Telemetry API", Version = "v1" });
                });
            })
            .Configure(app =>
            {
                var loggerFactory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogInformation("Logged in Configure");

                if (HostingEnvironment.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler(_exceptionHandler);
                }

                app.UseStaticFiles();

                // Enable middleware to serve generated Swagger as a JSON endpoint.
                app.UseSwagger();

                // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint(_swaggerEndpoint, "Sim Telemetry API v1");
                    c.RoutePrefix = string.Empty;
                });

                app.UseMvc();
            })
            .UseApplicationInsights();
    }
}
