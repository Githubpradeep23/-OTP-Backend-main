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

  category: {
    type: String,
  },

  bannerImage: {
    type: String,
    default:null
  },
  duration:{
    type:String
  },
  priceOneMonth: {
    type: Number,
    default:null,
  },
  priceTwoMonth: {
    type: Number,
    default:null,
  },
  priceThreeMonth: {
    type: Number,
    default:null,
  },
  priceSixMonth: {
    type: Number,
    default:null,
  },
  priceTwelveMonth: {
    type: Number,
    default:null,
  },
  slotTime:{
    type:String
  },
  delievrables: String,
  consultationDate: String,
  consultationTime: String,
  branch_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_BRANCH' }]
});

const GYM_SERVICE = new mongoose.model("GYM_SERVICE", gymServicesSchema);

module.exports = GYM_SERVICE;
