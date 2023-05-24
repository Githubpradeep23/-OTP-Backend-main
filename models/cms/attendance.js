const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    monthDate: { type: String, required: true },
    noOfDaysPresent: { type: Number, required: false },
    noOfDaysAbsent: { type: Number, required: false },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const attendance = new mongoose.model("Attendance", attendanceSchema);
  
  module.exports = attendance;