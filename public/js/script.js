/**
 * File: public/js/script.js
 * Name: jahsiyah varona
 * Date: 04.10.2025
 * CSC 372
 *
 * Description:
 *   Attaches event listeners for thumbnail image clicks to update the main product image.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        document.getElementById('mainImage').src = thumbnail.src;
      });
    });
  });
  