const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
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
      required: true
    },
    email: {
      type: String,
      unique: true,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    employee_Address: {
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
    createdAt:{
        type:Date,
        default:Date.now()
    }
  },
  { versionKey: false }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
