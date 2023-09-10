const mongoose = require("mongoose");

const approverSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status:{
        type: String,
        default: 'ACTIVE'
    },
  },
  {
    timestamps: true
  });

const Approver = mongoose.model("Approver", approverSchema);
module.exports = Approver;
