const mongoose = require('mongoose');


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
});

const User = mongoose.model('User', userSchema);
module.exports = User;
