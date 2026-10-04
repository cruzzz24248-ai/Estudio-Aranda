/* ==========================================================================
   ESTUDIO ARANDA — LÓGICA DE NAVEGACIÓN Y MENÚ MOBILE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  // Función para abrir el menú
  const openMenu = () => {
    mobileToggle.classList.add('is-active');
    navMenu.classList.add('is-open');
    navOverlay.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    mobileToggle.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restaura el scroll
  };

  // Alternar apertura / cierre con el botón de hamburguesa
  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar al hacer clic en el telón / overlay exterior
  navOverlay.addEventListener('click', closeMenu);

  // Cerrar al presionar cualquier enlace de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar al presionar la tecla Escape en el teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
});
  // ==========================================
  // HERO SLIDER AUTOMÁTICO E INTERACTIVO
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const slideNum = document.getElementById('hero-slide-num');
  const slideName = document.getElementById('hero-slide-name');
  const dots = document.querySelectorAll('.hero-dot');

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5500; // 5.5 segundos por foto
    let autoSlideTimer = null;

    function goToSlide(index) {
      // Remover clase activa de diapositiva y punto anterior
      heroSlides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
        dots[currentSlide].setAttribute('aria-pressed', 'false');
      }

      currentSlide = index;

      // Activar nueva diapositiva y punto
      heroSlides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
        dots[currentSlide].setAttribute('aria-pressed', 'true');
      }

      // Actualizar texto y enlace del proyecto en pantalla
      const activeSlide = heroSlides[currentSlide];
      const projectNum = activeSlide.getAttribute('data-num');
      const projectName = activeSlide.getAttribute('data-project');
      const projectLink = activeSlide.getAttribute('data-link') || '#obras';

      if (slideNum) slideNum.textContent = projectNum;
      if (slideName) {
        slideName.setAttribute('href', projectLink);
        slideName.innerHTML = `<span>${projectName}</span><span class="hero-project-arrow">&rarr;</span>`;
      }
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      goToSlide(nextIndex);
    }

    function resetTimer() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextSlide, slideInterval);
    }

    // Permitir clic en los puntos indicadores
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
    });

    // Iniciar temporizador
    resetTimer();
  }

  // ==========================================
  // FILTRADO DINÁMICO DE OBRAS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const obraCards = document.querySelectorAll('.obra-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Quitar clase 'active' de todos los botones y asignarla al clickeado
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 2. Iterar tarjetas con transición suave de desvanecimiento
      obraCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          // Mostrar tarjeta
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          // Ocultar tarjeta
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });
// Mini Slider Automático en Sección Contacto
const contactoSlides = document.querySelectorAll('.contacto-slide');
if (contactoSlides.length > 0) {
  let currentContactoSlide = 0;
  setInterval(() => {
    contactoSlides[currentContactoSlide].classList.remove('active');
    currentContactoSlide = (currentContactoSlide + 1) % contactoSlides.length;
    contactoSlides[currentContactoSlide].classList.add('active');
  }, 4000); // Cambia de imagen cada 4 segundos
}
/* ==========================================================================
   LÓGICA DE GALERÍA INTERACTIVA - CASA DEL OLIVO (7 IMÁGENES)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galeriaImg = document.getElementById('galeria-img');
  const galeriaCounter = document.getElementById('galeria-counter');
  const btnPrev = document.getElementById('galeria-prev');
  const btnNext = document.getElementById('galeria-next');

  // Si no existen los elementos en la página actual, finaliza
  if (!galeriaImg || !galeriaCounter || !btnPrev || !btnNext) return;

  // Lista de las 7 imágenes (reemplazá o agrega las rutas según tus archivos)
  const imagenes = [
    'img/casa olivo/casa del olivo.jpg',
    'img/casa olivo/casa del olivo cocina comedor.jpg',
    'img/casa olivo/casa del olivo dormitorio principal.jpg',
    'img/casa olivo/casa del olivo terraza.jpg',
    'img/casa olivo/casa del olivo vista exterior.jpg',
    'img/casa olivo/casa del olivo sala de estar.jpg',
    'img/casa olivo/casa del olivo vista trasera.jpg'
  ];

  let currentIndex = 0;
  let autoPlayTimer = null;

  const TIEMPO_PASIVO = 4000; // 4 segundos entre cambios automáticos
  const TIEMPO_ACTIVO = TIEMPO_PASIVO * 2; // 8 segundos tras clic manual

  // Función para actualizar imagen y contador
  function updateGallery(index) {
    currentIndex = index;

    if (currentIndex < 0) {
      currentIndex = imagenes.length - 1;
    } else if (currentIndex >= imagenes.length) {
      currentIndex = 0;
    }

    // Efecto de transición (fade out/in)
    galeriaImg.style.opacity = '0.3';
    setTimeout(() => {
      galeriaImg.src = imagenes[currentIndex];
      galeriaImg.style.opacity = '1';
    }, 150);

    // Formatear contador (01 / 07, 02 / 07...)
    const numFormatted = String(currentIndex + 1).padStart(2, '0');
    const totalFormatted = String(imagenes.length).padStart(2, '0');
    galeriaCounter.innerHTML = `CASA DEL OLIVO &nbsp; ${numFormatted} / ${totalFormatted}`;
  }

  // Reiniciar el temporizador con el retardo especificado
  function resetTimer(delay) {
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    
    autoPlayTimer = setTimeout(() => {
      nextImage();
      resetTimer(TIEMPO_PASIVO); // Vuelve al intervalo pasivo normal
    }, delay);
  }

  function nextImage() {
    updateGallery(currentIndex + 1);
  }

  function prevImage() {
    updateGallery(currentIndex - 1);
  }

  // Evento Clic Siguiente (Activo)
  btnNext.addEventListener('click', () => {
    nextImage();
    resetTimer(TIEMPO_ACTIVO); // Duplica el tiempo a 8 segundos
  });

  // Evento Clic Anterior (Activo)
  btnPrev.addEventListener('click', () => {
    prevImage();
    resetTimer(TIEMPO_ACTIVO); // Duplica el tiempo a 8 segundos
  });

  // Iniciar la galería en modo pasivo
  resetTimer(TIEMPO_PASIVO);
});
