import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.mw.js';
import { create, update, del, getAuthorTheories } from '../controllers/theoryAuthor.controllers.js';

const theoryAuthorRoutes = express.Router();

theoryAuthorRoutes.post('/create',protectedRoute, create)
theoryAuthorRoutes.post('/update/:theoryId', protectedRoute, update);
theoryAuthorRoutes.get('/delete/:theoryId', protectedRoute, del);
theoryAuthorRoutes.get('/getauthortheories', protectedRoute, getAuthorTheories);


export default theoryAuthorRoutes;