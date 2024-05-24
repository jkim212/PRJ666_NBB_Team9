const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Route to generate OTP (using POST)
router.post('/generate/otp', otpController.createOTP);
router.post('/verify/otp', otpController.optVerify);

module.exports = router;
