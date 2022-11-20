const { mongoose, Schema } = require("mongoose");

const copuanSchema = new mongoose.Schema({
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    copuanTitle: {
        type: String,
    },
    discount_percentage: {
        type: Number
    },
    copuanCode: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default:null },
    expireAt: { type: Date, default: undefined }
});

const Copuan = new mongoose.model("Copuan", copuanSchema);

module.exports = Copuan;