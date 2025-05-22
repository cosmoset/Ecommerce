// Main initialization script
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltips, modals, or other UI components if needed
  
  // Handle newsletter subscription
  const subscribeForm = document.querySelector('.subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // You would normally send this to a server
        // For demo purposes, just show an alert
        alert(`Thank you for subscribing with: ${email}`);
        emailInput.value = '';
      }
    });
  }
  
  // Handle checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // In a real app, this would navigate to a checkout page
      // For demo purposes, just show an alert
      alert('Checkout functionality would be implemented here!');
    });
  }
  
  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});