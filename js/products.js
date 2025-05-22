// Product rendering functions
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderAllProducts();
});

// Render featured products
function renderFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);
  renderProducts(featuredProducts, featuredProductsContainer);
}

// Render all products with optional filtering
function renderAllProducts(category = 'all') {
  const productsContainer = document.getElementById('products-grid');
  if (!productsContainer) return;
  
  let filteredProducts = products;
  
  if (category !== 'all') {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  renderProducts(filteredProducts, productsContainer);
}

// Generic function to render products in a container
function renderProducts(productsArray, container) {
  container.innerHTML = '';
  
  if (productsArray.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 col-span-full">
        <p class="text-gray-500 text-lg">No products found in this category.</p>
      </div>
    `;
    return;
  }
  
  productsArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Build the HTML for the product card
    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <button class="favorite-button" data-id="${product.id}" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        ${product.isNew ? `<div class="product-badge">NEW</div>` : ''}
        ${product.discount > 0 ? `<div class="product-badge discount">${product.discount}% OFF</div>` : ''}
      </div>
      <div class="product-content">
        <div class="product-header">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-category">${product.category}</div>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-button" data-id="${product.id}" aria-label="Add ${product.name} to cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(productCard);
  });
  
  // Add event listeners for the product cards
  setupProductCardListeners();
}

// Set up event listeners for product cards
function setupProductCardListeners() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        addToCart(product);
      }
    });
  });
  
  // Favorite buttons
  document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('active');
      
      // If active, fill the heart
      if (e.currentTarget.classList.contains('active')) {
        const svg = e.currentTarget.querySelector('svg');
        svg.setAttribute('fill', 'currentColor');
      } else {
        const svg = e.currentTarget.querySelector('svg');
        svg.setAttribute('fill', 'none');
      }
      
      // You could add code here to save favorites to localStorage
    });
  });
}