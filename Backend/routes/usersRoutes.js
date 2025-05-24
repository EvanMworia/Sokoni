import express from 'express';
import {
	deleteUser,
	getUserByEmail,
	getUserById,
	getUsers,
	login,
	registerNewUser,
	updateUserRole,
} from '../controllers/usersController.js';

const usersRoutes = express.Router();

usersRoutes.post('/register', registerNewUser);
usersRoutes.post('/login', login);
usersRoutes.get('/all-users', getUsers);
usersRoutes.get('/id/:id', getUserById);
usersRoutes.get('/email/:email', getUserByEmail);
usersRoutes.patch('/update/:id', updateUserRole);
usersRoutes.delete('/delete/:id', deleteUser);

export default usersRoutes;
