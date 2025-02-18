const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const data = {
	users: require("../model/users.json"),
	setUser: function (data) {
		this.users = data;
	},
};

const handleCreateUser = async (req, res) => {
	const { username, password } = req.body;
	const userExists = data.users.find(
		(person) => person.username === username
	);
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and Password are Required" });
	} else if (userExists) {
		return res.sendStatus(409);
	}
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const newUser = {
			// id: uuid(),
			username: username,
			password: hashedPwd,
		};
		data.setUser([...data.users, newUser]);
		await fsPromises.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify(data.users)
		);
		res.status(201).json({ message: `New User ${username} Created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleCreateUser };
