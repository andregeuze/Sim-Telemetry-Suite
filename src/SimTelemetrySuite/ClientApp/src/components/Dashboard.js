import React, { Component } from 'react';
import './Dashboard.css';
import * as signalR from "@aspnet/signalr";
import { paper, Group } from "paper";
import * as Toastr from "toastr";
import "toastr/build/toastr.css";

var config = {
    hostUrl: "/telemetry",
    environment: process.env.NODE_ENV
};

if (config.environment && config.environment === "development") {
    console.log(`App running in '${config.environment}' mode`);
}

// Change toastr the settings
Toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

var connection, dragStart, vehicleSymbol, trackLayout, group;
var tempPosition = new paper.Point(10000, 10000);

// var offset = new paper.Point(0, 1000);
var offset = new paper.Point(0, 0);

var viewModel = {
    trackData: {},
    vehicles: []
};

export class Dashboard extends Component {
    canvasElementRef;

    constructor(props) {
        super(props);
        this.canvasElementRef = React.createRef();

        // Bind methods
        //this.incrementCounter = this.incrementCounter.bind(this);
    }

    componentDidMount() {
        // Create an empty project and a view for the canvas:
        paper.setup(this.canvasElementRef.current);

        group = new Group();

        trackLayout = new paper.Path({
            strokeColor: 'lightgrey',
            strokeWidth: 20
        });
        group.addChild(trackLayout);

        // Define content for reuse
        vehicleSymbol = new paper.Path.Circle({
            radius: 5,
            fillColor: 'white'
        });

        // Draw the view now:
        paper.view.onFrame = this.onFrame;
        paper.view.draw();

        // Register events
        this.canvasElementRef.current.addEventListener("mousewheel", this.handleMouseWheel, false);
        this.canvasElementRef.current.addEventListener("mousedown", this.handleMouseDown, false);
        this.canvasElementRef.current.addEventListener("mousemove", this.handleMouseMove, false);
        this.canvasElementRef.current.addEventListener("mouseup", this.handleMouseUp, false);

        this.start();
    }

    start() {
        let options = {
            logger: config.environment === 'development' ? signalR.LogLevel.Debug : signalR.LogLevel.Error
        };

        connection = new signalR.HubConnectionBuilder()
            .withUrl(config.hostUrl, options)
            .build();

        connection.onclose((error) => {
            console.log("Connection closed, let's implement reconnect here.");
        });

        connection.on("Welcome", connection => {
            console.log("Message from the serverside: " + connection);
        });

        connection.on("Done", connection => {
            console.log("Connected to '" + connection.host + "'");
        });

        connection.on("Fail", connection => {
            console.log("Could not connect to '" + connection.host + "'");
        });

        connection.on("TrackBounds", msg => {
            let bounds = msg.split(';')
            console.log("Track Bounds received:");
            console.log(bounds);

            let minX = parseFloat(bounds[0]);
            let minY = parseFloat(bounds[2]);

            if (config.environment === 'development') {
                console.log(`Canvas dimensions: ${this.canvasElementRef.current.clientWidth},${this.canvasElementRef.current.clientHeight}`);
    
                let developmentRectangle = new paper.Path.Rectangle({
                    strokeColor: 'red',
                    strokeWidth: 3,
                    x: minX,
                    y: minY,
                    width: this.canvasElementRef.current.clientWidth,
                    height: this.canvasElementRef.current.clientHeight
                });
                developmentRectangle.sendToBack();
            }

            // var middleX = parseFloat(bounds[1]) - parseFloat(bounds[0])
            // var middleY = parseFloat(bounds[3]) - parseFloat(bounds[2])
            // console.log('track middle: x:' + middleX + ', y:' + middleY)
            // console.log('view center: ' + paper.view.center)

            // var diffX = middleX - paper.view.center.x
            // var diffY = middleY - paper.view.center.y

            // offset = new paper.Point(diffX, diffY)
        });

        connection.on("TrackLayout", msg => {
            let message = JSON.parse(msg);
            console.log("Track Layout received:");
            console.log(message);

            // Clean up the previous layout
            trackLayout.removeSegments();

            // Let's draw a track layout with these coordinates
            message.forEach((waypoint) => {
                let position = waypoint.Position;
                if (!position) { return; }

                let newPoint = new paper.Point(offset.x + parseFloat(position[0]), offset.y - parseFloat(position[2]));
                trackLayout.add(newPoint);
            });

            trackLayout.closePath();
        });

        connection.on("TrackStatus", msg => {
            let message = JSON.parse(msg);

            // Update track data
            message.Vehicles.sort(function (a, b) { return a.Place - b.Place; });
            viewModel.trackData = message;

            // Process the new data
            message.Vehicles.forEach((vehicle) => {

                let position = vehicle.Position;
                if (!position) { return; }
                if (vehicle.Status === 'Disconnected') { return; }

                let existing = viewModel.vehicles.find(x => x.id === vehicle.Id);

                let newPoint = new paper.Point(offset.x + parseFloat(position[0]), offset.y - parseFloat(position[2]));
                let newLabelPoint = new paper.Point(newPoint.x, newPoint.y - 10);

                if (existing) {
                    // update existing raw data
                    existing.raw = vehicle;

                    if (existing.raw.Status !== 'Pit') {
                        existing.path.add(newPoint);
                    }
                    existing.instance.position = newPoint;

                    // Set 'previous' values for comparison in the next loop
                    existing.previousRaw = existing.raw;

                    // Update the name label
                    existing.label.position = newLabelPoint;
                }
                else {
                    //this.handleJoin(msg);
                }
            });

            // Reorder the vehicles for the timing table
            viewModel.vehicles.sort(function (a, b) { return a.raw.Place - b.raw.Place; });
        });

        connection.on("TimeUpdateSector1", msg => {
            let lap = JSON.parse(msg);
            let vehicle = viewModel.vehicles.find(x => x.id === lap.Vehicle.Id);
            if (!vehicle) { return; }

            vehicle.Sector1 = this.getTimeString(parseFloat(lap.Sector1));
            vehicle.Sector3 = "";
            vehicle.path.removeSegments();
        });

        connection.on("TimeUpdateSector2", msg => {
            let lap = JSON.parse(msg);
            let vehicle = viewModel.vehicles.find(x => x.id === lap.Vehicle.Id);
            if (!vehicle) { return; }

            vehicle.Sector2 = this.getTimeString(parseFloat(lap.Sector2) - parseFloat(lap.Sector1));
            vehicle.path.removeSegments();
        });

        connection.on("TimeUpdateSector3", msg => {
            let lap = JSON.parse(msg);
            let vehicle = viewModel.vehicles.find(x => x.id === lap.Vehicle.Id);
            if (!vehicle) { return; }

            vehicle.Sector1 = "";
            vehicle.Sector2 = "";
            vehicle.Sector3 = this.getTimeString(parseFloat(lap.Sector3));
            vehicle.path.removeSegments();
        });

        connection.on("OutLap", msg => {
            let message = JSON.parse(msg);
        });

        connection.on("InLap", msg => {
            let message = JSON.parse(msg);
            let vehicle = viewModel.vehicles.find(x => x.id === message.Id);
            vehicle.path.removeSegments();
        });

        connection.on("Join", msg => {
            this.handleJoin(msg);
        });

        // Cleanup vehicles that are disconnected
        connection.on("Disconnect", msg => {
            let vehicle = JSON.parse(msg);
            var existing = viewModel.vehicles.find(x => x.id === vehicle.Id);
            existing.raw = vehicle;
            existing.instance.remove();
            existing.path.remove();
            existing.label.remove();
        });

        connection.start().catch(err => console.error(err.toString()));
    }

