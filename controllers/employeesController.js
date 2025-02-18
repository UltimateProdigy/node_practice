const { v4: uuid } = require("uuid");

const data = {
	employees: require("../model/employees.json"),
	setEmployee: function (data) {
		this.employees = data;
	},
};

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

const createNewEmployee = (req, res) => {
	const { firstname, lastname } = req.body;
	const newEmployee = {
		id: uuid(),
		firstname: firstname,
		lastname: lastname,
	};
	if (!newEmployee.firstname || !newEmployee.lastname) {
		return res
			.status(400)
			.json({ message: "First Name and Last Name is required" });
	}
	data.setEmployee([...data.employees, newEmployee]);
	res.status(201).json({
		message: "Employee Created",
		id: newEmployee.id,
		firstname: `${firstname}`,
		lastname: `${lastname}`,
	});
};

const updateEmployee = (req, res) => {
	const { firstname, lastname, id } = req.body;
	const employee = data.employees.find((emp) => emp.id === id);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.body.id} not found` });
	}
	if (firstname) employee.firstname = firstname;
	if (lastname) employee.lastname = lastname;
	data.setEmployee([...data.employees]);
	res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
	const { id } = req.body;
	const employee = data.employees.find((emp) => emp.id === id);
	if (!employee) {
		return res.status(400).json({ message: `Employee ID ${id} not found` });
	}
	const filteredEmployees = data.employees.filter((emp) => emp.id === id);
	data.setEmployee([...filteredEmployees]);
	res.json({ id: id, message: `User ID ${id} deleted` });
};

const getEmployee = (req, res) => {
	const { id } = req.params;
	const employee = data.employees.find((emp) => emp.id === id);
	if (!employee) {
		return res.status(400).json({ message: `Employee ID ${id} not found` });
	}
	res.json(employee);
};

module.exports = {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
