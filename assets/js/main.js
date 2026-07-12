/* main.js */

// ── Values card flip (touch devices) ─────────────────────────────────────────
document.querySelectorAll('.values-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('is-flipped'));
});

// ── Scroll-triggered fade-in ──────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Cursor spotlight ──────────────────────────────────────────────────────────
// Sets --cx/--cy on :root; body::after in _base.scss renders the glow via CSS.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cx', e.clientX + 'px');
    document.documentElement.style.setProperty('--cy', e.clientY + 'px');
  }, { passive: true });
}

// ── Generic Carousel ──────────────────────────────────────────────────────────
// autoAdvance: true = 7s auto-cycle with pause-on-hover (used for testimonials)
function initCarousel(sectionId, autoAdvance) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const track   = section.querySelector('.carousel-track');
  if (!track) return;

  const slides  = Array.from(track.children);
  const dots    = Array.from(section.querySelectorAll('.carousel-dot'));
  const countEl = section.querySelector('.carousel-count');
  const total   = slides.length;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current   = 0;
  let timer     = null;

  function go(n) {
    current = ((n % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      const isActive = i === current;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    if (countEl) countEl.textContent = `${current + 1} / ${total}`;
  }

  function startTimer() {
    if (!autoAdvance || reduced || total <= 1) return;
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 7000);
  }

  section.querySelector('.carousel-btn--prev')
    ?.addEventListener('click', () => { go(current - 1); startTimer(); });
  section.querySelector('.carousel-btn--next')
    ?.addEventListener('click', () => { go(current + 1); startTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); startTimer(); }));

  if (autoAdvance) {
    section.addEventListener('mouseenter', () => clearInterval(timer));
    section.addEventListener('mouseleave', startTimer);
  }

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); startTimer(); }
  });

  go(0);
  startTimer();
}

// values section is now a static grid — no carousel init needed
initCarousel('testimonials', true);  // auto-advances every 7s

// ── Mobile hamburger — toggles secondary nav on small screens ─────────────────
(function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu   = document.getElementById('nav-secondary-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('nav-secondary--open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('nav-secondary--open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').className = 'fas fa-bars';
    }
  });
})();
