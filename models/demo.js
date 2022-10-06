const { mongoose, Schema } = require("mongoose");

const demoSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
});


const Demo = new mongoose.model("Demo", demoSchema);

module.exports = Demo;