import axios, { AxiosResponse } from "axios";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

console.log(HOST, PORT);

const BASE_URL = `http://${HOST}:${PORT}`;

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
confirmNumber: async (phone_number:string): Promise<responseResult> => {
  try {
    const response: AxiosResponse<responseResult> = await axios.post(
      `${BASE_URL}/api/responses/confirm`, {phone_number} 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

update: async (payload:responsePayload): Promise<responseResult> => {
  try {
    const response: AxiosResponse<responseResult> = await axios.patch(
      `${BASE_URL}/api/responses/phone_update`, payload 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

confirmQR: async (payload:qrPayload): Promise<responseResult> => {
  try {
    const response: AxiosResponse<responseResult> = await axios.post(
      `${BASE_URL}/api/responses/confirm_QR`, payload 
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default ResponsesAPI;
