const Ticket = require("../models/ticket");

const createTicket = async (req, res) => {
  const userId = req.user.id;
  
  const { title, description } = req.body;
  try {
    const newTicket = new Ticket({
      title,
      description,
      user: userId,
    });

    const savedTicket = await newTicket.save();
    const ticket = await Ticket.findById(savedTicket._id);
    console.log(ticket);
    res.status(201).json(true);
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    res.status(500).json({ error: "Server error" });
  }


};
const getTickets = async (req, res) => {
  const userId = req.user.id;
  try {
    const tickets = await Ticket.find({ user: userId }).sort({ created_at: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findOne({ _id: id });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  }
  catch(error){
    console.error(`Error fetching ticket with ID ${id}:`, error.message);
    res.status(500).json({ error: "Server error" });
  };
};
const closeTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findOne({ _id: id });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    };
    ticket.isActive = false;
    await ticket.save();
    res.status(200).json({message:"Ticket closed"});
  }
  catch(error){
    console.error(`Error closing ticket with ID ${id}:`, error.message);
    res.status(500).json({ error: "Server error" });
  };
};
const activeTickets = async (req, res) => {
  const userId = req.user.id;
  const active=req.query.active;
  let isActive=true;
 if(active!="true"){
    isActive=false;

 }


  try {
      const tickets = await Ticket.find({ user: userId, isActive: isActive}).sort({ created_at: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
const getAllTickets = async (req, res) => {
  try{
    const ticket=await Ticket.find({isActive:true}).sort({created_at:-1});
    res.status(200).json(ticket);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"server errer"})
  }
}


module.exports = { createTicket, getTickets, getTicketById, closeTicket,activeTickets,getAllTickets };