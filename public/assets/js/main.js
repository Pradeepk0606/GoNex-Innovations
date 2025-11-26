const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav a[data-page]');
const currentPage = document.body?.dataset?.page;

if (navLinks.length && currentPage) {
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        nav?.classList.remove('is-open');
      }
    }
  });
});

const contactForm = document.getElementById('contact-form');
const feedbackEl = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fullName = contactForm.fullName.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!fullName || !email || !message) {
      if (feedbackEl) {
        feedbackEl.textContent = 'Please fill out every required field.';
        feedbackEl.style.color = '#f87171';
      }
      return;
    }

    const company = contactForm.company?.value.trim() || 'Not specified';
    const projectType = contactForm.projectType?.value || 'Not specified';
    const timeline = contactForm.timeline?.value || 'Not specified';
    const budget = contactForm.budget?.value || 'Not specified';

    const enrichedMessage = `${message}

---
Company / Team: ${company}
Project Type: ${projectType}
Timeline: ${timeline}
Budget: ${budget}`;

    if (feedbackEl) {
      feedbackEl.textContent = 'Sending...';
      feedbackEl.style.color = '#9ca3c7';
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, message: enrichedMessage }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to send right now.');
      }

      contactForm.reset();
      if (feedbackEl) {
        feedbackEl.textContent = 'Thanks for reaching out! We’ll reply within 48 hours.';
        feedbackEl.style.color = '#6ad985';
      }
    } catch (error) {
      console.error(error);
      if (feedbackEl) {
        feedbackEl.textContent = error.message || 'Something went wrong. Email us at gonexinnovationsit@gmail.com.';
        feedbackEl.style.color = '#f87171';
      }
    }
  });
}

