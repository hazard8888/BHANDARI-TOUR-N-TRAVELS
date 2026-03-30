/* ══════════════════════════════════════════════
   BHANDARI TOUR & TRAVELS — script.js
══════════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile menu toggle ── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ── Scroll to contact ── */
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ── Star / Particle Generator ── */
function createStars() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    const x    = Math.random() * 100;
    const y    = Math.random() * 70;
    const delay = Math.random() * 5;
    const dur   = Math.random() * 4 + 3;
    star.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255,255,255,${Math.random() * 0.5 + 0.3});
      animation: starFloat ${dur}s ${delay}s ease-in-out infinite;
    `;
    container.appendChild(star);
  }
}
createStars();

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Elements to reveal
const revealTargets = [
  '.dham-card', '.track-card', '.sf-card', '.wp',
  '.route-item', '.testimonial', '.section-header',
  '.full-package', '.cab-routes h3'
];
revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

/* ── WhatsApp Form Submit ── */
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name    = form.querySelector('input[type="text"]').value;
  const phone   = form.querySelector('input[type="tel"]').value;
  const service = form.querySelector('select').value;
  const date    = form.querySelector('input[type="date"]').value;
  const persons = form.querySelector('input[type="number"]').value;
  const notes   = form.querySelector('textarea').value;

  const message = `🙏 *Booking Enquiry – Bhandari Tour & Travels*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `🚗 *Service:* ${service}\n` +
    `📅 *Date:* ${date}\n` +
    `👥 *Persons:* ${persons || 1}\n` +
    `📝 *Notes:* ${notes || 'None'}\n\n` +
    `_Sent from Bhandari Tour & Travels website_`;

  const waNumber = '+91 70174 33493'; // Update with actual number
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(waURL, '_blank');
}

/* ── Smooth active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--saffron)'
      : '';
  });
});

/* ── Counter animation for hero stats ── */
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat span');
      const targets = [500, 10]; // match hero stats
      const suffixes = ['+', '+'];
      stats.forEach((el, i) => {
        if (targets[i]) animateCounter(el, targets[i], suffixes[i]);
        else el.textContent = '24/7';
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
