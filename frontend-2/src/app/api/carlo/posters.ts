import axios, { AxiosResponse } from "axios";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

console.log(HOST, PORT);

const BASE_URL = `http://${HOST}:${PORT}`;

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
    const response: AxiosResponse<postersResult[]> = await axios.get(
      `${BASE_URL}/api/poster`,
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

updateVoting: async (id: number): Promise<postersResult> => {
  try {
    const response: AxiosResponse<postersResult> = await axios.patch(
      `${BASE_URL}/api/poster/voting/${id}`,
    );

    return response.data; // now TS knows it's an array
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
},

};

export default PosterAPI;
