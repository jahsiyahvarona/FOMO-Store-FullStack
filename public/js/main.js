/**
 * File: public/js/main.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Fetches product data from the backend and dynamically populates the products listing page.
 */
function loadProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        products.forEach(product => {
          const col = document.createElement('div');
          col.className = 'col';
          col.innerHTML = `
            <div class="card h-100">
              <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-warning">$${product.price}</p>
                <a href="details.html?product=${product.id}" class="btn btn-fomo">View Details</a>
              </div>
            </div>
          `;
          container.appendChild(col);
        });
      })
      .catch(err => console.error('Error fetching products:', err));
  }
  
  document.addEventListener('DOMContentLoaded', loadProducts);
  