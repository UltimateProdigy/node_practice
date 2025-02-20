
const User = require("../model/User");
const bcrypt = require("bcrypt");
const handleCreateUser = async (req, res) => {
	const { username, password } = req.body;
	const userExists = await User.findOne({ username: username }).exec();
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and Password are Required" });
	} else if (userExists) {
		return res.sendStatus(409);
	}
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const result = await User.create({
			username,
			password: hashedPwd,
		});
		console.log(result);
		res.status(201).json({ message: `New User ${username} Created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleCreateUser };
