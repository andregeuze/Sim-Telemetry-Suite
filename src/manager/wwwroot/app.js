(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("app.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
"use strict";
exports.__esModule = true;
require("foundation-sites/dist/css/foundation.css");
require("./app.css");
var signalR = require("@aspnet/signalr");
var Vue = require("vue/dist/vue");
if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("App running in '" + process.env.NODE_ENV + "' mode");
    console.log(process.env);
}
var viewModel, connection;
var config = {
    hostUrl: "/hub/telemetry"
};
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
                document.title = "LOL";
            },
            changeNickName: function (event) {
                this.nickName = this.nickNameInput;
                this.nickNameInput = "";
                connection.invoke("SetNickName", this.nickName);
            }
        }
    });
    start();
};
function start() {
    var options = {
        logger: signalR.LogLevel.Debug,
        transport: signalR.HttpTransportType.ServerSentEvents
    };
    connection = new signalR.HubConnectionBuilder()
        .withUrl(config.hostUrl, options)
        .build();
    connection.on("Done", function (connection) {
        console.log("Connected to '" + connection.host + "'");
    });
    connection.on("Fail", function (connection) {
        console.log("Could not connect to '" + connection.host + "'");
    });
    connection.on("TrackStatus", function (msg) {
        var message = JSON.parse(msg);
        // Update track data
        message.Vehicles.sort(function (a, b) { return a.Place - b.Place; });
        viewModel.trackData = message;
    });
    connection.start()["catch"](function (err) { return console.error(err.toString()); });
}

});
___scope___.file("app.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("default/app.css", "body {\r\n    padding: 0;\r\n    margin: 0;\r\n    overflow: hidden;\r\n    user-select: none;\r\n}\r\n\r\ncanvas[resize] {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n#resizer {\r\n    cursor: col-resize;\r\n    width: 1px;\r\n    background: grey;\r\n}\r\n\r\n#app {\r\n    font-size: 0.75em;\r\n}\r\n\r\n#sidebar {\r\n    width: 400px;\r\n}\r\n\r\ntr.pit {\r\n    color: darkgray;\r\n}\r\n\r\ntr.driving {\r\n    color: inherit;\r\n}\r\n\r\n.staging {\r\n    border-bottom: 5px solid deepskyblue;\r\n}\r\n\r\n.development, .menu {\r\n    font-size: 1.5em;\r\n    background: #ff5800 !important;\r\n    color: white;\r\n}")
});
return ___scope___.entry = "app.js";
});
FuseBox.pkg("@aspnet/signalr", {}, function(___scope___){
___scope___.file("dist/cjs/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
exports.VERSION = "1.0.3";
var Errors_1 = require("./Errors");
exports.HttpError = Errors_1.HttpError;
exports.TimeoutError = Errors_1.TimeoutError;
var HttpClient_1 = require("./HttpClient");
exports.DefaultHttpClient = HttpClient_1.DefaultHttpClient;
exports.HttpClient = HttpClient_1.HttpClient;
exports.HttpResponse = HttpClient_1.HttpResponse;
var HubConnection_1 = require("./HubConnection");
exports.HubConnection = HubConnection_1.HubConnection;
var HubConnectionBuilder_1 = require("./HubConnectionBuilder");
exports.HubConnectionBuilder = HubConnectionBuilder_1.HubConnectionBuilder;
var IHubProtocol_1 = require("./IHubProtocol");
exports.MessageType = IHubProtocol_1.MessageType;
var ILogger_1 = require("./ILogger");
exports.LogLevel = ILogger_1.LogLevel;
var ITransport_1 = require("./ITransport");
exports.HttpTransportType = ITransport_1.HttpTransportType;
exports.TransferFormat = ITransport_1.TransferFormat;
var Loggers_1 = require("./Loggers");
exports.NullLogger = Loggers_1.NullLogger;
var JsonHubProtocol_1 = require("./JsonHubProtocol");
exports.JsonHubProtocol = JsonHubProtocol_1.JsonHubProtocol;
//# sourceMappingURL=index.js.map
});
___scope___.file("dist/cjs/Errors.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    tslib_1.__extends(HttpError, _super);
    /** Constructs a new instance of {@link HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    tslib_1.__extends(TimeoutError, _super);
    /** Constructs a new instance of {@link TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=Errors.js.map
});
___scope___.file("dist/cjs/HttpClient.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Errors_1 = require("./Errors");
var ILogger_1 = require("./ILogger");
/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(tslib_1.__assign({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(tslib_1.__assign({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(tslib_1.__assign({}, options, { method: "DELETE", url: url }));
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
/** Default implementation of {@link HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultHttpClient, _super);
    /** Creates a new instance of the {@link DefaultHttpClient}, using the provided {@link ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            if (request.headers) {
                Object.keys(request.headers)
                    .forEach(function (header) { return xhr.setRequestHeader(header, request.headers[header]); });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new Errors_1.HttpError(xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(ILogger_1.LogLevel.Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText);
                reject(new Errors_1.HttpError(xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(ILogger_1.LogLevel.Warning, "Timeout from HTTP request.");
                reject(new Errors_1.TimeoutError());
            };
            xhr.send(request.content || "");
        });
    };
    return DefaultHttpClient;
}(HttpClient));
exports.DefaultHttpClient = DefaultHttpClient;
//# sourceMappingURL=HttpClient.js.map
});
___scope___.file("dist/cjs/ILogger.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=ILogger.js.map
});
___scope___.file("dist/cjs/HubConnection.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var stream = require("stream").Stream;
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HandshakeProtocol_1 = require("./HandshakeProtocol");
var IHubProtocol_1 = require("./IHubProtocol");
var ILogger_1 = require("./ILogger");
var Utils_1 = require("./Utils");
var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol) {
        var _this = this;
        Utils_1.Arg.isRequired(connection, "connection");
        Utils_1.Arg.isRequired(logger, "logger");
        Utils_1.Arg.isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.handshakeProtocol = new HandshakeProtocol_1.HandshakeProtocol();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.id = 0;
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol) {
        return new HubConnection(connection, logger, protocol);
    };
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var handshakeRequest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(ILogger_1.LogLevel.Debug, "Starting HubConnection.");
                        this.receivedHandshakeResponse = false;
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.connection.send(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 2:
                        _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.configureTimeout();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        this.logger.log(ILogger_1.LogLevel.Debug, "Stopping HubConnection.");
        this.cleanupTimeout();
        return this.connection.stop();
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createStreamInvocation(methodName, args);
        var subject = new Utils_1.Subject(function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            var cancelMessage = _this.protocol.writeMessage(cancelInvocation);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return _this.connection.send(cancelMessage);
        });
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            if (invocationEvent.type === IHubProtocol_1.MessageType.Completion) {
                if (invocationEvent.error) {
                    subject.error(new Error(invocationEvent.error));
                }
                else {
                    subject.complete();
                }
            }
            else {
                subject.next((invocationEvent.item));
            }
        };
        var message = this.protocol.writeMessage(invocationDescriptor);
        this.connection.send(message)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        return subject;
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, true);
        var message = this.protocol.writeMessage(invocationDescriptor);
        return this.connection.send(message);
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var invocationDescriptor = this.createInvocation(methodName, args, false);
        var p = new Promise(function (resolve, reject) {
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                if (invocationEvent.type === IHubProtocol_1.MessageType.Completion) {
                    var completionMessage = invocationEvent;
                    if (completionMessage.error) {
                        reject(new Error(completionMessage.error));
                    }
                    else {
                        resolve(completionMessage.result);
                    }
                }
                else {
                    reject(new Error("Unexpected message type: " + invocationEvent.type));
                }
            };
            var message = _this.protocol.writeMessage(invocationDescriptor);
            _this.connection.send(message)
                .catch(function (e) {
                reject(e);
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case IHubProtocol_1.MessageType.Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case IHubProtocol_1.MessageType.StreamItem:
                    case IHubProtocol_1.MessageType.Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback != null) {
                            if (message.type === IHubProtocol_1.MessageType.Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case IHubProtocol_1.MessageType.Ping:
                        // Don't care about pings
                        break;
                    case IHubProtocol_1.MessageType.Close:
                        this.logger.log(ILogger_1.LogLevel.Information, "Close message received from server.");
                        this.connection.stop(message.error ? new Error("Server returned an error on close: " + message.error) : null);
                        break;
                    default:
                        this.logger.log(ILogger_1.LogLevel.Warning, "Invalid message type: " + message.type);
                        break;
                }
            }
        }
        this.configureTimeout();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(ILogger_1.LogLevel.Error, message);
            var error = new Error(message);
            this.connection.stop(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(ILogger_1.LogLevel.Error, message);
            this.connection.stop(new Error(message));
        }
        else {
            this.logger.log(ILogger_1.LogLevel.Debug, "Server handshake complete.");
        }
        return remainingData;
        var _a;
    };
    HubConnection.prototype.configureTimeout = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(ILogger_1.LogLevel.Error, message);
                this.connection.stop(new Error(message));
            }
        }
        else {
            this.logger.log(ILogger_1.LogLevel.Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        var _this = this;
        var callbacks = this.callbacks;
        this.callbacks = {};
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(undefined, error ? error : new Error("Invocation canceled due to connection being closed."));
        });
        this.cleanupTimeout();
        this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking) {
        if (nonblocking) {
            return {
                arguments: args,
                target: methodName,
                type: IHubProtocol_1.MessageType.Invocation,
            };
        }
        else {
            var id = this.id;
            this.id++;
            return {
                arguments: args,
                invocationId: id.toString(),
                target: methodName,
                type: IHubProtocol_1.MessageType.Invocation,
            };
        }
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args) {
        var id = this.id;
        this.id++;
        return {
            arguments: args,
            invocationId: id.toString(),
            target: methodName,
            type: IHubProtocol_1.MessageType.StreamInvocation,
        };
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: IHubProtocol_1.MessageType.CancelInvocation,
        };
    };
    return HubConnection;
}());
exports.HubConnection = HubConnection;
//# sourceMappingURL=HubConnection.js.map
});
___scope___.file("dist/cjs/HandshakeProtocol.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var TextMessageFormat_1 = require("./TextMessageFormat");
var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return TextMessageFormat_1.TextMessageFormat.write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if (data instanceof ArrayBuffer) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(TextMessageFormat_1.TextMessageFormat.RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(TextMessageFormat_1.TextMessageFormat.RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = TextMessageFormat_1.TextMessageFormat.parse(messageData);
        responseMessage = JSON.parse(messages[0]);
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());
exports.HandshakeProtocol = HandshakeProtocol;
//# sourceMappingURL=HandshakeProtocol.js.map
});
___scope___.file("dist/cjs/TextMessageFormat.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// Not exported from index
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());
exports.TextMessageFormat = TextMessageFormat;
//# sourceMappingURL=TextMessageFormat.js.map
});
___scope___.file("dist/cjs/IHubProtocol.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map
});
___scope___.file("dist/cjs/Utils.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ILogger_1 = require("./ILogger");
var Loggers_1 = require("./Loggers");
var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());
exports.Arg = Arg;
function getDataDetail(data, includeContent) {
    var length = null;
    if (data instanceof ArrayBuffer) {
        length = "Binary data of length " + data.byteLength;
        if (includeContent) {
            length += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        length = "String data of length " + data.length;
        if (includeContent) {
            length += ". Content: '" + data + "'.";
        }
    }
    return length;
}
exports.getDataDetail = getDataDetail;
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
exports.formatArrayBuffer = formatArrayBuffer;
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var headers, token, response, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _b.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    logger.log(ILogger_1.LogLevel.Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: headers,
                        })];
                case 2:
                    response = _b.sent();
                    logger.log(ILogger_1.LogLevel.Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendMessage = sendMessage;
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(ILogger_1.LogLevel.Information);
    }
    if (logger === null) {
        return Loggers_1.NullLogger.instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
exports.createLogger = createLogger;
var Subject = /** @class */ (function () {
    function Subject(cancelCallback) {
        this.observers = [];
        this.cancelCallback = cancelCallback;
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new SubjectSubscription(this, observer);
    };
    return Subject;
}());
exports.Subject = Subject;
var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());
exports.SubjectSubscription = SubjectSubscription;
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case ILogger_1.LogLevel.Critical:
                case ILogger_1.LogLevel.Error:
                    console.error(ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                case ILogger_1.LogLevel.Warning:
                    console.warn(ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                case ILogger_1.LogLevel.Information:
                    console.info(ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    console.log(ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=Utils.js.map
});
___scope___.file("dist/cjs/Loggers.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    NullLogger.prototype.log = function (logLevel, message) {
    };
    /** The singleton instance of the {@link NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());
exports.NullLogger = NullLogger;
//# sourceMappingURL=Loggers.js.map
});
___scope___.file("dist/cjs/HubConnectionBuilder.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var HttpConnection_1 = require("./HttpConnection");
var HubConnection_1 = require("./HubConnection");
var JsonHubProtocol_1 = require("./JsonHubProtocol");
var Loggers_1 = require("./Loggers");
var Utils_1 = require("./Utils");
/** A builder for configuring {@link HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        Utils_1.Arg.isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else {
            this.logger = new Utils_1.ConsoleLogger(logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        Utils_1.Arg.isRequired(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = transportTypeOrOptions;
        }
        else {
            this.httpConnectionOptions = {
                transport: transportTypeOrOptions,
            };
        }
        return this;
    };
    /** Configures the {@link HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        Utils_1.Arg.isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    /** Creates a {@link HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new HttpConnection_1.HttpConnection(this.url, httpConnectionOptions);
        return HubConnection_1.HubConnection.create(connection, this.logger || Loggers_1.NullLogger.instance, this.protocol || new JsonHubProtocol_1.JsonHubProtocol());
    };
    return HubConnectionBuilder;
}());
exports.HubConnectionBuilder = HubConnectionBuilder;
function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map
});
___scope___.file("dist/cjs/HttpConnection.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpClient_1 = require("./HttpClient");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var LongPollingTransport_1 = require("./LongPollingTransport");
var ServerSentEventsTransport_1 = require("./ServerSentEventsTransport");
var Utils_1 = require("./Utils");
var WebSocketTransport_1 = require("./WebSocketTransport");
var MAX_REDIRECTS = 100;
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.features = {};
        Utils_1.Arg.isRequired(url, "url");
        this.logger = Utils_1.createLogger(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.accessTokenFactory = options.accessTokenFactory || (function () { return null; });
        options.logMessageContent = options.logMessageContent || false;
        this.httpClient = options.httpClient || new HttpClient_1.DefaultHttpClient(this.logger);
        this.connectionState = 2 /* Disconnected */;
        this.options = options;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        transferFormat = transferFormat || ITransport_1.TransferFormat.Binary;
        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
        this.logger.log(ILogger_1.LogLevel.Debug, "Starting connection with transfer format '" + ITransport_1.TransferFormat[transferFormat] + "'.");
        if (this.connectionState !== 2 /* Disconnected */) {
            return Promise.reject(new Error("Cannot start a connection that is not in the 'Disconnected' state."));
        }
        this.connectionState = 0 /* Connecting */;
        this.startPromise = this.startInternal(transferFormat);
        return this.startPromise;
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== 1 /* Connected */) {
            throw new Error("Cannot send data if the connection is not in the 'Connected' State.");
        }
        return this.transport.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connectionState = 2 /* Disconnected */;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 6];
                        this.stopError = error;
                        return [4 /*yield*/, this.transport.stop()];
                    case 5:
                        _a.sent();
                        this.transport = null;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var url, negotiateResponse, redirects, _loop_1, this_1, state_1, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === ITransport_1.HttpTransportType.WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(ITransport_1.HttpTransportType.WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.transport.connect(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === 2 /* Disconnected */) {
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof LongPollingTransport_1.LongPollingTransport) {
                            this.features.inherentKeepAlive = true;
                        }
                        this.transport.onreceive = this.onreceive;
                        this.transport.onclose = function (e) { return _this.stopConnection(e); };
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to start the connection: " + e_2);
                        this.connectionState = 2 /* Disconnected */;
                        this.transport = null;
                        throw e_2;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, headers, negotiateUrl, response, e_3, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers = (_a = {},
                                _a["Authorization"] = "Bearer " + token,
                                _a);
                        }
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(ILogger_1.LogLevel.Debug, "Sending negotiation request: " + negotiateUrl);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: headers,
                            })];
                    case 3:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            throw Error("Unexpected status code returned from negotiate " + response.statusCode);
                        }
                        return [2 /*return*/, JSON.parse(response.content)];
                    case 4:
                        e_3 = _b.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to complete negotiation with the server: " + e_3);
                        throw e_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionId) {
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionId);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var connectUrl, transports, _i, transports_1, endpoint, transport, ex_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(ILogger_1.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        // only change the state if we were connecting to not overwrite
                        // the state if the connection is already marked as Disconnected
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 2:
                        transports = negotiateResponse.availableTransports;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 9];
                        endpoint = transports_1[_i];
                        this.connectionState = 0 /* Connecting */;
                        transport = this.resolveTransport(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(typeof transport === "number")) return [3 /*break*/, 8];
                        this.transport = this.constructTransport(transport);
                        if (!(negotiateResponse.connectionId === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 4:
                        negotiateResponse = _a.sent();
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionId);
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.connect(connectUrl, requestedTransferFormat)];
                    case 6:
                        _a.sent();
                        this.changeState(0 /* Connecting */, 1 /* Connected */);
                        return [2 /*return*/];
                    case 7:
                        ex_1 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to start the transport '" + ITransport_1.HttpTransportType[transport] + "': " + ex_1);
                        this.connectionState = 2 /* Disconnected */;
                        negotiateResponse.connectionId = null;
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9: throw new Error("Unable to initialize any of the available transports.");
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case ITransport_1.HttpTransportType.WebSockets:
                return new WebSocketTransport_1.WebSocketTransport(this.accessTokenFactory, this.logger, this.options.logMessageContent);
            case ITransport_1.HttpTransportType.ServerSentEvents:
                return new ServerSentEventsTransport_1.ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent);
            case ITransport_1.HttpTransportType.LongPolling:
                return new LongPollingTransport_1.LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent);
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.resolveTransport = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = ITransport_1.HttpTransportType[endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            var transferFormats = endpoint.transferFormats.map(function (s) { return ITransport_1.TransferFormat[s]; });
            if (transportMatches(requestedTransport, transport)) {
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === ITransport_1.HttpTransportType.WebSockets && typeof WebSocket === "undefined") ||
                        (transport === ITransport_1.HttpTransportType.ServerSentEvents && typeof EventSource === "undefined")) {
                        this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it is not supported in your environment.'");
                    }
                    else {
                        this.logger.log(ILogger_1.LogLevel.Debug, "Selecting transport '" + ITransport_1.HttpTransportType[transport] + "'");
                        return transport;
                    }
                }
                else {
                    this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it does not support the requested transfer format '" + ITransport_1.TransferFormat[requestedTransferFormat] + "'.");
                }
            }
            else {
                this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it was disabled by the client.");
            }
        }
        return null;
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.changeState = function (from, to) {
        if (this.connectionState === from) {
            this.connectionState = to;
            return true;
        }
        return false;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.transport = null;
                // If we have a stopError, it takes precedence over the error from the transport
                error = this.stopError || error;
                if (error) {
                    this.logger.log(ILogger_1.LogLevel.Error, "Connection disconnected with error '" + error + "'.");
                }
                else {
                    this.logger.log(ILogger_1.LogLevel.Information, "Connection disconnected.");
                }
                this.connectionState = 2 /* Disconnected */;
                if (this.onclose) {
                    this.onclose(error);
                }
                return [2 /*return*/];
            });
        });
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (typeof window === "undefined" || !window || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative  path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(ILogger_1.LogLevel.Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        return negotiateUrl;
    };
    return HttpConnection;
}());
exports.HttpConnection = HttpConnection;
function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
//# sourceMappingURL=HttpConnection.js.map
});
___scope___.file("dist/cjs/ITransport.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType = exports.HttpTransportType || (exports.HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat = exports.TransferFormat || (exports.TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map
});
___scope___.file("dist/cjs/LongPollingTransport.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AbortController_1 = require("./AbortController");
var Errors_1 = require("./Errors");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
var SHUTDOWN_TIMEOUT = 5 * 1000;
// Not exported from 'index', this type is internal.
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, shutdownTimeout) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logger = logger;
        this.pollAbort = new AbortController_1.AbortController();
        this.logMessageContent = logMessageContent;
        this.shutdownTimeout = shutdownTimeout || SHUTDOWN_TIMEOUT;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pollOptions, token, closeError, pollUrl, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        this.url = url;
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Connecting");
                        if (transferFormat === ITransport_1.TransferFormat.Binary && (typeof new XMLHttpRequest().responseType !== "string")) {
                            // This will work if we fix: https://github.com/aspnet/SignalR/issues/742
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: {},
                            timeout: 90000,
                        };
                        if (transferFormat === ITransport_1.TransferFormat.Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl);
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _a.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(ILogger_1.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode);
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            closeError = new Errors_1.HttpError(response.statusText, response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.poll(this.url, pollOptions, closeError);
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions, closeError) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl);
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(ILogger_1.LogLevel.Information, "(LongPolling transport) Poll terminated by server");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(ILogger_1.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode);
                            // Unexpected status code
                            closeError = new Errors_1.HttpError(response.statusText, response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) data received. " + Utils_1.getDataDetail(response.content, this.logMessageContent));
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after we were stopped by DELETE
                            this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof Errors_1.TimeoutError) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        // Indicate that we've stopped so the shutdown timer doesn't get registered.
                        this.stopped = true;
                        // Clean up the shutdown timer if it was registered
                        if (this.shutdownTimer) {
                            clearTimeout(this.shutdownTimer);
                        }
                        // Fire our onclosed event
                        if (this.onclose) {
                            this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Firing onclose event. Error: " + (closeError || "<undefined>"));
                            this.onclose(closeError);
                        }
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Transport finished.");
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Utils_1.sendMessage(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var deleteOptions, token, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 3, 4]);
                        this.running = false;
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        deleteOptions = {
                            headers: {},
                        };
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 2:
                        response = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) DELETE request accepted.");
                        return [3 /*break*/, 4];
                    case 3:
                        // Abort the poll after the shutdown timeout if the server doesn't stop the poll.
                        if (!this.stopped) {
                            this.shutdownTimer = setTimeout(function () {
                                _this.logger.log(ILogger_1.LogLevel.Warning, "(LongPolling transport) server did not terminate after DELETE request, canceling poll.");
                                // Abort any outstanding poll
                                _this.pollAbort.abort();
                            }, this.shutdownTimeout);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LongPollingTransport;
}());
exports.LongPollingTransport = LongPollingTransport;
//# sourceMappingURL=LongPollingTransport.js.map
});
___scope___.file("dist/cjs/AbortController.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());
exports.AbortController = AbortController;
//# sourceMappingURL=AbortController.js.map
});
___scope___.file("dist/cjs/ServerSentEventsTransport.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logger = logger;
        this.logMessageContent = logMessageContent;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        if (typeof (EventSource) === "undefined") {
                            throw new Error("'EventSource' is not supported in your environment.");
                        }
                        this.logger.log(ILogger_1.LogLevel.Trace, "(SSE transport) Connecting");
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        this.url = url;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var opened = false;
                                if (transferFormat !== ITransport_1.TransferFormat.Text) {
                                    reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                }
                                var eventSource = new EventSource(url, { withCredentials: true });
                                try {
                                    eventSource.onmessage = function (e) {
                                        if (_this.onreceive) {
                                            try {
                                                _this.logger.log(ILogger_1.LogLevel.Trace, "(SSE transport) data received. " + Utils_1.getDataDetail(e.data, _this.logMessageContent) + ".");
                                                _this.onreceive(e.data);
                                            }
                                            catch (error) {
                                                if (_this.onclose) {
                                                    _this.onclose(error);
                                                }
                                                return;
                                            }
                                        }
                                    };
                                    eventSource.onerror = function (e) {
                                        var error = new Error(e.message || "Error occurred");
                                        if (opened) {
                                            _this.close(error);
                                        }
                                        else {
                                            reject(error);
                                        }
                                    };
                                    eventSource.onopen = function () {
                                        _this.logger.log(ILogger_1.LogLevel.Information, "SSE connected to " + _this.url);
                                        _this.eventSource = eventSource;
                                        opened = true;
                                        resolve();
                                    };
                                }
                                catch (e) {
                                    return Promise.reject(e);
                                }
                            })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Utils_1.sendMessage(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());
