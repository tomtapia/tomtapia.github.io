(() => {
  'use strict'
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J6YT5K3JHY');

  // Contact Form
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    // Form validation and submission
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Basic input sanitization
            const sanitizeInput = (input) => {
                return input.replace(/[<>]/g, '');
            };

            // Enhanced validation
            const validateEmail = (email) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            };

            const validatePhone = (phone) => {
                return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, ''));
            };

            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const phone = sanitizeInput(document.getElementById('phone').value);
            const message = sanitizeInput(document.getElementById('message').value);

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!validatePhone(phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // Get sanitized form data
            const formData = { name, email, phone, message };

            // Here you would typically send the data to a server
            console.log('Form data:', formData);
            
            // Clear form
            form.reset();
            form.classList.remove('was-validated');

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      // To-Do: Build a contact form with recaptcha
      form.classList.add('was-validated')
    }, false)
  })
})()