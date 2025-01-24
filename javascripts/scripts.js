(() => {
  'use strict';

  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J6YT5K3JHY');

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const showFeedback = (message, isError = false) => {
      const feedbackElement = document.createElement('div');
      feedbackElement.className = `alert alert-${isError ? 'danger' : 'success'} mt-3`;
      feedbackElement.textContent = message;
      contactForm.insertAdjacentElement('afterend', feedbackElement);
      setTimeout(() => feedbackElement.remove(), 5000);
    };

    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input.trim().replace(/[<>]/g, '');
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      const cleanPhone = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
      return /^[+]?[0-9]{10,14}$/.test(cleanPhone);
    };

    const validateForm = () => {
      const name = sanitizeInput(document.getElementById('name').value);
      const email = sanitizeInput(document.getElementById('email').value);
      const phone = sanitizeInput(document.getElementById('phone').value);
      const message = sanitizeInput(document.getElementById('message').value);

      if (!name) {
        showFeedback('Please enter your name', true);
        return null;
      }

      if (!validateEmail(email)) {
        showFeedback('Please enter a valid email address', true);
        return null;
      }

      if (!validatePhone(phone)) {
        showFeedback('Please enter a valid phone number (10-14 digits)', true);
        return null;
      }

      if (!message) {
        showFeedback('Please enter your message', true);
        return null;
      }

      return { name, email, phone, message };
    };

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const formData = validateForm();
      if (!formData) {
        contactForm.classList.add('was-validated');
        return;
      }

      try {
        // Here you would typically send the data to a server
        console.log('Form data:', formData);

        // Clear form and show success message
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        showFeedback('Thank you for your message! I will get back to you soon.');
      } catch (error) {
        console.error('Error submitting form:', error);
        showFeedback('Sorry, there was an error sending your message. Please try again later.', true);
      }
    });
  }
})();