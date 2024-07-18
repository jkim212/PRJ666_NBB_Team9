const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
         const user = await User.findById(userId).populate('posts activities');
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/profile/:userId', upload.single('profile_picture'), async (req, res) => {
    const userId = req.params.userId;
    const { first_name, last_name, entrance_year, program, bio } = req.body;
    const profile_picture = req.file ? req.file.path : null;

    try {
        const user = await User.findById(userId);
        if (user) {
            user.profile_picture = profile_picture || user.profile_picture;
            user.first_name = first_name;
            user.last_name = last_name;
            user.entrance_year = entrance_year
            user.bio = bio;
            user.program = program;
            await user.save();
            res.sendStatus(200);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
