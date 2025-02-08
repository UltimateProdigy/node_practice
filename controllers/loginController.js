const users = require("../model/users.json");
const REFRESH_SECRET_KEY = "";
const SECRET_KEY = "";

const login = (req, res) => {
	const { email, password } = req.body;
	const user = users.find(
		(u) => u.email === email && u.password === password
	);

	if (!user) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
		expiresIn: "15m",
	});
	const refreshToken = jwt.sign(
		{ id: user.id, email: user.email },
		REFRESH_SECRET_KEY,
		{ expiresIn: "7d" }
	);

	res.json({ token, refreshToken });
};

module.exports = login;
