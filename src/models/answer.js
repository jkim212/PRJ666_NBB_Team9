const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({

  description:{
    type:String,
    required:true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
  },
  question:{
    type: mongoose.Schema.Types.ObjectId,
  },

});
const Answer = mongoose.model('Answer', answerSchema); 