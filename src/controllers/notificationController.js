const Notification = require('../models/Notification');

exports.createNotification = async (user, message) => {
  try {
    const notification = new Notification({ user, message });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw new Error('Server error');
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
