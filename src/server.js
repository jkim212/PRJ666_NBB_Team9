const express = require('express');
const connectDB = require('./config/database');
const otpRoutes = require('./routes/otpRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  // Start server if database connection is successful
  app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit process with failure
});

// Routes
app.use('/otp', otpRoutes);
