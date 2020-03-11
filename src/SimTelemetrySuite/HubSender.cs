using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SimTelemetrySuite
{
    public class HubSender : IDisposable
    {
        public event EventHandler Connected;
        public event EventHandler Disconnected;

        private readonly string _hubUrl;
        private readonly string _hubName;
        private HubConnection _hubConnection;
        private bool _isConnected;

        public HubSender(IConfiguration configuration)
        {
            _hubUrl = configuration.GetSection("Hub:Url").Value;
            _hubName = configuration.GetSection("Hub:Name").Value;
        }

        private Task _hubConnection_Closed(Exception arg)
        {
            _isConnected = false;
            Disconnected?.Invoke(this, EventArgs.Empty);
            return Task.CompletedTask;
        }

        public async Task Start()
        {
            // Start the hub connection
            await StartHubConnection();

            // Start async returned, so we are connected
            _isConnected = true;
            Connected?.Invoke(this, EventArgs.Empty);
        }

        private async Task StartHubConnection()
        {
            var waiting = true;
            do
            {
                try
                {
                    Log.Information("Checking Hub status...");

                    _hubConnection = new HubConnectionBuilder()
                        .WithUrl($"{_hubUrl}{_hubName}")
                        .AddJsonProtocol()
                        .ConfigureLogging(logging =>
                        {
                            logging.AddSerilog();
                        })
                        .Build();

                    _hubConnection.Closed += _hubConnection_Closed;

                    await _hubConnection.StartAsync();
                    waiting = false;
                }
                catch (Exception e)
                {
                    Log.Warning(e, $"Hub not online yet, trying again in 5 seconds...");
                }

                Thread.Sleep(5000);
            } while (waiting);
        }

        public async Task Send<T>(EventType @event, T payload) where T : class
        {
            if (!_isConnected)
            {
                return;
            }

            var json = JsonConvert.SerializeObject(payload, Formatting.None);
            var method = Enum.GetName(typeof(EventType), @event);

            // Send the payload
            await _hubConnection.InvokeAsync("Receive", method, json);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _hubConnection?.DisposeAsync();
            }
        }

        ~HubSender()
        {
            Dispose(false);
        }

    }
}
