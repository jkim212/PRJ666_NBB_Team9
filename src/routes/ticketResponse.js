const express=require('express');
const router=express.Router();
const ticketResponseController = require("../controllers/ticketReponseController");
const authenticate=require('../middleware/authenticate');

router.post("/createTicketResponse/:id",authenticate,ticketResponseController.createTicketResponse);
router.get("/getTicketResponses/:id",authenticate,ticketResponseController.getTicketResponses);

module.exports=router;