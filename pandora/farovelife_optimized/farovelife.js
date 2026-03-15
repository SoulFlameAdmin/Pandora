const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      siteNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    }
  });
}

const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsWrap = document.getElementById('sliderDots');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

let currentSlide = 0;
let autoTimer = null;

function buildDots() {
  if (!dotsWrap) return;
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Отиди на слайд ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateDots() {
  if (!dotsWrap) return;
  dotsWrap.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentSlide);
  });
}

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
  currentSlide = index;
  updateDots();
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  goToSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
}

function startAutoplay() {
  stopAutoplay();
  autoTimer = window.setInterval(nextSlide, 5200);
}

function stopAutoplay() {
  if (autoTimer) {
    window.clearInterval(autoTimer);
    autoTimer = null;
  }
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

if (slides.length > 0) {
  buildDots();
  goToSlide(0);
  startAutoplay();

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    restartAutoplay();
  });

  const slider = document.getElementById('heroSlider');
  slider?.addEventListener('mouseenter', stopAutoplay);
  slider?.addEventListener('mouseleave', startAutoplay);
  slider?.addEventListener('touchstart', stopAutoplay, { passive: true });
  slider?.addEventListener('touchend', startAutoplay, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });
