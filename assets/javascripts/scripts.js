(() => {
  'use strict';

  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J6YT5K3JHY');

  // Certification Pagination Handling
  const certificationGrid = document.getElementById('certificationGrid');
  const certificationPagination = document.getElementById('certificationPagination');
  const certificationPageItems = Array.from(document.querySelectorAll('.certification-page-item'));
  const CERTIFICATIONS_PER_PAGE = 6;

  const renderCertificationPage = (pageIndex) => {
    certificationPageItems.forEach((item, index) => {
      const startIndex = pageIndex * CERTIFICATIONS_PER_PAGE;
      const endIndex = startIndex + CERTIFICATIONS_PER_PAGE;
      item.classList.toggle('is-hidden', index < startIndex || index >= endIndex);
    });

    const pills = certificationPagination?.querySelectorAll('.certification-page-pill') || [];
    pills.forEach((pill, index) => {
      const isActive = index === pageIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  if (certificationGrid && certificationPagination && certificationPageItems.length > 0) {
    const totalPages = Math.ceil(certificationPageItems.length / CERTIFICATIONS_PER_PAGE);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'certification-page-pill';
      pill.setAttribute('aria-label', `Go to certification page ${pageIndex + 1}`);
      pill.addEventListener('click', () => renderCertificationPage(pageIndex));
      certificationPagination.appendChild(pill);
    }

    renderCertificationPage(0);
  }

  // Certification Modal Handling
  const certificationModal = document.getElementById('certificationModal');
  const certificationItems = document.querySelectorAll('.certification-item');
  const closeModalBtn = document.getElementById('closeModal');

  if (certificationItems.length > 0) {
    // Open modal when clicking a certification
    certificationItems.forEach((item) => {
      item.addEventListener('click', () => {
        const title = item.dataset.title;
        const description = item.dataset.description;
        const validationUrl = item.dataset.validationUrl;
        const imgSrc = item.querySelector('img').src;

        // Populate modal with data
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalImage').src = imgSrc;
        document.getElementById('modalImage').alt = title;
        document.getElementById('modalLink').href = validationUrl;

        // Show modal
        certificationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close modal when clicking close button
    closeModalBtn.addEventListener('click', () => {
      certificationModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the modal content
    certificationModal.addEventListener('click', (event) => {
      if (event.target === certificationModal) {
        certificationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certificationModal.classList.contains('active')) {
        certificationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

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
