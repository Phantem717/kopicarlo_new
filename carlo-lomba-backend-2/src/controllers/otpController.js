const OTPService = require('../services/OTPService');

class OTPController{

    static tryOTP = async(req,res) => {
        try {
            const payload = req.body;
            const result = await OTPService.generateOTP(payload.phone_number);
            res.status(200).json({success:true, data: result, message: 'OTP sent successfully'});
        } catch (error) {
            console.error('Error checking OTP:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static checkOTP = async(req,res) => {
        try {
            const payload = req.body;
            const result = await OTPService.checkOTP(payload);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error checking OTP:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}

module.exports = OTPController