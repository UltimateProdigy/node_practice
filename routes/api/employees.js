const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJWT");
const {
	createNewEmployee,
	getAllEmployees,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../controllers/employeesController");

router
	.route("/")
	.get(getAllEmployees)
	.post(createNewEmployee)
	.put(updateEmployee)
	.delete(deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
