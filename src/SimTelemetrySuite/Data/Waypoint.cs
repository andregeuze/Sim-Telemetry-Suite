using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;

namespace SimTelemetrySuite.Data
{
    public class Waypoint : IEntity
    {
        public int Id { get; set; }

        public float InternalX { get; set; }

        public float InternalY { get; set; }

        public float InternalZ { get; set; }

        [NotMapped]
        public float[] Position
        {
            get
            {
                return new[] {
                    InternalX,
                    InternalY,
                    InternalZ
                };
            }
            set
            {
                InternalX = value[0];
                InternalY = value[1];
                InternalZ = value[2];
            }
        }

        public float Distance { get; set; }

        [NotMapped]
        [JsonIgnore]
        public int LapNumber { get; set; }
    }
}
