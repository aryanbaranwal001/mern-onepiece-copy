// todo 
// in index.js
const FRONTEND_URL_BASE = process.env.FRONTEND_URL_BASE || "http://localhost:5173";

// in axios.js from frontend/src  check
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api";

/////////////////////////// commit check
// in frontend/src

import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api";//
// in baseUrl, dont put condition there


export const axiosInstance = axios.create({
  baseURL: BACKEND_URL || "https://one-piece-vault-production.up.railway.app/api",
  withCredentials: true, 
});

// in .env forntend
VITE_BACKEND_URL=http://127.0.0.1:3001


/////////////////////////// commit check
// in backend index

const FRONTEND_URL_BASE = process.env.FRONTEND_URL_BASE || "http://localhost:3000";
app.use(cors({
  origin: FRONTEND_URL_BASE, 
  
  credentials: true,
}));

// env backend 

PORT=3001
MONGO_URL=mongodb://localhost:27017/onepiecevault
JWT_SECRET=jwtsecretkey
FRONTEND_URL_BASE=http://localhost:5173


/////////////////////////// commit checck
// make sure const app = express() is before the cors middleware
// in backend index

/////////////////////////// commit checck
// install nodemon as dev dependency
npm install nodemon --save-dev   /////d




/////////////////////////// commit checck
// in package.json in frontend

"tail": "npx tailwindcss -i ./src/input.css -o ./src/output.css --watch", /////d
"build": "vite build",

// frontend/arc app.js

<Route   ////d
path="/"
element={<Navigate to="/signup" />}
/>




/////////////////////////// commit checck

// update the gitignore in repo root







