const mongoose = require("mongoose");

const tittleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default: null,
    },
    description:{
        type:String,
        required:true
    }
});


const Tittle = new mongoose.model("Tittle",tittleSchema);

module.exports = Tittle;