const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "files", "starter.txt"), (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(data.toString());
});

console.log("Reading file...");

fs.writeFile(
	path.join(__dirname, "files", "reply.txt"),
	"Thank You for the reply",
	(err) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log("File written successfully");
	}
);
