// ============================================
// NADIR ALI-AHMED · PORTFOLIO JS
// ============================================

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos], .project-card:not(.project-card-add)').forEach(el => {
  observer.observe(el);
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = '#00c9a7';
  });
};
window.addEventListener('scroll', setActive, { passive: true });

// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    const btn = form.querySelector('button[type="submit"]');
    const action = form.getAttribute('action');
    // Only intercept if Formspree not configured
    if (action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      btn.textContent = '⚠ Configure Formspree first';
      btn.style.background = '#f47c20';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
      }, 3000);
      return;
    }
    // Real submission
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const data = new FormData(form);
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Message sent!';
        btn.style.background = '#00c9a7';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = '✗ Error — please email directly';
      btn.style.background = '#e24b4a';
    }
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}

// ─── MEDIA LIGHTBOX ───
// Allows clicking real media images/videos to enlarge
(function setupLightbox() {
  const overlay = document.createElement('div');
  overlay.style.cssText = [
    'display:none', 'position:fixed', 'inset:0',
    'background:rgba(0,0,0,0.92)', 'z-index:1000',
    'align-items:center', 'justify-content:center',
    'cursor:pointer', 'padding:2rem'
  ].join(';');
  document.body.appendChild(overlay);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = [
    'position:absolute', 'top:1.5rem', 'right:1.5rem',
    'background:none', 'border:none', 'color:#fff',
    'font-size:1.5rem', 'cursor:pointer', 'opacity:0.7'
  ].join(';');
  overlay.appendChild(closeBtn);

  const inner = document.createElement('div');
  inner.style.cssText = 'max-width:90vw;max-height:90vh;display:flex;';
  overlay.appendChild(inner);

  const close = () => { overlay.style.display = 'none'; inner.innerHTML = ''; };
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.querySelectorAll('.media-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const clone = img.cloneNode();
      clone.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px;cursor:default;';
      inner.appendChild(clone);
      overlay.style.display = 'flex';
    });
  });
})();

console.log('%c Nadir Ali-Ahmed Portfolio', 'color:#00c9a7;font-size:16px;font-weight:bold;');
console.log('%c Built with HTML, CSS & vanilla JS — hosted on GitHub Pages', 'color:#4a5a72;');
