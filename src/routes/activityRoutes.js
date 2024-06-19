const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/authenticate');
const activityController = require('../controllers/activityController');

const uploadMiddleware = multer({ dest: 'uploads/' });

router.post('/activities', uploadMiddleware.single('image'), activityController.createActivity);
router.get('/activities', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', uploadMiddleware.single('image'), activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;
