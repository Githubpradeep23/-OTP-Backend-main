const mongoose = require("mongoose");

const filtersSchema = new mongoose.Schema({
    fit5: { type: Boolean, default: false },
    strong60: { type: Boolean, default: false},
    enquiries: { type: Boolean, default: false },
    renewals: { type: Boolean, default: false },
    upcomingDemos: { type: Boolean, default: false },
    feeBalance: { type: Boolean, default: false },
    inactiveClients: { type: Boolean, default: false },
    fusions: { type: Boolean, default: false },
    demosBooked: { type: Boolean, default: false },
    newJoining: { type: Boolean, default: false },
    upcomingRenewals: { type: Boolean, default: false },
    review: { type: Boolean, default: false },
    activeClients: { type: Boolean, default: false },
    fit: { type: Boolean, default: false },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    date: { 
        type: Date,
        default: new Date()
    },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
  });
  
  const filters = new mongoose.model("Filters", filtersSchema);
  
  module.exports = filters;