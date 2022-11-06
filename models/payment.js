const { mongoose, Schema } = require("mongoose");

const paymentSchema = mongoose.Schema({
  voucher_id : [{ type: Schema.Types.ObjectId, ref: 'Voucher' }],
  userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  packageId: [{ type: Schema.Types.ObjectId, ref: 'Package' }],
  orderDetails: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});



const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
