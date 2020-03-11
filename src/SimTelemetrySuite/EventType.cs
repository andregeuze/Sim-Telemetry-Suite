using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite
{
    public enum EventType
    {
        Unknown,
        TrackStatus,
        Join,
        InLap,
        OutLap,
        FastestLap,
        TrackLayout,
        TrackBounds,
        Welcome,
        Disconnect,
        TimeUpdateSector1,
        TimeUpdateSector2,
        TimeUpdateSector3,
    }
}