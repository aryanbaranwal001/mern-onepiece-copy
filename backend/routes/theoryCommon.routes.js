import express from 'express';
import { latest, top, upvote, downvote } from '../controllers/theoryCommon.controllers.js';
import protectedRoute from '../middlewares/protectedRoute.mw.js';
const theoryCommonRoutes = express.Router();

theoryCommonRoutes.get('/latest', latest)
theoryCommonRoutes.get('/top', top)
theoryCommonRoutes.post('/upvote/:upvoteId',protectedRoute, upvote)
theoryCommonRoutes.post('/downvote/:downvoteId',protectedRoute, downvote)



export default theoryCommonRoutes;