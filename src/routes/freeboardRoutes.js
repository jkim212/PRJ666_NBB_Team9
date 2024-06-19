const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post');
const uploadMiddleware = multer({ dest: 'uploads/' });

router.put('/freeboard/edit/:id', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { id } = req.params; 
    const { title, content } = req.body;

    try {
        const postDoc = await Post.findById(id);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }

        postDoc.title = title;
        postDoc.content = content;
        if (newPath) {
            postDoc.image = newPath;
        }

        await postDoc.save();
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
});
  
router.post('/freeboard', uploadMiddleware.single('file'), async (req, res) => {
  
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
    console.log(postDoc);
});
  
router.get('/freeboard', async (req,res) => {
    res.json(await Post.find().sort({createdAt: -1}));
});
  
router.get('/freeboard/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
})


router.delete('/freeboard/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const postDoc = await Post.findByIdAndDelete(id);
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
  });
 
module.exports = router
