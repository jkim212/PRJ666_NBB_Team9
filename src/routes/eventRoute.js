const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');
const authenticate = require("../middleware/authenticate");

router.post("/createEvent", authenticate, eventController.createEvent);
router.get("/getEvents", authenticate, eventController.getEvents);
router.get("/getEventByUser", authenticate, eventController.getEventsByUser);
router.delete("/deleteEvent/:id", authenticate, eventController.deleteEvent);
router.post("/updateEvent/:id", authenticate, eventController.updateEvent);
router.get("/getEvent/:id", authenticate, eventController.getEevntbyId);

module.exports = router;