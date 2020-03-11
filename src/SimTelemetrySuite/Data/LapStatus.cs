using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Data
{
    public enum LapStatus
    {
        Unknown = 0,
        InLap = 10,
        OutLap = 11,
        Invalidated = 20,
        NewLap = 30,
        Flying = 31,
    }
}
