using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Data
{
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
    public enum GamePhase
    {
        BeforeSessionHasBegun = 0,
        ReconnaissanceLaps = 1,
        GridWalkthrough = 2,
        FormationLap = 3,
        StartingLightCountdownHasBegun = 4,
        GreenFlag = 5,
        FullCourseYellowOrSafetyCar = 6,
        SessionStopped = 7,
        SessionOver = 8,
    }
}
