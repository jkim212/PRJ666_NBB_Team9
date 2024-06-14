const connectDB = require('../../src/config/database');

module.exports = async (req, res) => {
  await connectDB(); // Ensure database is connected
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Testing endpoint is working' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
