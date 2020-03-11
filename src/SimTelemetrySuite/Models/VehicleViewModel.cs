using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SimTelemetrySuite.Data;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace SimTelemetrySuite.Models
{
    public class VehicleViewModel
    {
        public bool Cleanup { get; set; }

        public bool NewLap { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public string DriverName { get; set; }

        public float[] Position { get; set; }

        public float[] PreviousPosition { get; set; }

        public float Velocity { get; set; }

        public float PreviousVelocity { get; set; }

        public float TopVelocity { get; set; }

        public int Place { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Sector Sector { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Sector PreviousSector { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status PreviousStatus { get; set; }

        public int TotalLaps { get; set; }

        [JsonIgnore]
        public List<Lap> Laps { get; } = new List<Lap>();

        public string SpeedKmh
        {
            get
            {
                // * 3.6 for the conversion from m/s to Km/h
                var rawSpeed = Velocity * 3.6f;
                return rawSpeed.ToString("n1", CultureInfo.InvariantCulture);
            }
        }

        public string TopSpeedKmh
        {
            get
            {
                // * 3.6 for the conversion from m/s to Km/h
                var rawSpeed = TopVelocity * 3.6f;
                return rawSpeed.ToString("n1", CultureInfo.InvariantCulture);
            }
        }

        public Lap CurrentLap
        {
            get
            {
                if (Laps.Count == 0) { return null; }
                return Laps.FirstOrDefault(l => l.Number == TotalLaps + 1);
            }
        }

        public Lap LastLap
        {
            get
            {
                if (Laps.Count == 0) { return null; }
                return Laps.FirstOrDefault(l => l.Number == TotalLaps);
            }
        }

        public Lap BestLap
        {
            get
            {
                if (Laps.Count == 0) { return null; }
                return Laps.Aggregate((left, right) => (left.Time < right.Time && left.Time > 1 && right.Time > 1 ? left : right));
            }
        }

        public string BestLapTimeString
        {
            get
            {
                if (BestLap == null) { return string.Empty; }
                return BestLap.TimeString;
            }
        }

        public string LastLapTimeString
        {
            get
            {
                if (LastLap == null) { return string.Empty; }
                return LastLap.TimeString;
            }
        }
    }
}
