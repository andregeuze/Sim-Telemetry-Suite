using Newtonsoft.Json;

namespace SimTelemetry.Api.Models
{
    public class Driver
    {
        public string Name { get; set; }

        public Lap[] Laps { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }
    }
}
