/**
 * File: models/cart.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Contains SQL queries to interact with the carts and cartproducts tables.
 */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fomo.db');

exports.getCartByUserId = (userId, callback) => {
    const sql = `
      SELECT 
        c.id as cart_id, 
        c.status, 
        c.user_id, 
        cp.quantity, 
        p.id as product_id, 
        p.name, 
        p.price, 
        p.image_url
      FROM carts c
      LEFT JOIN cartproducts cp ON c.id = cp.cart_id
      LEFT JOIN products p ON cp.product_id = p.id
      WHERE c.user_id = ?
    `;
    db.all(sql, [userId], (err, rows) => {
      if (err) return callback(err);
      // If there are rows, group them into a cart object.
      let cart = { cartitems: [] };
      if (rows.length > 0) {
        cart.id = rows[0].cart_id;
        cart.status = rows[0].status;
        cart.user_id = rows[0].user_id;
        rows.forEach(row => {
          // Check if the row has a valid product_id (i.e., item exists)
          if (row.product_id) {
            cart.cartitems.push({
              product: {
                id: row.product_id,
                name: row.name,
                price: row.price,
                image_url: row.image_url
              },
              quantity: row.quantity
            });
          }
        });
      }
      callback(null, cart);
    });
  };
  

exports.addProductToCart = (cart_id, product_id, quantity, callback) => {
  const sql = "INSERT INTO cartproducts (cart_id, product_id, quantity) VALUES (?, ?, ?)";
  db.run(sql, [cart_id, product_id, quantity], function(err) {
    callback(err, this.lastID);
  });
};

exports.removeProductFromCart = (cart_id, product_id, callback) => {
  const sql = "DELETE FROM cartproducts WHERE cart_id = ? AND product_id = ?";
  db.run(sql, [cart_id, product_id], function(err) {
    callback(err, this.changes);
  });
};

exports.checkoutCart = (cart_id, callback) => {
  const sql = "DELETE FROM cartproducts WHERE cart_id = ?";
  db.run(sql, [cart_id], function(err) {
    callback(err, this.changes);
  });
};

exports.updateProductQuantity = (cart_id, product_id, quantity, callback) => {
    const sql = "UPDATE cartproducts SET quantity = ? WHERE cart_id = ? AND product_id = ?";
    db.run(sql, [quantity, cart_id, product_id], function(err) {
      callback(err, this.changes);
    });
  };