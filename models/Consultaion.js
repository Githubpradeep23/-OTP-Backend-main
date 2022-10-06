const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    paid: {
        type: Boolean,
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    firstFee: Boolean,
    serviceId: String,
    userID: String,
});


const Consultation = new mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;