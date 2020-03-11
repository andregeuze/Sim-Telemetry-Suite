FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY SimTelemetry.Api/SimTelemetry.Api.csproj SimTelemetry.Api/
RUN dotnet restore SimTelemetry.Api/SimTelemetry.Api.csproj
COPY . .
WORKDIR /src/SimTelemetry.Api
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SimTelemetry.Api.dll"]
