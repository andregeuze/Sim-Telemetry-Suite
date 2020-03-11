using SimTelemetrySuite.Data;
using SimTelemetrySuite.Json;

namespace SimTelemetrySuite.Mappings
{
    public interface IMapper
    {
        void MapSession(Session session, TrackState json);
        
        void MapVehicle(Vehicle vehicle, VehicleState vehicleJson);

        Lap MapLapToVehicle(Vehicle vehicle, VehicleState vehicleJson);

        SessionType MapSessionType(int sessionType);
    }
}
