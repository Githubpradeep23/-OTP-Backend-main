const { mongoose, Schema } = require("mongoose");


const querySchema = new mongoose.Schema({
    query: {
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


const QUERY = new mongoose.model("query", querySchema);

module.exports = QUERY;
