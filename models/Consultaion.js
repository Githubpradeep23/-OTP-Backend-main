const { mongoose, Schema } = require("mongoose");


const consultationSchema = new mongoose.Schema({

    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],

    category:{
        type: String,
        required: true
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    paid: {
        type: Boolean,
        default: false
    },

    firstFree:{
        type: Boolean,

    },

   
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
});


const Consultation = new mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;

