const mongoose = require('mongoose');
const express = require("express");
const followUpController = require('../controllers/todo/followUpController');
const reminderController = require('../controllers/todo/reminderController');
const router = express.Router();

router.post('/submit', followUpController.submit);
router.delete('/delete', followUpController.deleteTodo);
router.get('/followUp', followUpController.getAll);
// Renewal Reminder
router.post('/submitReminder', reminderController.submit);
router.delete('/deleteReminder', reminderController.deleteReminder);
router.get('/reminder', reminderController.getAll);

module.exports = router;