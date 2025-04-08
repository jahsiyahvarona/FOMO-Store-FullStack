/**
 * File: controllers/cartController.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Contains functions to handle cart operations such as retrieving a cart, 
 *   adding or removing products, and checking out.
 */

const cartModel = require('../models/cart');

exports.getCartByUserId = (req, res) => {
    const userId = req.params.userId;
    cartModel.getCartByUserId(userId, (err, cart) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(cart);
    });
  };
  

exports.addProductToCart = (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
  cartModel.addProductToCart(cart_id, product_id, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product added to cart', result });
  });
};

exports.removeProductFromCart = (req, res) => {
  const { cart_id, product_id } = req.body;
  cartModel.removeProductFromCart(cart_id, product_id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product removed from cart', changes });
  });
};

exports.checkoutCart = (req, res) => {
  const { cart_id } = req.body;
  cartModel.checkoutCart(cart_id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Checkout complete. Cart emptied.', changes });
  });
};

exports.updateProductQuantity = (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    cartModel.updateProductQuantity(cart_id, product_id, quantity, (err, changes) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cart updated successfully", changes });
    });
  };