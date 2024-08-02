const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/authenticate');
const activityController = require('../controllers/activityController');

const uploadMiddleware = multer({ dest: 'uploads/' });

router.post('/activities', authenticate, uploadMiddleware.single('image'), activityController.createActivity);
router.get('/activities', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', authenticate, uploadMiddleware.single('image'), activityController.updateActivity);
router.delete('/activities/:id', authenticate, activityController.deleteActivity);
router.post('/activities/join', activityController.joinActivity);
router.post('/activities/:id/chat', activityController.postGroupChat);
router.get('/activities/:id/chat', activityController.getGroupChat);
router.delete('/chat/:id', activityController.deleteGroupChat);

module.exports = router;
