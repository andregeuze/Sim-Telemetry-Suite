using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SimTelemetrySuite.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(nullable: false),
                    Phase = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    TrackName = table.Column<string>(nullable: true),
                    TrackDistance = table.Column<float>(nullable: false),
                    Duration = table.Column<float>(nullable: false),
                    CurrentTime = table.Column<float>(nullable: false),
                    Mode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    DriverName = table.Column<string>(nullable: true),
                    IsPlayer = table.Column<int>(nullable: false),
                    Place = table.Column<int>(nullable: false),
                    InternalPosition = table.Column<string>(nullable: true),
                    InternalPreviousPosition = table.Column<string>(nullable: true),
                    Velocity = table.Column<float>(nullable: false),
                    PreviousVelocity = table.Column<float>(nullable: false),
                    TopVelocity = table.Column<float>(nullable: false),
                    TotalLaps = table.Column<int>(nullable: false),
                    Sector = table.Column<string>(nullable: false),
                    PreviousSector = table.Column<string>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    PreviousStatus = table.Column<string>(nullable: false),
                    LastRefresh = table.Column<DateTime>(nullable: false),
                    SessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Waypoint",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InternalX = table.Column<float>(nullable: false),
                    InternalY = table.Column<float>(nullable: false),
                    InternalZ = table.Column<float>(nullable: false),
                    Distance = table.Column<float>(nullable: false),
                    SessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Waypoint", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Waypoint_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Lap",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Number = table.Column<int>(nullable: false),
                    Sector1 = table.Column<float>(nullable: false),
                    Sector2 = table.Column<float>(nullable: false),
                    Sector3 = table.Column<float>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    VehicleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lap_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lap_Number",
                table: "Lap",
                column: "Number");

            migrationBuilder.CreateIndex(
                name: "IX_Lap_VehicleId",
                table: "Lap",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_Name",
                table: "Sessions",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_DriverName",
                table: "Vehicles",
                column: "DriverName");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_SessionId",
                table: "Vehicles",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Waypoint_Distance",
                table: "Waypoint",
                column: "Distance");

            migrationBuilder.CreateIndex(
                name: "IX_Waypoint_SessionId",
                table: "Waypoint",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lap");

            migrationBuilder.DropTable(
                name: "Waypoint");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Sessions");
        }
    }
}
