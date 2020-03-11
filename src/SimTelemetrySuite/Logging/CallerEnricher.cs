using Serilog;
using Serilog.Core;
using Serilog.Events;
using System.Diagnostics;

namespace SimTelemetrySuite.Logging
{
    public class CallerEnricher : ILogEventEnricher
    {
        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            var skip = 3;
            while (true)
            {
                var stack = new StackFrame(skip);
                if (!stack.HasMethod())
                {
                    logEvent.AddPropertyIfAbsent(new LogEventProperty("Caller", new ScalarValue("<unknown method>")));
                    return;
                }

                var method = stack.GetMethod();

                if (method != null && 
                    method.DeclaringType != null && 
                    method.DeclaringType.Assembly != typeof(Log).Assembly)
                {
                    var caller = $"{method.DeclaringType.Name}.{method.Name}";
                    logEvent.AddPropertyIfAbsent(new LogEventProperty("Caller", new ScalarValue(caller)));
                }

                skip++;
            }
        }
    }
}
