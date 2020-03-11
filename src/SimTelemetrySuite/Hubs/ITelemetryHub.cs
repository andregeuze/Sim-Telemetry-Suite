using System;
using System.Threading.Tasks;

namespace SimTelemetrySuite.Hubs
{
    public interface ITelemetryHub
    {
        void SetNickName(string name);

        Task OnConnectedAsync();

        Task OnDisconnectedAsync(Exception exception);
    }
}
