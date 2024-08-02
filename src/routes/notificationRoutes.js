const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const notificationController = require('../controllers/notificationController');

router.post('/create', notificationController.createNotification);
router.get('/notifications', notificationController.getNotifications);

module.exports = router;
