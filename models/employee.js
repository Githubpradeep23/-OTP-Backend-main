const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      default: null
    },
    number: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      default: null
    },
    gender: {
      type: String,
      default: null,
      required: true
    },
    employee_address: {
      type: String,
      default: null
    },
    postal_code: {
      type: String,
      default: null
    },
    profilePicture: {
      type: String,
      default: null
    },
    age: {
      type: Number,
      default: null
    },
    gym_branch: {
      type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH'
    },
    role: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
      required: false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
  },
  { versionKey: false }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
