const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
	firstname: {
		type: String,
		required: [true, "First Name is required"],
	},
	lastname: {
		type: String,
		required: [true, "Last Name is required"],
	},
});

module.exports = mongoose.model("Employee", employeeSchema);
