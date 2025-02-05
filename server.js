const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(logger);

const whitelist = [
	"http://localhost:3500",
	"http://127.0.0.1:5500",
	"https://www.google.com",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

app.all("*", (req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
