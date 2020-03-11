$projectName = "SimTelemetrySuite"
$project = "$projectName\$projectName.csproj"

dotnet ef migrations script --project $project --startup-project $project --output database\$projectName.migrate.sql --idempotent