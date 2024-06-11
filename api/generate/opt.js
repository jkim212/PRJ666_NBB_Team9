const connectDB = require('../../src/config/database');
const { createOTP } = require('../../src/controllers/otpController');

module.exports = async (req, res) => {
  await connectDB(); // Ensure database is connected
  if (req.method === 'POST') {
    createOTP(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
