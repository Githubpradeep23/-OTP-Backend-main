const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  gymName: {
    type: String,
    required: true,
  },
  gymAddress: {
    type: String,
    required: true,
  },
  gymCity: {
    type: String,
    required: true,
  },
  gymPhoneNumber: {
    type: String,
    required: true,
  },
});

const GYM = new mongoose.model("GYM", gymSchema);

module.exports = GYM;
