import {signup, login, logout, check, getuser, getAuthorFromId} from '../controllers/auth.controllers.js';
import protectedRoute from '../middlewares/protectedRoute.mw.js';
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);
authRoutes.get('/check', check);
authRoutes.get('/getuser', protectedRoute, getuser);
authRoutes.get('/getauthorfromid/:authorId', getAuthorFromId);

export default authRoutes;