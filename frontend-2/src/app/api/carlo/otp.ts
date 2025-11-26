import axios, { AxiosResponse } from "axios";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(HOST, PORT);

const BASE_URL = API_URL;

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
  // Create new API Response
sendOTP: async (phone_number:string): Promise<OTPResult> => {
  try {
    const response: AxiosResponse<OTPResult> = await axios.post(
      `${BASE_URL}/api/otp/`, {phone_number} 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

checkOTP: async (payload:OTPPayload): Promise<OTPResult> => {
  try {
    const response: AxiosResponse<OTPResult> = await axios.post(
      `${BASE_URL}/api/otp/check`, payload 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default OTPAPI;
