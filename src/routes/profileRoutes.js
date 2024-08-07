const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const upload = multer();

router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
         const user = await User.findById(userId).populate('posts activities');
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/profile/:userId', upload.none(), async (req, res) => {
    const userId = req.params.userId;
    let { first_name, last_name, entrance_year, program, bio, profile_picture, private_fields } = req.body;

    if (!profile_picture) {
        profile_picture = 'https://res.cloudinary.com/dtgdo1ajo/image/upload/v1723006192/vldekmizwzx0t9vea1re.png';
    }

    try {
        private_fields = JSON.parse(private_fields);
    } catch (error) {
        return res.status(400).send('Invalid private_fields format');
    }

    try {
        const user = await User.findById(userId);
        if (user) {
            user.profile_picture = profile_picture;
            user.first_name = first_name;
            user.last_name = last_name;
            user.entrance_year = entrance_year;
            user.bio = bio;
            user.program = program;
            user.private_fields = private_fields;
            await user.save();
            res.sendStatus(200);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
