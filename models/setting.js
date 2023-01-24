const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    termCondition: {
        type: String,
        required: true,
    },
    privacyPolicy: {
        type: String,
        required: true,
    },
    termCreatedAt: {
        type: Date,
        default: Date.now()
    },
    termUpdatedAt: {
        type: Date,
        default:null
    },
    privacyCreatedAt: {
        type: Date,
        default: Date.now()
    },
    privacyUpdatedAt: {
        type: Date,
        default:null
    },

});

const SETTING = new mongoose.model("setting", settingSchema);

module.exports = SETTING;
