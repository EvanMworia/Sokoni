import express from 'express';
import {
	addNewProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductByName,
	updateProductDetails,
} from '../controllers/productsController.js';

const productsRoutes = express.Router();

productsRoutes.post('/new-product', addNewProduct);
productsRoutes.get('/all-products', getAllProducts);
productsRoutes.get('/product/:id', getProductById);
// productsRoutes.get('/product/:name', getProductByName);
productsRoutes.patch('/update/:id', updateProductDetails);
productsRoutes.delete('/delete/:id', deleteProduct);

export default productsRoutes;
