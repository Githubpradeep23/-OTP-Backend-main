const { mongoose, Schema } = require("mongoose");

const bookPackageSchema = new mongoose.Schema(
    {
        user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],

        category: {
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
        package_status: {
            type: Boolean,
            default: false

        },
        Date: {
            type: String,
            required: true
        },
        TimeSlot: {
            type: String,
            required: true
        },
        duration:{
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
);

const Package = new mongoose.model("BookPackage", bookPackageSchema);

module.exports = Package;