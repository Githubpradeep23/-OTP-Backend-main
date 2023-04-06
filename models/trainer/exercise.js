const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: false },
    bodyPart:{ type: String, required: false }
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
