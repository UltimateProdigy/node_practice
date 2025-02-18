const express = require("express");
const app = express();
const cookieparser = require("cookieparser");
const cors = require("cors");
const path = require("path");
const { verifyJWT } = require("./middleware/verifyJWT");
const { logger, logEvents } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(logger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/api/auth"));
app.use("/register", require("./routes/api/register"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else res.type("txt").send("404 Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
