/**
 * File: models/products.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Contains SQL queries to interact with the products table.
 */



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fomo.db');

exports.getAllProducts = (callback) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    callback(err, rows);
  });
};

exports.getProductById = (id, callback) => {
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};


exports.searchProductsBrief = (searchTerm, callback) => {
    const sql = "SELECT id, name, image_url FROM products WHERE name LIKE ?";
    const param = [`%${searchTerm}%`];
    db.all(sql, param, (err, rows) => {
      callback(err, rows);
    });
  };

exports.addProduct = (productData, callback) => {
  const { name, description, image_url, price, category_id, featured = 0 } = productData;
  const sql = `INSERT INTO products (name, description, image_url, price, category_id, featured)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [name, description, image_url, price, category_id, featured], function(err) {
    callback(err, this.lastID);
  });
};

exports.updateProduct = (id, updatedData, callback) => {
  const { name, description, image_url, price, category_id, featured } = updatedData;
  const sql = `UPDATE products
               SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?, featured = ?
               WHERE id = ?`;
  db.run(sql, [name, description, image_url, price, category_id, featured, id], function(err) {
    callback(err, this.changes);
  });
};

exports.deleteProduct = (id, callback) => {
  const sql = `DELETE FROM products WHERE id = ?`;
  db.run(sql, [id], function(err) {
    callback(err, this.changes);
  });
};
