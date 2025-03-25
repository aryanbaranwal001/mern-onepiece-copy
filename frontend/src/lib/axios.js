import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api";


export const axiosInstance = axios.create({
  baseURL: BACKEND_URL || "https://one-piece-vault-production.up.railway.app/api",
  withCredentials: true, 
});
