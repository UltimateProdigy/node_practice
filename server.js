const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
	try {
		const data = await fsPromises.readFile(filePath, "utf-8");
		response.writeHead(200, contentType);
		response.end(data);
	} catch (err) {
		console.log(err);
		response.statusCode = 500;
		response.end();
	}
};
const server = http.createServer((req, res) => {
	const extension = path.extname(req.url);
	let contentType;

	switch (extension) {
		case ".html":
			contentType = "text/html";
			break;
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".json":
			contentType = "application/json";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".jpg":
			contentType = "image/jpg";
			break;
		case ".jpeg":
			contentType = "image/jpeg";
			break;
		case ".txt":
			contentType = "text/plain";
			break;
		default:
			contentType = "text/html";
	}

	let filePath =
		contentType === "text/html" || "/"
			? path.join(__dirname, "views", "index.html")
			: contentType === "text/html" || req.url.slice(-1) === "/"
			? path.join(__dirname, "views", req.url, "index.html")
			: contentType === "text/html"
			? path.join(__dirname, "views", req.url)
			: path.join(__dirname, req.url);

	if (!extension && req.url.slice(-1) === "/") filePath += ".html";

	const fileExists = fs.existsSync(filePath);

	if (fileExists) {
		serveFile(filePath, { "Content-Type": contentType }, res);
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("<h1>404 Not Found</h1>");
	}
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// eventEmitter.on("log", (msg) => {
// 	logEvents(msg);
// });

// setTimeout(() => {
// 	eventEmitter.emit("log", "Log Event Emitted");
// }, 2000);
