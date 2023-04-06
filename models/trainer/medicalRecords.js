const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    allergies: {
        type: String,
        required: true,
    },
    conditions: {
        type: String,
        required: true
    },
    medications: {
        type: String,
        required: true,
    },
    previousInjury: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
});

const medicalRecord = new mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = medicalRecord;