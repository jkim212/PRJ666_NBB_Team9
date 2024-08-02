const mongoose = require("mongoose");
const ticketResponseSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Ticket",
  },
  response: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  responded_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const TicketResponse = mongoose.model("TicketResponse", ticketResponseSchema);
module.exports = TicketResponse;