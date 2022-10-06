const mongoose = require("mongoose");

const userFeedBackSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    feedBack:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


const FeedBack = new mongoose.model("FeedBack",userFeedBackSchema);

module.exports = FeedBack;