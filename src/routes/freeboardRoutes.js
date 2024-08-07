const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');
const Notification = require('../models/Notification');

const uploadMiddleware = multer({ dest: 'uploads/' });

router.put('/freeboard/edit/:id', uploadMiddleware.single('file'), async (req, res) => {
    const { id } = req.params; 
    const { title, content, image } = req.body;

    try {
        const postDoc = await Post.findById(id);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }

        postDoc.title = title;
        postDoc.content = content;
        postDoc.image = newPath;

        await postDoc.save();
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
});
  
router.post('/freeboard', uploadMiddleware.single('file'), async (req, res) => {
    const { title, content, userId, image } = req.body;

    const postDoc = await Post.create({
      title,
      content,
      image,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, { $push: {posts: postDoc._id }})
    res.json(postDoc);
    console.log(postDoc);
});

router.post('/freeboard/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { body, userId } = req.body; 

    try {
        if (!body) {
            return res.status(400).json({ error: 'Body is required fields' });
        }

        const newComment = await Comment.create({
            postId: id,
            user: userId,
            body
        });

        //Add Notification

        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        const post = await Post.findById(id);
        if (post) {
        const notification = new Notification({
            user: post.user._id,
            message: `User ${user.first_name} ${user.last_name} commented on your post: ${post.title}`,
            url: `/freeboard/${post._id}`
        });
        await notification.save();
        }


        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/freeboard/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ postId: id }).sort({ createdAt: -1 }).populate('user', 'first_name last_name');
        res.json({ comments });
    } catch (error) {
        console.error(`Error fetching comments for post ID ${id}:`, error);
        res.status(500).json({ error: 'Server error' });
    }
    });
  
router.get('/freeboard', async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate('user', 'first_name last_name entrance_year bio program profile_picture');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error});
    }
});
  
router.get('/freeboard/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const postDoc = await Post.findById(id).populate('user', 'first_name last_name bio entrance_year prgram profile_picture');
        if (!postDoc) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({message: 'Error fetching post', error});
    }
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

  router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(`Error deleting comment with ID ${id}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
});


  router.put('/comments/:id', async (req, res) => {
    const { id } = req.params; 
    const { body } = req.body;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.body = body;

        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the comment' });
    }
});
 
module.exports = router
