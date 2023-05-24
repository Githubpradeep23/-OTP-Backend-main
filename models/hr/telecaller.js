const mongoose = require("mongoose");

const telecallerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    mobile: { type: Number, required: true },
    review: { type: String, required: true},
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
});
  
  const telecaller = new mongoose.model("TeleCaller", telecallerSchema);
  
  module.exports = telecaller;