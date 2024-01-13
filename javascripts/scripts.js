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