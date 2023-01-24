const { mongoose, Schema } = require("mongoose");


const answersSchema = new mongoose.Schema({
  description:{
    type: String,
    required: false
  },
  answer: [{
    type: String,
    required: false
  }],
  questionire_id: { type: Schema.Types.ObjectId, ref: 'Questionire' },
  questions_id: { type: Schema.Types.ObjectId, ref: 'Questions' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const answers = new mongoose.model("Answers", answersSchema);

module.exports = answers;
