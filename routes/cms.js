const express = require("express");
const router = express.Router();
const filtersController = require('../controllers/cms/filters');
const enquiriesController = require('../controllers/cms/enquiry');
const billingController = require('../controllers/cms/billing');
const subscriptionController = require('../controllers/cms/subscription');
const attendanceController = require('../controllers/cms/attendance');

// Filters
router.post('/filters', filtersController.submit);
router.delete('/filters', filtersController.deleteFilters)
router.get('/filters/all', filtersController.getAll);
// Enquiry
router.post('/enquiry', enquiriesController.submit);
router.delete('/enquiry', enquiriesController.deleteEnquiry)
router.get('/enquiry/all', enquiriesController.getAll);
// Billing/Renewal
router.post('/billing', billingController.submit);
router.delete('/billing', billingController.deleteBilling)
router.get('/billing/all', billingController.getAll);
router.get('/billing/user/:userId', billingController.getAllBillingByUser);
router.put('/billing', billingController.updateBilling);
router.get('/billing/active/:userId', billingController.getActiveSubscriptionsOfUser);
// Cancel Subscription
router.post('/subscription/cancel', subscriptionController.submitCancellation);
router.delete('/subscription', subscriptionController.deleteSubscription);
router.get('/subscription/all', subscriptionController.getAll);
router.get('/subscription/user/:userId', subscriptionController.getAllSubscriptionsByUser);
// Attendance
router.post('/attendance', attendanceController.submit);
router.delete('/attendance', attendanceController.deleteAttendance)
router.get('/attendance/all', attendanceController.getAll);
router.put('/attendance', attendanceController.updatePresentOrAbsent);

module.exports = router;