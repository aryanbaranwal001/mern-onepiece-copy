import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.mw.js';
import { create, update, del } from '../controllers/theoryAuthor.controllers.js';

const theoryAuthorRoutes = express.Router();

theoryAuthorRoutes.post('/create',protectedRoute, create)
theoryAuthorRoutes.post('/update/:theoryId', protectedRoute, update);
theoryAuthorRoutes.get('/delete/:theoryId', protectedRoute, del);


export default theoryAuthorRoutes;