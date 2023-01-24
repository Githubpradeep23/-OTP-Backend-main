const { mongoose, Schema } = require("mongoose");


const questionireSchema = new mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  isOpen:{
    type: Boolean,
    default: true
  }
});

const questionire = new mongoose.model("Questionire", questionireSchema);

module.exports = questionire;
