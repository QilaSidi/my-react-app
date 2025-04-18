import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchLatestEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
