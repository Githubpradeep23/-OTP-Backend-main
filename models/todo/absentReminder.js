const mongoose = require("mongoose");

const absentReminderSchema = new mongoose.Schema({
    date: { type: Date, default: new Date() },
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
  
  const absentReminder = new mongoose.model("AbsentReminder", absentReminderSchema);
  
  module.exports = absentReminder;