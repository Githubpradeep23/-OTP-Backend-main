const { mongoose, Schema } = require("mongoose");


const weightSchema = new mongoose.Schema({
  userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  weight: {
    type: Number,
    required: true,
  },
  // to : {
  //   type: String,
  //   required: true,
  // },
  from : {
    type: String,
    required: true,
  },
  ht: {
    type: Number,
    default: 0,
  },
  PBF: {
    type: Number,
    default: 0,
  },
  SMM: {
    type: Number,
    default: 0,
  },
  Waist: {
    type: Number,
    default: 0,
  },
  PushUp: {
    type: Number,
    default: 0,
  },
  PullUps: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: Date,
    required: true,
  },
});

const TrackWeight = new mongoose.model("TrackWeight", weightSchema);

module.exports = TrackWeight;
