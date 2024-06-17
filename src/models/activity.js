const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  link: { type: String },
  image: { type: String },
  joined: { type: Number, default: 0 },
});

module.exports = mongoose.model('Activity', activitySchema);
