using Serilog;
using Serilog.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace SimTelemetrySuite.Logging
{
    public static class LoggerCallerEnrichmentConfiguration
    {
        public static LoggerConfiguration WithCaller(this LoggerEnrichmentConfiguration enrichmentConfiguration)
        {
            return enrichmentConfiguration.With<CallerEnricher>();
        }
    }
}
