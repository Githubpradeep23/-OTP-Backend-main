const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    discount: { type: Number, required: true},
    description: { type: String, required: false},
    billAmount: { type: Number, required: true },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'PENDING'},
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const discount = new mongoose.model("Discount", discountSchema);
  
  module.exports = discount;