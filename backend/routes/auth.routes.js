import {signup, login, logout} from '../controllers/auth.controllers.js';
import express from 'express';

const authRoutes = express.Router();


authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);






export default authRoutes;