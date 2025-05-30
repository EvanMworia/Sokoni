import ex from 'express';
import { authenticateToken } from '../middlewares/authenticate.js';
import { checkoutCart } from '../controllers/checkoutController.js';

const checkoutRouter = ex.Router();

checkoutRouter.post('/checkout', authenticateToken, checkoutCart);

export default checkoutRouter;
