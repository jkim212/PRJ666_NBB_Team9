const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const notificationController = require('../controllers/notificationController');

router.get('/notifications', authenticate, notificationController.getNotifications);
router.delete('/notifications/:id', authenticate, notificationController.deleteNotification);

module.exports = router;
