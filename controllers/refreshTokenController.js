const data = {
	users: require("../model/users.json"),
	setUsers: function (data) {
		this.data = data;
	},
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.setStatus(403);
	const refreshToken = cookies.jwt;

	const user = data.users.find(
		(person) => person.refreshToken === refreshToken
	);
	if (!user) return res.sendStatus(403);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || user.username !== decoded.username)
				return res.sendStatus(403);
			const roles = Object.values(user.roles);
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: decoded.username,
						roles: roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "24h" }
			);
			res.json({ accessToken });
		}
	);
};

module.exports = { handleRefreshToken };
