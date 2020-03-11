using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Serilog;
using SimTelemetrySuite.Hubs.Events;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimTelemetrySuite
{
    public class HubService
    {
        public event EventHandler<ClientEventArgs> ClientConnected;
        public event EventHandler<ClientEventArgs> ClientDisconnected;
        public event EventHandler<ClientNickNameEventArgs> ClientNickNameChanged;

        private readonly Dictionary<string, IClientProxy> _contexts = new Dictionary<string, IClientProxy>();

        public async Task Send<T>(string connectionId, EventType @event, T payload) where T : class
        {
            var json = JsonConvert.SerializeObject(payload, Formatting.None);
            var method = Enum.GetName(typeof(EventType), @event);

            // Send the payload
            Log.Information($"Sending {method} to client {connectionId}");

            var client = _contexts[connectionId];
            await client.SendAsync(method, json);
        }

        public async Task Send<T>(EventType @event, T payload) where T : class
        {
            var json = JsonConvert.SerializeObject(payload, Formatting.None);
            var method = Enum.GetName(typeof(EventType), @event);

            // Send the payload if we have any clients
            foreach (var client in _contexts.Values)
            {
                await client.SendAsync(method, json);
            }
        }

        public void SetNickName(object sender, ClientNickNameEventArgs args)
        {
            Log.Information($"Received a new Nickname from {args.ConnectionId}");
            ClientNickNameChanged?.Invoke(this, args);
        }

        public void OnConnected(object sender, ClientEventArgs args)
        {
            Log.Information($"New connection from {args.ConnectionId}");
            _contexts.Add(args.ConnectionId, args.ClientProxy);
            ClientConnected?.Invoke(sender, args);
        }

        internal void OnDisconnected(object sender, ClientEventArgs args)
        {
            Log.Information($"Connection {args.ConnectionId} dropped");
            _contexts.Remove(args.ConnectionId);
            ClientDisconnected?.Invoke(sender, args);
        }
    }
}
