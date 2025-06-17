import express from 'express';
import { checkoutSession } from '../controllers/stripeController.js';
import { authenticateToken } from '../middlewares/authenticate.js';

const stripeRouter = express.Router();

//stripeRouter.post('/payment', checkoutSession);
stripeRouter.post('/payment', authenticateToken, checkoutSession);

export default stripeRouter;
