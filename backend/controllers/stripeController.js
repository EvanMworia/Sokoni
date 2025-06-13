import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const stripeInit = new Stripe(process.env.SK_TEST);

export async function checkoutSession(req, res) {
	try {
		const { cartItems } = req.body;
		if (!cartItems || cartItems.length === 0) {
			return res.status(404).json({ message: 'Cart is empty' });
		}

		const lineItems = cartItems.map((item) => ({
			price_data: {
				currency: 'kes',
				product_data: {
					name: item.Name,
				},
				unit_amount: item.Price * 100,
			},
			quantity: item.Quantity,
		}));
		const checkoutSession = await stripeInit.checkout.sessions.create({
			success_url: 'https://example.com/success',
			//cancel_url: '',
			line_items: lineItems,
			mode: 'payment',
		});
		return res.status(200).json({ url: checkoutSession.url });
	} catch (error) {
		console.error('Something failed in checkout session', error);
		return res.status(500).json({ message: 'Something went wrong with Stripe' });
	}
}

// export async function checkoutSession(req, res) {
// 	try {
// 		const { cartItems } = req.body;

// 		if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
// 			return res.status(400).json({ message: 'Cart is empty or invalid.' });
// 		}

// 		const lineItems = cartItems.map((item) => ({
// 			price_data: {
// 				currency: 'kes', // or 'usd', etc.
// 				product_data: {
// 					name: item.name,
// 				},
// 				unit_amount: item.price, // in cents (e.g. 1000 = KES 10)
// 			},
// 			quantity: item.quantity,
// 		}));

// 		const session = await stripeInit.checkout.sessions.create({
// 			payment_method_types: ['card'],
// 			line_items: lineItems,
// 			mode: 'payment',
// 			success_url: 'https://your-site.com/success',
// 			cancel_url: 'https://your-site.com/cancel',
// 		});

// 		res.status(200).json({ url: session.url });
// 	} catch (error) {
// 		console.error('Stripe Checkout Error:', error);
// 		res.status(500).json({ message: 'Checkout failed. Try again.' });
// 	}
// }
