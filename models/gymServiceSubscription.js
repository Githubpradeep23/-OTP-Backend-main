const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  serviceID: {
    type: String,
    required: true,
  },
  subscription: {
    type: Boolean,
    required: true,
  },
  subscriptionPrice:{
    type:Number,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Subscription = new mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
