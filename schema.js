const mongoose = require('mongoose');

// Define the schema for the OTP model
const optSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // OTP will expire after 10 minutes (600 seconds)
  },
});

// Create the OTP model from the schema
const Otp = mongoose.model('Otp', optSchema);

// Function to connect to MongoDB
function connect() {
  const mongoDBConnectionString = process.env.MONGODB_URL;

  return mongoose.connect(mongoDBConnectionString)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });
}

// Exporting everything in one go
module.exports = {
  connect,
  models: {
    
    Otp
  }
};
