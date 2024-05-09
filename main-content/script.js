"use strict";

// Toggle menu functionality
const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  showcase.classList.toggle('active');
});

// Fetch and display products
const http = new XMLHttpRequest();
http.open('GET', '/main-content/products.json', true);
http.send();

http.onload = function() {
  if (this.readyState === 4 && this.status == 200) {
    const products = JSON.parse(this.responseText).items;
    let output = "";

    for (let item of products) {
      output += `
        <div class="product">
          <img src="${item.image}" alt="${item.name}" class="product-image">
          <div class="info">
            <p class="title">${item.name}</p>
            <p class="science">${item.scientific}</p>
            <p class="description">${item.detail}</p>
            <p class="price">$${item.price}</p>
            <div class="cart-controls">
            <button class="decrease">-</button>
            <span class="quantity">0</span>
            <button class="increase">+</button>
            
          </div>
          </div>
        </div>
      `;
    }
    document.getElementById("products-container").innerHTML = output;

    // Add event listeners to each product for the expand/collapse functionality
    document.querySelectorAll('.product').forEach(product => {
      product.addEventListener('click', (event) => {
        // Prevent multiple products expanding
        event.stopPropagation(); // Stop the click from affecting other elements
        document.querySelectorAll('.product').forEach(p => {
          p.classList.remove('expanded'); // Remove 'expanded' from all products
        });
        product.classList.add('expanded'); // Add 'expanded' to clicked product
      });
    });
  } else {
    console.error('Failed to load products:', this.statusText);
  }
};

// Function to sort and update the display of products
function sortProducts(direction) {
  const container = document.getElementById("products-container");
  let products = Array.from(container.getElementsByClassName("product"));
  products.sort((a, b) => {
    let priceA = parseFloat(a.querySelector(".price").textContent.replace('$', ''));
    let priceB = parseFloat(b.querySelector(".price").textContent.replace('$', ''));
    return direction === 'asc' ? priceA - priceB : priceB - priceA;
  });
  container.innerHTML = ''; // Clear existing products
  products.forEach(product => container.appendChild(product));
}

// Event listeners for sorting checkboxes
document.querySelectorAll('input[name="sort"]').forEach(input => {
  input.addEventListener('change', function() {
    // Uncheck all other checkboxes
    document.querySelectorAll('input[name="sort"]').forEach(box => {
      if (box !== this) box.checked = false;
    });
    // Sort products based on the checked checkbox
    if (this.checked) {
      sortProducts(this.value);
    } else {
      // If unchecked, reload or reshuffle products to initial state
      sortProducts('asc'); // Assuming default sort, modify as needed
    }
  });
});

