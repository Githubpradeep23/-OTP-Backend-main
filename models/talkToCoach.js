const {mongoose ,Schema} = require("mongoose");


const talkToCoachSchema = new mongoose.Schema({
  

  coach_id: [{ type: Schema.Types.ObjectId, ref: 'Coach' }],
  user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],
  request: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const talkToCoach = new mongoose.model("talkToCoach", talkToCoachSchema);

module.exports = talkToCoach;
