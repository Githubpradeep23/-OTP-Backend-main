const mongoose = require('mongoose');
const express = require("express");
const followUpController = require('../controllers/todo/followUpController');
const reminderController = require('../controllers/todo/reminderController');
const ticketComplaintController = require('../controllers/todo/complaintController');
const absentReminderController = require('../controllers/todo/absentReminderController');
const balanceReminderController = require('../controllers/todo/balanceReminderController');
const auditController = require('../controllers/todo/auditController');
const pushCallController = require('../controllers/todo/pushCallController');

const router = express.Router();

router.post('/submit', followUpController.submit);
router.delete('/delete', followUpController.deleteTodo);
router.get('/followUp', followUpController.getAll);
router.get('/followUp/all/:type', followUpController.getAllByType);
// Renewal Reminder
router.post('/submitReminder', reminderController.submit);
router.delete('/deleteReminder', reminderController.deleteReminder);
router.get('/reminder', reminderController.getAll);
// Ticket Complaints
router.post('/ticketComplaints', ticketComplaintController.submit);
router.delete('/ticketComplaints', ticketComplaintController.deleteTicketComplaint)
router.get('/ticketComplaints', ticketComplaintController.getAll);
router.get('/ticketComplaints/pending', ticketComplaintController.getAllPendingComplaints);
router.put('/ticketComplaints/:id/status', ticketComplaintController.updateStatus);
router.put('/ticketComplaints/:id/scalme', ticketComplaintController.updateScalmeInTicket);
router.put('/ticketComplaints/:id/:employee', ticketComplaintController.updateEmployeeInTicket);

// Absent Reminders
router.post('/submitAbsentReminder', absentReminderController.submit);
router.delete('/deleteAbsentReminder', absentReminderController.deleteAbsentReminder)
router.get('/absentReminder', absentReminderController.getAll);
// Balance Reminders
router.post('/balanceReminder', balanceReminderController.submit);
router.delete('/balanceReminder', balanceReminderController.deleteBalanceReminder)
router.get('/balanceReminder/all', balanceReminderController.getAll);
// Audits
router.post('/audits', auditController.submit);
router.delete('/audits', auditController.deleteAudits)
router.get('/audits/all', auditController.getAll);
// Push Calls
router.post('/pushCall/submit', pushCallController.submit);
router.delete('/pushCall/delete', pushCallController.deletePushCall);
router.get('/pushCall/all', pushCallController.getAll);
module.exports = router;