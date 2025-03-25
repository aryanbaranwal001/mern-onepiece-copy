import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api/";
const backendUrl = BACKEND_URL || "https://one-piece-vault-production.up.railway.app/api" 

export const axiosInstance = axios.create({
  baseURL: backendUrl ,
  withCredentials: true, 
});
