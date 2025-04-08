/**
 * File: controllers/productsController.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Contains functions to handle product API requests (retrieving, searching, adding, updating, deleting)
 *   by invoking model functions and returning JSON responses.
 */

const productsModel = require('../models/products');

exports.getAllProducts = (req, res) => {
  productsModel.getAllProducts((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;
  productsModel.getProductById(productId, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  });
};


exports.searchProducts = (req, res) => {
    const searchTerm = req.query["search-term"];
    if (!searchTerm) {
      return res.status(400).json({ error: "No search term provided." });
    }
    productsModel.searchProductsBrief(searchTerm, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows); // rows include id, name, and image_url
    });
  };

exports.addProduct = (req, res) => {
  const newProduct = req.body;
  productsModel.addProduct(newProduct, (err, productId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added successfully', productId });
  });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  productsModel.updateProduct(productId, updatedData, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated successfully', changes });
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  productsModel.deleteProduct(productId, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted successfully', changes });
  });
};
