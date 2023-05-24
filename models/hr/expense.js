const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expense: { type: Number, required: true},
    description: { type: String, required: false},
    billAmount: { type: Number, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: { 
        type: String,
        default: 'PENDING'
    },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const expense = new mongoose.model("Expense", expenseSchema);
  
  module.exports = expense;