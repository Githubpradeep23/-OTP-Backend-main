
const { mongoose, Schema } = require("mongoose");


const complainSchema = new mongoose.Schema({
    complain: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default:null
    },
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default:null
    },

});


const Complain = new mongoose.model("Complain", complainSchema);

module.exports = Complain;