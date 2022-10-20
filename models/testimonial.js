const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    testimonialImage:{
        type:String,
        required:true
        
        // data: Buffer,
        // contentType: String
    },
    customerName:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    youtube_link:{
        type:String,
        default:null
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
});

const Testimonial = new mongoose.model("Testimonial",testimonialSchema);

module.exports = Testimonial;