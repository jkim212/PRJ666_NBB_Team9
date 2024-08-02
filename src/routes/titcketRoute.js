const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authenticate = require('../middleware/authenticate');

router.post("/createTicket", authenticate, ticketController.createTicket);
router.get("/getTickets", authenticate, ticketController.getTickets);
router.get("/getTicket/:id", authenticate, ticketController.getTicketById);
router.put("/closeTicket/:id", authenticate, ticketController.closeTicket);
router.get("/activeTickets", authenticate, ticketController.activeTickets);
router.get("/getAllTickets",authenticate,ticketController.getAllTickets);

module.exports = router;