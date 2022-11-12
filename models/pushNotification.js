const { mongoose, Schema } = require("mongoose");

const pushNotificationSchema = new mongoose.Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

  
});

const pushNotification = new mongoose.model("pushNotification", pushNotificationSchema);

module.exports = pushNotification;