    handleJoin(msg) {
        let vehicle = JSON.parse(msg);
        if (vehicle.Id === 0) { return; }

        console.log(vehicle.DriverName + ' joined');
        console.log(vehicle);

        let newVehiclePath = vehicleSymbol.clone();
        newVehiclePath.fillColor = "blue";
        group.addChild(newVehiclePath);
        newVehiclePath.position = tempPosition;

        var createDriver = false;
        var driver = viewModel.vehicles.find(x => x.id === vehicle.Id);
        if (!driver) {
            console.log('Creating new driver record.');
            driver = {};
            createDriver = true;
        }

        driver.id = vehicle.Id;
        driver.raw = vehicle;
        driver.instance = newVehiclePath;
        driver.path = new paper.Path({
            strokeColor: 'black',
            strokeWidth: 1
        });
        driver.label = new paper.PointText({
            point: tempPosition,
            content: vehicle.DriverName,
            fillColor: 'blue',
            fontSize: 12
        });

        if (createDriver) { viewModel.vehicles.push(driver); }
    }

    getTimeString(float) {
        var date = new Date(null);
        date.setMilliseconds(float * 1000); // specify value for MILLISECONDS here, so float x1000
        return date.toISOString().substr(14, 9);
    }

    handleMouseWheel(event) {
        let minZoom = 0.1;
        let maxZoom = 2.0;
        let zoomModifier = event.deltaY / 10000;
        let newZoom = paper.view.zoom - zoomModifier;

        if (newZoom > maxZoom || newZoom < minZoom) {
            return;
        }

        paper.view.zoom -= zoomModifier;
    }

    handleMouseDown(event) {
        dragStart = new paper.Point(event.clientX, event.clientY);
    }

    handleMouseUp(event) {
        dragStart = null;
    }

    handleMouseMove(event) {
        if (!dragStart) {
            return;
        }
        let delta = new paper.Point(event.movementX, event.movementY);
        paper.view.translate(delta);
    }

    render() {
        return (
            <canvas id="myCanvas" ref={this.canvasElementRef} data-paper-resize></canvas>
        );
    }
}
