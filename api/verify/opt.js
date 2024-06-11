const connectDB = require('../../src/config/database');
const { optVerify } = require('../../src/controllers/otpController');

module.exports = async (req, res) => {
  await connectDB(); // Ensure database is connected
  if (req.method === 'POST') {
    optVerify(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
