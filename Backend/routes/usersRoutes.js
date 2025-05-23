import express from 'express';
import { registerNewUser } from '../controllers/usersController';

export const usersRoutes = express.Router();

usersRoutes.post('/register', registerNewUser);
