const TicketResponse = require("../models/ticketResponse");
const sendMail = require("../utils/mailer");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const createTicketResponse = async (req, res) => {
  const user = req.user;
  
  const { id } = req.params;
  const { response } = req.body;
  console.log(req.params);
  try {
    const newResponse = new TicketResponse({
      ticket: id,
      response: response,
      responded_by: user.id,
    });
      await newResponse.save();
    
    if(user.role!="student"){

      const ticket = await Ticket.findById(id);
      const user2 = await User.findById(ticket.user);
      
      sendMail(
        user2.email,
        "Response to your ticket",
        `Your ticket with title ${ticket.title} has been responded to. Please check your dashboard for more details.`
      );

    }
    res.status(201).json({message:"Response created successfully"});
  } catch (error) {
    console.error("Error creating ticket response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getTicketResponses = async (req, res) => {
  const { id } = req.params;
  const user = req.params.id;
  try {
    const responses = await TicketResponse.find({ticket:id}).sort({ created_at: 1 });
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching ticket responses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTicketResponse, getTicketResponses };