const multer = require('multer');
const fs = require('fs');
const Post = require('../../src/models/post');
const connectDB = require('../../src/config/database');

const uploadMiddleware = multer({ dest: 'uploads/' });

const handler = async (req, res) => {
  await connectDB(); // Ensure database is connected

  if (req.method === 'POST') {
    uploadMiddleware.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload error' });
      }

      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);

      const { title, content } = req.body;
      const postDoc = await Post.create({
        title,
        content,
        image: newPath,
      });
      res.json(postDoc);
    });
  } else if (req.method === 'PUT') {
    uploadMiddleware.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload error' });
      }

      let newPath = null;
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
      }

      const { id, title, content } = req.body;
      const postDoc = await Post.findById(id);
      await postDoc.update({
        title,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      res.json(postDoc);
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

module.exports = handler;
