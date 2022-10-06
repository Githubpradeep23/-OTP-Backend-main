const { mongoose, Schema } = require("mongoose");

const wellness = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  delieverables: String,
});

const Wellness = new mongoose.model("Wellness", wellness);

module.exports = Wellness;
