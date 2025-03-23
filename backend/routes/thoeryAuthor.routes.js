import express from 'express';
import { create, update, del } from '../controllers/theoryAuthor.controllers.js';

const theoryAuthorRoutes = express.Router();

theoryAuthorRoutes.post('/create', create)
theoryAuthorRoutes.post('/update', update)
theoryAuthorRoutes.get('/delete', del)



export default theoryAuthorRoutes;