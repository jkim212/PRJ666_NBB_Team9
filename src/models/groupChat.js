const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const groupChatSchema = new Schema({
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity', 
      required: true
    },
    body: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

const GroupChat = model('GroupChat', groupChatSchema);

module.exports = GroupChat;
