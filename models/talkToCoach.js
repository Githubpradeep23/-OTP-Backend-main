const mongoose = require("mongoose");

const talkToCoachSchema = new mongoose.Schema({
  coachID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const talkToCoach = new mongoose.model("talkToCoach", talkToCoachSchema);

module.exports = talkToCoach;
