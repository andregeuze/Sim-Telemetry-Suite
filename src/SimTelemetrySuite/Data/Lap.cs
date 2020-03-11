using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimTelemetrySuite.Data
{
    public class Lap : IEntity
    {
        public int Id { get; set; }

        public int Number { get; set; }

        /// <summary>
        /// Sector 1
        /// </summary>
        public float Sector1 { get; set; }

        /// <summary>
        /// Sector 1 + 2
        /// </summary>
        public float Sector2 { get; set; }

        /// <summary>
        /// Total time
        /// </summary>
        public float Sector3 { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public LapStatus Status { get; set; }

        [NotMapped]
        public Vehicle Vehicle { get; set; }
    }
}
