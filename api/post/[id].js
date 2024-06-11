const Post = require('../../../src/models/post');
const connectDB = require('../../../src/config/database');

const handler = async (req, res) => {
  await connectDB(); // Ensure database is connected

  if (req.method === 'GET') {
    const { id } = req.query;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

module.exports = handler;
