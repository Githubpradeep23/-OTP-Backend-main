const mongoose = require('mongoose');
const express = require("express");
const employeeController = require('../controllers/EmployeeController');
const router = express.Router();

router.post('/add', employeeController.addEmployee);
router.delete('/delete', employeeController.deleteEmployeeProfile);
router.put('/updateProfile', employeeController.updateEmployeeProfile);
router.get('/getAll', employeeController.getAllEmployees);
router.put('/updateStatus', employeeController.updateStatus);
router.put('/updatePassword', employeeController.changePassword);
router.post('/login', employeeController.loginEmployee);

module.exports = router;