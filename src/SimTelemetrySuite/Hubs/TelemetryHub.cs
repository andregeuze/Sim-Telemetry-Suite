using Microsoft.AspNetCore.SignalR;
using SimTelemetrySuite.Hubs.Events;
using System;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Hubs
{
    public class TelemetryHub : Hub, ITelemetryHub
    {
        private const string _hubPath = "/telemetry";
        private readonly HubService _hubService;

        public static string Path => _hubPath;

        public TelemetryHub(HubService hubService)
        {
            //_hubService = Setup.Container.Resolve<HubService>();
            _hubService = hubService;
        }

        public void SetNickName(string name)
        {
            _hubService.SetNickName(this, new ClientNickNameEventArgs { ConnectionId = Context.ConnectionId, ClientProxy = Clients.Caller, NickName = name });
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            _hubService.OnConnected(this, new ClientEventArgs { ConnectionId = Context.ConnectionId, ClientProxy = Clients.Caller });
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _hubService.OnDisconnected(this, new ClientEventArgs { ConnectionId = Context.ConnectionId });
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
