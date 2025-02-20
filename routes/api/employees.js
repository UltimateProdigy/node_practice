const express = require("express");
const router = express.Router();
const roles = require("../../config/roles");
const { verifyRoles } = "../../middleware/verifyRoles";
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
	.post(verifyRoles(roles.admin), createNewEmployee)
	.put(verifyRoles(roles.admin), updateEmployee)
	.delete(verifyRoles(roles.admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
