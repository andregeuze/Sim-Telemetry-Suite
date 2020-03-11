import "foundation-sites/dist/css/foundation.css";
import "./app.css"
import * as signalR from "@aspnet/signalr"
import * as Vue from "vue/dist/vue"

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log(`App running in '${process.env.NODE_ENV}' mode`);
    console.log(process.env);
}

var viewModel, connection

var config = {
    hostUrl: "/hub/telemetry"
}

// Only executed our code once the DOM is ready.
window.onload = function () {

    // Set up the Vue viewmodel
    viewModel = new Vue({
        el: '#app',
        data: {
            trackData: {},
            vehicles: [],
            tenant: "Sim Telemetry Suite Manager",
            environment: process.env.NODE_ENV,
            nickName: "",
            nickNameInput: ""
        },
        methods: {
            ready: function () {
                document.title = "LOL"
            },
            changeNickName: function (event) {
                this.nickName = this.nickNameInput;
                this.nickNameInput = "";

                connection.invoke("SetNickName", this.nickName)
            }
        }
    })

    start()
}

function start() {
    let options = {
        logger: signalR.LogLevel.Debug,
        transport: signalR.HttpTransportType.ServerSentEvents
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl(config.hostUrl, options)
        .build()

    connection.on("Done", connection => {
        console.log("Connected to '" + connection.host + "'")
    })

    connection.on("Fail", connection => {
        console.log("Could not connect to '" + connection.host + "'")
    })

    connection.on("TrackStatus", msg => {
        let message = JSON.parse(msg)

        // Update track data
        message.Vehicles.sort(function (a, b) { return a.Place - b.Place; });
        viewModel.trackData = message;
    })

    connection.start().catch(err => console.error(err.toString()))
}
