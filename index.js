const logEvents = require("./logEvents");

const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("log", (msg) => {
	logEvents(msg);
});

setTimeout(() => {
	eventEmitter.emit("log", "Log Event Emitted");
}, 2000);
