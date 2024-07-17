const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new mongoose.Schema({
email:{
  type:String,
  unique:true,
  required:true,
},
role:{
  type:String,
  required:true,
},
created_at: {
  type: Date,
  default: Date.now,
},
profile_picture: {
  type: String,
},
first_name: {
  type: String,
},
last_name: {
  type: String,
},
entrance_year: {
  type: Number,
},
program: {
  type: String,
},
bio: {
  type: String,
},
posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
