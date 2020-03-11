using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Data
{
    /// <summary>
    /// Session (0=testday 1-4=practice 5-8=qual 9=warmup 10-13=race)
    /// </summary>
    public enum SessionType
    {
        Testday = 0,
        Practice = 1,
        Qualifying = 5,
        Warmup = 9,
        Race = 10,
        Unknown = 999,
    }
}
