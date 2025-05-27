import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

export function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}
