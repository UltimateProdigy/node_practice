const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
	const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
	const logItem = `${dateTime} ${uuid()} ${message}`;

	try {
		if (!fs.existsSync(path.join(__dirname, "log"))) {
			await fsPromise.mkdir(path.join(__dirname, "log"));
		}
		await fsPromise.appendFile(
			path.join(__dirname, "log", "eventLog.txt"),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

module.exports = logEvents;
