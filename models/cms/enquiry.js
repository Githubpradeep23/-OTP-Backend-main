const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    source: { type: String, required: false },
    remarks: { type: String, required: false },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const enquiry = new mongoose.model("Enquiry", enquirySchema);
  
  module.exports = enquiry;