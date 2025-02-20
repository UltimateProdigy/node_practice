const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: true,
	},
	roles: {
		User: {
			type: Number,
			default: 5591,
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
