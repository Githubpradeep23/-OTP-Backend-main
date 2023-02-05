const mongoose = require('mongoose');
const express = require("express");
const followUpController = require('../controllers/todo/followUpController');
const router = express.Router();

router.post('/submit', followUpController.submit);
router.delete('/delete', followUpController.deleteTodo);
router.get('/', followUpController.getAll);
// Renewal Reminder
// router.post('/submitReminder', followUpController.submit);
// router.delete('/deleteReminder', followUpController.deleteTodo);
// router.get('/', followUpController.getAll);

module.exports = router;