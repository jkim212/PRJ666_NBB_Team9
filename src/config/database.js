const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

async function connect() {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  const mongoDBConnectionString = process.env.MONGODB_URL;

  try {
    await mongoose.connect(mongoDBConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('=> using new database connection');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = connect;
