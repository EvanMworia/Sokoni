import DbHelper from '../db/dbHelper.js';
import { sendOrderPlacedEmail } from '../services/emailServices.js';

const db = new DbHelper();

export async function checkoutCart(req, res) {
	try {
		const { Email, UserId } = req.user;

		// Step 1: Get all cart items for the user
		const result = await db.executeProcedure('GetCartItems', { UserId });
		const cartItems = result.recordset;

		if (!cartItems || cartItems.length === 0) {
			return res.status(400).json({ message: 'Your cart is empty.' });
		}

		// Step 2: Send an order confirmation email
		await sendOrderPlacedEmail(Email, cartItems);

		// Step 3: Clear the user's cart
		await db.executeProcedure('DeleteAllCartItemsForUser', { UserId });

		// Step 4: Respond with success
		return res.status(200).json({ message: 'Order placed successfully. A confirmation email has been sent.' });
	} catch (error) {
		console.error('Checkout error:', error);
		return res.status(500).json({ message: `Checkout failed: ${error.message}` });
	}
}