exports.ServerSentEventsTransport = ServerSentEventsTransport;
//# sourceMappingURL=ServerSentEventsTransport.js.map
});
___scope___.file("dist/cjs/WebSocketTransport.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(accessTokenFactory, logger, logMessageContent) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory || (function () { return null; });
        this.logMessageContent = logMessageContent;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        if (typeof (WebSocket) === "undefined") {
                            throw new Error("'WebSocket' is not supported in your environment.");
                        }
                        this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) Connecting");
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                url = url.replace(/^http/, "ws");
                                var webSocket = new WebSocket(url);
                                if (transferFormat === ITransport_1.TransferFormat.Binary) {
                                    webSocket.binaryType = "arraybuffer";
                                }
                                webSocket.onopen = function (event) {
                                    _this.logger.log(ILogger_1.LogLevel.Information, "WebSocket connected to " + url);
                                    _this.webSocket = webSocket;
                                    resolve();
                                };
                                webSocket.onerror = function (event) {
                                    reject(event.error);
                                };
                                webSocket.onmessage = function (message) {
                                    _this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) data received. " + Utils_1.getDataDetail(message.data, _this.logMessageContent) + ".");
                                    if (_this.onreceive) {
                                        _this.onreceive(message.data);
                                    }
                                };
                                webSocket.onclose = function (event) {
                                    // webSocket will be null if the transport did not start successfully
                                    _this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) socket closed.");
                                    if (_this.onclose) {
                                        if (event.wasClean === false || event.code !== 1000) {
                                            _this.onclose(new Error("Websocket closed with status code: " + event.code + " (" + event.reason + ")"));
                                        }
                                        else {
                                            _this.onclose();
                                        }
                                    }
                                };
                            })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) sending data. " + Utils_1.getDataDetail(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
        }
        return Promise.resolve();
    };
    return WebSocketTransport;
}());
exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
});
___scope___.file("dist/cjs/JsonHubProtocol.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var IHubProtocol_1 = require("./IHubProtocol");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Loggers_1 = require("./Loggers");
var TextMessageFormat_1 = require("./TextMessageFormat");
var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = ITransport_1.TransferFormat.Text;
    }
    /** Creates an array of {@link HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = Loggers_1.NullLogger.instance;
        }
        // Parse the messages
        var messages = TextMessageFormat_1.TextMessageFormat.parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case IHubProtocol_1.MessageType.Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.Ping:
                    // Single value, no need to validate
                    break;
                case IHubProtocol_1.MessageType.Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(ILogger_1.LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return TextMessageFormat_1.TextMessageFormat.write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());
exports.JsonHubProtocol = JsonHubProtocol;
//# sourceMappingURL=JsonHubProtocol.js.map
});
return ___scope___.entry = "dist/cjs/index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
	module.exports = global.require("events");
} else {
	function EventEmitter() {
		this._events = this._events || {};
		this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
		if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
		this._maxListeners = n;
		return this;
	};

	EventEmitter.prototype.emit = function(type) {
		var er, handler, len, args, i, listeners;

		if (!this._events) this._events = {};

		// If there is no 'error' event listener then throw.
		if (type === "error") {
			if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
				er = arguments[1];
				if (er instanceof Error) {
					throw er; // Unhandled 'error' event
				}
				throw TypeError('Uncaught, unspecified "error" event.');
			}
		}

		handler = this._events[type];

		if (isUndefined(handler)) return false;

		if (isFunction(handler)) {
			switch (arguments.length) {
				// fast cases
				case 1:
					handler.call(this);
					break;
				case 2:
					handler.call(this, arguments[1]);
					break;
				case 3:
					handler.call(this, arguments[1], arguments[2]);
					break;
				// slower
				default:
					args = Array.prototype.slice.call(arguments, 1);
					handler.apply(this, args);
			}
		} else if (isObject(handler)) {
			args = Array.prototype.slice.call(arguments, 1);
			listeners = handler.slice();
			len = listeners.length;
			for (i = 0; i < len; i++) listeners[i].apply(this, args);
		}

		return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
		var m;

		if (!isFunction(listener)) throw TypeError("listener must be a function");

		if (!this._events) this._events = {};

		// To avoid recursion in the case that type === "newListener"! Before
		// adding it to the listeners, first emit "newListener".
		if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);

		if (!this._events[type])
			// Optimize the case of one listener. Don't need the extra array object.
			this._events[type] = listener;
		else if (isObject(this._events[type]))
			// If we've already got an array, just append.
			this._events[type].push(listener);
		// Adding the second element, need to change to array.
		else this._events[type] = [this._events[type], listener];

		// Check for listener leak
		if (isObject(this._events[type]) && !this._events[type].warned) {
			if (!isUndefined(this._maxListeners)) {
				m = this._maxListeners;
			} else {
				m = EventEmitter.defaultMaxListeners;
			}

			if (m && m > 0 && this._events[type].length > m) {
				this._events[type].warned = true;
				console.error(
					"(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.",
					this._events[type].length
				);
				if (typeof console.trace === "function") {
					// not supported in IE 10
					console.trace();
				}
			}
		}

		return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
		if (!isFunction(listener)) throw TypeError("listener must be a function");

		var fired = false;

		function g() {
			this.removeListener(type, g);

			if (!fired) {
				fired = true;
				listener.apply(this, arguments);
			}
		}

		g.listener = listener;
		this.on(type, g);

		return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
		var list, position, length, i;

		if (!isFunction(listener)) throw TypeError("listener must be a function");

		if (!this._events || !this._events[type]) return this;

		list = this._events[type];
		length = list.length;
		position = -1;

		if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
			delete this._events[type];
			if (this._events.removeListener) this.emit("removeListener", type, listener);
		} else if (isObject(list)) {
			for (i = length; i-- > 0; ) {
				if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
					position = i;
					break;
				}
			}

			if (position < 0) return this;

			if (list.length === 1) {
				list.length = 0;
				delete this._events[type];
			} else {
				list.splice(position, 1);
			}

			if (this._events.removeListener) this.emit("removeListener", type, listener);
		}

		return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
		var key, listeners;

		if (!this._events) return this;

		// not listening for removeListener, no need to emit
		if (!this._events.removeListener) {
			if (arguments.length === 0) this._events = {};
			else if (this._events[type]) delete this._events[type];
			return this;
		}

		// emit removeListener for all listeners on all events
		if (arguments.length === 0) {
			for (key in this._events) {
				if (key === "removeListener") continue;
				this.removeAllListeners(key);
			}
			this.removeAllListeners("removeListener");
			this._events = {};
			return this;
		}

		listeners = this._events[type];

		if (isFunction(listeners)) {
			this.removeListener(type, listeners);
		} else if (listeners) {
			// LIFO order
			while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
		}
		delete this._events[type];

		return this;
	};

	EventEmitter.prototype.listeners = function(type) {
		var ret;
		if (!this._events || !this._events[type]) ret = [];
		else if (isFunction(this._events[type])) ret = [this._events[type]];
		else ret = this._events[type].slice();
		return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
		if (this._events) {
			var evlistener = this._events[type];

			if (isFunction(evlistener)) return 1;
			else if (evlistener) return evlistener.length;
		}
		return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
		return emitter.listenerCount(type);
	};

	function isFunction(arg) {
		return typeof arg === "function";
	}

	function isNumber(arg) {
		return typeof arg === "number";
	}

	function isObject(arg) {
		return typeof arg === "object" && arg !== null;
	}

	function isUndefined(arg) {
		return arg === void 0;
	}
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("foundation-sites", {}, function(___scope___){
___scope___.file("dist/css/foundation.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("foundation-sites/dist/css/foundation.css", "@charset \"UTF-8\";\n/**\n * Foundation for Sites by ZURB\n * Version 6.5.0-rc.3\n * foundation.zurb.com\n * Licensed under MIT Open Source\n */\n@media print, screen and (min-width: 40em) {\n  .reveal, .reveal.tiny, .reveal.small, .reveal.large {\n    right: auto;\n    left: auto;\n    margin: 0 auto; } }\n\n/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\nimg {\n  border-style: none; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n.foundation-mq {\n  font-family: \"small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em\"; }\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 100%; }\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: #fefefe;\n  font-family: \"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #0a0a0a;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\nimg {\n  display: inline-block;\n  vertical-align: middle;\n  max-width: 100%;\n  height: auto;\n  -ms-interpolation-mode: bicubic; }\n\ntextarea {\n  height: auto;\n  min-height: 50px;\n  border-radius: 0; }\n\nselect {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  border-radius: 0; }\n\n.map_canvas img,\n.map_canvas embed,\n.map_canvas object,\n.mqa-display img,\n.mqa-display embed,\n.mqa-display object {\n  max-width: none !important; }\n\nbutton {\n  padding: 0;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  line-height: 1;\n  cursor: auto; }\n  [data-whatinput='mouse'] button {\n    outline: 0; }\n\npre {\n  overflow: auto; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; }\n\n.is-visible {\n  display: block !important; }\n\n.is-hidden {\n  display: none !important; }\n\n[type='text'], [type='password'], [type='date'], [type='datetime'], [type='datetime-local'], [type='month'], [type='week'], [type='email'], [type='number'], [type='search'], [type='tel'], [type='time'], [type='url'], [type='color'],\ntextarea {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 2.4375rem;\n  margin: 0 0 1rem;\n  padding: 0.5rem;\n  border: 1px solid #cacaca;\n  border-radius: 0;\n  background-color: #fefefe;\n  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  font-family: inherit;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #0a0a0a;\n  -webkit-transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n  transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\n  [type='text']:focus, [type='password']:focus, [type='date']:focus, [type='datetime']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='week']:focus, [type='email']:focus, [type='number']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='url']:focus, [type='color']:focus,\n  textarea:focus {\n    outline: none;\n    border: 1px solid #8a8a8a;\n    background-color: #fefefe;\n    -webkit-box-shadow: 0 0 5px #cacaca;\n            box-shadow: 0 0 5px #cacaca;\n    -webkit-transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n    transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n    transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n    transition: box-shadow 0.5s, border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s; }\n\ntextarea {\n  max-width: 100%; }\n  textarea[rows] {\n    height: auto; }\n\ninput:disabled, input[readonly],\ntextarea:disabled,\ntextarea[readonly] {\n  background-color: #e6e6e6;\n  cursor: not-allowed; }\n\n[type='submit'],\n[type='button'] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border-radius: 0; }\n\ninput[type='search'] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\n::-webkit-input-placeholder {\n  color: #cacaca; }\n\n:-ms-input-placeholder {\n  color: #cacaca; }\n\n::-ms-input-placeholder {\n  color: #cacaca; }\n\n::placeholder {\n  color: #cacaca; }\n\n[type='file'],\n[type='checkbox'],\n[type='radio'] {\n  margin: 0 0 1rem; }\n\n[type='checkbox'] + label,\n[type='radio'] + label {\n  display: inline-block;\n  vertical-align: baseline;\n  margin-left: 0.5rem;\n  margin-right: 1rem;\n  margin-bottom: 0; }\n  [type='checkbox'] + label[for],\n  [type='radio'] + label[for] {\n    cursor: pointer; }\n\nlabel > [type='checkbox'],\nlabel > [type='radio'] {\n  margin-right: 0.5rem; }\n\n[type='file'] {\n  width: 100%; }\n\nlabel {\n  display: block;\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: normal;\n  line-height: 1.8;\n  color: #0a0a0a; }\n  label.middle {\n    margin: 0 0 1rem;\n    padding: 0.5625rem 0; }\n\n.help-text {\n  margin-top: -0.5rem;\n  font-size: 0.8125rem;\n  font-style: italic;\n  color: #0a0a0a; }\n\n.input-group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  margin-bottom: 1rem;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  .input-group > :first-child, .input-group > :first-child.input-group-button > * {\n    border-radius: 0 0 0 0; }\n  .input-group > :last-child, .input-group > :last-child.input-group-button > * {\n    border-radius: 0 0 0 0; }\n\n.input-group-label, .input-group-field, .input-group-button, .input-group-button a,\n.input-group-button input,\n.input-group-button button,\n.input-group-button label {\n  margin: 0;\n  white-space: nowrap; }\n\n.input-group-label {\n  padding: 0 1rem;\n  border: 1px solid #cacaca;\n  background: #e6e6e6;\n  color: #0a0a0a;\n  text-align: center;\n  white-space: nowrap;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .input-group-label:first-child {\n    border-right: 0; }\n  .input-group-label:last-child {\n    border-left: 0; }\n\n.input-group-field {\n  border-radius: 0;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0px;\n      -ms-flex: 1 1 0px;\n          flex: 1 1 0px;\n  min-width: 0; }\n\n.input-group-button {\n  padding-top: 0;\n  padding-bottom: 0;\n  text-align: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto; }\n  .input-group-button a,\n  .input-group-button input,\n  .input-group-button button,\n  .input-group-button label {\n    -webkit-align-self: stretch;\n        -ms-flex-item-align: stretch;\n            align-self: stretch;\n    height: auto;\n    padding-top: 0;\n    padding-bottom: 0;\n    font-size: 1rem; }\n\nfieldset {\n  margin: 0;\n  padding: 0;\n  border: 0; }\n\nlegend {\n  max-width: 100%;\n  margin-bottom: 0.5rem; }\n\n.fieldset {\n  margin: 1.125rem 0;\n  padding: 1.25rem;\n  border: 1px solid #cacaca; }\n  .fieldset legend {\n    margin: 0;\n    margin-left: -0.1875rem;\n    padding: 0 0.1875rem; }\n\nselect {\n  height: 2.4375rem;\n  margin: 0 0 1rem;\n  padding: 0.5rem;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border: 1px solid #cacaca;\n  border-radius: 0;\n  background-color: #fefefe;\n  font-family: inherit;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #0a0a0a;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>\");\n  background-origin: content-box;\n  background-position: right -1rem center;\n  background-repeat: no-repeat;\n  background-size: 9px 6px;\n  padding-right: 1.5rem;\n  -webkit-transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n  transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n  transition: box-shadow 0.5s, border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s; }\n  @media screen and (min-width: 0\\0) {\n    select {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIpJREFUeNrEkckNgDAMBBfRkEt0ObRBBdsGXUDgmQfK4XhH2m8czQAAy27R3tsw4Qfe2x8uOO6oYLb6GlOor3GF+swURAOmUJ+RwtEJs9WvTGEYxBXqI1MQAZhCfUQKRzDMVj+TwrAIV6jvSUEkYAr1LSkcyTBb/V+KYfX7xAeusq3sLDtGH3kEGACPWIflNZfhRQAAAABJRU5ErkJggg==\"); } }\n  select:focus {\n    outline: none;\n    border: 1px solid #8a8a8a;\n    background-color: #fefefe;\n    -webkit-box-shadow: 0 0 5px #cacaca;\n            box-shadow: 0 0 5px #cacaca;\n    -webkit-transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n    transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;\n    transition: box-shadow 0.5s, border-color 0.25s ease-in-out;\n    transition: box-shadow 0.5s, border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s; }\n  select:disabled {\n    background-color: #e6e6e6;\n    cursor: not-allowed; }\n  select::-ms-expand {\n    display: none; }\n  select[multiple] {\n    height: auto;\n    background-image: none; }\n\n.is-invalid-input:not(:focus) {\n  border-color: #cc4b37;\n  background-color: #f9ecea; }\n  .is-invalid-input:not(:focus)::-webkit-input-placeholder {\n    color: #cc4b37; }\n  .is-invalid-input:not(:focus):-ms-input-placeholder {\n    color: #cc4b37; }\n  .is-invalid-input:not(:focus)::-ms-input-placeholder {\n    color: #cc4b37; }\n  .is-invalid-input:not(:focus)::placeholder {\n    color: #cc4b37; }\n\n.is-invalid-label {\n  color: #cc4b37; }\n\n.form-error {\n  display: none;\n  margin-top: -0.5rem;\n  margin-bottom: 1rem;\n  font-size: 0.75rem;\n  font-weight: bold;\n  color: #cc4b37; }\n  .form-error.is-visible {\n    display: block; }\n\ndiv,\ndl,\ndt,\ndd,\nul,\nol,\nli,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\npre,\nform,\np,\nblockquote,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\np {\n  margin-bottom: 1rem;\n  font-size: inherit;\n  line-height: 1.6;\n  text-rendering: optimizeLegibility; }\n\nem,\ni {\n  font-style: italic;\n  line-height: inherit; }\n\nstrong,\nb {\n  font-weight: bold;\n  line-height: inherit; }\n\nsmall {\n  font-size: 80%;\n  line-height: inherit; }\n\nh1, .h1,\nh2, .h2,\nh3, .h3,\nh4, .h4,\nh5, .h5,\nh6, .h6 {\n  font-family: \"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  color: inherit;\n  text-rendering: optimizeLegibility; }\n  h1 small, .h1 small,\n  h2 small, .h2 small,\n  h3 small, .h3 small,\n  h4 small, .h4 small,\n  h5 small, .h5 small,\n  h6 small, .h6 small {\n    line-height: 0;\n    color: #cacaca; }\n\nh1, .h1 {\n  font-size: 1.5rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\nh2, .h2 {\n  font-size: 1.25rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\nh3, .h3 {\n  font-size: 1.1875rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\nh4, .h4 {\n  font-size: 1.125rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\nh5, .h5 {\n  font-size: 1.0625rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\nh6, .h6 {\n  font-size: 1rem;\n  line-height: 1.4;\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\n@media print, screen and (min-width: 40em) {\n  h1, .h1 {\n    font-size: 3rem; }\n  h2, .h2 {\n    font-size: 2.5rem; }\n  h3, .h3 {\n    font-size: 1.9375rem; }\n  h4, .h4 {\n    font-size: 1.5625rem; }\n  h5, .h5 {\n    font-size: 1.25rem; }\n  h6, .h6 {\n    font-size: 1rem; } }\n\na {\n  line-height: inherit;\n  color: #1779ba;\n  text-decoration: none;\n  cursor: pointer; }\n  a:hover, a:focus {\n    color: #1468a0; }\n  a img {\n    border: 0; }\n\nhr {\n  clear: both;\n  max-width: 75rem;\n  height: 0;\n  margin: 1.25rem auto;\n  border-top: 0;\n  border-right: 0;\n  border-bottom: 1px solid #cacaca;\n  border-left: 0; }\n\nul,\nol,\ndl {\n  margin-bottom: 1rem;\n  list-style-position: outside;\n  line-height: 1.6; }\n\nli {\n  font-size: inherit; }\n\nul {\n  margin-left: 1.25rem;\n  list-style-type: disc; }\n\nol {\n  margin-left: 1.25rem; }\n\nul ul, ol ul, ul ol, ol ol {\n  margin-left: 1.25rem;\n  margin-bottom: 0; }\n\ndl {\n  margin-bottom: 1rem; }\n  dl dt {\n    margin-bottom: 0.3rem;\n    font-weight: bold; }\n\nblockquote {\n  margin: 0 0 1rem;\n  padding: 0.5625rem 1.25rem 0 1.1875rem;\n  border-left: 1px solid #cacaca; }\n  blockquote, blockquote p {\n    line-height: 1.6;\n    color: #8a8a8a; }\n\ncite {\n  display: block;\n  font-size: 0.8125rem;\n  color: #8a8a8a; }\n  cite:before {\n    content: \"— \"; }\n\nabbr, abbr[title] {\n  border-bottom: 1px dotted #0a0a0a;\n  cursor: help;\n  text-decoration: none; }\n\nfigure {\n  margin: 0; }\n\ncode {\n  padding: 0.125rem 0.3125rem 0.0625rem;\n  border: 1px solid #cacaca;\n  background-color: #e6e6e6;\n  font-family: Consolas, \"Liberation Mono\", Courier, monospace;\n  font-weight: normal;\n  color: #0a0a0a; }\n\nkbd {\n  margin: 0;\n  padding: 0.125rem 0.25rem 0;\n  background-color: #e6e6e6;\n  font-family: Consolas, \"Liberation Mono\", Courier, monospace;\n  color: #0a0a0a; }\n\n.subheader {\n  margin-top: 0.2rem;\n  margin-bottom: 0.5rem;\n  font-weight: normal;\n  line-height: 1.4;\n  color: #8a8a8a; }\n\n.lead {\n  font-size: 125%;\n  line-height: 1.6; }\n\n.stat {\n  font-size: 2.5rem;\n  line-height: 1; }\n  p + .stat {\n    margin-top: -1rem; }\n\nul.no-bullet, ol.no-bullet {\n  margin-left: 0;\n  list-style: none; }\n\n.text-left {\n  text-align: left; }\n\n.text-right {\n  text-align: right; }\n\n.text-center {\n  text-align: center; }\n\n.text-justify {\n  text-align: justify; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-text-left {\n    text-align: left; }\n  .medium-text-right {\n    text-align: right; }\n  .medium-text-center {\n    text-align: center; }\n  .medium-text-justify {\n    text-align: justify; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-text-left {\n    text-align: left; }\n  .large-text-right {\n    text-align: right; }\n  .large-text-center {\n    text-align: center; }\n  .large-text-justify {\n    text-align: justify; } }\n\n.show-for-print {\n  display: none !important; }\n\n@media print {\n  * {\n    background: transparent !important;\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    color: black !important;\n    text-shadow: none !important; }\n  .show-for-print {\n    display: block !important; }\n  .hide-for-print {\n    display: none !important; }\n  table.show-for-print {\n    display: table !important; }\n  thead.show-for-print {\n    display: table-header-group !important; }\n  tbody.show-for-print {\n    display: table-row-group !important; }\n  tr.show-for-print {\n    display: table-row !important; }\n  td.show-for-print {\n    display: table-cell !important; }\n  th.show-for-print {\n    display: table-cell !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  a[href]:after {\n    content: \" (\" attr(href) \")\"; }\n  .ir a:after,\n  a[href^='javascript:']:after,\n  a[href^='#']:after {\n    content: ''; }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\"; }\n  pre,\n  blockquote {\n    border: 1px solid #8a8a8a;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  @page {\n    margin: 0.5cm; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .print-break-inside {\n    page-break-inside: auto; } }\n\n.grid-container {\n  padding-right: 0.625rem;\n  padding-left: 0.625rem;\n  max-width: 75rem;\n  margin: 0 auto; }\n  @media print, screen and (min-width: 40em) {\n    .grid-container {\n      padding-right: 0.9375rem;\n      padding-left: 0.9375rem; } }\n  .grid-container.fluid {\n    padding-right: 0.625rem;\n    padding-left: 0.625rem;\n    max-width: 100%;\n    margin: 0 auto; }\n    @media print, screen and (min-width: 40em) {\n      .grid-container.fluid {\n        padding-right: 0.9375rem;\n        padding-left: 0.9375rem; } }\n  .grid-container.full {\n    padding-right: 0;\n    padding-left: 0;\n    max-width: 100%;\n    margin: 0 auto; }\n\n.grid-x {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-flow: row wrap;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap; }\n\n.cell {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  min-height: 0px;\n  min-width: 0px;\n  width: 100%; }\n  .cell.auto {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px; }\n  .cell.shrink {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto; }\n\n.grid-x > .auto {\n  width: auto; }\n\n.grid-x > .shrink {\n  width: auto; }\n\n.grid-x > .small-shrink, .grid-x > .small-full, .grid-x > .small-1, .grid-x > .small-2, .grid-x > .small-3, .grid-x > .small-4, .grid-x > .small-5, .grid-x > .small-6, .grid-x > .small-7, .grid-x > .small-8, .grid-x > .small-9, .grid-x > .small-10, .grid-x > .small-11, .grid-x > .small-12 {\n  -webkit-flex-basis: auto;\n      -ms-flex-preferred-size: auto;\n          flex-basis: auto; }\n\n@media print, screen and (min-width: 40em) {\n  .grid-x > .medium-shrink, .grid-x > .medium-full, .grid-x > .medium-1, .grid-x > .medium-2, .grid-x > .medium-3, .grid-x > .medium-4, .grid-x > .medium-5, .grid-x > .medium-6, .grid-x > .medium-7, .grid-x > .medium-8, .grid-x > .medium-9, .grid-x > .medium-10, .grid-x > .medium-11, .grid-x > .medium-12 {\n    -webkit-flex-basis: auto;\n        -ms-flex-preferred-size: auto;\n            flex-basis: auto; } }\n\n@media print, screen and (min-width: 64em) {\n  .grid-x > .large-shrink, .grid-x > .large-full, .grid-x > .large-1, .grid-x > .large-2, .grid-x > .large-3, .grid-x > .large-4, .grid-x > .large-5, .grid-x > .large-6, .grid-x > .large-7, .grid-x > .large-8, .grid-x > .large-9, .grid-x > .large-10, .grid-x > .large-11, .grid-x > .large-12 {\n    -webkit-flex-basis: auto;\n        -ms-flex-preferred-size: auto;\n            flex-basis: auto; } }\n\n.grid-x > .small-1, .grid-x > .small-2, .grid-x > .small-3, .grid-x > .small-4, .grid-x > .small-5, .grid-x > .small-6, .grid-x > .small-7, .grid-x > .small-8, .grid-x > .small-9, .grid-x > .small-10, .grid-x > .small-11, .grid-x > .small-12 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto; }\n\n.grid-x > .small-1 {\n  width: 8.33333%; }\n\n.grid-x > .small-2 {\n  width: 16.66667%; }\n\n.grid-x > .small-3 {\n  width: 25%; }\n\n.grid-x > .small-4 {\n  width: 33.33333%; }\n\n.grid-x > .small-5 {\n  width: 41.66667%; }\n\n.grid-x > .small-6 {\n  width: 50%; }\n\n.grid-x > .small-7 {\n  width: 58.33333%; }\n\n.grid-x > .small-8 {\n  width: 66.66667%; }\n\n.grid-x > .small-9 {\n  width: 75%; }\n\n.grid-x > .small-10 {\n  width: 83.33333%; }\n\n.grid-x > .small-11 {\n  width: 91.66667%; }\n\n.grid-x > .small-12 {\n  width: 100%; }\n\n@media print, screen and (min-width: 40em) {\n  .grid-x > .medium-auto {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px;\n    width: auto; }\n  .grid-x > .medium-shrink, .grid-x > .medium-1, .grid-x > .medium-2, .grid-x > .medium-3, .grid-x > .medium-4, .grid-x > .medium-5, .grid-x > .medium-6, .grid-x > .medium-7, .grid-x > .medium-8, .grid-x > .medium-9, .grid-x > .medium-10, .grid-x > .medium-11, .grid-x > .medium-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto; }\n  .grid-x > .medium-shrink {\n    width: auto; }\n  .grid-x > .medium-1 {\n    width: 8.33333%; }\n  .grid-x > .medium-2 {\n    width: 16.66667%; }\n  .grid-x > .medium-3 {\n    width: 25%; }\n  .grid-x > .medium-4 {\n    width: 33.33333%; }\n  .grid-x > .medium-5 {\n    width: 41.66667%; }\n  .grid-x > .medium-6 {\n    width: 50%; }\n  .grid-x > .medium-7 {\n    width: 58.33333%; }\n  .grid-x > .medium-8 {\n    width: 66.66667%; }\n  .grid-x > .medium-9 {\n    width: 75%; }\n  .grid-x > .medium-10 {\n    width: 83.33333%; }\n  .grid-x > .medium-11 {\n    width: 91.66667%; }\n  .grid-x > .medium-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .grid-x > .large-auto {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px;\n    width: auto; }\n  .grid-x > .large-shrink, .grid-x > .large-1, .grid-x > .large-2, .grid-x > .large-3, .grid-x > .large-4, .grid-x > .large-5, .grid-x > .large-6, .grid-x > .large-7, .grid-x > .large-8, .grid-x > .large-9, .grid-x > .large-10, .grid-x > .large-11, .grid-x > .large-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto; }\n  .grid-x > .large-shrink {\n    width: auto; }\n  .grid-x > .large-1 {\n    width: 8.33333%; }\n  .grid-x > .large-2 {\n    width: 16.66667%; }\n  .grid-x > .large-3 {\n    width: 25%; }\n  .grid-x > .large-4 {\n    width: 33.33333%; }\n  .grid-x > .large-5 {\n    width: 41.66667%; }\n  .grid-x > .large-6 {\n    width: 50%; }\n  .grid-x > .large-7 {\n    width: 58.33333%; }\n  .grid-x > .large-8 {\n    width: 66.66667%; }\n  .grid-x > .large-9 {\n    width: 75%; }\n  .grid-x > .large-10 {\n    width: 83.33333%; }\n  .grid-x > .large-11 {\n    width: 91.66667%; }\n  .grid-x > .large-12 {\n    width: 100%; } }\n\n.grid-margin-x:not(.grid-x) > .cell {\n  width: auto; }\n\n.grid-margin-y:not(.grid-y) > .cell {\n  height: auto; }\n\n.grid-margin-x {\n  margin-left: -0.625rem;\n  margin-right: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-x {\n      margin-left: -0.9375rem;\n      margin-right: -0.9375rem; } }\n  .grid-margin-x > .cell {\n    width: calc(100% - 1.25rem);\n    margin-left: 0.625rem;\n    margin-right: 0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-x > .cell {\n      width: calc(100% - 1.875rem);\n      margin-left: 0.9375rem;\n      margin-right: 0.9375rem; } }\n  .grid-margin-x > .auto {\n    width: auto; }\n  .grid-margin-x > .shrink {\n    width: auto; }\n  .grid-margin-x > .small-1 {\n    width: calc(8.33333% - 1.25rem); }\n  .grid-margin-x > .small-2 {\n    width: calc(16.66667% - 1.25rem); }\n  .grid-margin-x > .small-3 {\n    width: calc(25% - 1.25rem); }\n  .grid-margin-x > .small-4 {\n    width: calc(33.33333% - 1.25rem); }\n  .grid-margin-x > .small-5 {\n    width: calc(41.66667% - 1.25rem); }\n  .grid-margin-x > .small-6 {\n    width: calc(50% - 1.25rem); }\n  .grid-margin-x > .small-7 {\n    width: calc(58.33333% - 1.25rem); }\n  .grid-margin-x > .small-8 {\n    width: calc(66.66667% - 1.25rem); }\n  .grid-margin-x > .small-9 {\n    width: calc(75% - 1.25rem); }\n  .grid-margin-x > .small-10 {\n    width: calc(83.33333% - 1.25rem); }\n  .grid-margin-x > .small-11 {\n    width: calc(91.66667% - 1.25rem); }\n  .grid-margin-x > .small-12 {\n    width: calc(100% - 1.25rem); }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-x > .auto {\n      width: auto; }\n    .grid-margin-x > .shrink {\n      width: auto; }\n    .grid-margin-x > .small-1 {\n      width: calc(8.33333% - 1.875rem); }\n    .grid-margin-x > .small-2 {\n      width: calc(16.66667% - 1.875rem); }\n    .grid-margin-x > .small-3 {\n      width: calc(25% - 1.875rem); }\n    .grid-margin-x > .small-4 {\n      width: calc(33.33333% - 1.875rem); }\n    .grid-margin-x > .small-5 {\n      width: calc(41.66667% - 1.875rem); }\n    .grid-margin-x > .small-6 {\n      width: calc(50% - 1.875rem); }\n    .grid-margin-x > .small-7 {\n      width: calc(58.33333% - 1.875rem); }\n    .grid-margin-x > .small-8 {\n      width: calc(66.66667% - 1.875rem); }\n    .grid-margin-x > .small-9 {\n      width: calc(75% - 1.875rem); }\n    .grid-margin-x > .small-10 {\n      width: calc(83.33333% - 1.875rem); }\n    .grid-margin-x > .small-11 {\n      width: calc(91.66667% - 1.875rem); }\n    .grid-margin-x > .small-12 {\n      width: calc(100% - 1.875rem); }\n    .grid-margin-x > .medium-auto {\n      width: auto; }\n    .grid-margin-x > .medium-shrink {\n      width: auto; }\n    .grid-margin-x > .medium-1 {\n      width: calc(8.33333% - 1.875rem); }\n    .grid-margin-x > .medium-2 {\n      width: calc(16.66667% - 1.875rem); }\n    .grid-margin-x > .medium-3 {\n      width: calc(25% - 1.875rem); }\n    .grid-margin-x > .medium-4 {\n      width: calc(33.33333% - 1.875rem); }\n    .grid-margin-x > .medium-5 {\n      width: calc(41.66667% - 1.875rem); }\n    .grid-margin-x > .medium-6 {\n      width: calc(50% - 1.875rem); }\n    .grid-margin-x > .medium-7 {\n      width: calc(58.33333% - 1.875rem); }\n    .grid-margin-x > .medium-8 {\n      width: calc(66.66667% - 1.875rem); }\n    .grid-margin-x > .medium-9 {\n      width: calc(75% - 1.875rem); }\n    .grid-margin-x > .medium-10 {\n      width: calc(83.33333% - 1.875rem); }\n    .grid-margin-x > .medium-11 {\n      width: calc(91.66667% - 1.875rem); }\n    .grid-margin-x > .medium-12 {\n      width: calc(100% - 1.875rem); } }\n  @media print, screen and (min-width: 64em) {\n    .grid-margin-x > .large-auto {\n      width: auto; }\n    .grid-margin-x > .large-shrink {\n      width: auto; }\n    .grid-margin-x > .large-1 {\n      width: calc(8.33333% - 1.875rem); }\n    .grid-margin-x > .large-2 {\n      width: calc(16.66667% - 1.875rem); }\n    .grid-margin-x > .large-3 {\n      width: calc(25% - 1.875rem); }\n    .grid-margin-x > .large-4 {\n      width: calc(33.33333% - 1.875rem); }\n    .grid-margin-x > .large-5 {\n      width: calc(41.66667% - 1.875rem); }\n    .grid-margin-x > .large-6 {\n      width: calc(50% - 1.875rem); }\n    .grid-margin-x > .large-7 {\n      width: calc(58.33333% - 1.875rem); }\n    .grid-margin-x > .large-8 {\n      width: calc(66.66667% - 1.875rem); }\n    .grid-margin-x > .large-9 {\n      width: calc(75% - 1.875rem); }\n    .grid-margin-x > .large-10 {\n      width: calc(83.33333% - 1.875rem); }\n    .grid-margin-x > .large-11 {\n      width: calc(91.66667% - 1.875rem); }\n    .grid-margin-x > .large-12 {\n      width: calc(100% - 1.875rem); } }\n\n.grid-padding-x .grid-padding-x {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-padding-x .grid-padding-x {\n      margin-right: -0.9375rem;\n      margin-left: -0.9375rem; } }\n\n.grid-container:not(.full) > .grid-padding-x {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-container:not(.full) > .grid-padding-x {\n      margin-right: -0.9375rem;\n      margin-left: -0.9375rem; } }\n\n.grid-padding-x > .cell {\n  padding-right: 0.625rem;\n  padding-left: 0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-padding-x > .cell {\n      padding-right: 0.9375rem;\n      padding-left: 0.9375rem; } }\n\n.small-up-1 > .cell {\n  width: 100%; }\n\n.small-up-2 > .cell {\n  width: 50%; }\n\n.small-up-3 > .cell {\n  width: 33.33333%; }\n\n.small-up-4 > .cell {\n  width: 25%; }\n\n.small-up-5 > .cell {\n  width: 20%; }\n\n.small-up-6 > .cell {\n  width: 16.66667%; }\n\n.small-up-7 > .cell {\n  width: 14.28571%; }\n\n.small-up-8 > .cell {\n  width: 12.5%; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-up-1 > .cell {\n    width: 100%; }\n  .medium-up-2 > .cell {\n    width: 50%; }\n  .medium-up-3 > .cell {\n    width: 33.33333%; }\n  .medium-up-4 > .cell {\n    width: 25%; }\n  .medium-up-5 > .cell {\n    width: 20%; }\n  .medium-up-6 > .cell {\n    width: 16.66667%; }\n  .medium-up-7 > .cell {\n    width: 14.28571%; }\n  .medium-up-8 > .cell {\n    width: 12.5%; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-up-1 > .cell {\n    width: 100%; }\n  .large-up-2 > .cell {\n    width: 50%; }\n  .large-up-3 > .cell {\n    width: 33.33333%; }\n  .large-up-4 > .cell {\n    width: 25%; }\n  .large-up-5 > .cell {\n    width: 20%; }\n  .large-up-6 > .cell {\n    width: 16.66667%; }\n  .large-up-7 > .cell {\n    width: 14.28571%; }\n  .large-up-8 > .cell {\n    width: 12.5%; } }\n\n.grid-margin-x.small-up-1 > .cell {\n  width: calc(100% - 1.25rem); }\n\n.grid-margin-x.small-up-2 > .cell {\n  width: calc(50% - 1.25rem); }\n\n.grid-margin-x.small-up-3 > .cell {\n  width: calc(33.33333% - 1.25rem); }\n\n.grid-margin-x.small-up-4 > .cell {\n  width: calc(25% - 1.25rem); }\n\n.grid-margin-x.small-up-5 > .cell {\n  width: calc(20% - 1.25rem); }\n\n.grid-margin-x.small-up-6 > .cell {\n  width: calc(16.66667% - 1.25rem); }\n\n.grid-margin-x.small-up-7 > .cell {\n  width: calc(14.28571% - 1.25rem); }\n\n.grid-margin-x.small-up-8 > .cell {\n  width: calc(12.5% - 1.25rem); }\n\n@media print, screen and (min-width: 40em) {\n  .grid-margin-x.small-up-1 > .cell {\n    width: calc(100% - 1.875rem); }\n  .grid-margin-x.small-up-2 > .cell {\n    width: calc(50% - 1.875rem); }\n  .grid-margin-x.small-up-3 > .cell {\n    width: calc(33.33333% - 1.875rem); }\n  .grid-margin-x.small-up-4 > .cell {\n    width: calc(25% - 1.875rem); }\n  .grid-margin-x.small-up-5 > .cell {\n    width: calc(20% - 1.875rem); }\n  .grid-margin-x.small-up-6 > .cell {\n    width: calc(16.66667% - 1.875rem); }\n  .grid-margin-x.small-up-7 > .cell {\n    width: calc(14.28571% - 1.875rem); }\n  .grid-margin-x.small-up-8 > .cell {\n    width: calc(12.5% - 1.875rem); }\n  .grid-margin-x.medium-up-1 > .cell {\n    width: calc(100% - 1.875rem); }\n  .grid-margin-x.medium-up-2 > .cell {\n    width: calc(50% - 1.875rem); }\n  .grid-margin-x.medium-up-3 > .cell {\n    width: calc(33.33333% - 1.875rem); }\n  .grid-margin-x.medium-up-4 > .cell {\n    width: calc(25% - 1.875rem); }\n  .grid-margin-x.medium-up-5 > .cell {\n    width: calc(20% - 1.875rem); }\n  .grid-margin-x.medium-up-6 > .cell {\n    width: calc(16.66667% - 1.875rem); }\n  .grid-margin-x.medium-up-7 > .cell {\n    width: calc(14.28571% - 1.875rem); }\n  .grid-margin-x.medium-up-8 > .cell {\n    width: calc(12.5% - 1.875rem); } }\n\n@media print, screen and (min-width: 64em) {\n  .grid-margin-x.large-up-1 > .cell {\n    width: calc(100% - 1.875rem); }\n  .grid-margin-x.large-up-2 > .cell {\n    width: calc(50% - 1.875rem); }\n  .grid-margin-x.large-up-3 > .cell {\n    width: calc(33.33333% - 1.875rem); }\n  .grid-margin-x.large-up-4 > .cell {\n    width: calc(25% - 1.875rem); }\n  .grid-margin-x.large-up-5 > .cell {\n    width: calc(20% - 1.875rem); }\n  .grid-margin-x.large-up-6 > .cell {\n    width: calc(16.66667% - 1.875rem); }\n  .grid-margin-x.large-up-7 > .cell {\n    width: calc(14.28571% - 1.875rem); }\n  .grid-margin-x.large-up-8 > .cell {\n    width: calc(12.5% - 1.875rem); } }\n\n.small-margin-collapse {\n  margin-right: 0;\n  margin-left: 0; }\n  .small-margin-collapse > .cell {\n    margin-right: 0;\n    margin-left: 0; }\n  .small-margin-collapse > .small-1 {\n    width: 8.33333%; }\n  .small-margin-collapse > .small-2 {\n    width: 16.66667%; }\n  .small-margin-collapse > .small-3 {\n    width: 25%; }\n  .small-margin-collapse > .small-4 {\n    width: 33.33333%; }\n  .small-margin-collapse > .small-5 {\n    width: 41.66667%; }\n  .small-margin-collapse > .small-6 {\n    width: 50%; }\n  .small-margin-collapse > .small-7 {\n    width: 58.33333%; }\n  .small-margin-collapse > .small-8 {\n    width: 66.66667%; }\n  .small-margin-collapse > .small-9 {\n    width: 75%; }\n  .small-margin-collapse > .small-10 {\n    width: 83.33333%; }\n  .small-margin-collapse > .small-11 {\n    width: 91.66667%; }\n  .small-margin-collapse > .small-12 {\n    width: 100%; }\n  @media print, screen and (min-width: 40em) {\n    .small-margin-collapse > .medium-1 {\n      width: 8.33333%; }\n    .small-margin-collapse > .medium-2 {\n      width: 16.66667%; }\n    .small-margin-collapse > .medium-3 {\n      width: 25%; }\n    .small-margin-collapse > .medium-4 {\n      width: 33.33333%; }\n    .small-margin-collapse > .medium-5 {\n      width: 41.66667%; }\n    .small-margin-collapse > .medium-6 {\n      width: 50%; }\n    .small-margin-collapse > .medium-7 {\n      width: 58.33333%; }\n    .small-margin-collapse > .medium-8 {\n      width: 66.66667%; }\n    .small-margin-collapse > .medium-9 {\n      width: 75%; }\n    .small-margin-collapse > .medium-10 {\n      width: 83.33333%; }\n    .small-margin-collapse > .medium-11 {\n      width: 91.66667%; }\n    .small-margin-collapse > .medium-12 {\n      width: 100%; } }\n  @media print, screen and (min-width: 64em) {\n    .small-margin-collapse > .large-1 {\n      width: 8.33333%; }\n    .small-margin-collapse > .large-2 {\n      width: 16.66667%; }\n    .small-margin-collapse > .large-3 {\n      width: 25%; }\n    .small-margin-collapse > .large-4 {\n      width: 33.33333%; }\n    .small-margin-collapse > .large-5 {\n      width: 41.66667%; }\n    .small-margin-collapse > .large-6 {\n      width: 50%; }\n    .small-margin-collapse > .large-7 {\n      width: 58.33333%; }\n    .small-margin-collapse > .large-8 {\n      width: 66.66667%; }\n    .small-margin-collapse > .large-9 {\n      width: 75%; }\n    .small-margin-collapse > .large-10 {\n      width: 83.33333%; }\n    .small-margin-collapse > .large-11 {\n      width: 91.66667%; }\n    .small-margin-collapse > .large-12 {\n      width: 100%; } }\n\n.small-padding-collapse {\n  margin-right: 0;\n  margin-left: 0; }\n  .small-padding-collapse > .cell {\n    padding-right: 0;\n    padding-left: 0; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-margin-collapse {\n    margin-right: 0;\n    margin-left: 0; }\n    .medium-margin-collapse > .cell {\n      margin-right: 0;\n      margin-left: 0; } }\n\n@media print, screen and (min-width: 40em) {\n  .medium-margin-collapse > .small-1 {\n    width: 8.33333%; }\n  .medium-margin-collapse > .small-2 {\n    width: 16.66667%; }\n  .medium-margin-collapse > .small-3 {\n    width: 25%; }\n  .medium-margin-collapse > .small-4 {\n    width: 33.33333%; }\n  .medium-margin-collapse > .small-5 {\n    width: 41.66667%; }\n  .medium-margin-collapse > .small-6 {\n    width: 50%; }\n  .medium-margin-collapse > .small-7 {\n    width: 58.33333%; }\n  .medium-margin-collapse > .small-8 {\n    width: 66.66667%; }\n  .medium-margin-collapse > .small-9 {\n    width: 75%; }\n  .medium-margin-collapse > .small-10 {\n    width: 83.33333%; }\n  .medium-margin-collapse > .small-11 {\n    width: 91.66667%; }\n  .medium-margin-collapse > .small-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 40em) {\n  .medium-margin-collapse > .medium-1 {\n    width: 8.33333%; }\n  .medium-margin-collapse > .medium-2 {\n    width: 16.66667%; }\n  .medium-margin-collapse > .medium-3 {\n    width: 25%; }\n  .medium-margin-collapse > .medium-4 {\n    width: 33.33333%; }\n  .medium-margin-collapse > .medium-5 {\n    width: 41.66667%; }\n  .medium-margin-collapse > .medium-6 {\n    width: 50%; }\n  .medium-margin-collapse > .medium-7 {\n    width: 58.33333%; }\n  .medium-margin-collapse > .medium-8 {\n    width: 66.66667%; }\n  .medium-margin-collapse > .medium-9 {\n    width: 75%; }\n  .medium-margin-collapse > .medium-10 {\n    width: 83.33333%; }\n  .medium-margin-collapse > .medium-11 {\n    width: 91.66667%; }\n  .medium-margin-collapse > .medium-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .medium-margin-collapse > .large-1 {\n    width: 8.33333%; }\n  .medium-margin-collapse > .large-2 {\n    width: 16.66667%; }\n  .medium-margin-collapse > .large-3 {\n    width: 25%; }\n  .medium-margin-collapse > .large-4 {\n    width: 33.33333%; }\n  .medium-margin-collapse > .large-5 {\n    width: 41.66667%; }\n  .medium-margin-collapse > .large-6 {\n    width: 50%; }\n  .medium-margin-collapse > .large-7 {\n    width: 58.33333%; }\n  .medium-margin-collapse > .large-8 {\n    width: 66.66667%; }\n  .medium-margin-collapse > .large-9 {\n    width: 75%; }\n  .medium-margin-collapse > .large-10 {\n    width: 83.33333%; }\n  .medium-margin-collapse > .large-11 {\n    width: 91.66667%; }\n  .medium-margin-collapse > .large-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 40em) {\n  .medium-padding-collapse {\n    margin-right: 0;\n    margin-left: 0; }\n    .medium-padding-collapse > .cell {\n      padding-right: 0;\n      padding-left: 0; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-margin-collapse {\n    margin-right: 0;\n    margin-left: 0; }\n    .large-margin-collapse > .cell {\n      margin-right: 0;\n      margin-left: 0; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-margin-collapse > .small-1 {\n    width: 8.33333%; }\n  .large-margin-collapse > .small-2 {\n    width: 16.66667%; }\n  .large-margin-collapse > .small-3 {\n    width: 25%; }\n  .large-margin-collapse > .small-4 {\n    width: 33.33333%; }\n  .large-margin-collapse > .small-5 {\n    width: 41.66667%; }\n  .large-margin-collapse > .small-6 {\n    width: 50%; }\n  .large-margin-collapse > .small-7 {\n    width: 58.33333%; }\n  .large-margin-collapse > .small-8 {\n    width: 66.66667%; }\n  .large-margin-collapse > .small-9 {\n    width: 75%; }\n  .large-margin-collapse > .small-10 {\n    width: 83.33333%; }\n  .large-margin-collapse > .small-11 {\n    width: 91.66667%; }\n  .large-margin-collapse > .small-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-margin-collapse > .medium-1 {\n    width: 8.33333%; }\n  .large-margin-collapse > .medium-2 {\n    width: 16.66667%; }\n  .large-margin-collapse > .medium-3 {\n    width: 25%; }\n  .large-margin-collapse > .medium-4 {\n    width: 33.33333%; }\n  .large-margin-collapse > .medium-5 {\n    width: 41.66667%; }\n  .large-margin-collapse > .medium-6 {\n    width: 50%; }\n  .large-margin-collapse > .medium-7 {\n    width: 58.33333%; }\n  .large-margin-collapse > .medium-8 {\n    width: 66.66667%; }\n  .large-margin-collapse > .medium-9 {\n    width: 75%; }\n  .large-margin-collapse > .medium-10 {\n    width: 83.33333%; }\n  .large-margin-collapse > .medium-11 {\n    width: 91.66667%; }\n  .large-margin-collapse > .medium-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-margin-collapse > .large-1 {\n    width: 8.33333%; }\n  .large-margin-collapse > .large-2 {\n    width: 16.66667%; }\n  .large-margin-collapse > .large-3 {\n    width: 25%; }\n  .large-margin-collapse > .large-4 {\n    width: 33.33333%; }\n  .large-margin-collapse > .large-5 {\n    width: 41.66667%; }\n  .large-margin-collapse > .large-6 {\n    width: 50%; }\n  .large-margin-collapse > .large-7 {\n    width: 58.33333%; }\n  .large-margin-collapse > .large-8 {\n    width: 66.66667%; }\n  .large-margin-collapse > .large-9 {\n    width: 75%; }\n  .large-margin-collapse > .large-10 {\n    width: 83.33333%; }\n  .large-margin-collapse > .large-11 {\n    width: 91.66667%; }\n  .large-margin-collapse > .large-12 {\n    width: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-padding-collapse {\n    margin-right: 0;\n    margin-left: 0; }\n    .large-padding-collapse > .cell {\n      padding-right: 0;\n      padding-left: 0; } }\n\n.small-offset-0 {\n  margin-left: 0%; }\n\n.grid-margin-x > .small-offset-0 {\n  margin-left: calc(0% + 0.625rem); }\n\n.small-offset-1 {\n  margin-left: 8.33333%; }\n\n.grid-margin-x > .small-offset-1 {\n  margin-left: calc(8.33333% + 0.625rem); }\n\n.small-offset-2 {\n  margin-left: 16.66667%; }\n\n.grid-margin-x > .small-offset-2 {\n  margin-left: calc(16.66667% + 0.625rem); }\n\n.small-offset-3 {\n  margin-left: 25%; }\n\n.grid-margin-x > .small-offset-3 {\n  margin-left: calc(25% + 0.625rem); }\n\n.small-offset-4 {\n  margin-left: 33.33333%; }\n\n.grid-margin-x > .small-offset-4 {\n  margin-left: calc(33.33333% + 0.625rem); }\n\n.small-offset-5 {\n  margin-left: 41.66667%; }\n\n.grid-margin-x > .small-offset-5 {\n  margin-left: calc(41.66667% + 0.625rem); }\n\n.small-offset-6 {\n  margin-left: 50%; }\n\n.grid-margin-x > .small-offset-6 {\n  margin-left: calc(50% + 0.625rem); }\n\n.small-offset-7 {\n  margin-left: 58.33333%; }\n\n.grid-margin-x > .small-offset-7 {\n  margin-left: calc(58.33333% + 0.625rem); }\n\n.small-offset-8 {\n  margin-left: 66.66667%; }\n\n.grid-margin-x > .small-offset-8 {\n  margin-left: calc(66.66667% + 0.625rem); }\n\n.small-offset-9 {\n  margin-left: 75%; }\n\n.grid-margin-x > .small-offset-9 {\n  margin-left: calc(75% + 0.625rem); }\n\n.small-offset-10 {\n  margin-left: 83.33333%; }\n\n.grid-margin-x > .small-offset-10 {\n  margin-left: calc(83.33333% + 0.625rem); }\n\n.small-offset-11 {\n  margin-left: 91.66667%; }\n\n.grid-margin-x > .small-offset-11 {\n  margin-left: calc(91.66667% + 0.625rem); }\n\n@media print, screen and (min-width: 40em) {\n  .medium-offset-0 {\n    margin-left: 0%; }\n  .grid-margin-x > .medium-offset-0 {\n    margin-left: calc(0% + 0.9375rem); }\n  .medium-offset-1 {\n    margin-left: 8.33333%; }\n  .grid-margin-x > .medium-offset-1 {\n    margin-left: calc(8.33333% + 0.9375rem); }\n  .medium-offset-2 {\n    margin-left: 16.66667%; }\n  .grid-margin-x > .medium-offset-2 {\n    margin-left: calc(16.66667% + 0.9375rem); }\n  .medium-offset-3 {\n    margin-left: 25%; }\n  .grid-margin-x > .medium-offset-3 {\n    margin-left: calc(25% + 0.9375rem); }\n  .medium-offset-4 {\n    margin-left: 33.33333%; }\n  .grid-margin-x > .medium-offset-4 {\n    margin-left: calc(33.33333% + 0.9375rem); }\n  .medium-offset-5 {\n    margin-left: 41.66667%; }\n  .grid-margin-x > .medium-offset-5 {\n    margin-left: calc(41.66667% + 0.9375rem); }\n  .medium-offset-6 {\n    margin-left: 50%; }\n  .grid-margin-x > .medium-offset-6 {\n    margin-left: calc(50% + 0.9375rem); }\n  .medium-offset-7 {\n    margin-left: 58.33333%; }\n  .grid-margin-x > .medium-offset-7 {\n    margin-left: calc(58.33333% + 0.9375rem); }\n  .medium-offset-8 {\n    margin-left: 66.66667%; }\n  .grid-margin-x > .medium-offset-8 {\n    margin-left: calc(66.66667% + 0.9375rem); }\n  .medium-offset-9 {\n    margin-left: 75%; }\n  .grid-margin-x > .medium-offset-9 {\n    margin-left: calc(75% + 0.9375rem); }\n  .medium-offset-10 {\n    margin-left: 83.33333%; }\n  .grid-margin-x > .medium-offset-10 {\n    margin-left: calc(83.33333% + 0.9375rem); }\n  .medium-offset-11 {\n    margin-left: 91.66667%; }\n  .grid-margin-x > .medium-offset-11 {\n    margin-left: calc(91.66667% + 0.9375rem); } }\n\n@media print, screen and (min-width: 64em) {\n  .large-offset-0 {\n    margin-left: 0%; }\n  .grid-margin-x > .large-offset-0 {\n    margin-left: calc(0% + 0.9375rem); }\n  .large-offset-1 {\n    margin-left: 8.33333%; }\n  .grid-margin-x > .large-offset-1 {\n    margin-left: calc(8.33333% + 0.9375rem); }\n  .large-offset-2 {\n    margin-left: 16.66667%; }\n  .grid-margin-x > .large-offset-2 {\n    margin-left: calc(16.66667% + 0.9375rem); }\n  .large-offset-3 {\n    margin-left: 25%; }\n  .grid-margin-x > .large-offset-3 {\n    margin-left: calc(25% + 0.9375rem); }\n  .large-offset-4 {\n    margin-left: 33.33333%; }\n  .grid-margin-x > .large-offset-4 {\n    margin-left: calc(33.33333% + 0.9375rem); }\n  .large-offset-5 {\n    margin-left: 41.66667%; }\n  .grid-margin-x > .large-offset-5 {\n    margin-left: calc(41.66667% + 0.9375rem); }\n  .large-offset-6 {\n    margin-left: 50%; }\n  .grid-margin-x > .large-offset-6 {\n    margin-left: calc(50% + 0.9375rem); }\n  .large-offset-7 {\n    margin-left: 58.33333%; }\n  .grid-margin-x > .large-offset-7 {\n    margin-left: calc(58.33333% + 0.9375rem); }\n  .large-offset-8 {\n    margin-left: 66.66667%; }\n  .grid-margin-x > .large-offset-8 {\n    margin-left: calc(66.66667% + 0.9375rem); }\n  .large-offset-9 {\n    margin-left: 75%; }\n  .grid-margin-x > .large-offset-9 {\n    margin-left: calc(75% + 0.9375rem); }\n  .large-offset-10 {\n    margin-left: 83.33333%; }\n  .grid-margin-x > .large-offset-10 {\n    margin-left: calc(83.33333% + 0.9375rem); }\n  .large-offset-11 {\n    margin-left: 91.66667%; }\n  .grid-margin-x > .large-offset-11 {\n    margin-left: calc(91.66667% + 0.9375rem); } }\n\n.grid-y {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-flow: column nowrap;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap; }\n  .grid-y > .cell {\n    width: auto;\n    max-width: none; }\n  .grid-y > .auto {\n    height: auto; }\n  .grid-y > .shrink {\n    height: auto; }\n  .grid-y > .small-shrink, .grid-y > .small-full, .grid-y > .small-1, .grid-y > .small-2, .grid-y > .small-3, .grid-y > .small-4, .grid-y > .small-5, .grid-y > .small-6, .grid-y > .small-7, .grid-y > .small-8, .grid-y > .small-9, .grid-y > .small-10, .grid-y > .small-11, .grid-y > .small-12 {\n    -webkit-flex-basis: auto;\n        -ms-flex-preferred-size: auto;\n            flex-basis: auto; }\n  @media print, screen and (min-width: 40em) {\n    .grid-y > .medium-shrink, .grid-y > .medium-full, .grid-y > .medium-1, .grid-y > .medium-2, .grid-y > .medium-3, .grid-y > .medium-4, .grid-y > .medium-5, .grid-y > .medium-6, .grid-y > .medium-7, .grid-y > .medium-8, .grid-y > .medium-9, .grid-y > .medium-10, .grid-y > .medium-11, .grid-y > .medium-12 {\n      -webkit-flex-basis: auto;\n          -ms-flex-preferred-size: auto;\n              flex-basis: auto; } }\n  @media print, screen and (min-width: 64em) {\n    .grid-y > .large-shrink, .grid-y > .large-full, .grid-y > .large-1, .grid-y > .large-2, .grid-y > .large-3, .grid-y > .large-4, .grid-y > .large-5, .grid-y > .large-6, .grid-y > .large-7, .grid-y > .large-8, .grid-y > .large-9, .grid-y > .large-10, .grid-y > .large-11, .grid-y > .large-12 {\n      -webkit-flex-basis: auto;\n          -ms-flex-preferred-size: auto;\n              flex-basis: auto; } }\n  .grid-y > .small-1, .grid-y > .small-2, .grid-y > .small-3, .grid-y > .small-4, .grid-y > .small-5, .grid-y > .small-6, .grid-y > .small-7, .grid-y > .small-8, .grid-y > .small-9, .grid-y > .small-10, .grid-y > .small-11, .grid-y > .small-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto; }\n  .grid-y > .small-1 {\n    height: 8.33333%; }\n  .grid-y > .small-2 {\n    height: 16.66667%; }\n  .grid-y > .small-3 {\n    height: 25%; }\n  .grid-y > .small-4 {\n    height: 33.33333%; }\n  .grid-y > .small-5 {\n    height: 41.66667%; }\n  .grid-y > .small-6 {\n    height: 50%; }\n  .grid-y > .small-7 {\n    height: 58.33333%; }\n  .grid-y > .small-8 {\n    height: 66.66667%; }\n  .grid-y > .small-9 {\n    height: 75%; }\n  .grid-y > .small-10 {\n    height: 83.33333%; }\n  .grid-y > .small-11 {\n    height: 91.66667%; }\n  .grid-y > .small-12 {\n    height: 100%; }\n  @media print, screen and (min-width: 40em) {\n    .grid-y > .medium-auto {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px;\n      height: auto; }\n    .grid-y > .medium-shrink, .grid-y > .medium-1, .grid-y > .medium-2, .grid-y > .medium-3, .grid-y > .medium-4, .grid-y > .medium-5, .grid-y > .medium-6, .grid-y > .medium-7, .grid-y > .medium-8, .grid-y > .medium-9, .grid-y > .medium-10, .grid-y > .medium-11, .grid-y > .medium-12 {\n      -webkit-box-flex: 0;\n      -webkit-flex: 0 0 auto;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto; }\n    .grid-y > .medium-shrink {\n      height: auto; }\n    .grid-y > .medium-1 {\n      height: 8.33333%; }\n    .grid-y > .medium-2 {\n      height: 16.66667%; }\n    .grid-y > .medium-3 {\n      height: 25%; }\n    .grid-y > .medium-4 {\n      height: 33.33333%; }\n    .grid-y > .medium-5 {\n      height: 41.66667%; }\n    .grid-y > .medium-6 {\n      height: 50%; }\n    .grid-y > .medium-7 {\n      height: 58.33333%; }\n    .grid-y > .medium-8 {\n      height: 66.66667%; }\n    .grid-y > .medium-9 {\n      height: 75%; }\n    .grid-y > .medium-10 {\n      height: 83.33333%; }\n    .grid-y > .medium-11 {\n      height: 91.66667%; }\n    .grid-y > .medium-12 {\n      height: 100%; } }\n  @media print, screen and (min-width: 64em) {\n    .grid-y > .large-auto {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px;\n      height: auto; }\n    .grid-y > .large-shrink, .grid-y > .large-1, .grid-y > .large-2, .grid-y > .large-3, .grid-y > .large-4, .grid-y > .large-5, .grid-y > .large-6, .grid-y > .large-7, .grid-y > .large-8, .grid-y > .large-9, .grid-y > .large-10, .grid-y > .large-11, .grid-y > .large-12 {\n      -webkit-box-flex: 0;\n      -webkit-flex: 0 0 auto;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto; }\n    .grid-y > .large-shrink {\n      height: auto; }\n    .grid-y > .large-1 {\n      height: 8.33333%; }\n    .grid-y > .large-2 {\n      height: 16.66667%; }\n    .grid-y > .large-3 {\n      height: 25%; }\n    .grid-y > .large-4 {\n      height: 33.33333%; }\n    .grid-y > .large-5 {\n      height: 41.66667%; }\n    .grid-y > .large-6 {\n      height: 50%; }\n    .grid-y > .large-7 {\n      height: 58.33333%; }\n    .grid-y > .large-8 {\n      height: 66.66667%; }\n    .grid-y > .large-9 {\n      height: 75%; }\n    .grid-y > .large-10 {\n      height: 83.33333%; }\n    .grid-y > .large-11 {\n      height: 91.66667%; }\n    .grid-y > .large-12 {\n      height: 100%; } }\n\n.grid-padding-y .grid-padding-y {\n  margin-top: -0.625rem;\n  margin-bottom: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-padding-y .grid-padding-y {\n      margin-top: -0.9375rem;\n      margin-bottom: -0.9375rem; } }\n\n.grid-padding-y > .cell {\n  padding-top: 0.625rem;\n  padding-bottom: 0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-padding-y > .cell {\n      padding-top: 0.9375rem;\n      padding-bottom: 0.9375rem; } }\n\n.grid-margin-y {\n  margin-top: -0.625rem;\n  margin-bottom: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y {\n      margin-top: -0.9375rem;\n      margin-bottom: -0.9375rem; } }\n  .grid-margin-y > .cell {\n    height: calc(100% - 1.25rem);\n    margin-top: 0.625rem;\n    margin-bottom: 0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y > .cell {\n      height: calc(100% - 1.875rem);\n      margin-top: 0.9375rem;\n      margin-bottom: 0.9375rem; } }\n  .grid-margin-y > .auto {\n    height: auto; }\n  .grid-margin-y > .shrink {\n    height: auto; }\n  .grid-margin-y > .small-1 {\n    height: calc(8.33333% - 1.25rem); }\n  .grid-margin-y > .small-2 {\n    height: calc(16.66667% - 1.25rem); }\n  .grid-margin-y > .small-3 {\n    height: calc(25% - 1.25rem); }\n  .grid-margin-y > .small-4 {\n    height: calc(33.33333% - 1.25rem); }\n  .grid-margin-y > .small-5 {\n    height: calc(41.66667% - 1.25rem); }\n  .grid-margin-y > .small-6 {\n    height: calc(50% - 1.25rem); }\n  .grid-margin-y > .small-7 {\n    height: calc(58.33333% - 1.25rem); }\n  .grid-margin-y > .small-8 {\n    height: calc(66.66667% - 1.25rem); }\n  .grid-margin-y > .small-9 {\n    height: calc(75% - 1.25rem); }\n  .grid-margin-y > .small-10 {\n    height: calc(83.33333% - 1.25rem); }\n  .grid-margin-y > .small-11 {\n    height: calc(91.66667% - 1.25rem); }\n  .grid-margin-y > .small-12 {\n    height: calc(100% - 1.25rem); }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y > .auto {\n      height: auto; }\n    .grid-margin-y > .shrink {\n      height: auto; }\n    .grid-margin-y > .small-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .small-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .small-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .small-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .small-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .small-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .small-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .small-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .small-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .small-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .small-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .small-12 {\n      height: calc(100% - 1.875rem); }\n    .grid-margin-y > .medium-auto {\n      height: auto; }\n    .grid-margin-y > .medium-shrink {\n      height: auto; }\n    .grid-margin-y > .medium-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .medium-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .medium-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .medium-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .medium-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .medium-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .medium-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .medium-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .medium-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .medium-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .medium-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .medium-12 {\n      height: calc(100% - 1.875rem); } }\n  @media print, screen and (min-width: 64em) {\n    .grid-margin-y > .large-auto {\n      height: auto; }\n    .grid-margin-y > .large-shrink {\n      height: auto; }\n    .grid-margin-y > .large-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .large-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .large-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .large-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .large-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .large-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .large-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .large-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .large-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .large-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .large-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .large-12 {\n      height: calc(100% - 1.875rem); } }\n\n.grid-frame {\n  overflow: hidden;\n  position: relative;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  width: 100vw; }\n\n.cell .grid-frame {\n  width: 100%; }\n\n.cell-block {\n  overflow-x: auto;\n  max-width: 100%;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n\n.cell-block-y {\n  overflow-y: auto;\n  max-height: 100%;\n  min-height: 100%;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n\n.cell-block-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-height: 100%; }\n  .cell-block-container > .grid-x {\n    max-height: 100%;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-grid-frame {\n    overflow: hidden;\n    position: relative;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    width: 100vw; }\n  .cell .medium-grid-frame {\n    width: 100%; }\n  .medium-cell-block {\n    overflow-x: auto;\n    max-width: 100%;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .medium-cell-block-container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    max-height: 100%; }\n    .medium-cell-block-container > .grid-x {\n      max-height: 100%;\n      -webkit-flex-wrap: nowrap;\n          -ms-flex-wrap: nowrap;\n              flex-wrap: nowrap; }\n  .medium-cell-block-y {\n    overflow-y: auto;\n    max-height: 100%;\n    min-height: 100%;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-grid-frame {\n    overflow: hidden;\n    position: relative;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    width: 100vw; }\n  .cell .large-grid-frame {\n    width: 100%; }\n  .large-cell-block {\n    overflow-x: auto;\n    max-width: 100%;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .large-cell-block-container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    max-height: 100%; }\n    .large-cell-block-container > .grid-x {\n      max-height: 100%;\n      -webkit-flex-wrap: nowrap;\n          -ms-flex-wrap: nowrap;\n              flex-wrap: nowrap; }\n  .large-cell-block-y {\n    overflow-y: auto;\n    max-height: 100%;\n    min-height: 100%;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; } }\n\n.grid-y.grid-frame {\n  width: auto;\n  overflow: hidden;\n  position: relative;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  height: 100vh; }\n\n@media print, screen and (min-width: 40em) {\n  .grid-y.medium-grid-frame {\n    width: auto;\n    overflow: hidden;\n    position: relative;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    height: 100vh; } }\n\n@media print, screen and (min-width: 64em) {\n  .grid-y.large-grid-frame {\n    width: auto;\n    overflow: hidden;\n    position: relative;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    height: 100vh; } }\n\n.cell .grid-y.grid-frame {\n  height: 100%; }\n\n@media print, screen and (min-width: 40em) {\n  .cell .grid-y.medium-grid-frame {\n    height: 100%; } }\n\n@media print, screen and (min-width: 64em) {\n  .cell .grid-y.large-grid-frame {\n    height: 100%; } }\n\n.grid-margin-y {\n  margin-top: -0.625rem;\n  margin-bottom: -0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y {\n      margin-top: -0.9375rem;\n      margin-bottom: -0.9375rem; } }\n  .grid-margin-y > .cell {\n    height: calc(100% - 1.25rem);\n    margin-top: 0.625rem;\n    margin-bottom: 0.625rem; }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y > .cell {\n      height: calc(100% - 1.875rem);\n      margin-top: 0.9375rem;\n      margin-bottom: 0.9375rem; } }\n  .grid-margin-y > .auto {\n    height: auto; }\n  .grid-margin-y > .shrink {\n    height: auto; }\n  .grid-margin-y > .small-1 {\n    height: calc(8.33333% - 1.25rem); }\n  .grid-margin-y > .small-2 {\n    height: calc(16.66667% - 1.25rem); }\n  .grid-margin-y > .small-3 {\n    height: calc(25% - 1.25rem); }\n  .grid-margin-y > .small-4 {\n    height: calc(33.33333% - 1.25rem); }\n  .grid-margin-y > .small-5 {\n    height: calc(41.66667% - 1.25rem); }\n  .grid-margin-y > .small-6 {\n    height: calc(50% - 1.25rem); }\n  .grid-margin-y > .small-7 {\n    height: calc(58.33333% - 1.25rem); }\n  .grid-margin-y > .small-8 {\n    height: calc(66.66667% - 1.25rem); }\n  .grid-margin-y > .small-9 {\n    height: calc(75% - 1.25rem); }\n  .grid-margin-y > .small-10 {\n    height: calc(83.33333% - 1.25rem); }\n  .grid-margin-y > .small-11 {\n    height: calc(91.66667% - 1.25rem); }\n  .grid-margin-y > .small-12 {\n    height: calc(100% - 1.25rem); }\n  @media print, screen and (min-width: 40em) {\n    .grid-margin-y > .auto {\n      height: auto; }\n    .grid-margin-y > .shrink {\n      height: auto; }\n    .grid-margin-y > .small-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .small-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .small-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .small-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .small-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .small-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .small-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .small-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .small-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .small-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .small-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .small-12 {\n      height: calc(100% - 1.875rem); }\n    .grid-margin-y > .medium-auto {\n      height: auto; }\n    .grid-margin-y > .medium-shrink {\n      height: auto; }\n    .grid-margin-y > .medium-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .medium-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .medium-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .medium-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .medium-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .medium-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .medium-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .medium-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .medium-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .medium-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .medium-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .medium-12 {\n      height: calc(100% - 1.875rem); } }\n  @media print, screen and (min-width: 64em) {\n    .grid-margin-y > .large-auto {\n      height: auto; }\n    .grid-margin-y > .large-shrink {\n      height: auto; }\n    .grid-margin-y > .large-1 {\n      height: calc(8.33333% - 1.875rem); }\n    .grid-margin-y > .large-2 {\n      height: calc(16.66667% - 1.875rem); }\n    .grid-margin-y > .large-3 {\n      height: calc(25% - 1.875rem); }\n    .grid-margin-y > .large-4 {\n      height: calc(33.33333% - 1.875rem); }\n    .grid-margin-y > .large-5 {\n      height: calc(41.66667% - 1.875rem); }\n    .grid-margin-y > .large-6 {\n      height: calc(50% - 1.875rem); }\n    .grid-margin-y > .large-7 {\n      height: calc(58.33333% - 1.875rem); }\n    .grid-margin-y > .large-8 {\n      height: calc(66.66667% - 1.875rem); }\n    .grid-margin-y > .large-9 {\n      height: calc(75% - 1.875rem); }\n    .grid-margin-y > .large-10 {\n      height: calc(83.33333% - 1.875rem); }\n    .grid-margin-y > .large-11 {\n      height: calc(91.66667% - 1.875rem); }\n    .grid-margin-y > .large-12 {\n      height: calc(100% - 1.875rem); } }\n\n.grid-frame.grid-margin-y {\n  height: calc(100vh + 1.25rem); }\n  @media print, screen and (min-width: 40em) {\n    .grid-frame.grid-margin-y {\n      height: calc(100vh + 1.875rem); } }\n  @media print, screen and (min-width: 64em) {\n    .grid-frame.grid-margin-y {\n      height: calc(100vh + 1.875rem); } }\n\n@media print, screen and (min-width: 40em) {\n  .grid-margin-y.medium-grid-frame {\n    height: calc(100vh + 1.875rem); } }\n\n@media print, screen and (min-width: 64em) {\n  .grid-margin-y.large-grid-frame {\n    height: calc(100vh + 1.875rem); } }\n\n.button {\n  display: inline-block;\n  vertical-align: middle;\n  margin: 0 0 1rem 0;\n  padding: 0.85em 1em;\n  border: 1px solid transparent;\n  border-radius: 0;\n  -webkit-transition: background-color 0.25s ease-out, color 0.25s ease-out;\n  transition: background-color 0.25s ease-out, color 0.25s ease-out;\n  font-family: inherit;\n  font-size: 0.9rem;\n  -webkit-appearance: none;\n  line-height: 1;\n  text-align: center;\n  cursor: pointer;\n  background-color: #1779ba;\n  color: #fefefe; }\n  [data-whatinput='mouse'] .button {\n    outline: 0; }\n  .button:hover, .button:focus {\n    background-color: #14679e;\n    color: #fefefe; }\n  .button.tiny {\n    font-size: 0.6rem; }\n  .button.small {\n    font-size: 0.75rem; }\n  .button.large {\n    font-size: 1.25rem; }\n  .button.expanded {\n    display: block;\n    width: 100%;\n    margin-right: 0;\n    margin-left: 0; }\n  .button.primary {\n    background-color: #1779ba;\n    color: #fefefe; }\n    .button.primary:hover, .button.primary:focus {\n      background-color: #126195;\n      color: #fefefe; }\n  .button.secondary {\n    background-color: #767676;\n    color: #fefefe; }\n    .button.secondary:hover, .button.secondary:focus {\n      background-color: #5e5e5e;\n      color: #fefefe; }\n  .button.success {\n    background-color: #3adb76;\n    color: #0a0a0a; }\n    .button.success:hover, .button.success:focus {\n      background-color: #22bb5b;\n      color: #0a0a0a; }\n  .button.warning {\n    background-color: #ffae00;\n    color: #0a0a0a; }\n    .button.warning:hover, .button.warning:focus {\n      background-color: #cc8b00;\n      color: #0a0a0a; }\n  .button.alert {\n    background-color: #cc4b37;\n    color: #fefefe; }\n    .button.alert:hover, .button.alert:focus {\n      background-color: #a53b2a;\n      color: #fefefe; }\n  .button.disabled, .button[disabled] {\n    opacity: 0.25;\n    cursor: not-allowed; }\n    .button.disabled, .button.disabled:hover, .button.disabled:focus, .button[disabled], .button[disabled]:hover, .button[disabled]:focus {\n      background-color: #1779ba;\n      color: #fefefe; }\n    .button.disabled.primary, .button[disabled].primary {\n      opacity: 0.25;\n      cursor: not-allowed; }\n      .button.disabled.primary, .button.disabled.primary:hover, .button.disabled.primary:focus, .button[disabled].primary, .button[disabled].primary:hover, .button[disabled].primary:focus {\n        background-color: #1779ba;\n        color: #fefefe; }\n    .button.disabled.secondary, .button[disabled].secondary {\n      opacity: 0.25;\n      cursor: not-allowed; }\n      .button.disabled.secondary, .button.disabled.secondary:hover, .button.disabled.secondary:focus, .button[disabled].secondary, .button[disabled].secondary:hover, .button[disabled].secondary:focus {\n        background-color: #767676;\n        color: #fefefe; }\n    .button.disabled.success, .button[disabled].success {\n      opacity: 0.25;\n      cursor: not-allowed; }\n      .button.disabled.success, .button.disabled.success:hover, .button.disabled.success:focus, .button[disabled].success, .button[disabled].success:hover, .button[disabled].success:focus {\n        background-color: #3adb76;\n        color: #0a0a0a; }\n    .button.disabled.warning, .button[disabled].warning {\n      opacity: 0.25;\n      cursor: not-allowed; }\n      .button.disabled.warning, .button.disabled.warning:hover, .button.disabled.warning:focus, .button[disabled].warning, .button[disabled].warning:hover, .button[disabled].warning:focus {\n        background-color: #ffae00;\n        color: #0a0a0a; }\n    .button.disabled.alert, .button[disabled].alert {\n      opacity: 0.25;\n      cursor: not-allowed; }\n      .button.disabled.alert, .button.disabled.alert:hover, .button.disabled.alert:focus, .button[disabled].alert, .button[disabled].alert:hover, .button[disabled].alert:focus {\n        background-color: #cc4b37;\n        color: #fefefe; }\n  .button.hollow {\n    border: 1px solid #1779ba;\n    color: #1779ba; }\n    .button.hollow, .button.hollow:hover, .button.hollow:focus {\n      background-color: transparent; }\n    .button.hollow.disabled, .button.hollow.disabled:hover, .button.hollow.disabled:focus, .button.hollow[disabled], .button.hollow[disabled]:hover, .button.hollow[disabled]:focus {\n      background-color: transparent; }\n    .button.hollow:hover, .button.hollow:focus {\n      border-color: #0c3d5d;\n      color: #0c3d5d; }\n      .button.hollow:hover.disabled, .button.hollow:hover[disabled], .button.hollow:focus.disabled, .button.hollow:focus[disabled] {\n        border: 1px solid #1779ba;\n        color: #1779ba; }\n    .button.hollow.primary {\n      border: 1px solid #1779ba;\n      color: #1779ba; }\n      .button.hollow.primary:hover, .button.hollow.primary:focus {\n        border-color: #0c3d5d;\n        color: #0c3d5d; }\n        .button.hollow.primary:hover.disabled, .button.hollow.primary:hover[disabled], .button.hollow.primary:focus.disabled, .button.hollow.primary:focus[disabled] {\n          border: 1px solid #1779ba;\n          color: #1779ba; }\n    .button.hollow.secondary {\n      border: 1px solid #767676;\n      color: #767676; }\n      .button.hollow.secondary:hover, .button.hollow.secondary:focus {\n        border-color: #3b3b3b;\n        color: #3b3b3b; }\n        .button.hollow.secondary:hover.disabled, .button.hollow.secondary:hover[disabled], .button.hollow.secondary:focus.disabled, .button.hollow.secondary:focus[disabled] {\n          border: 1px solid #767676;\n          color: #767676; }\n    .button.hollow.success {\n      border: 1px solid #3adb76;\n      color: #3adb76; }\n      .button.hollow.success:hover, .button.hollow.success:focus {\n        border-color: #157539;\n        color: #157539; }\n        .button.hollow.success:hover.disabled, .button.hollow.success:hover[disabled], .button.hollow.success:focus.disabled, .button.hollow.success:focus[disabled] {\n          border: 1px solid #3adb76;\n          color: #3adb76; }\n    .button.hollow.warning {\n      border: 1px solid #ffae00;\n      color: #ffae00; }\n      .button.hollow.warning:hover, .button.hollow.warning:focus {\n        border-color: #805700;\n        color: #805700; }\n        .button.hollow.warning:hover.disabled, .button.hollow.warning:hover[disabled], .button.hollow.warning:focus.disabled, .button.hollow.warning:focus[disabled] {\n          border: 1px solid #ffae00;\n          color: #ffae00; }\n    .button.hollow.alert {\n      border: 1px solid #cc4b37;\n      color: #cc4b37; }\n      .button.hollow.alert:hover, .button.hollow.alert:focus {\n        border-color: #67251a;\n        color: #67251a; }\n        .button.hollow.alert:hover.disabled, .button.hollow.alert:hover[disabled], .button.hollow.alert:focus.disabled, .button.hollow.alert:focus[disabled] {\n          border: 1px solid #cc4b37;\n          color: #cc4b37; }\n  .button.clear {\n    border: 1px solid #1779ba;\n    color: #1779ba; }\n    .button.clear, .button.clear:hover, .button.clear:focus {\n      background-color: transparent; }\n    .button.clear.disabled, .button.clear.disabled:hover, .button.clear.disabled:focus, .button.clear[disabled], .button.clear[disabled]:hover, .button.clear[disabled]:focus {\n      background-color: transparent; }\n    .button.clear:hover, .button.clear:focus {\n      border-color: #0c3d5d;\n      color: #0c3d5d; }\n      .button.clear:hover.disabled, .button.clear:hover[disabled], .button.clear:focus.disabled, .button.clear:focus[disabled] {\n        border: 1px solid #1779ba;\n        color: #1779ba; }\n    .button.clear, .button.clear.disabled, .button.clear[disabled], .button.clear:hover, .button.clear:hover.disabled, .button.clear:hover[disabled], .button.clear:focus, .button.clear:focus.disabled, .button.clear:focus[disabled] {\n      border-color: transparent; }\n    .button.clear.primary {\n      border: 1px solid #1779ba;\n      color: #1779ba; }\n      .button.clear.primary:hover, .button.clear.primary:focus {\n        border-color: #0c3d5d;\n        color: #0c3d5d; }\n        .button.clear.primary:hover.disabled, .button.clear.primary:hover[disabled], .button.clear.primary:focus.disabled, .button.clear.primary:focus[disabled] {\n          border: 1px solid #1779ba;\n          color: #1779ba; }\n      .button.clear.primary, .button.clear.primary.disabled, .button.clear.primary[disabled], .button.clear.primary:hover, .button.clear.primary:hover.disabled, .button.clear.primary:hover[disabled], .button.clear.primary:focus, .button.clear.primary:focus.disabled, .button.clear.primary:focus[disabled] {\n        border-color: transparent; }\n    .button.clear.secondary {\n      border: 1px solid #767676;\n      color: #767676; }\n      .button.clear.secondary:hover, .button.clear.secondary:focus {\n        border-color: #3b3b3b;\n        color: #3b3b3b; }\n        .button.clear.secondary:hover.disabled, .button.clear.secondary:hover[disabled], .button.clear.secondary:focus.disabled, .button.clear.secondary:focus[disabled] {\n          border: 1px solid #767676;\n          color: #767676; }\n      .button.clear.secondary, .button.clear.secondary.disabled, .button.clear.secondary[disabled], .button.clear.secondary:hover, .button.clear.secondary:hover.disabled, .button.clear.secondary:hover[disabled], .button.clear.secondary:focus, .button.clear.secondary:focus.disabled, .button.clear.secondary:focus[disabled] {\n        border-color: transparent; }\n    .button.clear.success {\n      border: 1px solid #3adb76;\n      color: #3adb76; }\n      .button.clear.success:hover, .button.clear.success:focus {\n        border-color: #157539;\n        color: #157539; }\n        .button.clear.success:hover.disabled, .button.clear.success:hover[disabled], .button.clear.success:focus.disabled, .button.clear.success:focus[disabled] {\n          border: 1px solid #3adb76;\n          color: #3adb76; }\n      .button.clear.success, .button.clear.success.disabled, .button.clear.success[disabled], .button.clear.success:hover, .button.clear.success:hover.disabled, .button.clear.success:hover[disabled], .button.clear.success:focus, .button.clear.success:focus.disabled, .button.clear.success:focus[disabled] {\n        border-color: transparent; }\n    .button.clear.warning {\n      border: 1px solid #ffae00;\n      color: #ffae00; }\n      .button.clear.warning:hover, .button.clear.warning:focus {\n        border-color: #805700;\n        color: #805700; }\n        .button.clear.warning:hover.disabled, .button.clear.warning:hover[disabled], .button.clear.warning:focus.disabled, .button.clear.warning:focus[disabled] {\n          border: 1px solid #ffae00;\n          color: #ffae00; }\n      .button.clear.warning, .button.clear.warning.disabled, .button.clear.warning[disabled], .button.clear.warning:hover, .button.clear.warning:hover.disabled, .button.clear.warning:hover[disabled], .button.clear.warning:focus, .button.clear.warning:focus.disabled, .button.clear.warning:focus[disabled] {\n        border-color: transparent; }\n    .button.clear.alert {\n      border: 1px solid #cc4b37;\n      color: #cc4b37; }\n      .button.clear.alert:hover, .button.clear.alert:focus {\n        border-color: #67251a;\n        color: #67251a; }\n        .button.clear.alert:hover.disabled, .button.clear.alert:hover[disabled], .button.clear.alert:focus.disabled, .button.clear.alert:focus[disabled] {\n          border: 1px solid #cc4b37;\n          color: #cc4b37; }\n      .button.clear.alert, .button.clear.alert.disabled, .button.clear.alert[disabled], .button.clear.alert:hover, .button.clear.alert:hover.disabled, .button.clear.alert:hover[disabled], .button.clear.alert:focus, .button.clear.alert:focus.disabled, .button.clear.alert:focus[disabled] {\n        border-color: transparent; }\n  .button.dropdown::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 0.4em;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #fefefe transparent transparent;\n    position: relative;\n    top: 0.4em;\n    display: inline-block;\n    float: right;\n    margin-left: 1em; }\n  .button.dropdown.hollow::after {\n    border-top-color: #1779ba; }\n  .button.dropdown.hollow.primary::after {\n    border-top-color: #1779ba; }\n  .button.dropdown.hollow.secondary::after {\n    border-top-color: #767676; }\n  .button.dropdown.hollow.success::after {\n    border-top-color: #3adb76; }\n  .button.dropdown.hollow.warning::after {\n    border-top-color: #ffae00; }\n  .button.dropdown.hollow.alert::after {\n    border-top-color: #cc4b37; }\n  .button.arrow-only::after {\n    top: -0.1em;\n    float: none;\n    margin-left: 0; }\n\na.button:hover, a.button:focus {\n  text-decoration: none; }\n\n.button-group {\n  margin-bottom: 1rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  .button-group::before, .button-group::after {\n    display: table;\n    content: ' ';\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .button-group::after {\n    clear: both; }\n  .button-group .button {\n    margin: 0;\n    margin-right: 1px;\n    margin-bottom: 1px;\n    font-size: 0.9rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto; }\n    .button-group .button:last-child {\n      margin-right: 0; }\n  .button-group.tiny .button {\n    font-size: 0.6rem; }\n  .button-group.small .button {\n    font-size: 0.75rem; }\n  .button-group.large .button {\n    font-size: 1.25rem; }\n  .button-group.expanded .button {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px; }\n  .button-group.primary .button {\n    background-color: #1779ba;\n    color: #fefefe; }\n    .button-group.primary .button:hover, .button-group.primary .button:focus {\n      background-color: #126195;\n      color: #fefefe; }\n  .button-group.secondary .button {\n    background-color: #767676;\n    color: #fefefe; }\n    .button-group.secondary .button:hover, .button-group.secondary .button:focus {\n      background-color: #5e5e5e;\n      color: #fefefe; }\n  .button-group.success .button {\n    background-color: #3adb76;\n    color: #0a0a0a; }\n    .button-group.success .button:hover, .button-group.success .button:focus {\n      background-color: #22bb5b;\n      color: #0a0a0a; }\n  .button-group.warning .button {\n    background-color: #ffae00;\n    color: #0a0a0a; }\n    .button-group.warning .button:hover, .button-group.warning .button:focus {\n      background-color: #cc8b00;\n      color: #0a0a0a; }\n  .button-group.alert .button {\n    background-color: #cc4b37;\n    color: #fefefe; }\n    .button-group.alert .button:hover, .button-group.alert .button:focus {\n      background-color: #a53b2a;\n      color: #fefefe; }\n  .button-group.stacked, .button-group.stacked-for-small, .button-group.stacked-for-medium {\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n    .button-group.stacked .button, .button-group.stacked-for-small .button, .button-group.stacked-for-medium .button {\n      -webkit-box-flex: 0;\n      -webkit-flex: 0 0 100%;\n          -ms-flex: 0 0 100%;\n              flex: 0 0 100%; }\n      .button-group.stacked .button:last-child, .button-group.stacked-for-small .button:last-child, .button-group.stacked-for-medium .button:last-child {\n        margin-bottom: 0; }\n    .button-group.stacked.expanded .button, .button-group.stacked-for-small.expanded .button, .button-group.stacked-for-medium.expanded .button {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px; }\n  @media print, screen and (min-width: 40em) {\n    .button-group.stacked-for-small .button {\n      -webkit-box-flex: 0;\n      -webkit-flex: 0 0 auto;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      margin-bottom: 0; } }\n  @media print, screen and (min-width: 64em) {\n    .button-group.stacked-for-medium .button {\n      -webkit-box-flex: 0;\n      -webkit-flex: 0 0 auto;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      margin-bottom: 0; } }\n  @media screen and (max-width: 39.99875em) {\n    .button-group.stacked-for-small.expanded {\n      display: block; }\n      .button-group.stacked-for-small.expanded .button {\n        display: block;\n        margin-right: 0; } }\n  @media screen and (max-width: 63.99875em) {\n    .button-group.stacked-for-medium.expanded {\n      display: block; }\n      .button-group.stacked-for-medium.expanded .button {\n        display: block;\n        margin-right: 0; } }\n\n.close-button {\n  position: absolute;\n  color: #8a8a8a;\n  cursor: pointer; }\n  [data-whatinput='mouse'] .close-button {\n    outline: 0; }\n  .close-button:hover, .close-button:focus {\n    color: #0a0a0a; }\n  .close-button.small {\n    right: 0.66rem;\n    top: 0.33em;\n    font-size: 1.5em;\n    line-height: 1; }\n  .close-button, .close-button.medium {\n    right: 1rem;\n    top: 0.5rem;\n    font-size: 2em;\n    line-height: 1; }\n\n.label {\n  display: inline-block;\n  padding: 0.33333rem 0.5rem;\n  border-radius: 0;\n  font-size: 0.8rem;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: default;\n  background: #1779ba;\n  color: #fefefe; }\n  .label.primary {\n    background: #1779ba;\n    color: #fefefe; }\n  .label.secondary {\n    background: #767676;\n    color: #fefefe; }\n  .label.success {\n    background: #3adb76;\n    color: #0a0a0a; }\n  .label.warning {\n    background: #ffae00;\n    color: #0a0a0a; }\n  .label.alert {\n    background: #cc4b37;\n    color: #fefefe; }\n\n.progress {\n  height: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 0;\n  background-color: #cacaca; }\n  .progress.primary .progress-meter {\n    background-color: #1779ba; }\n  .progress.secondary .progress-meter {\n    background-color: #767676; }\n  .progress.success .progress-meter {\n    background-color: #3adb76; }\n  .progress.warning .progress-meter {\n    background-color: #ffae00; }\n  .progress.alert .progress-meter {\n    background-color: #cc4b37; }\n\n.progress-meter {\n  position: relative;\n  display: block;\n  width: 0%;\n  height: 100%;\n  background-color: #1779ba; }\n\n.progress-meter-text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  position: absolute;\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: bold;\n  color: #fefefe;\n  white-space: nowrap; }\n\n.slider {\n  position: relative;\n  height: 0.5rem;\n  margin-top: 1.25rem;\n  margin-bottom: 2.25rem;\n  background-color: #e6e6e6;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -ms-touch-action: none;\n      touch-action: none; }\n\n.slider-fill {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: inline-block;\n  max-width: 100%;\n  height: 0.5rem;\n  background-color: #cacaca;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out; }\n  .slider-fill.is-dragging {\n    -webkit-transition: all 0s linear;\n    transition: all 0s linear; }\n\n.slider-handle {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 0;\n  z-index: 1;\n  display: inline-block;\n  width: 1.4rem;\n  height: 1.4rem;\n  border-radius: 0;\n  background-color: #1779ba;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation; }\n  [data-whatinput='mouse'] .slider-handle {\n    outline: 0; }\n  .slider-handle:hover {\n    background-color: #14679e; }\n  .slider-handle.is-dragging {\n    -webkit-transition: all 0s linear;\n    transition: all 0s linear; }\n\n.slider.disabled,\n.slider[disabled] {\n  opacity: 0.25;\n  cursor: not-allowed; }\n\n.slider.vertical {\n  display: inline-block;\n  width: 0.5rem;\n  height: 12.5rem;\n  margin: 0 1.25rem;\n  -webkit-transform: scale(1, -1);\n      -ms-transform: scale(1, -1);\n          transform: scale(1, -1); }\n  .slider.vertical .slider-fill {\n    top: 0;\n    width: 0.5rem;\n    max-height: 100%; }\n  .slider.vertical .slider-handle {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    width: 1.4rem;\n    height: 1.4rem;\n    -webkit-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n            transform: translateX(-50%); }\n\n.switch {\n  height: 2rem;\n  position: relative;\n  margin-bottom: 1rem;\n  outline: 0;\n  font-size: 0.875rem;\n  font-weight: bold;\n  color: #fefefe;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n\n.switch-input {\n  position: absolute;\n  margin-bottom: 0;\n  opacity: 0; }\n\n.switch-paddle {\n  position: relative;\n  display: block;\n  width: 4rem;\n  height: 2rem;\n  border-radius: 0;\n  background: #cacaca;\n  -webkit-transition: all 0.25s ease-out;\n  transition: all 0.25s ease-out;\n  font-weight: inherit;\n  color: inherit;\n  cursor: pointer; }\n  input + .switch-paddle {\n    margin: 0; }\n  .switch-paddle::after {\n    position: absolute;\n    top: 0.25rem;\n    left: 0.25rem;\n    display: block;\n    width: 1.5rem;\n    height: 1.5rem;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    border-radius: 0;\n    background: #fefefe;\n    -webkit-transition: all 0.25s ease-out;\n    transition: all 0.25s ease-out;\n    content: ''; }\n  input:checked ~ .switch-paddle {\n    background: #1779ba; }\n    input:checked ~ .switch-paddle::after {\n      left: 2.25rem; }\n  [data-whatinput='mouse'] input:focus ~ .switch-paddle {\n    outline: 0; }\n\n.switch-active, .switch-inactive {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%); }\n\n.switch-active {\n  left: 8%;\n  display: none; }\n  input:checked + label > .switch-active {\n    display: block; }\n\n.switch-inactive {\n  right: 15%; }\n  input:checked + label > .switch-inactive {\n    display: none; }\n\n.switch.tiny {\n  height: 1.5rem; }\n  .switch.tiny .switch-paddle {\n    width: 3rem;\n    height: 1.5rem;\n    font-size: 0.625rem; }\n  .switch.tiny .switch-paddle::after {\n    top: 0.25rem;\n    left: 0.25rem;\n    width: 1rem;\n    height: 1rem; }\n  .switch.tiny input:checked ~ .switch-paddle::after {\n    left: 1.75rem; }\n\n.switch.small {\n  height: 1.75rem; }\n  .switch.small .switch-paddle {\n    width: 3.5rem;\n    height: 1.75rem;\n    font-size: 0.75rem; }\n  .switch.small .switch-paddle::after {\n    top: 0.25rem;\n    left: 0.25rem;\n    width: 1.25rem;\n    height: 1.25rem; }\n  .switch.small input:checked ~ .switch-paddle::after {\n    left: 2rem; }\n\n.switch.large {\n  height: 2.5rem; }\n  .switch.large .switch-paddle {\n    width: 5rem;\n    height: 2.5rem;\n    font-size: 1rem; }\n  .switch.large .switch-paddle::after {\n    top: 0.25rem;\n    left: 0.25rem;\n    width: 2rem;\n    height: 2rem; }\n  .switch.large input:checked ~ .switch-paddle::after {\n    left: 2.75rem; }\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  margin-bottom: 1rem;\n  border-radius: 0; }\n  thead,\n  tbody,\n  tfoot {\n    border: 1px solid #f1f1f1;\n    background-color: #fefefe; }\n  caption {\n    padding: 0.5rem 0.625rem 0.625rem;\n    font-weight: bold; }\n  thead {\n    background: #f8f8f8;\n    color: #0a0a0a; }\n  tfoot {\n    background: #f1f1f1;\n    color: #0a0a0a; }\n  thead tr,\n  tfoot tr {\n    background: transparent; }\n  thead th,\n  thead td,\n  tfoot th,\n  tfoot td {\n    padding: 0.5rem 0.625rem 0.625rem;\n    font-weight: bold;\n    text-align: left; }\n  tbody th,\n  tbody td {\n    padding: 0.5rem 0.625rem 0.625rem; }\n  tbody tr:nth-child(even) {\n    border-bottom: 0;\n    background-color: #f1f1f1; }\n  table.unstriped tbody {\n    background-color: #fefefe; }\n    table.unstriped tbody tr {\n      border-bottom: 0;\n      border-bottom: 1px solid #f1f1f1;\n      background-color: #fefefe; }\n\n@media screen and (max-width: 63.99875em) {\n  table.stack thead {\n    display: none; }\n  table.stack tfoot {\n    display: none; }\n  table.stack tr,\n  table.stack th,\n  table.stack td {\n    display: block; }\n  table.stack td {\n    border-top: 0; } }\n\ntable.scroll {\n  display: block;\n  width: 100%;\n  overflow-x: auto; }\n\ntable.hover thead tr:hover {\n  background-color: #f3f3f3; }\n\ntable.hover tfoot tr:hover {\n  background-color: #ececec; }\n\ntable.hover tbody tr:hover {\n  background-color: #f9f9f9; }\n\ntable.hover:not(.unstriped) tr:nth-of-type(even):hover {\n  background-color: #ececec; }\n\n.table-scroll {\n  overflow-x: auto; }\n\n.badge {\n  display: inline-block;\n  min-width: 2.1em;\n  padding: 0.3em;\n  border-radius: 50%;\n  font-size: 0.6rem;\n  text-align: center;\n  background: #1779ba;\n  color: #fefefe; }\n  .badge.primary {\n    background: #1779ba;\n    color: #fefefe; }\n  .badge.secondary {\n    background: #767676;\n    color: #fefefe; }\n  .badge.success {\n    background: #3adb76;\n    color: #0a0a0a; }\n  .badge.warning {\n    background: #ffae00;\n    color: #0a0a0a; }\n  .badge.alert {\n    background: #cc4b37;\n    color: #fefefe; }\n\n.breadcrumbs {\n  margin: 0 0 1rem 0;\n  list-style: none; }\n  .breadcrumbs::before, .breadcrumbs::after {\n    display: table;\n    content: ' ';\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .breadcrumbs::after {\n    clear: both; }\n  .breadcrumbs li {\n    float: left;\n    font-size: 0.6875rem;\n    color: #0a0a0a;\n    cursor: default;\n    text-transform: uppercase; }\n    .breadcrumbs li:not(:last-child)::after {\n      position: relative;\n      margin: 0 0.75rem;\n      opacity: 1;\n      content: \"/\";\n      color: #cacaca; }\n  .breadcrumbs a {\n    color: #1779ba; }\n    .breadcrumbs a:hover {\n      text-decoration: underline; }\n  .breadcrumbs .disabled {\n    color: #cacaca;\n    cursor: not-allowed; }\n\n.callout {\n  position: relative;\n  margin: 0 0 1rem 0;\n  padding: 1rem;\n  border: 1px solid rgba(10, 10, 10, 0.25);\n  border-radius: 0;\n  background-color: white;\n  color: #0a0a0a; }\n  .callout > :first-child {\n    margin-top: 0; }\n  .callout > :last-child {\n    margin-bottom: 0; }\n  .callout.primary {\n    background-color: #d7ecfa;\n    color: #0a0a0a; }\n  .callout.secondary {\n    background-color: #eaeaea;\n    color: #0a0a0a; }\n  .callout.success {\n    background-color: #e1faea;\n    color: #0a0a0a; }\n  .callout.warning {\n    background-color: #fff3d9;\n    color: #0a0a0a; }\n  .callout.alert {\n    background-color: #f7e4e1;\n    color: #0a0a0a; }\n  .callout.small {\n    padding-top: 0.5rem;\n    padding-right: 0.5rem;\n    padding-bottom: 0.5rem;\n    padding-left: 0.5rem; }\n  .callout.large {\n    padding-top: 3rem;\n    padding-right: 3rem;\n    padding-bottom: 3rem;\n    padding-left: 3rem; }\n\n.card {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  margin-bottom: 1rem;\n  border: 1px solid #e6e6e6;\n  border-radius: 0;\n  background: #fefefe;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  overflow: hidden;\n  color: #0a0a0a; }\n  .card > :last-child {\n    margin-bottom: 0; }\n\n.card-divider {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  padding: 1rem;\n  background: #e6e6e6; }\n  .card-divider > :last-child {\n    margin-bottom: 0; }\n\n.card-section {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 auto;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  padding: 1rem; }\n  .card-section > :last-child {\n    margin-bottom: 0; }\n\n.card-image {\n  min-height: 1px; }\n\n.dropdown-pane {\n  position: absolute;\n  z-index: 10;\n  display: none;\n  width: 300px;\n  padding: 1rem;\n  visibility: hidden;\n  border: 1px solid #cacaca;\n  border-radius: 0;\n  background-color: #fefefe;\n  font-size: 1rem; }\n  .dropdown-pane.is-opening {\n    display: block; }\n  .dropdown-pane.is-open {\n    display: block;\n    visibility: visible; }\n\n.dropdown-pane.tiny {\n  width: 100px; }\n\n.dropdown-pane.small {\n  width: 200px; }\n\n.dropdown-pane.large {\n  width: 400px; }\n\n.pagination {\n  margin-left: 0;\n  margin-bottom: 1rem; }\n  .pagination::before, .pagination::after {\n    display: table;\n    content: ' ';\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .pagination::after {\n    clear: both; }\n  .pagination li {\n    margin-right: 0.0625rem;\n    border-radius: 0;\n    font-size: 0.875rem;\n    display: none; }\n    .pagination li:last-child, .pagination li:first-child {\n      display: inline-block; }\n    @media print, screen and (min-width: 40em) {\n      .pagination li {\n        display: inline-block; } }\n  .pagination a,\n  .pagination button {\n    display: block;\n    padding: 0.1875rem 0.625rem;\n    border-radius: 0;\n    color: #0a0a0a; }\n    .pagination a:hover,\n    .pagination button:hover {\n      background: #e6e6e6; }\n  .pagination .current {\n    padding: 0.1875rem 0.625rem;\n    background: #1779ba;\n    color: #fefefe;\n    cursor: default; }\n  .pagination .disabled {\n    padding: 0.1875rem 0.625rem;\n    color: #cacaca;\n    cursor: not-allowed; }\n    .pagination .disabled:hover {\n      background: transparent; }\n  .pagination .ellipsis::after {\n    padding: 0.1875rem 0.625rem;\n    content: '\\2026';\n    color: #0a0a0a; }\n\n.pagination-previous a::before,\n.pagination-previous.disabled::before {\n  display: inline-block;\n  margin-right: 0.5rem;\n  content: '\\00ab'; }\n\n.pagination-next a::after,\n.pagination-next.disabled::after {\n  display: inline-block;\n  margin-left: 0.5rem;\n  content: '\\00bb'; }\n\n.has-tip {\n  position: relative;\n  display: inline-block;\n  border-bottom: dotted 1px #8a8a8a;\n  font-weight: bold;\n  cursor: help; }\n\n.tooltip {\n  position: absolute;\n  top: calc(100% + 0.6495rem);\n  z-index: 1200;\n  max-width: 10rem;\n  padding: 0.75rem;\n  border-radius: 0;\n  background-color: #0a0a0a;\n  font-size: 80%;\n  color: #fefefe; }\n  .tooltip::before {\n    position: absolute; }\n  .tooltip.bottom::before {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 0.75rem;\n    content: '';\n    border-top-width: 0;\n    border-bottom-style: solid;\n    border-color: transparent transparent #0a0a0a;\n    bottom: 100%; }\n  .tooltip.bottom.align-center::before {\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  .tooltip.top::before {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 0.75rem;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #0a0a0a transparent transparent;\n    top: 100%;\n    bottom: auto; }\n  .tooltip.top.align-center::before {\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  .tooltip.left::before {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 0.75rem;\n    content: '';\n    border-right-width: 0;\n    border-left-style: solid;\n    border-color: transparent transparent transparent #0a0a0a;\n    left: 100%; }\n  .tooltip.left.align-center::before {\n    bottom: auto;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  .tooltip.right::before {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 0.75rem;\n    content: '';\n    border-left-width: 0;\n    border-right-style: solid;\n    border-color: transparent #0a0a0a transparent transparent;\n    right: 100%;\n    left: auto; }\n  .tooltip.right.align-center::before {\n    bottom: auto;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  .tooltip.align-top::before {\n    bottom: auto;\n    top: 10%; }\n  .tooltip.align-bottom::before {\n    bottom: 10%;\n    top: auto; }\n  .tooltip.align-left::before {\n    left: 10%;\n    right: auto; }\n  .tooltip.align-right::before {\n    left: auto;\n    right: 10%; }\n\n.accordion {\n  margin-left: 0;\n  background: #fefefe;\n  list-style-type: none; }\n  .accordion[disabled] .accordion-title {\n    cursor: not-allowed; }\n\n.accordion-item:first-child > :first-child {\n  border-radius: 0 0 0 0; }\n\n.accordion-item:last-child > :last-child {\n  border-radius: 0 0 0 0; }\n\n.accordion-title {\n  position: relative;\n  display: block;\n  padding: 1.25rem 1rem;\n  border: 1px solid #e6e6e6;\n  border-bottom: 0;\n  font-size: 0.75rem;\n  line-height: 1;\n  color: #1779ba; }\n  :last-child:not(.is-active) > .accordion-title {\n    border-bottom: 1px solid #e6e6e6;\n    border-radius: 0 0 0 0; }\n  .accordion-title:hover, .accordion-title:focus {\n    background-color: #e6e6e6; }\n  .accordion-title::before {\n    position: absolute;\n    top: 50%;\n    right: 1rem;\n    margin-top: -0.5rem;\n    content: '+'; }\n  .is-active > .accordion-title::before {\n    content: '\\2013'; }\n\n.accordion-content {\n  display: none;\n  padding: 1rem;\n  border: 1px solid #e6e6e6;\n  border-bottom: 0;\n  background-color: #fefefe;\n  color: #0a0a0a; }\n  :last-child > .accordion-content:last-child {\n    border-bottom: 1px solid #e6e6e6; }\n\n.media-object {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 1rem;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap; }\n  .media-object img {\n    max-width: none; }\n  @media screen and (max-width: 39.99875em) {\n    .media-object.stack-for-small {\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; } }\n\n.media-object-section {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto; }\n  .media-object-section:first-child {\n    padding-right: 1rem; }\n  .media-object-section:last-child:not(:nth-child(2)) {\n    padding-left: 1rem; }\n  .media-object-section > :last-child {\n    margin-bottom: 0; }\n  @media screen and (max-width: 39.99875em) {\n    .stack-for-small .media-object-section {\n      padding: 0;\n      padding-bottom: 1rem;\n      -webkit-flex-basis: 100%;\n          -ms-flex-preferred-size: 100%;\n              flex-basis: 100%;\n      max-width: 100%; }\n      .stack-for-small .media-object-section img {\n        width: 100%; } }\n  .media-object-section.main-section {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px; }\n\n.orbit {\n  position: relative; }\n\n.orbit-container {\n  position: relative;\n  height: 0;\n  margin: 0;\n  list-style: none;\n  overflow: hidden; }\n\n.orbit-slide {\n  width: 100%;\n  position: absolute; }\n  .orbit-slide.no-motionui.is-active {\n    top: 0;\n    left: 0; }\n\n.orbit-figure {\n  margin: 0; }\n\n.orbit-image {\n  width: 100%;\n  max-width: 100%;\n  margin: 0; }\n\n.orbit-caption {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  margin-bottom: 0;\n  padding: 1rem;\n  background-color: rgba(10, 10, 10, 0.5);\n  color: #fefefe; }\n\n.orbit-previous, .orbit-next {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n  z-index: 10;\n  padding: 1rem;\n  color: #fefefe; }\n  [data-whatinput='mouse'] .orbit-previous, [data-whatinput='mouse'] .orbit-next {\n    outline: 0; }\n  .orbit-previous:hover, .orbit-next:hover, .orbit-previous:active, .orbit-next:active, .orbit-previous:focus, .orbit-next:focus {\n    background-color: rgba(10, 10, 10, 0.5); }\n\n.orbit-previous {\n  left: 0; }\n\n.orbit-next {\n  left: auto;\n  right: 0; }\n\n.orbit-bullets {\n  position: relative;\n  margin-top: 0.8rem;\n  margin-bottom: 0.8rem;\n  text-align: center; }\n  [data-whatinput='mouse'] .orbit-bullets {\n    outline: 0; }\n  .orbit-bullets button {\n    width: 1.2rem;\n    height: 1.2rem;\n    margin: 0.1rem;\n    border-radius: 50%;\n    background-color: #cacaca; }\n    .orbit-bullets button:hover {\n      background-color: #8a8a8a; }\n    .orbit-bullets button.is-active {\n      background-color: #8a8a8a; }\n\n.responsive-embed,\n.flex-video {\n  position: relative;\n  height: 0;\n  margin-bottom: 1rem;\n  padding-bottom: 75%;\n  overflow: hidden; }\n  .responsive-embed iframe,\n  .responsive-embed object,\n  .responsive-embed embed,\n  .responsive-embed video,\n  .flex-video iframe,\n  .flex-video object,\n  .flex-video embed,\n  .flex-video video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n  .responsive-embed.widescreen,\n  .flex-video.widescreen {\n    padding-bottom: 56.25%; }\n\n.tabs {\n  margin: 0;\n  border: 1px solid #e6e6e6;\n  background: #fefefe;\n  list-style-type: none; }\n  .tabs::before, .tabs::after {\n    display: table;\n    content: ' ';\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .tabs::after {\n    clear: both; }\n\n.tabs.vertical > li {\n  display: block;\n  float: none;\n  width: auto; }\n\n.tabs.simple > li > a {\n  padding: 0; }\n  .tabs.simple > li > a:hover {\n    background: transparent; }\n\n.tabs.primary {\n  background: #1779ba; }\n  .tabs.primary > li > a {\n    color: #fefefe; }\n    .tabs.primary > li > a:hover, .tabs.primary > li > a:focus {\n      background: #1673b1; }\n\n.tabs-title {\n  float: left; }\n  .tabs-title > a {\n    display: block;\n    padding: 1.25rem 1.5rem;\n    font-size: 0.75rem;\n    line-height: 1;\n    color: #1779ba; }\n    [data-whatinput='mouse'] .tabs-title > a {\n      outline: 0; }\n    .tabs-title > a:hover {\n      background: #fefefe;\n      color: #1468a0; }\n    .tabs-title > a:focus, .tabs-title > a[aria-selected='true'] {\n      background: #e6e6e6;\n      color: #1779ba; }\n\n.tabs-content {\n  border: 1px solid #e6e6e6;\n  border-top: 0;\n  background: #fefefe;\n  color: #0a0a0a;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease; }\n\n.tabs-content.vertical {\n  border: 1px solid #e6e6e6;\n  border-left: 0; }\n\n.tabs-panel {\n  display: none;\n  padding: 1rem; }\n  .tabs-panel.is-active {\n    display: block; }\n\n.thumbnail {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 1rem;\n  border: 4px solid #fefefe;\n  border-radius: 0;\n  -webkit-box-shadow: 0 0 0 1px rgba(10, 10, 10, 0.2);\n          box-shadow: 0 0 0 1px rgba(10, 10, 10, 0.2);\n  line-height: 0; }\n\na.thumbnail {\n  -webkit-transition: -webkit-box-shadow 200ms ease-out;\n  transition: -webkit-box-shadow 200ms ease-out;\n  transition: box-shadow 200ms ease-out;\n  transition: box-shadow 200ms ease-out, -webkit-box-shadow 200ms ease-out; }\n  a.thumbnail:hover, a.thumbnail:focus {\n    -webkit-box-shadow: 0 0 6px 1px rgba(23, 121, 186, 0.5);\n            box-shadow: 0 0 6px 1px rgba(23, 121, 186, 0.5); }\n  a.thumbnail image {\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n\n.menu {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n  [data-whatinput='mouse'] .menu li {\n    outline: 0; }\n  .menu a,\n  .menu .button {\n    line-height: 1;\n    text-decoration: none;\n    display: block;\n    padding: 0.7rem 1rem; }\n  .menu input,\n  .menu select,\n  .menu a,\n  .menu button {\n    margin-bottom: 0; }\n  .menu input {\n    display: inline-block; }\n  .menu, .menu.horizontal {\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .menu.vertical {\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  .menu.expanded li {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 0px;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0px; }\n  .menu.simple {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .menu.simple li + li {\n      margin-left: 1rem; }\n    .menu.simple a {\n      padding: 0; }\n  @media print, screen and (min-width: 40em) {\n    .menu.medium-horizontal {\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: row;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n    .menu.medium-vertical {\n      -webkit-flex-wrap: nowrap;\n          -ms-flex-wrap: nowrap;\n              flex-wrap: nowrap;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n    .menu.medium-expanded li {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px; }\n    .menu.medium-simple li {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px; } }\n  @media print, screen and (min-width: 64em) {\n    .menu.large-horizontal {\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: row;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n    .menu.large-vertical {\n      -webkit-flex-wrap: nowrap;\n          -ms-flex-wrap: nowrap;\n              flex-wrap: nowrap;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n    .menu.large-expanded li {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px; }\n    .menu.large-simple li {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 0px;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0px; } }\n  .menu.nested {\n    margin-right: 0;\n    margin-left: 1rem; }\n  .menu.icons a {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  .menu.icon-top a, .menu.icon-right a, .menu.icon-bottom a, .menu.icon-left a {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  .menu.icon-left li a {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap; }\n    .menu.icon-left li a img,\n    .menu.icon-left li a i,\n    .menu.icon-left li a svg {\n      margin-right: 0.25rem; }\n  .menu.icon-right li a {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-flow: row nowrap;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap; }\n    .menu.icon-right li a img,\n    .menu.icon-right li a i,\n    .menu.icon-right li a svg {\n      margin-left: 0.25rem; }\n  .menu.icon-top li a {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-flow: column nowrap;\n        -ms-flex-flow: column nowrap;\n            flex-flow: column nowrap; }\n    .menu.icon-top li a img,\n    .menu.icon-top li a i,\n    .menu.icon-top li a svg {\n      -webkit-align-self: stretch;\n          -ms-flex-item-align: stretch;\n              align-self: stretch;\n      margin-bottom: 0.25rem;\n      text-align: center; }\n  .menu.icon-bottom li a {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-flow: column nowrap;\n        -ms-flex-flow: column nowrap;\n            flex-flow: column nowrap; }\n    .menu.icon-bottom li a img,\n    .menu.icon-bottom li a i,\n    .menu.icon-bottom li a svg {\n      -webkit-align-self: stretch;\n          -ms-flex-item-align: stretch;\n              align-self: stretch;\n      margin-bottom: 0.25rem;\n      text-align: center; }\n  .menu .is-active > a {\n    background: #1779ba;\n    color: #fefefe; }\n  .menu .active > a {\n    background: #1779ba;\n    color: #fefefe; }\n  .menu.align-left {\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .menu.align-right li {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n    .menu.align-right li .submenu li {\n      -webkit-box-pack: start;\n      -webkit-justify-content: flex-start;\n          -ms-flex-pack: start;\n              justify-content: flex-start; }\n  .menu.align-right.vertical li {\n    display: block;\n    text-align: right; }\n    .menu.align-right.vertical li .submenu li {\n      text-align: right; }\n  .menu.align-right .nested {\n    margin-right: 1rem;\n    margin-left: 0; }\n  .menu.align-center li {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .menu.align-center li .submenu li {\n      -webkit-box-pack: start;\n      -webkit-justify-content: flex-start;\n          -ms-flex-pack: start;\n              justify-content: flex-start; }\n  .menu .menu-text {\n    padding: 0.7rem 1rem;\n    font-weight: bold;\n    line-height: 1;\n    color: inherit; }\n\n.menu-centered > .menu {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .menu-centered > .menu li {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .menu-centered > .menu li .submenu li {\n      -webkit-box-pack: start;\n      -webkit-justify-content: flex-start;\n          -ms-flex-pack: start;\n              justify-content: flex-start; }\n\n.no-js [data-responsive-menu] ul {\n  display: none; }\n\n.menu-icon {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 16px;\n  cursor: pointer; }\n  .menu-icon::after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    height: 2px;\n    background: #fefefe;\n    -webkit-box-shadow: 0 7px 0 #fefefe, 0 14px 0 #fefefe;\n            box-shadow: 0 7px 0 #fefefe, 0 14px 0 #fefefe;\n    content: ''; }\n  .menu-icon:hover::after {\n    background: #cacaca;\n    -webkit-box-shadow: 0 7px 0 #cacaca, 0 14px 0 #cacaca;\n            box-shadow: 0 7px 0 #cacaca, 0 14px 0 #cacaca; }\n\n.menu-icon.dark {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 16px;\n  cursor: pointer; }\n  .menu-icon.dark::after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    height: 2px;\n    background: #0a0a0a;\n    -webkit-box-shadow: 0 7px 0 #0a0a0a, 0 14px 0 #0a0a0a;\n            box-shadow: 0 7px 0 #0a0a0a, 0 14px 0 #0a0a0a;\n    content: ''; }\n  .menu-icon.dark:hover::after {\n    background: #8a8a8a;\n    -webkit-box-shadow: 0 7px 0 #8a8a8a, 0 14px 0 #8a8a8a;\n            box-shadow: 0 7px 0 #8a8a8a, 0 14px 0 #8a8a8a; }\n\n.accordion-menu li {\n  width: 100%; }\n\n.accordion-menu a {\n  padding: 0.7rem 1rem; }\n\n.accordion-menu .is-accordion-submenu a {\n  padding: 0.7rem 1rem; }\n\n.accordion-menu .nested.is-accordion-submenu {\n  margin-right: 0;\n  margin-left: 1rem; }\n\n.accordion-menu.align-right .nested.is-accordion-submenu {\n  margin-right: 1rem;\n  margin-left: 0; }\n\n.accordion-menu .is-accordion-submenu-parent:not(.has-submenu-toggle) > a {\n  position: relative; }\n  .accordion-menu .is-accordion-submenu-parent:not(.has-submenu-toggle) > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #1779ba transparent transparent;\n    position: absolute;\n    top: 50%;\n    margin-top: -3px;\n    right: 1rem; }\n\n.accordion-menu.align-left .is-accordion-submenu-parent > a::after {\n  right: 1rem;\n  left: auto; }\n\n.accordion-menu.align-right .is-accordion-submenu-parent > a::after {\n  right: auto;\n  left: 1rem; }\n\n.accordion-menu .is-accordion-submenu-parent[aria-expanded='true'] > a::after {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n  -webkit-transform-origin: 50% 50%;\n      -ms-transform-origin: 50% 50%;\n          transform-origin: 50% 50%; }\n\n.is-accordion-submenu-parent {\n  position: relative; }\n\n.has-submenu-toggle > a {\n  margin-right: 40px; }\n\n.submenu-toggle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 40px;\n  height: 40px;\n  cursor: pointer; }\n  .submenu-toggle::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #1779ba transparent transparent;\n    top: 0;\n    bottom: 0;\n    margin: auto; }\n\n.submenu-toggle[aria-expanded='true']::after {\n  -webkit-transform: scaleY(-1);\n      -ms-transform: scaleY(-1);\n          transform: scaleY(-1);\n  -webkit-transform-origin: 50% 50%;\n      -ms-transform-origin: 50% 50%;\n          transform-origin: 50% 50%; }\n\n.submenu-toggle-text {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0; }\n\n.is-drilldown {\n  position: relative;\n  overflow: hidden; }\n  .is-drilldown li {\n    display: block; }\n  .is-drilldown.animate-height {\n    -webkit-transition: height 0.5s;\n    transition: height 0.5s; }\n\n.drilldown a {\n  padding: 0.7rem 1rem;\n  background: #fefefe; }\n\n.drilldown .is-drilldown-submenu {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  z-index: -1;\n  width: 100%;\n  background: #fefefe;\n  -webkit-transition: -webkit-transform 0.15s linear;\n  transition: -webkit-transform 0.15s linear;\n  transition: transform 0.15s linear;\n  transition: transform 0.15s linear, -webkit-transform 0.15s linear; }\n  .drilldown .is-drilldown-submenu.is-active {\n    z-index: 1;\n    display: block;\n    -webkit-transform: translateX(-100%);\n        -ms-transform: translateX(-100%);\n            transform: translateX(-100%); }\n  .drilldown .is-drilldown-submenu.is-closing {\n    -webkit-transform: translateX(100%);\n        -ms-transform: translateX(100%);\n            transform: translateX(100%); }\n  .drilldown .is-drilldown-submenu a {\n    padding: 0.7rem 1rem; }\n\n.drilldown .nested.is-drilldown-submenu {\n  margin-right: 0;\n  margin-left: 0; }\n\n.drilldown .drilldown-submenu-cover-previous {\n  min-height: 100%; }\n\n.drilldown .is-drilldown-submenu-parent > a {\n  position: relative; }\n  .drilldown .is-drilldown-submenu-parent > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-right-width: 0;\n    border-left-style: solid;\n    border-color: transparent transparent transparent #1779ba;\n    position: absolute;\n    top: 50%;\n    margin-top: -6px;\n    right: 1rem; }\n\n.drilldown.align-left .is-drilldown-submenu-parent > a::after {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-right-width: 0;\n  border-left-style: solid;\n  border-color: transparent transparent transparent #1779ba;\n  right: 1rem;\n  left: auto; }\n\n.drilldown.align-right .is-drilldown-submenu-parent > a::after {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-left-width: 0;\n  border-right-style: solid;\n  border-color: transparent #1779ba transparent transparent;\n  right: auto;\n  left: 1rem; }\n\n.drilldown .js-drilldown-back > a::before {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-left-width: 0;\n  border-right-style: solid;\n  border-color: transparent #1779ba transparent transparent;\n  border-left-width: 0;\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 0.75rem; }\n\n.dropdown.menu > li.opens-left > .is-dropdown-submenu {\n  top: 100%;\n  right: 0;\n  left: auto; }\n\n.dropdown.menu > li.opens-right > .is-dropdown-submenu {\n  top: 100%;\n  right: auto;\n  left: 0; }\n\n.dropdown.menu > li.is-dropdown-submenu-parent > a {\n  position: relative;\n  padding-right: 1.5rem; }\n\n.dropdown.menu > li.is-dropdown-submenu-parent > a::after {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-bottom-width: 0;\n  border-top-style: solid;\n  border-color: #1779ba transparent transparent;\n  right: 5px;\n  left: auto;\n  margin-top: -3px; }\n\n[data-whatinput='mouse'] .dropdown.menu a {\n  outline: 0; }\n\n.dropdown.menu > li > a {\n  padding: 0.7rem 1rem; }\n\n.dropdown.menu > li.is-active > a {\n  background: transparent;\n  color: #1779ba; }\n\n.no-js .dropdown.menu ul {\n  display: none; }\n\n.dropdown.menu .nested.is-dropdown-submenu {\n  margin-right: 0;\n  margin-left: 0; }\n\n.dropdown.menu.vertical > li .is-dropdown-submenu {\n  top: 0; }\n\n.dropdown.menu.vertical > li.opens-left > .is-dropdown-submenu {\n  top: 0;\n  right: 100%;\n  left: auto; }\n\n.dropdown.menu.vertical > li.opens-right > .is-dropdown-submenu {\n  right: auto;\n  left: 100%; }\n\n.dropdown.menu.vertical > li > a::after {\n  right: 14px; }\n\n.dropdown.menu.vertical > li.opens-left > a::after {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-left-width: 0;\n  border-right-style: solid;\n  border-color: transparent #1779ba transparent transparent;\n  right: auto;\n  left: 5px; }\n\n.dropdown.menu.vertical > li.opens-right > a::after {\n  display: block;\n  width: 0;\n  height: 0;\n  border: inset 6px;\n  content: '';\n  border-right-width: 0;\n  border-left-style: solid;\n  border-color: transparent transparent transparent #1779ba; }\n\n@media print, screen and (min-width: 40em) {\n  .dropdown.menu.medium-horizontal > li.opens-left > .is-dropdown-submenu {\n    top: 100%;\n    right: 0;\n    left: auto; }\n  .dropdown.menu.medium-horizontal > li.opens-right > .is-dropdown-submenu {\n    top: 100%;\n    right: auto;\n    left: 0; }\n  .dropdown.menu.medium-horizontal > li.is-dropdown-submenu-parent > a {\n    position: relative;\n    padding-right: 1.5rem; }\n  .dropdown.menu.medium-horizontal > li.is-dropdown-submenu-parent > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #1779ba transparent transparent;\n    right: 5px;\n    left: auto;\n    margin-top: -3px; }\n  .dropdown.menu.medium-vertical > li .is-dropdown-submenu {\n    top: 0; }\n  .dropdown.menu.medium-vertical > li.opens-left > .is-dropdown-submenu {\n    top: 0;\n    right: 100%;\n    left: auto; }\n  .dropdown.menu.medium-vertical > li.opens-right > .is-dropdown-submenu {\n    right: auto;\n    left: 100%; }\n  .dropdown.menu.medium-vertical > li > a::after {\n    right: 14px; }\n  .dropdown.menu.medium-vertical > li.opens-left > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-left-width: 0;\n    border-right-style: solid;\n    border-color: transparent #1779ba transparent transparent;\n    right: auto;\n    left: 5px; }\n  .dropdown.menu.medium-vertical > li.opens-right > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-right-width: 0;\n    border-left-style: solid;\n    border-color: transparent transparent transparent #1779ba; } }\n\n@media print, screen and (min-width: 64em) {\n  .dropdown.menu.large-horizontal > li.opens-left > .is-dropdown-submenu {\n    top: 100%;\n    right: 0;\n    left: auto; }\n  .dropdown.menu.large-horizontal > li.opens-right > .is-dropdown-submenu {\n    top: 100%;\n    right: auto;\n    left: 0; }\n  .dropdown.menu.large-horizontal > li.is-dropdown-submenu-parent > a {\n    position: relative;\n    padding-right: 1.5rem; }\n  .dropdown.menu.large-horizontal > li.is-dropdown-submenu-parent > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-color: #1779ba transparent transparent;\n    right: 5px;\n    left: auto;\n    margin-top: -3px; }\n  .dropdown.menu.large-vertical > li .is-dropdown-submenu {\n    top: 0; }\n  .dropdown.menu.large-vertical > li.opens-left > .is-dropdown-submenu {\n    top: 0;\n    right: 100%;\n    left: auto; }\n  .dropdown.menu.large-vertical > li.opens-right > .is-dropdown-submenu {\n    right: auto;\n    left: 100%; }\n  .dropdown.menu.large-vertical > li > a::after {\n    right: 14px; }\n  .dropdown.menu.large-vertical > li.opens-left > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-left-width: 0;\n    border-right-style: solid;\n    border-color: transparent #1779ba transparent transparent;\n    right: auto;\n    left: 5px; }\n  .dropdown.menu.large-vertical > li.opens-right > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-right-width: 0;\n    border-left-style: solid;\n    border-color: transparent transparent transparent #1779ba; } }\n\n.dropdown.menu.align-right .is-dropdown-submenu.first-sub {\n  top: 100%;\n  right: 0;\n  left: auto; }\n\n.is-dropdown-menu.vertical {\n  width: 100px; }\n  .is-dropdown-menu.vertical.align-right {\n    float: right; }\n\n.is-dropdown-submenu-parent {\n  position: relative; }\n  .is-dropdown-submenu-parent a::after {\n    position: absolute;\n    top: 50%;\n    right: 5px;\n    left: auto;\n    margin-top: -6px; }\n  .is-dropdown-submenu-parent.opens-inner > .is-dropdown-submenu {\n    top: 100%;\n    left: auto; }\n  .is-dropdown-submenu-parent.opens-left > .is-dropdown-submenu {\n    right: 100%;\n    left: auto; }\n  .is-dropdown-submenu-parent.opens-right > .is-dropdown-submenu {\n    right: auto;\n    left: 100%; }\n\n.is-dropdown-submenu {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  z-index: 1;\n  display: none;\n  min-width: 200px;\n  border: 1px solid #cacaca;\n  background: #fefefe; }\n  .dropdown .is-dropdown-submenu a {\n    padding: 0.7rem 1rem; }\n  .is-dropdown-submenu .is-dropdown-submenu-parent > a::after {\n    right: 14px; }\n  .is-dropdown-submenu .is-dropdown-submenu-parent.opens-left > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-left-width: 0;\n    border-right-style: solid;\n    border-color: transparent #1779ba transparent transparent;\n    right: auto;\n    left: 5px; }\n  .is-dropdown-submenu .is-dropdown-submenu-parent.opens-right > a::after {\n    display: block;\n    width: 0;\n    height: 0;\n    border: inset 6px;\n    content: '';\n    border-right-width: 0;\n    border-left-style: solid;\n    border-color: transparent transparent transparent #1779ba; }\n  .is-dropdown-submenu .is-dropdown-submenu {\n    margin-top: -1px; }\n  .is-dropdown-submenu > li {\n    width: 100%; }\n  .is-dropdown-submenu.js-dropdown-active {\n    display: block; }\n\n.is-off-canvas-open {\n  overflow: hidden; }\n\n.js-off-canvas-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 11;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: opacity 0.5s ease, visibility 0.5s ease;\n  transition: opacity 0.5s ease, visibility 0.5s ease;\n  background: rgba(254, 254, 254, 0.25);\n  opacity: 0;\n  visibility: hidden;\n  overflow: hidden; }\n  .js-off-canvas-overlay.is-visible {\n    opacity: 1;\n    visibility: visible; }\n  .js-off-canvas-overlay.is-closable {\n    cursor: pointer; }\n  .js-off-canvas-overlay.is-overlay-absolute {\n    position: absolute; }\n  .js-off-canvas-overlay.is-overlay-fixed {\n    position: fixed; }\n\n.off-canvas-wrapper {\n  position: relative;\n  overflow: hidden; }\n\n.off-canvas {\n  position: fixed;\n  z-index: 12;\n  -webkit-transition: -webkit-transform 0.5s ease;\n  transition: -webkit-transform 0.5s ease;\n  transition: transform 0.5s ease;\n  transition: transform 0.5s ease, -webkit-transform 0.5s ease;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  background: #e6e6e6; }\n  [data-whatinput='mouse'] .off-canvas {\n    outline: 0; }\n  .off-canvas.is-transition-push {\n    z-index: 12; }\n  .off-canvas.is-closed {\n    visibility: hidden; }\n  .off-canvas.is-transition-overlap {\n    z-index: 13; }\n    .off-canvas.is-transition-overlap.is-open {\n      -webkit-box-shadow: 0 0 10px rgba(10, 10, 10, 0.7);\n              box-shadow: 0 0 10px rgba(10, 10, 10, 0.7); }\n  .off-canvas.is-open {\n    -webkit-transform: translate(0, 0);\n        -ms-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.off-canvas-absolute {\n  position: absolute;\n  z-index: 12;\n  -webkit-transition: -webkit-transform 0.5s ease;\n  transition: -webkit-transform 0.5s ease;\n  transition: transform 0.5s ease;\n  transition: transform 0.5s ease, -webkit-transform 0.5s ease;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  background: #e6e6e6; }\n  [data-whatinput='mouse'] .off-canvas-absolute {\n    outline: 0; }\n  .off-canvas-absolute.is-transition-push {\n    z-index: 12; }\n  .off-canvas-absolute.is-closed {\n    visibility: hidden; }\n  .off-canvas-absolute.is-transition-overlap {\n    z-index: 13; }\n    .off-canvas-absolute.is-transition-overlap.is-open {\n      -webkit-box-shadow: 0 0 10px rgba(10, 10, 10, 0.7);\n              box-shadow: 0 0 10px rgba(10, 10, 10, 0.7); }\n  .off-canvas-absolute.is-open {\n    -webkit-transform: translate(0, 0);\n        -ms-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.position-left {\n  top: 0;\n  left: 0;\n  height: 100%;\n  overflow-y: auto;\n  width: 250px;\n  -webkit-transform: translateX(-250px);\n      -ms-transform: translateX(-250px);\n          transform: translateX(-250px); }\n  .off-canvas-content .off-canvas.position-left {\n    -webkit-transform: translateX(-250px);\n        -ms-transform: translateX(-250px);\n            transform: translateX(-250px); }\n    .off-canvas-content .off-canvas.position-left.is-transition-overlap.is-open {\n      -webkit-transform: translate(0, 0);\n          -ms-transform: translate(0, 0);\n              transform: translate(0, 0); }\n  .off-canvas-content.is-open-left.has-transition-push {\n    -webkit-transform: translateX(250px);\n        -ms-transform: translateX(250px);\n            transform: translateX(250px); }\n  .position-left.is-transition-push {\n    -webkit-box-shadow: inset -13px 0 20px -13px rgba(10, 10, 10, 0.25);\n            box-shadow: inset -13px 0 20px -13px rgba(10, 10, 10, 0.25); }\n\n.position-right {\n  top: 0;\n  right: 0;\n  height: 100%;\n  overflow-y: auto;\n  width: 250px;\n  -webkit-transform: translateX(250px);\n      -ms-transform: translateX(250px);\n          transform: translateX(250px); }\n  .off-canvas-content .off-canvas.position-right {\n    -webkit-transform: translateX(250px);\n        -ms-transform: translateX(250px);\n            transform: translateX(250px); }\n    .off-canvas-content .off-canvas.position-right.is-transition-overlap.is-open {\n      -webkit-transform: translate(0, 0);\n          -ms-transform: translate(0, 0);\n              transform: translate(0, 0); }\n  .off-canvas-content.is-open-right.has-transition-push {\n    -webkit-transform: translateX(-250px);\n        -ms-transform: translateX(-250px);\n            transform: translateX(-250px); }\n  .position-right.is-transition-push {\n    -webkit-box-shadow: inset 13px 0 20px -13px rgba(10, 10, 10, 0.25);\n            box-shadow: inset 13px 0 20px -13px rgba(10, 10, 10, 0.25); }\n\n.position-top {\n  top: 0;\n  left: 0;\n  width: 100%;\n  overflow-x: auto;\n  height: 250px;\n  -webkit-transform: translateY(-250px);\n      -ms-transform: translateY(-250px);\n          transform: translateY(-250px); }\n  .off-canvas-content .off-canvas.position-top {\n    -webkit-transform: translateY(-250px);\n        -ms-transform: translateY(-250px);\n            transform: translateY(-250px); }\n    .off-canvas-content .off-canvas.position-top.is-transition-overlap.is-open {\n      -webkit-transform: translate(0, 0);\n          -ms-transform: translate(0, 0);\n              transform: translate(0, 0); }\n  .off-canvas-content.is-open-top.has-transition-push {\n    -webkit-transform: translateY(250px);\n        -ms-transform: translateY(250px);\n            transform: translateY(250px); }\n  .position-top.is-transition-push {\n    -webkit-box-shadow: inset 0 -13px 20px -13px rgba(10, 10, 10, 0.25);\n            box-shadow: inset 0 -13px 20px -13px rgba(10, 10, 10, 0.25); }\n\n.position-bottom {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  overflow-x: auto;\n  height: 250px;\n  -webkit-transform: translateY(250px);\n      -ms-transform: translateY(250px);\n          transform: translateY(250px); }\n  .off-canvas-content .off-canvas.position-bottom {\n    -webkit-transform: translateY(250px);\n        -ms-transform: translateY(250px);\n            transform: translateY(250px); }\n    .off-canvas-content .off-canvas.position-bottom.is-transition-overlap.is-open {\n      -webkit-transform: translate(0, 0);\n          -ms-transform: translate(0, 0);\n              transform: translate(0, 0); }\n  .off-canvas-content.is-open-bottom.has-transition-push {\n    -webkit-transform: translateY(-250px);\n        -ms-transform: translateY(-250px);\n            transform: translateY(-250px); }\n  .position-bottom.is-transition-push {\n    -webkit-box-shadow: inset 0 13px 20px -13px rgba(10, 10, 10, 0.25);\n            box-shadow: inset 0 13px 20px -13px rgba(10, 10, 10, 0.25); }\n\n.off-canvas-content {\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n  -webkit-transition: -webkit-transform 0.5s ease;\n  transition: -webkit-transform 0.5s ease;\n  transition: transform 0.5s ease;\n  transition: transform 0.5s ease, -webkit-transform 0.5s ease;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n  .off-canvas-content.has-transition-push {\n    -webkit-transform: translate(0, 0);\n        -ms-transform: translate(0, 0);\n            transform: translate(0, 0); }\n  .off-canvas-content .off-canvas.is-open {\n    -webkit-transform: translate(0, 0);\n        -ms-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n@media print, screen and (min-width: 40em) {\n  .position-left.reveal-for-medium {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-left.reveal-for-medium .close-button {\n      display: none; }\n    .off-canvas-content .position-left.reveal-for-medium {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-left {\n      margin-left: 250px; }\n    .position-left.reveal-for-medium ~ .off-canvas-content {\n      margin-left: 250px; }\n  .position-right.reveal-for-medium {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-right.reveal-for-medium .close-button {\n      display: none; }\n    .off-canvas-content .position-right.reveal-for-medium {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-right {\n      margin-right: 250px; }\n    .position-right.reveal-for-medium ~ .off-canvas-content {\n      margin-right: 250px; }\n  .position-top.reveal-for-medium {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-top.reveal-for-medium .close-button {\n      display: none; }\n    .off-canvas-content .position-top.reveal-for-medium {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-top {\n      margin-top: 250px; }\n    .position-top.reveal-for-medium ~ .off-canvas-content {\n      margin-top: 250px; }\n  .position-bottom.reveal-for-medium {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-bottom.reveal-for-medium .close-button {\n      display: none; }\n    .off-canvas-content .position-bottom.reveal-for-medium {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-bottom {\n      margin-bottom: 250px; }\n    .position-bottom.reveal-for-medium ~ .off-canvas-content {\n      margin-bottom: 250px; } }\n\n@media print, screen and (min-width: 64em) {\n  .position-left.reveal-for-large {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-left.reveal-for-large .close-button {\n      display: none; }\n    .off-canvas-content .position-left.reveal-for-large {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-left {\n      margin-left: 250px; }\n    .position-left.reveal-for-large ~ .off-canvas-content {\n      margin-left: 250px; }\n  .position-right.reveal-for-large {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-right.reveal-for-large .close-button {\n      display: none; }\n    .off-canvas-content .position-right.reveal-for-large {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-right {\n      margin-right: 250px; }\n    .position-right.reveal-for-large ~ .off-canvas-content {\n      margin-right: 250px; }\n  .position-top.reveal-for-large {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-top.reveal-for-large .close-button {\n      display: none; }\n    .off-canvas-content .position-top.reveal-for-large {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-top {\n      margin-top: 250px; }\n    .position-top.reveal-for-large ~ .off-canvas-content {\n      margin-top: 250px; }\n  .position-bottom.reveal-for-large {\n    -webkit-transform: none;\n        -ms-transform: none;\n            transform: none;\n    z-index: 12;\n    -webkit-transition: none;\n    transition: none;\n    visibility: visible; }\n    .position-bottom.reveal-for-large .close-button {\n      display: none; }\n    .off-canvas-content .position-bottom.reveal-for-large {\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas-content.has-reveal-bottom {\n      margin-bottom: 250px; }\n    .position-bottom.reveal-for-large ~ .off-canvas-content {\n      margin-bottom: 250px; } }\n\n@media print, screen and (min-width: 40em) {\n  .off-canvas.in-canvas-for-medium {\n    visibility: visible;\n    height: auto;\n    position: static;\n    background: none;\n    width: auto;\n    overflow: visible;\n    -webkit-transition: none;\n    transition: none; }\n    .off-canvas.in-canvas-for-medium.position-left, .off-canvas.in-canvas-for-medium.position-right, .off-canvas.in-canvas-for-medium.position-top, .off-canvas.in-canvas-for-medium.position-bottom {\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas.in-canvas-for-medium .close-button {\n      display: none; } }\n\n@media print, screen and (min-width: 64em) {\n  .off-canvas.in-canvas-for-large {\n    visibility: visible;\n    height: auto;\n    position: static;\n    background: none;\n    width: auto;\n    overflow: visible;\n    -webkit-transition: none;\n    transition: none; }\n    .off-canvas.in-canvas-for-large.position-left, .off-canvas.in-canvas-for-large.position-right, .off-canvas.in-canvas-for-large.position-top, .off-canvas.in-canvas-for-large.position-bottom {\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      -webkit-transform: none;\n          -ms-transform: none;\n              transform: none; }\n    .off-canvas.in-canvas-for-large .close-button {\n      display: none; } }\n\nhtml.is-reveal-open {\n  position: fixed;\n  width: 100%;\n  overflow-y: hidden; }\n  html.is-reveal-open.zf-has-scroll {\n    overflow-y: scroll; }\n  html.is-reveal-open body {\n    overflow-y: hidden; }\n\n.reveal-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1005;\n  display: none;\n  background-color: rgba(10, 10, 10, 0.45);\n  overflow-y: auto; }\n\n.reveal {\n  z-index: 1006;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  display: none;\n  padding: 1rem;\n  border: 1px solid #cacaca;\n  border-radius: 0;\n  background-color: #fefefe;\n  position: relative;\n  top: 100px;\n  margin-right: auto;\n  margin-left: auto;\n  overflow-y: auto; }\n  [data-whatinput='mouse'] .reveal {\n    outline: 0; }\n  @media print, screen and (min-width: 40em) {\n    .reveal {\n      min-height: 0; } }\n  .reveal .column {\n    min-width: 0; }\n  .reveal > :last-child {\n    margin-bottom: 0; }\n  @media print, screen and (min-width: 40em) {\n    .reveal {\n      width: 600px;\n      max-width: 75rem; } }\n  .reveal.collapse {\n    padding: 0; }\n  @media print, screen and (min-width: 40em) {\n    .reveal.tiny {\n      width: 30%;\n      max-width: 75rem; } }\n  @media print, screen and (min-width: 40em) {\n    .reveal.small {\n      width: 50%;\n      max-width: 75rem; } }\n  @media print, screen and (min-width: 40em) {\n    .reveal.large {\n      width: 90%;\n      max-width: 75rem; } }\n  .reveal.full {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    max-width: none;\n    height: 100%;\n    min-height: 100%;\n    margin-left: 0;\n    border: 0;\n    border-radius: 0; }\n  @media screen and (max-width: 39.99875em) {\n    .reveal {\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      max-width: none;\n      height: 100%;\n      min-height: 100%;\n      margin-left: 0;\n      border: 0;\n      border-radius: 0; } }\n  .reveal.without-overlay {\n    position: fixed; }\n\n.sticky-container {\n  position: relative; }\n\n.sticky {\n  position: relative;\n  z-index: 0;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n.sticky.is-stuck {\n  position: fixed;\n  z-index: 5;\n  width: 100%; }\n  .sticky.is-stuck.is-at-top {\n    top: 0; }\n  .sticky.is-stuck.is-at-bottom {\n    bottom: 0; }\n\n.sticky.is-anchored {\n  position: relative;\n  right: auto;\n  left: auto; }\n  .sticky.is-anchored.is-at-bottom {\n    bottom: 0; }\n\n.title-bar {\n  padding: 0.5rem;\n  background: #0a0a0a;\n  color: #fefefe;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .title-bar .menu-icon {\n    margin-left: 0.25rem;\n    margin-right: 0.25rem; }\n\n.title-bar-left,\n.title-bar-right {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0px;\n      -ms-flex: 1 1 0px;\n          flex: 1 1 0px; }\n\n.title-bar-right {\n  text-align: right; }\n\n.title-bar-title {\n  display: inline-block;\n  vertical-align: middle;\n  font-weight: bold; }\n\n.top-bar {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.5rem;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n  .top-bar,\n  .top-bar ul {\n    background-color: #e6e6e6; }\n  .top-bar input {\n    max-width: 200px;\n    margin-right: 1rem; }\n  .top-bar .input-group-field {\n    width: 100%;\n    margin-right: 0; }\n  .top-bar input.button {\n    width: auto; }\n  .top-bar .top-bar-left,\n  .top-bar .top-bar-right {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  @media print, screen and (min-width: 40em) {\n    .top-bar {\n      -webkit-flex-wrap: nowrap;\n          -ms-flex-wrap: nowrap;\n              flex-wrap: nowrap; }\n      .top-bar .top-bar-left {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1 1 auto;\n            -ms-flex: 1 1 auto;\n                flex: 1 1 auto;\n        margin-right: auto; }\n      .top-bar .top-bar-right {\n        -webkit-box-flex: 0;\n        -webkit-flex: 0 1 auto;\n            -ms-flex: 0 1 auto;\n                flex: 0 1 auto;\n        margin-left: auto; } }\n  @media screen and (max-width: 63.99875em) {\n    .top-bar.stacked-for-medium {\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; }\n      .top-bar.stacked-for-medium .top-bar-left,\n      .top-bar.stacked-for-medium .top-bar-right {\n        -webkit-box-flex: 0;\n        -webkit-flex: 0 0 100%;\n            -ms-flex: 0 0 100%;\n                flex: 0 0 100%;\n        max-width: 100%; } }\n  @media screen and (max-width: 74.99875em) {\n    .top-bar.stacked-for-large {\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; }\n      .top-bar.stacked-for-large .top-bar-left,\n      .top-bar.stacked-for-large .top-bar-right {\n        -webkit-box-flex: 0;\n        -webkit-flex: 0 0 100%;\n            -ms-flex: 0 0 100%;\n                flex: 0 0 100%;\n        max-width: 100%; } }\n\n.top-bar-title {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  margin: 0.5rem 1rem 0.5rem 0; }\n\n.top-bar-left,\n.top-bar-right {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto; }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-center {\n  display: block;\n  margin-right: auto;\n  margin-left: auto; }\n\n.clearfix::before, .clearfix::after {\n  display: table;\n  content: ' ';\n  -webkit-flex-basis: 0;\n      -ms-flex-preferred-size: 0;\n          flex-basis: 0;\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 1;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.clearfix::after {\n  clear: both; }\n\n.align-left {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n\n.align-right {\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n.align-center {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.align-justify {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n\n.align-spaced {\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around; }\n\n.align-left.vertical.menu > li > a {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n\n.align-right.vertical.menu > li > a {\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n.align-center.vertical.menu > li > a {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.align-top {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.align-self-top {\n  -webkit-align-self: flex-start;\n      -ms-flex-item-align: start;\n          align-self: flex-start; }\n\n.align-bottom {\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n      -ms-flex-align: end;\n          align-items: flex-end; }\n\n.align-self-bottom {\n  -webkit-align-self: flex-end;\n      -ms-flex-item-align: end;\n          align-self: flex-end; }\n\n.align-middle {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.align-self-middle {\n  -webkit-align-self: center;\n      -ms-flex-item-align: center;\n          align-self: center; }\n\n.align-stretch {\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n\n.align-self-stretch {\n  -webkit-align-self: stretch;\n      -ms-flex-item-align: stretch;\n          align-self: stretch; }\n\n.align-center-middle {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-align-content: center;\n      -ms-flex-line-pack: center;\n          align-content: center; }\n\n.small-order-1 {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 1;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.small-order-2 {\n  -webkit-box-ordinal-group: 3;\n  -webkit-order: 2;\n      -ms-flex-order: 2;\n          order: 2; }\n\n.small-order-3 {\n  -webkit-box-ordinal-group: 4;\n  -webkit-order: 3;\n      -ms-flex-order: 3;\n          order: 3; }\n\n.small-order-4 {\n  -webkit-box-ordinal-group: 5;\n  -webkit-order: 4;\n      -ms-flex-order: 4;\n          order: 4; }\n\n.small-order-5 {\n  -webkit-box-ordinal-group: 6;\n  -webkit-order: 5;\n      -ms-flex-order: 5;\n          order: 5; }\n\n.small-order-6 {\n  -webkit-box-ordinal-group: 7;\n  -webkit-order: 6;\n      -ms-flex-order: 6;\n          order: 6; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-order-1 {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .medium-order-2 {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  .medium-order-3 {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  .medium-order-4 {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  .medium-order-5 {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  .medium-order-6 {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-order-1 {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  .large-order-2 {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  .large-order-3 {\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  .large-order-4 {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  .large-order-5 {\n    -webkit-box-ordinal-group: 6;\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  .large-order-6 {\n    -webkit-box-ordinal-group: 7;\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; } }\n\n.flex-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n.flex-child-auto {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto; }\n\n.flex-child-grow {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 auto;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto; }\n\n.flex-child-shrink {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto; }\n\n.flex-dir-row {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n\n.flex-dir-row-reverse {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n  -webkit-flex-direction: row-reverse;\n      -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse; }\n\n.flex-dir-column {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.flex-dir-column-reverse {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n  -webkit-flex-direction: column-reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse; }\n\n@media print, screen and (min-width: 40em) {\n  .medium-flex-container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  .medium-flex-child-auto {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto; }\n  .medium-flex-child-grow {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto; }\n  .medium-flex-child-shrink {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n  .medium-flex-dir-row {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .medium-flex-dir-row-reverse {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse; }\n  .medium-flex-dir-column {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  .medium-flex-dir-column-reverse {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse; } }\n\n@media print, screen and (min-width: 64em) {\n  .large-flex-container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  .large-flex-child-auto {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 auto;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto; }\n  .large-flex-child-grow {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 auto;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto; }\n  .large-flex-child-shrink {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 auto;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n  .large-flex-dir-row {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .large-flex-dir-row-reverse {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse; }\n  .large-flex-dir-column {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  .large-flex-dir-column-reverse {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse; } }\n\n.hide {\n  display: none !important; }\n\n.invisible {\n  visibility: hidden; }\n\n@media screen and (max-width: 39.99875em) {\n  .hide-for-small-only {\n    display: none !important; } }\n\n@media screen and (max-width: 0em), screen and (min-width: 40em) {\n  .show-for-small-only {\n    display: none !important; } }\n\n@media print, screen and (min-width: 40em) {\n  .hide-for-medium {\n    display: none !important; } }\n\n@media screen and (max-width: 39.99875em) {\n  .show-for-medium {\n    display: none !important; } }\n\n@media screen and (min-width: 40em) and (max-width: 63.99875em) {\n  .hide-for-medium-only {\n    display: none !important; } }\n\n@media screen and (max-width: 39.99875em), screen and (min-width: 64em) {\n  .show-for-medium-only {\n    display: none !important; } }\n\n@media print, screen and (min-width: 64em) {\n  .hide-for-large {\n    display: none !important; } }\n\n@media screen and (max-width: 63.99875em) {\n  .show-for-large {\n    display: none !important; } }\n\n@media screen and (min-width: 64em) and (max-width: 74.99875em) {\n  .hide-for-large-only {\n    display: none !important; } }\n\n@media screen and (max-width: 63.99875em), screen and (min-width: 75em) {\n  .show-for-large-only {\n    display: none !important; } }\n\n.show-for-sr,\n.show-on-focus {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0; }\n\n.show-on-focus:active, .show-on-focus:focus {\n  position: static !important;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal; }\n\n.show-for-landscape,\n.hide-for-portrait {\n  display: block !important; }\n  @media screen and (orientation: landscape) {\n    .show-for-landscape,\n    .hide-for-portrait {\n      display: block !important; } }\n  @media screen and (orientation: portrait) {\n    .show-for-landscape,\n    .hide-for-portrait {\n      display: none !important; } }\n\n.hide-for-landscape,\n.show-for-portrait {\n  display: none !important; }\n  @media screen and (orientation: landscape) {\n    .hide-for-landscape,\n    .show-for-portrait {\n      display: none !important; } }\n  @media screen and (orientation: portrait) {\n    .hide-for-landscape,\n    .show-for-portrait {\n      display: block !important; } }\n\n/*# sourceMappingURL=foundation.css.map */\n")
});
return ___scope___.entry = "dist/js/foundation.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */

