// Cart functionality
let cart = [];

// Load cart from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('habeshaCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
});

// Update cart display in UI
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartCountElements = document.querySelectorAll('.cart-count, .mobile-cart-count');
  
  // Update cart item count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElements.forEach(el => {
    el.textContent = totalItems;
  });
  
  // Show/hide empty cart message
  if (cart.length === 0) {
    cartItemsContainer.classList.add('hidden');
    cartEmpty.classList.remove('hidden');
    cartFooter.classList.add('hidden');
  } else {
    cartItemsContainer.classList.remove('hidden');
    cartEmpty.classList.add('hidden');
    cartFooter.classList.remove('hidden');
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Generate cart items HTML
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-content">
          <div class="cart-item-header">
            <h3 class="cart-item-title">${item.name}</h3>
            <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="quantity-controls">
            <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        removeFromCart(id);
      });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        updateQuantity(id, -1);
      });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        updateQuantity(id, 1);
      });
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('habeshaCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  
  // Show a brief notification
  showAddToCartNotification(product.name);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

// Update item quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
    }
  }
}

// Clear cart
function clearCart() {
  cart = [];
  updateCartDisplay();
}

// Show notification when product is added to cart
function showAddToCartNotification(productName) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.cart-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'cart-notification';
    document.body.appendChild(notification);
    
    // Add styles for the notification
    const style = document.createElement('style');
    style.textContent = `
      .cart-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: var(--color-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: 500;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      
      .cart-notification.active {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Set notification text and show it
  notification.textContent = `${productName} added to cart`;
  notification.classList.add('active');
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
}

// Setup cart event listeners
document.addEventListener('DOMContentLoaded', () => {
  const cartButtons = document.querySelectorAll('.cart-button, .mobile-cart-button');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartButton = document.querySelector('.close-cart');
  const continueShoppingButton = document.querySelector('.continue-shopping');
  const clearCartButton = document.querySelector('.clear-cart-btn');
  
  // Open cart
  cartButtons.forEach(button => {
    button.addEventListener('click', () => {
      cartOverlay.classList.add('active');
    });
  });
  
  // Close cart
  closeCartButton.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
  });
  
  // Continue shopping
  if (continueShoppingButton) {
    continueShoppingButton.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
    });
  }
  
  // Clear cart
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }
  
  // Close cart when clicking outside
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('active');
    }
  });
});