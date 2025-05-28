import ex from 'express';
import { addItemToCart, clearCart, deleteCartItem, getCartItems } from '../controllers/cartContoller.js';
import { authenticateToken } from '../middlewares/authenticate.js';

const cartItemRoutes = ex.Router();

cartItemRoutes.post('/upsert', authenticateToken, addItemToCart);
cartItemRoutes.get('/items/', authenticateToken, getCartItems);
cartItemRoutes.delete('/delete-item/:id', authenticateToken, deleteCartItem);
cartItemRoutes.delete('/clear-cart/', authenticateToken, clearCart);

export default cartItemRoutes;
