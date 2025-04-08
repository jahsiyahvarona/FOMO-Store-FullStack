/**
 * File: js/details.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Loads product details (via URL query parameters) and attaches an event listener to the
 *   Add to Cart button to call the /api/cart/add endpoint.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Example: Getting product id from data attribute (in practice, you might fetch dynamic data)
    const addToCartBtn = document.getElementById("addToCartButton");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function() {
        // Retrieve the product id from the data attribute
        const productId = addToCartBtn.getAttribute("data-product-id");
        
        // In a real-world scenario, you'd get the current user's cart id.
        // For this demonstration we'll assume a fixed cart id (e.g., 1).
        const cartId = 1;
        
        // Set the quantity to 1 (or retrieve from a quantity input if available)
        const quantity = 1;
        
        // Send the POST request to the backend API endpoint.
        fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart_id: cartId,
            product_id: productId,
            quantity: quantity
          })
        })
        .then(response => response.json())
        .then(result => {
          if (result.message) {
            alert("Item added to cart!");
            // Optionally, update UI or redirect to cart page.
          }
        })
        .catch(error => {
          console.error("Error adding item to cart:", error);
          alert("Error adding item to cart. Please try again.");
        });
      });
    }
    
    // Attach thumbnail functionality (if needed)
    document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        document.getElementById('mainImage').src = this.src;
      });
    });
  });
  