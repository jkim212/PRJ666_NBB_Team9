const Activity = require('../models/activity');
const fs = require('fs');
const User = require('../models/user');
const Chat = require('../models/groupChat');
const Notification  = require('../models/Notification')

exports.createActivity = async (req, res) => {
  const { title, date, location, link, userId } = req.body;
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
    const newActivity = new Activity({
      title,
      date,
      location,
      link,
      image,
      user: userId
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
    const activities = await Activity.find().sort({ date: 1 }).populate('user', 'first_name last_name');;
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findOne({ _id: id }).populate('user', 'first_name last_name');

    let isCreator = false;

    if (req.user && req.user.id === activity.creator.toString()) {
      isCreator = true;
    }

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ activity, isCreator });
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

exports.joinActivity = async (req, res) => {
    const { activityId, userId } = req.body;
  
    try {
      const activity = await Activity.findById(activityId);
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      if (activity.participants.includes(userId)) {
        return res.json({ error: 'You already joined the activity.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      activity.participants.push(userId);
      activity.joined += 1;
      await activity.save();

      await User.findByIdAndUpdate(userId, { $push: { activities: activity._id } });

      
      const message = `User ${user.first_name} ${user.last_name} joined your activity: ${activity.title}`;
      
      const notification = new Notification({
        user: activity.user._id,
        message: message,
      });
      await notification.save();


      res.json({ message: 'Joined activity successfully', joined: activity.joined });
    } catch (error) {
      console.error('Error joining activity:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.postGroupChat = async (req, res) => {
    const { id } = req.params;
    const { body, userId } = req.body;

    try {
      if(!body) {
        return res.status(400).json({ error: 'Body is required fields' });
      }

      const newChat = await Chat.create({
        activityId: id,
        user: userId,
        body
      });

      res.status(201).json(newChat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error '});
    }
  }

  exports.getGroupChat = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Activity ID is required!' });
    }
    try {
      const chat = await Chat.find({ activityId: id }).populate('user', 'first_name last_name bio program entrance_year profile_picture');
      res.json({ chat });
    } catch (error) {
      console.log(`Error fetching chat for activity ID ${id}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  exports.deleteGroupChat = async (req, res) => {
    const { id } = req.params;
    try {
      const chat = await Chat.findByIdAndDelete(id);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
      console.error(`Error deleting chat with ID ${id}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
  }
