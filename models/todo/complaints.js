const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    clientNumber: { type: String, default: null },
    complaintDetails: { type: String, required: true},
    supportEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
        type: String,
        default: 'PENDING'
    },
    scalme: {
        type: String, default: null
    }
  });
  
  const ticketComplaints = new mongoose.model("TicketComplaints", complaintSchema);
  
  module.exports = ticketComplaints;