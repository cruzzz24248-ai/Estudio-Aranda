/* ==========================================================================
   ESTUDIO ARANDA — SCRIPT ÚNICO
   Menú móvil, hero slider, filtros, slider de contacto, galería de proyecto
   y animaciones de scroll.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- MENÚ MÓVIL ----------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');

  if (mobileToggle && navMenu && navOverlay) {
    const setMenu = (open) => {
      mobileToggle.classList.toggle('is-active', open);
      navMenu.classList.toggle('is-open', open);
      navOverlay.classList.toggle('is-active', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    mobileToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('is-open')));
    navOverlay.addEventListener('click', () => setMenu(false));
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) setMenu(false);
    });
  }

  // ---------- HERO SLIDER ----------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const slideNum = document.getElementById('hero-slide-num');
  const slideName = document.getElementById('hero-slide-name');
  const dots = document.querySelectorAll('.hero-dot');

  if (heroSlides.length > 0) {
    let current = 0;
    let heroTimer = null;

    const goToSlide = (index) => {
      heroSlides[current].classList.remove('active');
      if (dots[current]) {
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-pressed', 'false');
      }
      current = index;
      heroSlides[current].classList.add('active');
      if (dots[current]) {
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-pressed', 'true');
      }
      const s = heroSlides[current];
      if (slideNum) slideNum.textContent = s.getAttribute('data-num');
      if (slideName) {
        slideName.setAttribute('href', s.getAttribute('data-link') || '#obras');
        slideName.innerHTML = `<span>${s.getAttribute('data-project')}</span><span class="hero-project-arrow">&rarr;</span>`;
      }
    };
    const resetHero = () => {
      clearInterval(heroTimer);
      heroTimer = setInterval(() => goToSlide((current + 1) % heroSlides.length), 5500);
    };
    dots.forEach((dot, idx) => dot.addEventListener('click', () => { goToSlide(idx); resetHero(); }));
    resetHero();
  }

  // ---------- FILTRADO DE OBRAS ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const obraCards = document.querySelectorAll('.obra-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const value = btn.getAttribute('data-filter');
      obraCards.forEach(card => {
        const show = value === 'all' || card.getAttribute('data-category') === value;
        if (show) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });

  // ---------- SLIDER DE CONTACTO ----------
  const contactoSlides = document.querySelectorAll('.contacto-slide');
  if (contactoSlides.length > 0) {
    let c = 0;
    setInterval(() => {
      contactoSlides[c].classList.remove('active');
      c = (c + 1) % contactoSlides.length;
      contactoSlides[c].classList.add('active');
    }, 4000);
  }

  // ---------- GALERÍA DE PROYECTO ----------
  // Casa del Olivo usa la lista por defecto. Las demás páginas definen
  // window.GALERIA_FOTOS en su HTML y, opcionalmente, data-nombre en #galeria-viewer.
  const galImg = document.getElementById('galeria-img');
  const galCounter = document.getElementById('galeria-counter');
  const galPrev = document.getElementById('galeria-prev');
  const galNext = document.getElementById('galeria-next');

  if (galImg && galCounter && galPrev && galNext) {
    const fotos = window.GALERIA_FOTOS || [
      'img/casa olivo/casa del olivo.jpg',
      'img/casa olivo/casa del olivo cocina comedor.jpg',
      'img/casa olivo/casa del olivo dormitorio principal.jpg',
      'img/casa olivo/casa del olivo terraza.jpg',
      'img/casa olivo/casa del olivo vista exterior.jpg',
      'img/casa olivo/casa del olivo sala de estar.jpg',
      'img/casa olivo/casa del olivo vista trasera.jpg'
    ];
    const viewer = document.getElementById('galeria-viewer');
    const nombre = (viewer && viewer.dataset.nombre) || 'CASA DEL OLIVO';
    const PASIVO = 4000, ACTIVO = 8000;
    let i = 0, timer = null;

    const mostrar = (n) => {
      i = (n + fotos.length) % fotos.length;
      galImg.style.opacity = '0.3';
      setTimeout(() => { galImg.src = fotos[i]; galImg.style.opacity = '1'; }, 150);
      const a = String(i + 1).padStart(2, '0');
      const t = String(fotos.length).padStart(2, '0');
      galCounter.innerHTML = `${nombre} &nbsp;&mdash;&nbsp; ${a} / ${t}`;
    };
    const programar = (ms) => {
      clearTimeout(timer);
      timer = setTimeout(() => { mostrar(i + 1); programar(PASIVO); }, ms);
    };
    galNext.addEventListener('click', () => { mostrar(i + 1); programar(ACTIVO); });
    galPrev.addEventListener('click', () => { mostrar(i - 1); programar(ACTIVO); });
    programar(PASIVO);
  }

  // ---------- SCROLL REVEAL ----------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); o.unobserve(e.target); }
      });
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }
});
