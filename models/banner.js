const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Banner = new mongoose.model("Banner", bannerSchema);

module.exports = Banner;