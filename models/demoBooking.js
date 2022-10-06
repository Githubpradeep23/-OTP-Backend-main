const mongoose = require("mongoose");

const demoBookingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  demo_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  demo_status: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const demoBooking = new mongoose.model("demoBooking", demoBookingSchema);

module.exports = demoBooking;
