const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Activity = require('../models/activity');

const uploadMiddleware = multer({ dest: 'uploads/' });

// Create a new activity
router.post('/activities', uploadMiddleware.single('file'), async (req, res) => {
  const { title, date, location, link } = req.body;
  let image = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    image = newPath;
  }

  try {
    const activityDoc = await Activity.create({
      title,
      date,
      location,
      link,
      image,
    });
    res.status(201).json(activityDoc);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 });
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch a single activity by ID
router.get('/activities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const activityDoc = await Activity.findById(id);
    if (!activityDoc) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activityDoc);
  } catch (error) {
    console.error(`Error fetching activity with ID ${id}:`, error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an existing activity
router.put('/activities/:id', uploadMiddleware.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, date, location, link } = req.body;
  let image = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    image = newPath;
  }

  try {
    const activityDoc = await Activity.findByIdAndUpdate(
      id,
      {
        title,
        date,
        location,
        link,
        image,
      },
      { new: true }
    );
    if (!activityDoc) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activityDoc);
  } catch (error) {
    console.error(`Error updating activity with ID ${id}:`, error);
    res.status500().json({ error: 'Server error' });
  }
});

// Delete an activity
router.delete('/activities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const activityDoc = await Activity.findByIdAndDelete(id);
    if (!activityDoc) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(`Error deleting activity with ID ${id}:`, error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
