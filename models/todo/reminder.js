const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    activeTo: { type: Date, default: null },
    activeFrom: { type: Date, default: null },
    timeSlot: {
        type: String,
        required: true
    },
    followUpCall: {
        type: Boolean,
        required: false
    },
    reminderSMS: {
        type: Boolean,
        required: false
    },
    done: {
        type: Boolean,
        required: false
    },
    notDone: {
        type: Boolean,
        required: false
    },
    remarks:{
        type: String,
        required: false
    },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const renewalReminder = new mongoose.model("RenewalReminder", reminderSchema);
  
  module.exports = renewalReminder;