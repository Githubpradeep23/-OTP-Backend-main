const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    reason: {
        type: String,
        required: true
    },
    approver1: { type: mongoose.Schema.Types.ObjectId, ref: 'Approver' },
    approver2: { type: mongoose.Schema.Types.ObjectId, ref: 'Approver' },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType'},
    status:{
        type: String,
        default: 'PENIDNG'
    },
    fromDate: {
        type: Date,
        default: Date.now()
    },
    toDate: {
      type: Date,
      default: Date.now()
    },
    days: {
      type: Number,
      default: 1
    },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  },
  {
    timestamps: true
  });

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
