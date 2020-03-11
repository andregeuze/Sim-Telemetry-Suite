using Microsoft.AspNetCore.SignalR;
using System;

namespace SimTelemetrySuite.Hubs.Events
{
    public class ClientEventArgs : EventArgs
    {
        public string ConnectionId { get; set; }

        public IClientProxy ClientProxy { get; set; }
    }
}
