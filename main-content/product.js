"use strict";

// Function to initialize everything
function initialize() {
  fetchProducts();
  setupSortingListeners();
}

// Fetch and display products
function fetchProducts() {
  fetch('/main-content/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayProducts(data.items);
    })
    .catch(error => {
      console.error('Failed to load products:', error);
    });
}

// Display products on the page
function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = ''; // Clear existing content
  products.forEach(item => {
    const productHTML = `
      <div class="product-container">
        <div class="product">
          <img src="${item.image}" alt="${item.name}" class="product-image">
          <div class="info">
            <p class="title">${item.name}</p>
            <p class="science">${item.scientific}</p>
            <p class="price">$${item.price}</p>
          </div>
          <div class="description-container">
            <p class="description">${item.detail}</p>
          </div>
        </div>
        <div class="cart-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });

  setupCartListeners();
}

// Set up listeners for cart control buttons
function setupCartListeners() {
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', () => updateCartCount(1));
  });

  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', () => updateCartCount(-1));
  });
}

// Update total cart count
function updateCartCount(change) {
  const cartCount = document.getElementById('cart-count');
  let currentCount = parseInt(cartCount.textContent);
  currentCount = Math.max(0, currentCount + change); // Prevent negative values
  cartCount.textContent = currentCount;
}

// Function to sort and update the display of products
function sortProducts(direction) {
  const container = document.getElementById("products-container");
  let products = Array.from(container.querySelectorAll('.product-container'));
  products.sort((a, b) => {
    let priceA = parseFloat(a.querySelector(".price").textContent.replace('$', ''));
    let priceB = parseFloat(b.querySelector(".price").textContent.replace('$', ''));
    return direction === 'asc' ? priceA - priceB : priceB - priceA;
  });
  container.innerHTML = ''; // Clear existing products
  products.forEach(product => container.appendChild(product));
}

// Event listeners for sorting checkboxes
function setupSortingListeners() {
  document.querySelectorAll('input[name="sort"]').forEach(input => {
    input.addEventListener('change', function() {
      document.querySelectorAll('input[name="sort"]').forEach(box => {
        if (box !== this) box.checked = false;
      });
      sortProducts(this.checked ? this.value : 'asc');
    });
  });
}

// Call initialize to set everything up
initialize();

function toggleMenu() {
    const navLinks = document.getElementById("navbar-links");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}


document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault();
    var name = document.getElementById('fname').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    if (name && email && message) {
        // Here you can handle the form submission, e.g., send it via AJAX or log it.
        console.log("Name:", name, "Email:", email, "Message:", message);
        alert("Thank you for your message!");
    } else {
        alert("Please fill in all fields.");
    }
};

