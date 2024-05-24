const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
  const mongoDBConnectionString =process.env.MONGODB_URL;

  return mongoose.connect(mongoDBConnectionString)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });

}
module.exports = connect;