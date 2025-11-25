const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();
router.post('/check', otpController.checkOTP);

router.post('/', otpController.tryOTP);
module.exports = router;
