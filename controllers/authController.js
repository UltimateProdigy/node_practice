const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const data = {
	users: require("../model/users.json"),
	setUser: function (data) {
		this.users = data;
	},
};

const authenticateUser = async (req, res) => {
	const { username, password } = req.body; // request usernanme and password
	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Username and Password are required" }); //return an error if there is no username or password
	const user = data.users.find(
		(person) => person.username === username //check for user in the database
	);
	if (!user) return res.status(401); // return an error if there is no user with that details in the database
	const matchPwd = await bcrypt.compare(password, user.password); //compare recieved password to hashed password in database
	if (!matchPwd) {
		return res.status(401).json({ message: "Incorrect Password" });
	}
	if (matchPwd) {
		const accessToken = jwt.sign(
			{ username: user.username },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "30s",
			}
		);
		const refreshToken = jwt.sign(
			{ username: user.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "7d" }
		);

		//saving refreshToken with current user
		const otherUsers = data.users.filter(
			(person) => person.username !== user.username
		);
		const currentUser = { ...user, refreshToken };
		data.setUser([...otherUsers, currentUser]);
		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({
			message: `User ${username} is logged in!`,
			accessToken,
		});
	} else {
		res.status(401).json({ message: "Incorrect Password" });
	}
};

module.exports = { authenticateUser };
