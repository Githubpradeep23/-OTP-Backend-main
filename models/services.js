const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  serviceImage: {
    type: String,
    required: true,
  },
});

const Service = new mongoose.model("Service", servicesSchema);

module.exports = Service;
