import DbHelper from '../db/dbHelper.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uid } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

import { registerUserSchema, loginUserSchema } from '../services/validationServices.js';
import { sendWelcomeEmail } from '../services/emailServices.js';
const db = new DbHelper();

export async function registerNewUser(req, res) {
	try {
		const { error } = registerUserSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: `${error.message}` });
		}

		const { Email, Password, ConfirmPassword } = req.body;

		// Check if the email already exists
		const existingEmail = await db.executeProcedure('GetUserByEmail', { Email });
		if (existingEmail.length > 0) {
			return res.status(400).json({ message: 'Email is already in use' });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(Password, 10);
		const userId = uid();
		// Execute stored procedure and retrieve the new UserID
		await db.executeProcedure('UpsertUser', {
			UserId: userId,
			Email,
			PasswordHash: hashedPassword,
		});

		res.status(201).json({
			message: `User ${Email} has been created successfully`,
		});

		await sendWelcomeEmail(Email);
	} catch (error) {
		console.error('Error happened ', error);
		res.status(500).json({ message: `${error.message}` });
	}
}
export async function login(req, res) {
	try {
		const { error } = loginUserSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { Email, Password } = req.body;

		const userFound = (await db.executeProcedure('GetUserByEmail', { Email })).recordset;
		if (userFound.length === 0) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		const user = userFound[0];
		const isPasswordMatch = await bcrypt.compare(Password, user.PasswordHash);
		if (!isPasswordMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ UserId: user.UserId, Email: user.Email, Role: user.Role }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		return res.status(200).json({ message: 'Succesful Login', token });
	} catch (error) {
		console.error('Something unexpected happened', error);
		res.status(500).json({ message: 'Server Error' });
	}
}

export async function getUsers(req, res) {
	try {
		let results = await db.executeProcedure('GetAllUsers', {});

		res.status(200).json(results.recordset);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
export async function updateUserRole(req, res) {
	try {
		const { id } = req.params;
		const { Role } = req.body;

		// Check if user exists
		const existingUser = await db.executeProcedure('GetUserById', { UserId: id });
		if (!existingUser.recordset.length) {
			return res.status(404).json({ message: 'User not found' });
		}

		await db.executeProcedure('UpsertUser', {
			UserId: id,
			Email: existingUser.recordset[0].Email,
			PasswordHash: existingUser.recordset[0].PasswordHash,
			Role,
		});

		res.status(200).json({ message: 'User role updated successfully' });
	} catch (error) {
		console.error('Error updating user role:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}
export async function deleteUser(req, res) {
	try {
		const { id } = req.params;
		const foundUser = await db.executeProcedure('GetUserById', { UserId: id });
		if (!foundUser) {
			res.status(404).json({ message: 'No user was found with that id' });
		}
		await db.executeProcedure('DeleteUser', { UserId: id });
		res.status(200).json({ message: `${foundUser.recordset[0].Email} has been deleted successfully` });
	} catch (error) {
		console.error('Something went wwrong', error);
		res.status(500).json({ message: 'Internal server Error' });
	}
}
export async function getUserById(req, res) {
	try {
		const { id } = req.params;

		const foundUser = await db.executeProcedure('GetUserById', { UserId: id });
		if (!foundUser) {
			res.status(404).json({ message: 'No user was found with that id' });
		}

		res.status(200).json(foundUser.recordset);
	} catch (error) {
		console.error('Something went wwrong', error);
		res.status(500).json({ message: 'Internal server Error' });
	}
}

export async function getUserByEmail(req, res) {
	try {
		const { email } = req.params;

		const foundUser = await db.executeProcedure('GetUserByEmail', { Email: email });
		if (!foundUser) {
			res.status(404).json({ message: 'No user was found with that Email' });
		}
		console.log(foundUser);
		res.status(200).json(foundUser.recordset);
	} catch (error) {
		console.error('Something went wwrong', error);
		res.status(500).json({ message: 'Internal server Error' });
	}
}
