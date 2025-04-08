/**
 * File: routes/productsRoutes.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Defines API endpoints for product-related operations.
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET: Retrieve all products.
router.get('/', productsController.getAllProducts);
// GET: Search products by category and keyword.
// Example: /api/products/search?category=Apparel&search=t-shirt
// GET search products: expects a query parameter "search-term".
router.get('/search', productsController.searchProducts);
// GET: Retrieve a product by id.
router.get('/:id', productsController.getProductById);



// POST: Add a new product (admin operation).
router.post('/', productsController.addProduct);

// PUT: Update a product (admin operation).
router.put('/:id', productsController.updateProduct);

// DELETE: Delete a product (admin operation).
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
