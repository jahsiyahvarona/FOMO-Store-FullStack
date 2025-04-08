/**
 * File: routes/cartRoutes.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Defines API endpoints for cart operations: retrieving a cart by user, adding/removing products, and checkout.
 */

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET: Retrieve a cart by user ID.
router.get('/:userId', cartController.getCartByUserId);

// POST: Add a product to a cart.
router.post('/add', cartController.addProductToCart);

// DELETE: Remove a product from a cart.
router.delete('/remove', cartController.removeProductFromCart);

// POST: Checkout a cart.
router.post('/checkout', cartController.checkoutCart);

// post: 
router.put('/update', cartController.updateProductQuantity);

module.exports = router;
