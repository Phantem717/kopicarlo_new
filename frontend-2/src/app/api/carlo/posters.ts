import axios, { AxiosResponse } from "axios";
import generateSignature from "@/utils/signature";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

console.log(HOST, PORT);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CONS_ID = process.env.NEXT_PUBLIC_CONSUMER_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_PASSWORD as string;


interface postersPayload {
  // ❗ Add your expected fields here
  [key: string]: any;
}

interface postersResult {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  votes: number;
}

const PosterAPI = {
  // Create new API Response
getPosters: async (): Promise<postersResult[]> => {
  try {
     const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
    
          const headers = {
            "Content-Type": "application/json",
            "x-cons-id": CONS_ID,
            "x-timestamp": timestamp,
            "x-signature": signature,
          };
          console.log(headers);
    const response: AxiosResponse<postersResult[]> = await axios.get(
      `${BASE_URL}/api/poster`, { headers }
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

updateVoting: async (id: number): Promise<postersResult> => {
  try {
       const { timestamp, signature } = generateSignature(CONS_ID, API_KEY);
    
          const headers = {
            "Content-Type": "application/json",
            "x-cons-id": CONS_ID,
            "x-timestamp": timestamp,
            "x-signature": signature,
          };
   const response: AxiosResponse<postersResult> = await axios.patch(
  `${BASE_URL}/api/poster/voting/${id}`,
  {},                // empty body
  { headers }        // correct place for headers
);

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default PosterAPI;
