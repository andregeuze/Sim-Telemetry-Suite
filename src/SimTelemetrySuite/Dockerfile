# First stage of multi-stage build
FROM andregeuze/dotnetbuild AS build
WORKDIR /app

# copy the contents of agent working directory on host to workdir in container
COPY . ./

# dotnet commands to build, test, and publish
RUN dotnet restore "SimTelemetrySuite/SimTelemetrySuite.csproj" && \
	dotnet build "SimTelemetrySuite/SimTelemetrySuite.csproj" -c Release -o build && \
	dotnet test "SimTelemetrySuite.Tests/SimTelemetrySuite.Tests.csproj" -c Release --logger "trx;LogFileName=testresults.trx" && \
	dotnet publish "SimTelemetrySuite/SimTelemetrySuite.csproj" -c Release -o publish

# Second stage - Build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build /app/SimTelemetrySuite/publish .
EXPOSE 55001 55002 55003
EXPOSE 44348
ENTRYPOINT ["dotnet", "SimTelemetrySuite.dll"]

FROM microsoft/dotnet:2.1-sdk