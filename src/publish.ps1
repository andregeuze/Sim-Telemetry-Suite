Param(
    $configuration = "Release",
    $selfContained = $True,
    $publishUrl = "$PSScriptRoot\_publish",
    $msbuildCommand = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\MSBuild.exe"
)

# Clean up
if (Test-Path $publishUrl) { Remove-Item $publishUrl -Recurse -Force }

if ($selfContained) {
    # Build the Receiver and Dashboard as self contained deployment
    dotnet publish .\SimTelemetry.Receiver\SimTelemetry.Receiver.csproj -c $configuration -o "$publishUrl\SimTelemetry.Receiver" --self-contained -r win10-x64
    dotnet publish .\SimTelemetry.Api\SimTelemetry.Api.csproj -c $configuration -o "$publishUrl\SimTelemetry.Api" --self-contained -r win10-x64
    dotnet publish .\SimTelemetry.Dashboard\SimTelemetry.Dashboard.csproj -c $configuration -o "$publishUrl\SimTelemetry.Dashboard" --self-contained -r win10-x64
}
else {
    # Build the Receiver and Dashboard as cross platform solution
    dotnet publish .\SimTelemetry.Receiver\SimTelemetry.Receiver.csproj -c $configuration -o "$publishUrl\SimTelemetry.Receiver"
    dotnet publish .\SimTelemetry.Api\SimTelemetry.Api.csproj -c $configuration -o "$publishUrl\SimTelemetry.Api"
    dotnet publish .\SimTelemetry.Dashboard\SimTelemetry.Dashboard.csproj -c $configuration -o "$publishUrl\SimTelemetry.Dashboard"
}

# Build the SimTelemetry.Bridge
. $msbuildCommand .\SimTelemetry.Bridge\rF2\Bridge.rF2.vcxproj /p:configuration=$configuration /p:platform=win32
. $msbuildCommand .\SimTelemetry.Bridge\rF2\Bridge.rF2.vcxproj /p:configuration=$configuration /p:platform=x64
New-Item -ItemType Directory -Path "$publishUrl\SimTelemetry.Bridge" -Force -Verbose
Copy-Item -Path ".\SimTelemetry.Bridge\**\bin\**\$configuration\*.dll" -Destination "$publishUrl\SimTelemetry.Bridge" -Force -Recurse -Verbose