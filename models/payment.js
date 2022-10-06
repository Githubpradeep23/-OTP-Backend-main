const { mongoose, Schema } = require("mongoose");

const paymentSchema = mongoose.Schema({
  voucher_id : [{ type: Schema.Types.ObjectId, ref: 'Voucher' }],
  orderDetials: {
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
