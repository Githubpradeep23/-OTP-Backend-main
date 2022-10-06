const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    user_address:{
        type:String,
        required:String
    },
})