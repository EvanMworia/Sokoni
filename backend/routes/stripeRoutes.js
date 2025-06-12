import express from 'express';
import { checkoutSession } from '../controllers/stripeController.js';

const stripeRouter = express.Router();

stripeRouter.post('/payment', checkoutSession);

export default stripeRouter;
