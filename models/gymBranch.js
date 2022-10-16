const mongoose = require("mongoose");

const gymBranchSchema = new mongoose.Schema({
  managerName: {
    type: String,
    required: true,
  },
  manager_Phone_Number: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  branchCode: {
    type: String,
    required: true,
  },
  branchCity: {
    type: String,
    required: true,
  },
  branchPhoneNumber: {
    type: String,
    required: true,
  },
  opening_branchTiming: {
    type: String,
    required: true,
  },
  closing_branchTiming: {
    type: String,
    required: true,
  },
  leaving_time: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

const GYM_BRANCH = new mongoose.model("GYM_BRANCH", gymBranchSchema);

module.exports = GYM_BRANCH;
