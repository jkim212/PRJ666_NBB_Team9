const mongoose = require('mongoose');

function connect() {
  const mongoDBConnectionString ="mongodb+srv://prj66Project:namsansar@cluster0.htnq8jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  return mongoose.connect(mongoDBConnectionString)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });

}
module.exports = {connect};