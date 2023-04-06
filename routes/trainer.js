const express = require("express");
const leaveTypeController = require('../controllers/trainer/leaveTypeController');
const leaveController = require('../controllers/trainer/leaveController');
const exerciseController = require('../controllers/trainer/exerciseController');
const workoutController = require('../controllers/trainer/workoutController');
const medicalRecordController = require('../controllers/trainer/medicalController');

const router = express.Router();

// Leave Type
router.post('/leaveType/submit', leaveTypeController.submit);
router.delete('/leaveType/delete', leaveTypeController.deleteLeaveType);
router.get('/leaveType/all', leaveTypeController.getAll);
// Leave
router.post('/leave/submit', leaveController.submit);
router.delete('/leave/delete', leaveController.deleteLeave);
router.get('/leave/all', leaveController.getAll);
router.put('/leave/:id/status', leaveController.updateStatus);
router.get('/leave/employee/:employeeId', leaveController.fetchAllLeavesByEmpId);
router.get('/leave/filter', leaveController.fetchAllLeavesByFilter);
router.get('/leave/employee/count/:employeeId', leaveController.fetchUsedLeavesByTrainerId);
// Exercise
router.post('/exercise/submit', exerciseController.submit);
router.delete('/exercise/delete', exerciseController.deleteExercise);
router.get('/exercise/all', exerciseController.getAll);
router.post('/workout/submit', workoutController.submit);
router.delete('/workout/delete', workoutController.deleteWorkout);
router.get('/workout/all', workoutController.getAll);
router.get('/workout/day/:day', workoutController.getAllWorkoutsByDay);
router.put('/workout', workoutController.updateWorkout);
router.post('/medicalRecord/submit', medicalRecordController.submit);
router.delete('/medicalRecord/delete', medicalRecordController.deleteMedicalRecords);
router.get('/medicalRecord/all', medicalRecordController.getAll);
router.get('/medicalRecord/user/:user', medicalRecordController.getAllMedicalRecordsOfUser);
router.put('/medicalRecord', medicalRecordController.update);
module.exports = router;