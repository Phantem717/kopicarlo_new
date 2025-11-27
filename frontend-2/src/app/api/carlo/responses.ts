import axios, { AxiosResponse } from "axios";
import generateSignature from "@/utils/signature";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

console.log(HOST, PORT);


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CONS_ID = process.env.NEXT_PUBLIC_CONSUMER_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_PASSWORD as string;

interface responsePayload {
phone_number:string;
choice:number;
}

interface responseResult<T = any> {
data: T,
success: boolean,
message: string
}

interface qrPayload {
  phone_number: string,
  otp: string
}
const ResponsesAPI = {
  // Create new API Response
confirmNumber: async (phone_number:string,name:string,role:string,unit:string): Promise<responseResult> => {
  try {
      const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
        
              const headers = {
                "Content-Type": "application/json",
                "x-cons-id": CONS_ID,
                "x-timestamp": timestamp,
                "x-signature": signature,
              };
    const response: AxiosResponse<responseResult> = await axios.post(
      `${BASE_URL}/api/responses/confirm`, {phone_number,name,role,unit} , {headers}
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

update: async (payload:responsePayload): Promise<responseResult> => {
  try {
      const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
        
              const headers = {
                "Content-Type": "application/json",
                "x-cons-id": CONS_ID,
                "x-timestamp": timestamp,
                "x-signature": signature,
              };
    const response: AxiosResponse<responseResult> = await axios.patch(
      `${BASE_URL}/api/responses/phone_update`, payload, {headers}
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

confirmQR: async (payload:qrPayload): Promise<responseResult> => {
  try {
      const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
        
              const headers = {
                "Content-Type": "application/json",
                "x-cons-id": CONS_ID,
                "x-timestamp": timestamp,
                "x-signature": signature,
              };
    const response: AxiosResponse<responseResult> = await axios.post(
      `${BASE_URL}/api/responses/confirm_QR`, payload, {headers} 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

checkQR: async (payload:qrPayload): Promise<responseResult> => {
  try {
      const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
        
              const headers = {
                "Content-Type": "application/json",
                "x-cons-id": CONS_ID,
                "x-timestamp": timestamp,
                "x-signature": signature,
              };
    const response: AxiosResponse<responseResult> = await axios.post(
      `${BASE_URL}/api/responses/check_QR`, payload,{headers} 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default ResponsesAPI;
