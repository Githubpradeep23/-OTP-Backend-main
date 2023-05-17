const mongoose = require("mongoose");

const pushCallSchema = new mongoose.Schema({
    callBackOn: { type: Date, default: new Date() },
    interestedIn: {
        type: String,
        required: false
    },
    bookDemo: {
        type: Boolean,
        default: false
    },
    remarks:{
        type: String,
        required: false
    },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
  const pushCall = new mongoose.model("PushCall", pushCallSchema);
  
  module.exports = pushCall;