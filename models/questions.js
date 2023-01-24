const { mongoose, Schema } = require("mongoose");


const questionsSchema = new mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  questionire_id: { type: Schema.Types.ObjectId, ref: 'Questionire' },
  possible_answers: [{
    type: String,
    required: false
  }]
});

const questions = new mongoose.model("Questions", questionsSchema);

module.exports = questions;
