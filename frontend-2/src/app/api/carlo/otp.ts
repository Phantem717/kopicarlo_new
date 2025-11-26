import axios, { AxiosResponse } from "axios";
import generateSignature from "@/utils/signature";
const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CONS_ID = process.env.NEXT_PUBLIC_CONSUMER_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_PASSWORD as string;


console.log(HOST, PORT);


interface OTPPayload {
phone_number:string;
expiry:Date;
currentDate:Date;
otp:string
}

interface OTPResult<T = any> {
data: T,
success: boolean,
message: string
}

const OTPAPI = {
  // Create new API Responsert const OTPService = {
  sendOTP: async (phone_number: string): Promise<OTPResult> => {
    try {
      const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);

      const headers = {
        "Content-Type": "application/json",
        "x-cons-id": CONS_ID,
        "x-timestamp": timestamp,
        "x-signature": signature,
      };
      console.log(headers);
      const response: AxiosResponse<OTPResult> = await axios.post(
        `${BASE_URL}/api/otp/`,
        { phone_number },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

checkOTP: async (payload:OTPPayload): Promise<OTPResult> => {
  try {
       const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
        
              const headers = {
                "Content-Type": "application/json",
                "x-cons-id": CONS_ID,
                "x-timestamp": timestamp,
                "x-signature": signature,
              };
    const response: AxiosResponse<OTPResult> = await axios.post(
      `${BASE_URL}/api/otp/check`, payload , {headers}
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default OTPAPI;
