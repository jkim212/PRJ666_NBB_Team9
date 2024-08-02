const Event = require("../models/events");

const createEvent = async (req, res) => {
const user = req.user;
if(req.body){
const newEevent = req.body;
try{
const eventDoc = new Event({
  title: newEevent.title,
  description: newEevent.description,
  imageUrl: newEevent.imageUrl,
  user: user.id,
  category: newEevent.categories,
});
await eventDoc.save();
const event = await Event.findById(eventDoc._id)
res.status(201).json({event: event});

}
catch(error){
console.error('Error creating event:', error);
res.status(500).json({ error: 'Internal server error' });
}
}
else{
res.status(400).json({error:"Bad request"});
}

}
const getEvents = async (req, res) => {
  try {
    const { newest, category } = req.query;
    const filter = category ? { category: category } : {};

    const events = await Event.find(filter).sort({
      created_at: newest === "true" ? -1 : 1,
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEventsByUser = async (req, res) => {
  const id=req.user.id;
  try{
    const events = await Event.find({ user: id }).sort({ created_at: -1 });
    res.status(200).json(events);
  } catch(error){
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const eventDoc = await Event.findByIdAndDelete(id);
    if (!eventDoc) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({messsage:'Event deleted successfully'});
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const newEvent = req.body;
  try {
    const event = await Event.findOne({ _id: id });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    event.title = newEvent.title;
    event.description = newEvent.description;
    event.imageUrl = newEvent.imageUrl;
    event.category = newEvent.categories;
    await event.save();
    const updatedEvent = await Event.findById(event._id);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const getEevntbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    } else {
      
      res.status(200).json(event);
    }
  }
  catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  };
module.exports = { createEvent, getEvents, getEventsByUser, deleteEvent, updateEvent,getEevntbyId};
