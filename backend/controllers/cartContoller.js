import DbHelper from '../db/dbHelper.js';
import { v4 } from 'uuid';
import { cartInsertionSchema } from '../services/validationServices.js';
const db = new DbHelper();

export async function addItemToCart(req, res) {
	try {
		const { error } = cartInsertionSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: `This is where shit happens${error.message}` });
		}
		const { UserId, ProductId, Quantity } = req.body;
		const cartItemId = v4();

		await db.executeProcedure('InsertCartItem', {
			CartItemId: cartItemId,
			UserId,
			ProductId,
			//Quantity,
		});

		return res.status(201).json({ message: ` ${ProductId} has been added to your cart` });
	} catch (error) {
		if (error.message.includes('Cart item already exists')) {
			try {
				const { UserId, ProductId, Quantity } = req.body;
				await db.executeProcedure('UpdateCartItemQuantity', {
					UserId,
					ProductId,
					//Quantity,
				});

				return res.status(200).json({ message: `${ProductId} has been incremented by 1 more unit` });
			} catch (updateError) {
				console.error('Update error:', updateError);
				return res.status(500).json({ message: `Failed to update quantity: ${updateError.message}` });
			}
		}

		console.error('Insert error:', error);
		return res.status(500).json({ message: `Failed to add item: ${error.message}` });
	}
}

export async function getCartItems(req, res) {
	try {
		const { UserId } = req.user;

		const result = await db.executeProcedure('GetCartItems', { UserId });
		const foundItems = result.recordset;

		if (!foundItems || foundItems.length === 0) {
			return res.status(200).json([]);
		}

		return res.status(200).json(foundItems);
	} catch (error) {
		console.error('Error fetching cart items:', error);
		return res.status(500).json({ message: `Internal server error: ${error.message}` });
	}
}
export async function deleteCartItem(req, res) {
	try {
		const { id } = req.params;
		// const { UserId } = req.user;

		if (!id) {
			return res.status(400).json({ message: 'itemid is required.' });
		}
		await db.executeProcedure('DeleteCartItem', {
			CartItemId: id,
		});

		return res.status(200).json({ message: 'Item deleted from cart.' });
	} catch (error) {
		console.error('Delete error:', error);
		return res.status(500).json({ message: error.message });
	}
}
export async function clearCart(req, res) {
	try {
		const { UserId } = req.user;

		await db.executeProcedure('DeleteAllCartItemsForUser', {
			UserId,
		});

		return res.status(200).json({ message: 'Cart has been cleared.' });
	} catch (error) {
		console.error('Delete error:', error);
		return res.status(500).json({ message: error.message });
	}
}
