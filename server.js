/**
 * File: server.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Main entry point for the FOMO online store backend.
 *   Sets up the Express server, serves static files from the public folder,
 *   mounts API routes, and seeds the SQLite database.
 */

const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images) from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes.
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// OPTIONAL: Run the create_tables.sql script first, then seed the database.
// This example runs create_tables.sql then insert_* scripts consecutively.
exec('sqlite3 fomo.db < ./sql/create_tables.sql', (err, stdout, stderr) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully.');
    // Seed the database.
    exec('sqlite3 fomo.db < ./sql/insert_categories.sql', (err, stdout, stderr) => {
      if (err) {
        console.error('Error inserting categories:', err);
      } else {
        console.log('Categories inserted successfully.');
        exec('sqlite3 fomo.db < ./sql/insert_products.sql', (err, stdout, stderr) => {
          if (err) {
            console.error('Error inserting products:', err);
          } else {
            console.log('Products inserted successfully.');
          }
        });
      }
    });
  }
});

// Test endpoint.
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from FOMO backend!" });
});

// Start the server.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
