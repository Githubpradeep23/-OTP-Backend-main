const {mongoose,Schema} = require("mongoose");

const voucherSchema = new mongoose.Schema({
  user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }], 
  discount_percentage: {
    type: Number,
  },
  discount_coins :{
    type: Number,
  },
  amount: {
    type: Number,
  },
  payment_mode:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Voucher = new mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
