using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SimTelemetrySuite.Data;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace SimTelemetrySuite.Models
{
    public class Lap
    {
        public int Number { get; set; }

        public float TimeSector1 { get; set; }

        public float TimeSector2 { get; set; }

        public float Time { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public LapStatus Status { get; set; }

        /// <summary>
        /// Path dictionary, containing the lap distance as key and Position as value
        /// </summary>
        [JsonIgnore]
        public Dictionary<int, float[]> Path { get; } = new Dictionary<int, float[]>();

        public string TimeString
        {
            get
            {
                TimeSpan time = TimeSpan.FromSeconds(Time);

                // Here backslash is must to tell that colon is not the part of format, it just a character that we want in output
                return time.ToString(@"mm\:ss\.fff", CultureInfo.InvariantCulture);
            }
        }
    }
}
