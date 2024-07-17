const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const commentSchema = new Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', 
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

const Comment = model('Comment', commentSchema);

module.exports = Comment;
