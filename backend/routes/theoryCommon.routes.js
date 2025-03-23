import express from 'express';
import { latest, top, upvote, downvote } from '../controllers/theoryCommon.controllers.js';

const theoryCommonRoutes = express.Router();

theoryCommonRoutes.get('/latest', latest)
theoryCommonRoutes.get('/top', top)
theoryCommonRoutes.post('/upvote', upvote)
theoryCommonRoutes.post('/downvote', downvote)



export default theoryCommonRoutes;