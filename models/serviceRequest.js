const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    serviceID:{
        type:String,
        required:true
    },
    inSufficientCoins:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default :Date.now()
    }
});


const Request = new mongoose.model("Request",serviceRequestSchema);

module.exports = Request;


