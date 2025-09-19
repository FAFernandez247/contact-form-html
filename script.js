document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  // Form submission handler
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        highlightError(input);
      } else {
        removeErrorHighlight(input);
      }
    });
    
    // Email validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      isValid = false;
      highlightError(emailInput, 'Please enter a valid email address');
    }
    
    if (isValid) {
      // Show success message
      successMessage.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Simulate redirect after 3 seconds
      setTimeout(function() {
        window.location.href = 'https://thelookcompany.com';
      }, 3000);
    }
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Helper function to highlight error fields
  function highlightError(input, message) {
    input.style.borderColor = 'var(--primary)';
    input.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.2)';
    
    // Remove any existing error message
    removeErrorMessages(input);
    
    // Create error message
    if (message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = 'var(--primary)';
      errorDiv.style.fontSize = '0.8rem';
      errorDiv.style.marginTop = '0.3rem';
      errorDiv.textContent = message;
      input.parentNode.appendChild(errorDiv);
    }
  }
  
  // Helper function to remove error highlight
  function removeErrorHighlight(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    removeErrorMessages(input);
  }
  
  // Helper function to remove error messages
  function removeErrorMessages(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }
  
  // Add input event listeners to remove error styling when user types
  const inputs = contactForm.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      removeErrorHighlight(this);
    });
  });
});