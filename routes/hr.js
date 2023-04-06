const express = require("express");
const router = express.Router();

const discountController = require('../controllers/hr/discountController');
// Discount
router.post('/discount/submit', discountController.submit);
router.delete('/discount/delete', discountController.deleteDiscount);
router.get('/discount/all', discountController.getAll);
router.put('/discount/:id/status', discountController.updateStatus);
router.get('/discount/user/:userId', discountController.getAllByUserId);

const expenseController = require('../controllers/hr/expenseController');
// Expense
router.post('/expense/submit', expenseController.submit);
router.delete('/expense/delete', expenseController.deleteExpense);
router.get('/expense/all', expenseController.getAll);
router.put('/expense/:id/status', expenseController.updateStatus);
router.get('/expense/employee/:employeeId', expenseController.getAllByEmployeeId);

const telecallerController = require('../controllers/hr/telecallerController');
// Telecaller
router.post('/telecaller/submit', telecallerController.submit);
router.delete('/telecaller/delete', telecallerController.deleteTelecaller);
router.get('/telecaller/all', telecallerController.getAll);

module.exports = router;