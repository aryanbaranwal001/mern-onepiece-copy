import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api/";
const backendUrl = BACKEND_URL || "https://127.0.0.1:3001/api/"; 

console.log("backend url",backendUrl)

export const axiosInstance = axios.create({
  baseURL: backendUrl ,
  withCredentials: true, 
});
