import express from 'express';
import { getProducts, addProduct,updateProduct,deleteProduct,getSingleProduct } from '../controller/products.js';

const productrouter = express.Router();

// Get all products
productrouter.get('/', getProducts);
productrouter.post('/', addProduct);
productrouter.get('/:id', getSingleProduct);
productrouter.put('/update/:id', updateProduct);
productrouter.delete('/delete/:id', deleteProduct);
export default productrouter;
