const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    package: { type: String, required: true },
    activeFrom: { type: Date, required: true },
    activeTo: { type: Date, required: true },
    totalFee: { type: Number, required: true },
    paidFee: { type: Number, required: true },
    feeDue: { type: Number, required: true },
    remarks: { type: String, required: false },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const billing = new mongoose.model("Billing", billingSchema);
  
  module.exports = billing;