var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";

var cssHandler = function(__filename, contents) {
	if (runningInBrowser) {
		var styleId = __filename.replace(/[\.\/]+/g, "-");
		if (styleId.charAt(0) === "-") styleId = styleId.substring(1);
		var exists = document.getElementById(styleId);
		if (!exists) {
			//<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
			var s = document.createElement(contents ? "style" : "link");
			s.id = styleId;
			s.type = "text/css";
			if (contents) {
				s.innerHTML = contents;
			} else {
				s.rel = "stylesheet";
				s.href = __filename;
			}
			document.getElementsByTagName("head")[0].appendChild(s);
		} else {
			if (contents) {
				exists.innerHTML = contents;
			}
		}
	}
};
if (typeof FuseBox !== "undefined" && runningInBrowser) {
	FuseBox.on("async", function(name) {
		if (/\.css$/.test(name)) {
			cssHandler(name);
			return false;
		}
	});
}

module.exports = cssHandler;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require("fusebox-websocket").SocketClient, bundleErrors = {}, outputElement = document.createElement("div"), styleElement = document.createElement("style"), minimizeToggleId = "fuse-box-toggle-minimized", hideButtonId = "fuse-box-hide", expandedOutputClass = "fuse-box-expanded-output", localStoragePrefix = "__fuse-box_";
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === "true" ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = "fuse-box-output";
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbps;&npbs;&nbps;")
                .replace(/ /g, "&nbsp;");
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join("");
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? "Expand" : "Minimize") + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? "" : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri
    });
    client.connect();
    client.on("page-reload", function (data) {
        return window.location.reload();
    });
    client.on("page-hmr", function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === "string") {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on("source-changed", function (data) {
        console.info("%cupdate \"" + data.path + "\"", "color: #237abe");
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, "").replace(/[\.\/]+/g, "-");
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement("link");
                node.id = fileId;
                node.type = "text/css";
                node.rel = "stylesheet";
                node.href = data.path;
                document.getElementsByTagName("head")[0].appendChild(node);
            }
        }
        if (data.type === "js" || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === "string") {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on("error", function (error) {
        console.log(error);
    });
    client.on("bundle-error", function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on("update-bundle-errors", function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === "https:" ? "wss://" : "ws://";
        var domain = location.hostname || "localhost";
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit("reconnect", { message: "Trying to reconnect" });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log("%cConnecting to fusebox HMR at " + this.url, "color: #237abe");
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit("error", data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log("%cConnected", "color: #237abe");
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: "Socket error" });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit("close", { message: "Socket closed" });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit("*", item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("process", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// From https://github.com/defunctzombie/node-process/blob/master/browser.js
// shim for using process in browser
if (FuseBox.isServer) {
	if (typeof __process_env__ !== "undefined") {
		Object.assign(global.process.env, __process_env__);
	}
	module.exports = global.process;
} else {
	// Object assign polyfill
	if (typeof Object.assign != "function") {
		Object.assign = function(target, varArgs) {
			// .length of function is 2
			"use strict";
			if (target == null) {
				// TypeError if undefined or null
				throw new TypeError("Cannot convert undefined or null to object");
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) {
					// Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		};
	}

	var productionEnv = false; //require('@system-env').production;

	var process = (module.exports = {});
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
		draining = false;
		if (currentQueue.length) {
			queue = currentQueue.concat(queue);
		} else {
			queueIndex = -1;
		}
		if (queue.length) {
			drainQueue();
		}
	}

	function drainQueue() {
		if (draining) {
			return;
		}
		var timeout = setTimeout(cleanUpNextTick);
		draining = true;

		var len = queue.length;
		while (len) {
			currentQueue = queue;
			queue = [];
			while (++queueIndex < len) {
				if (currentQueue) {
					currentQueue[queueIndex].run();
				}
			}
			queueIndex = -1;
			len = queue.length;
		}
		currentQueue = null;
		draining = false;
		clearTimeout(timeout);
	}

	process.nextTick = function(fun) {
		var args = new Array(arguments.length - 1);
		if (arguments.length > 1) {
			for (var i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i];
			}
		}
		queue.push(new Item(fun, args));
		if (queue.length === 1 && !draining) {
			setTimeout(drainQueue, 0);
		}
	};

	// v8 likes predictible objects
	function Item(fun, array) {
		this.fun = fun;
		this.array = array;
	}
	Item.prototype.run = function() {
		this.fun.apply(null, this.array);
	};
	process.title = "browser";
	process.browser = true;
	process.env = {
		NODE_ENV: productionEnv ? "production" : "development"
	};
	if (typeof __process_env__ !== "undefined") {
		Object.assign(process.env, __process_env__);
	}
	process.argv = [];
	process.version = ""; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function(name) {
		throw new Error("process.binding is not supported");
	};

	process.cwd = function() {
		return "/";
	};
	process.chdir = function(dir) {
		throw new Error("process.chdir is not supported");
	};
	process.umask = function() {
		return 0;
	};
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("stream", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

if (FuseBox.isServer) {
	module.exports = global.require("stream");
} else {
	module.exports = function() {};
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("tslib", {}, function(___scope___){
___scope___.file("tslib.js", function(exports, require, module, __filename, __dirname){

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
});

});
return ___scope___.entry = "tslib.js";
});
FuseBox.pkg("vue", {}, function(___scope___){
___scope___.file("dist/vue.js", function(exports, require, module, __filename, __dirname){

/*!
 * Vue.js v2.5.17
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.17';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

return Vue;

})));

});
return ___scope___.entry = "dist/vue.runtime.common.js";
});
FuseBox.import("fusebox-hot-reload").connect(5555, "", true)

FuseBox.import("default/app.js");
FuseBox.main("default/app.js");
})
((function(__root__){
if (__root__["FuseBox"]) return __root__["FuseBox"];
var $isServiceWorker = typeof ServiceWorkerGlobalScope !== "undefined";
var $isWebWorker = typeof WorkerGlobalScope !== "undefined";
var $isBrowser = (typeof window !== "undefined" && typeof window.navigator !== "undefined") || $isWebWorker || $isServiceWorker;
var g = $isBrowser ? ($isWebWorker || $isServiceWorker ? {} : window) : global;
if ($isBrowser) {
    g["global"] = $isWebWorker || $isServiceWorker ? {} : window;
}
__root__ = !$isBrowser || typeof __fbx__dnm__ !== "undefined" ? module.exports : __root__;
var $fsbx = $isBrowser
    ? $isWebWorker || $isServiceWorker
        ? {}
        : (window["__fsbx__"] = window["__fsbx__"] || {})
    : (g["$fsbx"] = g["$fsbx"] || {});
if (!$isBrowser) {
    g["require"] = require;
}
var $packages = ($fsbx.p = $fsbx.p || {});
var $events = ($fsbx.e = $fsbx.e || {});
function $getNodeModuleName(name) {
    var n = name.charCodeAt(0);
    var s = name.charCodeAt(1);
    if (!$isBrowser && s === 58) {
        return;
    }
    if ((n >= 97 && n <= 122) || n === 64) {
        if (n === 64) {
            var s_1 = name.split("/");
            var target = s_1.splice(2, s_1.length).join("/");
            return [s_1[0] + "/" + s_1[1], target || undefined];
        }
        var index = name.indexOf("/");
        if (index === -1) {
            return [name];
        }
        var first = name.substring(0, index);
        var second = name.substring(index + 1);
        return [first, second];
    }
}
function $getDir(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) || "./";
}
function $pathJoin() {
    var string = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        string[_i] = arguments[_i];
    }
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        parts = parts.concat(arguments[i].split("/"));
    }
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        if (!part || part === ".")
            continue;
        if (part === "..") {
            newParts.pop();
        }
        else {
            newParts.push(part);
        }
    }
    if (parts[0] === "")
        newParts.unshift("");
    return newParts.join("/") || (newParts.length ? "/" : ".");
}
function $ensureExtension(name) {
    var matched = name.match(/\.(\w{1,})$/);
    if (matched) {
        if (!matched[1]) {
            return name + ".js";
        }
        return name;
    }
    return name + ".js";
}
function $loadURL(url) {
    if ($isBrowser) {
        var d = document;
        var head = d.getElementsByTagName("head")[0];
        var target;
        if (/\.css$/.test(url)) {
            target = d.createElement("link");
            target.rel = "stylesheet";
            target.type = "text/css";
            target.href = url;
        }
        else {
            target = d.createElement("script");
            target.type = "text/javascript";
            target.src = url;
            target.async = true;
        }
        head.insertBefore(target, head.firstChild);
    }
}
function $loopObjKey(obj, func) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            func(key, obj[key]);
        }
    }
}
function $serverRequire(path) {
    return { server: require(path) };
}
function $getRef(name, o) {
    var basePath = o.path || "./";
    var pkgName = o.pkg || "default";
    var nodeModule = $getNodeModuleName(name);
    if (nodeModule) {
        basePath = "./";
        pkgName = nodeModule[0];
        if (o.v && o.v[pkgName]) {
            pkgName = pkgName + "@" + o.v[pkgName];
        }
        name = nodeModule[1];
    }
    if (name) {
        if (name.charCodeAt(0) === 126) {
            name = name.slice(2, name.length);
            basePath = "./";
        }
        else {
            if (!$isBrowser && (name.charCodeAt(0) === 47 || name.charCodeAt(1) === 58)) {
                return $serverRequire(name);
            }
        }
    }
    var pkg = $packages[pkgName];
    if (!pkg) {
        if ($isBrowser && FuseBox.target !== "electron") {
            throw "Package not found " + pkgName;
        }
        else {
            return $serverRequire(pkgName + (name ? "/" + name : ""));
        }
    }
    name = name ? name : "./" + pkg.s.entry;
    var filePath = $pathJoin(basePath, name);
    var validPath = $ensureExtension(filePath);
    var file = pkg.f[validPath];
    var wildcard;
    if (!file && validPath.indexOf("*") > -1) {
        wildcard = validPath;
    }
    if (!file && !wildcard) {
        validPath = $pathJoin(filePath, "/", "index.js");
        file = pkg.f[validPath];
        if (!file && filePath === ".") {
            validPath = (pkg.s && pkg.s.entry) || "index.js";
            file = pkg.f[validPath];
        }
        if (!file) {
            validPath = filePath + ".js";
            file = pkg.f[validPath];
        }
        if (!file) {
            file = pkg.f[filePath + ".jsx"];
        }
        if (!file) {
            validPath = filePath + "/index.jsx";
            file = pkg.f[validPath];
        }
    }
    return {
        file: file,
        wildcard: wildcard,
        pkgName: pkgName,
        versions: pkg.v,
        filePath: filePath,
        validPath: validPath,
    };
}
function $async(file, cb, o) {
    if (o === void 0) { o = {}; }
    if ($isBrowser) {
        if (o && o.ajaxed === file) {
            return console.error(file, "does not provide a module");
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var contentType = xmlhttp.getResponseHeader("Content-Type");
                    var content = xmlhttp.responseText;
                    if (/json/.test(contentType)) {
                        content = "module.exports = " + content;
                    }
                    else {
                        if (!/javascript/.test(contentType)) {
                            content = "module.exports = " + JSON.stringify(content);
                        }
                    }
                    var normalized = $pathJoin("./", file);
                    FuseBox.dynamic(normalized, content);
                    cb(FuseBox.import(file, { ajaxed: file }));
                }
                else {
                    console.error(file, "not found on request");
                    cb(undefined);
                }
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
    }
    else {
        if (/\.(js|json)$/.test(file))
            return cb(g["require"](file));
        return cb("");
    }
}
function $trigger(name, args) {
    var e = $events[name];
    if (e) {
        for (var i in e) {
            var res = e[i].apply(null, args);
            if (res === false) {
                return false;
            }
        }
    }
}
function syntheticDefaultExportPolyfill(input) {
    if (input === null ||
        ["function", "object", "array"].indexOf(typeof input) === -1 ||
        input.hasOwnProperty("default")) {
        return;
    }
    if (Object.isFrozen(input)) {
        input.default = input;
        return;
    }
    Object.defineProperty(input, "default", {
        value: input,
        writable: true,
        enumerable: false,
    });
}
function $import(name, o) {
    if (o === void 0) { o = {}; }
    if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58) {
        return $loadURL(name);
    }
    var ref = $getRef(name, o);
    if (ref.server) {
        return ref.server;
    }
    var file = ref.file;
    if (ref.wildcard) {
        var safeRegEx = new RegExp(ref.wildcard
            .replace(/\*/g, "@")
            .replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            .replace(/@@/g, ".*")
            .replace(/@/g, "[a-z0-9$_-]+"), "i");
        var pkg_1 = $packages[ref.pkgName];
        if (pkg_1) {
            var batch = {};
            for (var n in pkg_1.f) {
                if (safeRegEx.test(n)) {
                    batch[n] = $import(ref.pkgName + "/" + n);
                }
            }
            return batch;
        }
    }
    if (!file) {
        var asyncMode_1 = typeof o === "function";
        var processStopped = $trigger("async", [name, o]);
        if (processStopped === false) {
            return;
        }
        return $async(name, function (result) { return (asyncMode_1 ? o(result) : null); }, o);
    }
    var pkg = ref.pkgName;
    if (file.locals && file.locals.module)
        return file.locals.module.exports;
    var locals = (file.locals = {});
    var path = $getDir(ref.validPath);
    locals.exports = {};
    locals.module = { exports: locals.exports };
    locals.require = function (name, optionalCallback) {
        var result = $import(name, {
            pkg: pkg,
            path: path,
            v: ref.versions,
        });
        if (FuseBox["sdep"]) {
            syntheticDefaultExportPolyfill(result);
        }
        return result;
    };
    if ($isBrowser || !g["require"].main) {
        locals.require.main = { filename: "./", paths: [] };
    }
    else {
        locals.require.main = g["require"].main;
    }
    var args = [locals.module.exports, locals.require, locals.module, ref.validPath, path, pkg];
    $trigger("before-import", args);
    file.fn.apply(args[0], args);
    $trigger("after-import", args);
    return locals.module.exports;
}
var FuseBox = (function () {
    function FuseBox() {
    }
    FuseBox.global = function (key, obj) {
        if (obj === undefined)
            return g[key];
        g[key] = obj;
    };
    FuseBox.import = function (name, o) {
        return $import(name, o);
    };
    FuseBox.on = function (n, fn) {
        $events[n] = $events[n] || [];
        $events[n].push(fn);
    };
    FuseBox.exists = function (path) {
        try {
            var ref = $getRef(path, {});
            return ref.file !== undefined;
        }
        catch (err) {
            return false;
        }
    };
    FuseBox.remove = function (path) {
        var ref = $getRef(path, {});
        var pkg = $packages[ref.pkgName];
        if (pkg && pkg.f[ref.validPath]) {
            delete pkg.f[ref.validPath];
        }
    };
    FuseBox.main = function (name) {
        this.mainFile = name;
        return FuseBox.import(name, {});
    };
    FuseBox.expose = function (obj) {
        var _loop_1 = function (k) {
            var alias = obj[k].alias;
            var xp = $import(obj[k].pkg);
            if (alias === "*") {
                $loopObjKey(xp, function (exportKey, value) { return (__root__[exportKey] = value); });
            }
            else if (typeof alias === "object") {
                $loopObjKey(alias, function (exportKey, value) { return (__root__[value] = xp[exportKey]); });
            }
            else {
                __root__[alias] = xp;
            }
        };
        for (var k in obj) {
            _loop_1(k);
        }
    };
    FuseBox.dynamic = function (path, str, opts) {
        this.pkg((opts && opts.pkg) || "default", {}, function (___scope___) {
            ___scope___.file(path, function (exports, require, module, __filename, __dirname) {
                var res = new Function("__fbx__dnm__", "exports", "require", "module", "__filename", "__dirname", "__root__", str);
                res(true, exports, require, module, __filename, __dirname, __root__);
            });
        });
    };
    FuseBox.flush = function (shouldFlush) {
        var def = $packages["default"];
        for (var fileName in def.f) {
            if (!shouldFlush || shouldFlush(fileName)) {
                delete def.f[fileName].locals;
            }
        }
    };
    FuseBox.pkg = function (name, v, fn) {
        if ($packages[name])
            return fn($packages[name].s);
        var pkg = ($packages[name] = {});
        pkg.f = {};
        pkg.v = v;
        pkg.s = {
            file: function (name, fn) { return (pkg.f[name] = { fn: fn }); },
        };
        return fn(pkg.s);
    };
    FuseBox.addPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    FuseBox.packages = $packages;
    FuseBox.isBrowser = $isBrowser;
    FuseBox.isServer = !$isBrowser;
    FuseBox.plugins = [];
    return FuseBox;
}());
if (!$isBrowser) {
    g["FuseBox"] = FuseBox;
}

return __root__["FuseBox"] = FuseBox; } )(this))