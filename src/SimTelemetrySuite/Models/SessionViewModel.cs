using SimTelemetrySuite.Data;
using System;

namespace SimTelemetrySuite.Models
{
    public class SessionViewModel
    {
        public SessionType Type { get; set; }

        public double CurrentTime { get; set; }

        public double Duration { get; set; }

        public string Uptime
        {
            get
            {
                TimeSpan time = TimeSpan.FromSeconds(CurrentTime);

                // Here backslash is must to tell that colon is not the part of format, it just a character that we want in output
                return time.ToString(@"hh\:mm\:ss");
            }
        }
    }
}
