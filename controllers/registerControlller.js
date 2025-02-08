const { v4: uuid } = require("uuid");
const data = {
	users: require("../model/users.json"),
	setUser: function (data) {
		this.users = data;
	},
};

const register = (req, res) => {
	const { email, password } = req.body;
	const userExists = data.users.find((i) => i.email === email);
	const newUser = {
		id: uuid(),
		email: email,
		password: password,
	};
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Email and Password is Required" });
	} else if (userExists) {
		return res.status(400).json({ message: "User Exists" });
	}

	data.setUser([...data.users, newUser]);
	res.status(201).json({ message: "User Created", email: email });
};

module.exports = register;