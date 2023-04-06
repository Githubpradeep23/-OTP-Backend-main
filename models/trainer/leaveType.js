const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema(
  {
    employee_role: {
      type: String,
      required: true
    },
    totalLeaves: {
      type: Number,
      required: true
    },
    carryForwardLeaves: {
        type: Number,
        required: false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
  }
);

const LeaveType = mongoose.model("LeaveType", leaveTypeSchema);
module.exports = LeaveType;
