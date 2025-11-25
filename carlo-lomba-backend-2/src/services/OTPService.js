const axios = require('axios');
const  ResponsesModel = require('../models/responsesModel');
const  generateSignature  = require('../handlers/signature');
const PosterModel = require('../models/posterModel');
const password = process.env.PASSWORD ;
const consID2 = process.env.CONS_ID_WA;
const HOST = process.env.API_WA
const path = `http://${HOST}/api/v1/integration/whatsappweb/hello/send-text`
class OTPServiceClass {
    static async generateOTP (phone_number) {
        try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        const data = await ResponsesModel.readByPhoneNumber(phone_number);
        console.log("DATA", data);
        const updateResp = await ResponsesModel.updateById(data.response_id, {choice:data.choice, phone_number:phone_number, success: data.success, otp: otp, authorized: data.authorized});
        if (updateResp) {
            // this.sendOTP(phone_number,otp);
            return {    
                otp: otp,
                otpExpiry: otpExpiry,
                phone_number: phone_number
            };
        }
        } catch (error) {
            console.error('Error Generating OTP:', error.message);
            throw error;
        }
 
    }

    static async sendOTP(phone_number,code){
        try {
        const { timestamp, signature } = generateSignature(consID2, password);
   
        const url = path;

        const response = await axios.post(
        url,
        {
    phone: phone_number,        // phone: payload.phone_number,
            message : `*Notifikasi Sistem Otomatis*
    *Jangan memberitahukan OTP ini kepada siapapun.*

    *Pemberitahuan OTP*
    *OTP Anda: ${code}*
    *OTP AKAN HANGUS DALAM 5 MENIT*

    *Terimakasih telah menggunakan sistem kami.*

    *_pesan otomatis dari sistem, mohon tidak membalas_*`    },
        {
        headers: {
            'X-cons-id': consID2,
            'X-timestamp': timestamp,
            'X-signature': signature,
            'Content-Type': 'application/json'
        }
        }
    );

    console.log("WA RESPONSE:", response.data);
    return response.data;
        } catch (error) {
            console.error('Error sending WhatsApp message Verification:', error.message);
            throw error;
        }

        }
    
        static async checkOTP(payload){
            try {
                if(payload.expiry > payload.currentDate){
                    return {
                        success: false,
                        message: "OTP Expired, Please Generate New OTP"
                    }
                }
                else{
                const data = await ResponsesModel.readByPhoneNumber(payload.phone_number);
                const update= await ResponsesModel.updateById(data.response_id, {choice:data.choice, phone_number:payload.phone_number, success: data.success, otp: payload.otp, authorized: true});
                if (data.otp === payload.otp) {
                    
                    return {
                        success: true,
                        message: "OTP Valid"
                    }
                }
                else{
                       return {
                        success: false,
                        message: "OTP Invalid"
                    }
                }       
                }

            } catch (error) {
            console.error('Error Checking OTP:', error.message);

            throw error;
            }
        }
}
module.exports = OTPServiceClass;