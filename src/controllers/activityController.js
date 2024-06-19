const Activity = require('../models/activity');
const fs = require('fs');

exports.createActivity = async (req, res) => {
  const { title, date, location, link } = req.body;
  let image = null;
  const {id}=req.user;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    image = newPath;
  }

  try {
    const newActivity = new Activity({
      title,
      date,
      location,
      link,
      image,
      creator: id
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 });
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    console.error(`Error fetching activity with ID ${id}:`, error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateActivity = async (req, res) => {
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
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.title = title;
    activity.date = date;
    activity.location = location;
    activity.link = link;
    activity.image = image;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (error) {
    console.error(`Error updating activity with ID ${id}:`, error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(`Error deleting activity with ID ${id}:`, error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
