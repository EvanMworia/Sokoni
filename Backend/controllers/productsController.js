import DbHelper from '../db/dbHelper.js';
import { productSchema } from '../services/validationServices.js';
import { v4 } from 'uuid';
const db = new DbHelper();

export async function addNewProduct(req, res) {
	try {
		const { error } = productSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: `${error.message}` });
		}
		const productId = v4();
		const { Name, ImageUrl, Price, Description, Stock } = req.body;

		await db.executeProcedure('UpsertProducts', {
			ProductId: productId,
			Name,
			ImageUrl,
			Price,
			Description,
			Stock,
		});
		res.status(200).json({ message: `Product ${Name} has been added successfully` });
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}

export async function getAllProducts(req, res) {
	try {
		let results = await db.executeProcedure('GetAllProducts', {});

		res.status(200).json(results.recordset);
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}

export async function getProductById(req, res) {
	try {
		const { id } = req.params;

		const foundProduct = await db.executeProcedure('GetProductById', { ProductId: id });
		if (!foundProduct) {
			res.status(404).json({ message: 'No product was found with that id' });
		}

		res.status(200).json(foundProduct.recordset);
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}
export async function getProductByName(req, res) {
	try {
		const { Name } = req.params;

		const foundProduct = await db.executeProcedure('GetProductByName', { Name: Name });
		if (!foundProduct) {
			return res.status(404).json({ message: 'No product was found with that Name' });
		}

		res.status(200).json(foundProduct.recordset);
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}

export async function updateProductDetails(req, res) {
	try {
		const { id } = req.params;

		const foundProduct = await db.executeProcedure('GetProductById', { ProductId: id });
		if (!foundProduct) {
			res.status(404).json({ message: 'No product was found with that id' });
		}

		const { Name, ImageUrl, Price, Description, Stock } = req.body;

		await db.executeProcedure('UpsertProducts', {
			ProductId: id,
			Name,
			ImageUrl,
			Price,
			Description,
			Stock,
		});
		res.status(200).json({ message: `Product ${Name} has been Updated successfully` });
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}
export async function deleteProduct(req, res) {
	try {
		const { id } = req.params;

		const foundProduct = await db.executeProcedure('GetProductById', { ProductId: id });
		if (!foundProduct) {
			res.status(404).json({ message: 'No product was found with that id' });
		}
		await db.executeProcedure('DeleteProduct', { ProductId: id });
		res.status(200).json({ message: `${foundProduct.recordset[0].Name} has been deleted successfully` });
	} catch (error) {
		console.error('Something went wrong, pertainig: ', error);
		res.status(500).json({ message: `Something went wrong: ${error.message}` });
	}
}
