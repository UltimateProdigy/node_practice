const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) return res.sendStatus(401);

	const token = authHeader.split("")[1];
	if (!token)
		return res
			.status(401)
			.json({ message: "No token, authorization denied" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.user = decoded.username;
		next();
	});
};

module.exports = { verifyJWT };
