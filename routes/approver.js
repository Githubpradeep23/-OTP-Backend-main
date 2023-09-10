const mongoose = require('mongoose');
const express = require("express");
const approverController = require('../controllers/ApproverController');
const router = express.Router();

router.post('/add', approverController.createApprover);
router.delete('/delete', approverController.deleteApprover);
router.get('/getAll', approverController.getAllApprovers);
router.put('/updateStatus', approverController.updateApproverStatus);

module.exports = router;