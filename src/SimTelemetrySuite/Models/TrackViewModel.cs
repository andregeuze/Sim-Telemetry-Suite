using System.Collections.Generic;

namespace SimTelemetrySuite.Models
{
    public class TrackViewModel
    {
        public string Name { get; set; }

        public float Distance { get; set; }

        public int Phase { get; set; }

        public string SectorFlags { get; set; }

        public SessionViewModel Session { get; set; }

        public List<VehicleViewModel> Vehicles { get; set; } = new List<VehicleViewModel>();
    }
}
