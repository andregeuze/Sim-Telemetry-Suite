using Microsoft.EntityFrameworkCore;
using System;

namespace SimTelemetrySuite.Data
{
    public class TelemetryContext : DbContext
    {
        public TelemetryContext() : base()
        {
        }

        public TelemetryContext(DbContextOptions<TelemetryContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Session>(config =>
            {
                config.Property(e => e.Type).HasConversion(v => v.ToString(), v => (SessionType)Enum.Parse(typeof(SessionType), v));
                config.Property(e => e.Phase).HasConversion(v => v.ToString(), v => (GamePhase)Enum.Parse(typeof(GamePhase), v));
                config.HasIndex(p => p.Name);
            });

            modelBuilder.Entity<Vehicle>(config =>
            {
                config.Property(e => e.Status).HasConversion(v => v.ToString(), v => (Status)Enum.Parse(typeof(Status), v));
                config.Property(e => e.PreviousStatus).HasConversion(v => v.ToString(), v => (Status)Enum.Parse(typeof(Status), v));
                config.Property(e => e.Sector).HasConversion(v => v.ToString(), v => (Sector)Enum.Parse(typeof(Sector), v));
                config.Property(e => e.PreviousSector).HasConversion(v => v.ToString(), v => (Sector)Enum.Parse(typeof(Sector), v));
                config.HasIndex(i => i.DriverName);
            });

            modelBuilder.Entity<Lap>(config =>
            {
                config.Property(e => e.Status).HasConversion(v => v.ToString(), v => (LapStatus)Enum.Parse(typeof(LapStatus), v));
                config.HasIndex(i => i.Number);
            });

            modelBuilder.Entity<Waypoint>(config =>
            {
                config.HasIndex(i => i.Distance);
            });
        }

        public virtual void SetModified(object entity)
        {
            Entry(entity).State = EntityState.Modified;
        }

        public virtual DbSet<Session> Sessions { get; set; }

        public virtual DbSet<Vehicle> Vehicles { get; set; }
    }
}
