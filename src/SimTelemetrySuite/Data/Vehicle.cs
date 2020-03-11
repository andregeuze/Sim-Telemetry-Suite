using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;

namespace SimTelemetrySuite.Data
{
    public class Vehicle : INamedEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DriverName { get; set; }

        public int IsPlayer { get; set; }

        public int Place { get; set; }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public string InternalPosition { get; set; }
        [NotMapped]
        public float[] Position
        {
            get
            {
                return string.IsNullOrWhiteSpace(InternalPosition)
                    ? new float[0]
                    : Array.ConvertAll(InternalPosition.Split(';'), float.Parse);
            }
            set
            {
                var data = value;
                if (data == null) return;
                InternalPosition = string.Join(";", data);
            }
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public string InternalPreviousPosition { get; set; }
        [NotMapped]
        public float[] PreviousPosition
        {
            get
            {
                return string.IsNullOrWhiteSpace(InternalPreviousPosition)
                    ? new float[0]
                    : Array.ConvertAll(InternalPreviousPosition.Split(';'), float.Parse);
            }
            set
            {
                var data = value;
                if (data == null) return;
                InternalPreviousPosition = string.Join(";", data);
            }
        }

        public float Velocity { get; set; }

        public float PreviousVelocity { get; set; }

        public float TopVelocity { get; set; }

        public int TotalLaps { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Sector Sector { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Sector PreviousSector { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status PreviousStatus { get; set; }

        public string BestLap
        {
            get
            {
                var bestLap = Laps.Where(b => b.Sector3 > 1).OrderBy(b => b.Sector3).FirstOrDefault();
                if (bestLap == null) { return string.Empty; }
                TimeSpan time = TimeSpan.FromSeconds(bestLap.Sector3);
                return time.ToString(@"m\:ss\.fff", CultureInfo.InvariantCulture);
            }
        }

        public float GetBestLapTime
        {
            get
            {
                var bestLap = Laps.Where(b => b.Sector3 > 1).OrderBy(b => b.Sector3).FirstOrDefault();
                if (bestLap == null) { return 9999; }
                return bestLap.Sector3;
            }
        }

        public DateTime LastRefresh { get; set; }

        [NotMapped]
        [JsonIgnore]
        public Session Session { get; set; }

        [JsonIgnore]
        public List<Lap> Laps { get; set; } = new List<Lap>();

        [NotMapped]
        [JsonIgnore]
        public List<Waypoint> Waypoints { get; set; } = new List<Waypoint>();
    }
}
