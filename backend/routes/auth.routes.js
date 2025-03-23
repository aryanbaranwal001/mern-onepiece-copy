import {signup, login, logout, check} from '../controllers/auth.controllers.js';
import express from 'express';

const authRoutes = express.Router();


authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);
authRoutes.get('/check', check);





export default authRoutes;