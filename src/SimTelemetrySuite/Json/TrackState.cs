using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Json
{
    public class TrackState
    {
        public string application { get; set; }
        public string type { get; set; }
        public string trackName { get; set; }

        /// <summary>
        /// Session (0=testday 1-4=practice 5-8=qual 9=warmup 10-13=race)
        /// </summary>
        public int session { get; set; }
        public int numVehicles { get; set; }
        public float currentET { get; set; }
        public float endET { get; set; }
        public int maxLaps { get; set; }
        public float lapDist { get; set; }

        /// <summary>
        /// Game phases:
        /// 0 Before session has begun
        /// 1 Reconnaissance laps (race only)
        /// 2 Grid walk-through (race only)
        /// 3 Formation lap (race only)
        /// 4 Starting-light countdown has begun (race only)
        /// 5 Green flag
        /// 6 Full course yellow / safety car
        /// 7 Session stopped
        /// 8 Session over
        /// </summary>
        public int gamePhase { get; set; }
        public int yellowFlagState { get; set; }
        public int[] sectorFlags { get; set; }
        public int inRealTime { get; set; }
        public int startLight { get; set; }
        public int numRedLights { get; set; }
        public string playerName { get; set; }
        public string plrFileName { get; set; }
        public float darkCloud { get; set; }
        public float raining { get; set; }
        public float ambientTemp { get; set; }
        public float trackTemp { get; set; }
        public float[] wind { get; set; }
        public float minPathWetness { get; set; }
        public float maxPathWetness { get; set; }
        public VehicleState[] vehicles { get; set; }
    }
}
