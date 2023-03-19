const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    staffInOut: { type: Boolean, default: false },
    whatsAppStatus: { type: Boolean, default: false},
    whatsAppBroadcast: { type: Boolean, default: false },
    hygieneCheck: { type: Boolean, default: false },
    addWhatsAppContact: { type: Boolean, default: false },
    airPercentageCheck: { type: Boolean, default: false },
    turnedOnLights: { type: Boolean, default: false },
    cashHandover: { type: Boolean, default: false },
    absentSmsCalls: { type: Boolean, default: false },
    followUpCalls: { type: Boolean, default: false },
    turnetOffLights: { type: Boolean, default: false },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    date: { 
        type: Date,
        default: new Date()
    }
  });
  
  const audits = new mongoose.model("Audits", auditSchema);
  
  module.exports = audits;