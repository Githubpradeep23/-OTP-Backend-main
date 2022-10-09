// const mongoose = require("mongoose");
const { mongoose, Schema } = require("mongoose");


const demoBookingSchema = new mongoose.Schema({

  user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],

  category:{
    type: String,
    required: true
  },
  demo_status: {
    type: Boolean,
    default: true

  },
  Date: {
    type: String,
    required: true
  },
  TimeSlot: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const demoBooking = new mongoose.model("demoBooking", demoBookingSchema);

module.exports = demoBooking;
