/* ============================================================
   GLASS — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. DARK MODE
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('glass-theme');
  if (saved === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? '' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('glass-theme', isDark ? 'light' : 'dark');
  });

  // ============================================================
  // 2. MOBILE NAV
  // ============================================================
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('nav__links--open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
    });
  });

  // ============================================================
  // 3. SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 4. SCROLL REVEAL
  // ============================================================
  const revealElements = document.querySelectorAll(
    '.glass-card, .feature-item, .pricing-card, .section-header'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Stagger children
  document.querySelectorAll('.showcase__grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.glass-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  document.querySelectorAll('.features__grid').forEach((grid) => {
    const items = grid.querySelectorAll('.feature-item');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  // ============================================================
  // 5. CONTACT FORM
  // ============================================================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input').value.trim();
      if (!email) return;
      window.open('mailto:dylan_shi@hotmail.com?subject=Glass Template Inquiry&body=' + encodeURIComponent('Hi, I\'m interested in the Glass template.\n\nEmail: ' + email), '_blank');
    });
  }

  // ============================================================
  // 6. HERO ORB PARALLAX
  // ============================================================
  const orbs = document.querySelectorAll('.hero__orb');
  if (orbs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 2;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    }, { passive: true });
  }

  console.log('◆ Glass — Premium glassmorphism template.');
});
