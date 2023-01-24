const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
