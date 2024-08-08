const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get("/getUser", authenticate, userController.getUserInfo);
router.get("/getUser/:id", authenticate, userController.getUserbyId);

module.exports = router;