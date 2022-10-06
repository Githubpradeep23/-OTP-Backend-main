const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  complainMessage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Complain = new mongoose.model("Complain", complainSchema);

module.exports = Complain;
