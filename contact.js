// Contact form — client validation + FormSubmit AJAX (no backend needed).
// FormSubmit emails vishnualachi@gmail.com with the sender's name + email + message.
// First real submission triggers a one-time activation email to confirm the address.
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const ENDPOINT = 'https://formsubmit.co/ajax/vishnualachi@gmail.com';
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  const fields = {
    name:    { el: form.name,    wrap: document.getElementById('f-name'),    ok: (v) => v.trim().length >= 2 },
    email:   { el: form.email,   wrap: document.getElementById('f-email'),   ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    message: { el: form.message, wrap: document.getElementById('f-message'), ok: (v) => v.trim().length >= 5 },
  };

  function validate(name) {
    const f = fields[name];
    const valid = f.ok(f.el.value);
    f.wrap.classList.toggle('invalid', !valid);
    return valid;
  }

  Object.keys(fields).forEach((n) => {
    fields[n].el.addEventListener('blur', () => validate(n));
    fields[n].el.addEventListener('input', () => {
      if (fields[n].wrap.classList.contains('invalid')) validate(n);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields).map(validate).every(Boolean);
    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields.';
      status.className = 'form-status mono bad';
      return;
    }
    // honeypot check
    if (form._honey && form._honey.value) return;

    btn.disabled = true;
    btn.textContent = 'SENDING…';
    status.textContent = '';
    status.className = 'form-status mono';

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
          _subject: 'New message from your portfolio site',
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === 'true' || data.success === true || res.status === 200)) {
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong — email me directly at vishnualachi@gmail.com.';
      status.className = 'form-status mono bad';
      btn.disabled = false;
      btn.textContent = 'SEND MESSAGE →';
    }
  });
})();
