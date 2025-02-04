const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(logger);

const whitelist = ["http://localhost:3500", "http://127.0.0.1:5500"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/new-page(.html)?", (req, res) => {
	res.sendFile("./views/new-page.html", { root: __dirname });
});

app.get("/old-page(.html)?", (req, res) => {
	res.status(301).redirect("./views/new-page.html", { root: __dirname });
});

app.get("/*", (req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
