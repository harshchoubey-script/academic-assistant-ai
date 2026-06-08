import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://academic-assistant-ai-1.onrender.com",
  withCredentials: true,
});

export default axiosInstance;