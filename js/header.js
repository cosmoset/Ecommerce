// Header functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle scroll effects
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
  
  // Category navigation
  const categoryButtons = document.querySelectorAll('.nav-link');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      // Update active state
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll(`[data-category="${category}"]`).forEach(btn => {
        btn.classList.add('active');
      });
      
      // Render products for this category
      renderAllProducts(category);
      
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
      
      // Scroll to products section
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Search form
  const searchForms = document.querySelectorAll('.search-form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = form.querySelector('.search-input');
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (searchTerm) {
        // Filter products by search term
        const searchResults = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
        
        // Render filtered products
        const productsContainer = document.getElementById('products-grid');
        if (productsContainer) {
          renderProducts(searchResults, productsContainer);
          
          // Update heading
          const productsHeading = document.querySelector('.all-products h2');
          if (productsHeading) {
            productsHeading.textContent = `Search Results for "${searchTerm}"`;
          }
          
          // Scroll to products section
          document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
          
          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
      }
    });
  });
});