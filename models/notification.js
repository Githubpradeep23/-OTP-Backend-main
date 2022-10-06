const { mongoose, Schema } = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user_id: {
      type: String
    },
    copuanCode_id: [{ type: Schema.Types.ObjectId, ref: 'Copuan' }],
    message: {
        type: String
    },
    createdAt: { type: Date, default: Date.now() },
});

const Notification = new mongoose.model("Notification", notificationSchema);

module.exports = Notification;