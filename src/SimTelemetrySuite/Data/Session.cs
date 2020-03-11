using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;

namespace SimTelemetrySuite.Data
{
    public class Session : INamedEntity
    {
        public int Id { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public SessionType Type { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public GamePhase Phase { get; set; }

        public string Name { get; set; }

        public string TrackName { get; set; }

        public float TrackDistance { get; set; }

        public float Duration { get; set; }

        public float CurrentTime { get; set; }

        public string Mode { get; set; }

        public List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();

        public List<Waypoint> Waypoints { get; set; } = new List<Waypoint>();
    }
}
