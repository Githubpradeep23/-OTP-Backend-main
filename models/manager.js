const { mongoose, Schema } = require("mongoose");

const managerSchema = new mongoose.Schema({
    manager_contact_no: {
        type: Number,
    },
    working_hours: {
        type: String,
    },
    service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Manager = new mongoose.model("Manager", managerSchema);
module.exports = Manager;