const mongoose = require("mongoose");

const cancelSubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    billing: { type: mongoose.Schema.Types.ObjectId, ref: 'Billing'},
    extendUpto: { type: Date, required: false },
    cancelSubscription: { type: Boolean, defaul: false },
    feeRefund: { type: Number, required: true },
    reasonForCancellation: { type: String, required: false },
    approver1: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    approver2: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
});
  
const cancelSubscription = new mongoose.model("CancelSubscription", cancelSubscriptionSchema);

module.exports = cancelSubscription;