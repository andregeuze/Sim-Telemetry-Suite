using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Data
{
    public interface INamedEntity : IEntity
    {
        string Name { get; set; }
    }
}
