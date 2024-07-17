const mongoose = require("mongoose");

const evnetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category:[ {
    type: String,
    required: true
  }],
});

const Event = mongoose.model("Event", evnetSchema);
module.exports = Event;
