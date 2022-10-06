const { mongoose, Schema } = require("mongoose");

const gymServicesSchema = new mongoose.Schema({
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
  delievrables: String,
  consultationDate: String,
  consultationTime: String,
  branch_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_BRANCH' }]
});

const GYM_SERVICE = new mongoose.model("GYM_SERVICE", gymServicesSchema);

module.exports = GYM_SERVICE;
