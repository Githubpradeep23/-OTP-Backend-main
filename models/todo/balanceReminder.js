const mongoose = require("mongoose");

const balanceRemindersSchema = new mongoose.Schema({
    timeSlot: {
        type: String,
        required: true
    },
    demo: {
        type: Boolean,
        default: false
    },
    balancePaid: {
        type: Boolean,
        default: false
    },
    totalFees:{
        type: Number,
        required: true
    },
    balance:{
        type: Number,
        required: true,
        default: 0
    },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
  const balanceReminder = new mongoose.model("BalanceReminder", balanceRemindersSchema);
  
  module.exports = balanceReminder;