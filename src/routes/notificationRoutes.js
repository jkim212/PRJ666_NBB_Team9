const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const notificationController = require('../controllers/notificationController');

router.post('/create', authenticate, notificationController.createNotification);
router.get('/notifications', authenticate, notificationController.getNotifications);

module.exports = router;
