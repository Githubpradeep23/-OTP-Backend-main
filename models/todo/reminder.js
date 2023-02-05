const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    dob: { type: Date, default: null },
    gender: {
        type: String,
        default: null,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    reminderCall: {
        type: String,
        required: false
    },
    demo: {
        type: String,
        required: false
    },
    remarks:{
        type: String,
        required: false
    },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  const renewalReminder = new mongoose.model("RenewalReminder", reminderSchema);
  
  module.exports = renewalReminder;