const express = require('express');
const authCheck = require('../middleware/authMiddleware.js'); // This must be a function!

const otpController = require('../controllers/otpController');

const router = express.Router();
router.post('/check',authCheck, otpController.checkOTP);

router.post('/',authCheck, otpController.tryOTP);
module.exports = router;
