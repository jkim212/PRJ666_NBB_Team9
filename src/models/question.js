const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({

title:{
  type:String,
  required:true,
},
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
answers:[{
  type: mongoose.Schema.Types.ObjectId,
}],
upVotes:[{
  type: mongoose.Schema.Types.ObjectId,
}],
tags:[{
  type: String,
}],
upVotesNumber:{
  type:Number,
  default:0,

},
});
const Question = mongoose.model('Question', questionSchema);