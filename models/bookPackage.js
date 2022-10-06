const { mongoose, Schema } = require("mongoose");

const bookPackageSchema = new mongoose.Schema(
    {
        Date: {
            type: String,
            required: true
        },
        Time: {
            type: String,
            required: true
        },
        Duration: {
            type: String,
            default: null
        },
        service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }]
    }
);

const Package = new mongoose.model("Package", bookPackageSchema);

module.exports = Package;