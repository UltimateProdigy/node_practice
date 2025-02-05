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
	const newEmployee = {
		id: uuid(),
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};
	if (!newEmployee.firstname || !newEmployee.lastname) {
		return res
			.status(400)
			.json({ message: "First Name and Last Name is required" });
	}
	data.setEmployee([...data.employees, newEmployee]);
	res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
	const employee = data.employees.find((emp) => emp.id === req.body.id);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.body.id} not found` });
	}
	if (req.body.firstname) employee.firstname = req.body.firstname;
	if (req.body.lastname) employee.lastname = req.body.lastname;
	data.setEmployee([...data.employees]);
	res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
	const employee = data.employees.find((emp) => emp.id === req.body.id);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.body.id} not found` });
	}
	const filteredEmployees = data.employees.filter(
		(emp) => emp.id === req.body.id
	);
	data.setEmployee([...filteredEmployees]);
	res.json({ id: req.body.id });
};

const getEmployee = (req, res) => {
	const employee = data.employees.find((emp) => emp.id === req.params.id);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.params.id} not found` });
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
