const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    monthDate: { type: String, required: true },
    noOfDaysPresent: { type: Number, required: false },
    noOfDaysAbsent: { type: Number, required: false },
  });
  
  const attendance = new mongoose.model("Attendance", attendanceSchema);
  
  module.exports = attendance;