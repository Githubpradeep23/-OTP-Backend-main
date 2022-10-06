const {mongoose ,Schema} = require("mongoose");

const coachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Coach = new mongoose.model("Coach", coachSchema);
module.exports = Coach;