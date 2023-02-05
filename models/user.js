const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      default: null
    },
    number: {
      type: String,
      unique: false,
      required: true
    },
    email: {
      type: String,
      // sparse: true,
      unique: false,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    DOB: {
      type: String,
      default: null
    },
    user_Address: {
      type: String,
      default: null
    },
    postal_code: {
      type: String,
      default: null
    },
    profilePicture: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: null
    },
    heightInFit: {
      type: Number,
      default: null
    },
    heightInINCH: {
      type: Number,
      default: null
    },
    previous_injury: {
      type: Number,
      default: null
    },
    health_Detials: {
      type: String,
      default: null
    },
    weight: {
      type: Number,
      default: null
    },
    coin: {
      type: Number,
      default: 0,
    },

    push_notification: {
      type: Boolean,
      default: true,
    },

    service_notification: {
      type: Boolean,
      default: true,
    },

    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    userType: {
      type: String,
      enum : ['TEMPORARY','PERMANENT'],
      default: 'TEMPORARY'
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
