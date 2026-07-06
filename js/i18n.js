/**
 * i18n.js
 * Davinchi BarberShop — Internationalization
 *
 * Responsibilities:
 *  - Handle switching between English (native) and Spanish
 *  - Store user preference in localStorage
 *  - Update all DOM elements containing [data-i18n]
 */

'use strict';

const TRANSLATIONS = {
  es: {
    // Navbar
    'nav-home': 'Inicio',
    'nav-services': 'Servicios',
    'nav-gallery': 'Galería',
    'nav-about': 'Nosotros',
    'nav-contact': 'Contacto',
    'nav-book': 'Reservar',

    // Hero Section
    'hero-tagline': '— Medellín, Colombia',
    'hero-title': 'Where the craft<br /><em>becomes</em><br />art.', // Keep english base structure or translate:
    'hero-title-es': 'Donde el oficio<br /><em>se convierte</em><br />en arte.',
    'hero-subtitle': 'Cortes de precisión. Tradición con estilo.<br />Cada silla, una experiencia única.',
    'hero-book-btn': 'Reservar mi cita',
    'hero-services-btn': 'Ver servicios',
    'scroll-text': 'Desplazar',

    // Stats Section
    'stat-years-label': 'Años de experiencia',
    'stat-clients-label': 'Clientes satisfechos',
    'stat-services-label': 'Servicios premium',
    'stat-rating-label': 'Calificación Google',

    // Services Section
    'services-label': 'Nuestros Servicios',
    'services-title': 'El arte del <em>estilo</em>',
    'services-subtitle': 'Cada servicio es ejecutado con precisión, usando los mejores productos y técnicas.',
    'service-fade-title': 'Corte Fade',
    'service-fade-desc': 'Degradados precisos de alta a baja, con acabado limpio y profesional.',
    'service-fade-price': 'Desde $25.000',
    'service-classic-badge': 'Popular',
    'service-classic-title': 'Corte Clásico',
    'service-classic-desc': 'Tijera y máquina en perfecta armonía. El clásico reinventado para el hombre moderno.',
    'service-classic-price': 'Desde $30.000',
    'service-beard-title': 'Arreglo de Barba',
    'service-beard-desc': 'Perfilado y definición de barba con navaja caliente y productos premium.',
    'service-beard-price': 'Desde $20.000',
    'service-shave-title': 'Afeitado con Navaja',
    'service-shave-desc': 'Experiencia completa con toalla caliente, crema artesanal y navaja recta.',
    'service-shave-price': 'Desde $35.000',
    'service-combo-title': 'Combo Completo',
    'service-combo-desc': 'Corte + barba + lavado + tratamiento. La experiencia Davinchi al máximo.',
    'service-combo-price': 'Desde $55.000',
    'service-kids-title': 'Corte Infantil',
    'service-kids-desc': 'Paciencia y técnica para los futuros caballeros. Ambiente amigable.',
    'service-kids-price': 'Desde $20.000',
    'services-whatsapp-btn': 'Consultar precios por WhatsApp',

    // Gallery Section
    'gallery-label': 'Galería',
    'gallery-title': 'Nuestro <em>trabajo</em>',
    'gallery-subtitle': 'Cada corte cuenta una historia. Estas son las nuestras.',
    'gallery-caption-1': 'Nuestro espacio',
    'gallery-caption-2': 'Fade perfecto',
    'gallery-caption-3': 'Afeitado clásico',
    'gallery-caption-4': 'Herramientas de élite',
    'gallery-instagram-btn': 'Ver más en Instagram',

    // About Section
    'about-label': 'Nuestra Historia',
    'about-title': 'Más que una <em>barbería</em>',
    'about-desc-1': 'Davinchi BarberShop nació de la pasión por el arte del corte y la tradición barbera. Ubicados en el corazón de Medellín, combinamos técnicas clásicas con las últimas tendencias para ofrecerte una experiencia de grooming sin igual.',
    'about-desc-2': 'Cada detalle de nuestro espacio ha sido pensado para hacerte sentir como lo que eres: un caballero que merece lo mejor. Hablamos inglés, y atendemos a todos con el mismo nivel de excelencia.',
    'about-value-1': 'Precisión artesanal en cada corte',
    'about-value-2': 'Productos premium internacionales',
    'about-value-3': 'Ambiente exclusivo y relajante',
    'about-value-4': 'Atención bilingüe (Español & English)',
    'about-maps-btn': 'Ver en Google Maps',

    // CTA Section
    'cta-label': '¿Listo?',
    'cta-title': 'Tu próximo nivel<br />empieza <em>aquí</em>',
    'cta-subtitle': 'Reserva ahora por WhatsApp y asegura tu silla.',
    'cta-whatsapp-btn': 'Reservar mi cita ahora',
    'cta-hours': 'Lun – Sáb | 9:00 AM – 7:00 PM',

    // Footer
    'footer-tagline': 'El arte del corte. La elegancia del estilo.',
    'footer-nav-title': 'Navegación',
    'footer-contact-title': 'Contacto',
    'footer-credit': 'Diseño y desarrollo con ❤️ para el arte del corte.',
    'footer-copyright': 'Todos los derechos reservados.'
  }
};

// Internal cache for default English texts (read from DOM on load)
const nativeEnglishTexts = {};

/**
 * Initialize translations by scanning the DOM and saving native English values
 */
function initTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    // Save original English content (HTML format for titles/subtitles, text format for buttons)
    if (key.includes('title') || key.includes('subtitle') || key.includes('desc') || key.includes('tagline') || key.includes('value') || key.includes('credit')) {
      nativeEnglishTexts[key] = el.innerHTML.trim();
    } else {
      nativeEnglishTexts[key] = el.textContent.trim();
    }
  });
}

/**
 * Apply selected language translations
 * @param {string} lang - 'en' or 'es'
 */
function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    
    // Get text based on selected language
    let text = '';
    if (lang === 'es') {
      text = TRANSLATIONS.es[key] || nativeEnglishTexts[key];
    } else {
      text = nativeEnglishTexts[key];
    }

    if (!text) return;

    // Use innerHTML for tags that require formatting, otherwise textContent
    if (key.includes('title') || key.includes('subtitle') || key.includes('desc') || key.includes('tagline') || key.includes('value') || key.includes('credit')) {
      el.innerHTML = text;
    } else {
      // For buttons that might have SVG icons inside, replace only the text node
      const iconSpan = el.querySelector('.btn__icon');
      if (iconSpan) {
        // Keep the SVG icon and just update the text content next to it
        el.innerHTML = '';
        el.appendChild(iconSpan);
        el.appendChild(document.createTextNode(' ' + text));
      } else {
        el.textContent = text;
      }
    }
  });

  // Update URL description meta tag for SEO
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      lang === 'es'
        ? 'Davinchi BarberShop — Cortes de élite, estilo clásico con toque contemporáneo en Medellín. Reserva tu cita por WhatsApp.'
        : 'Davinchi BarberShop — Elite haircuts, classic style with a contemporary touch in Medellín. Book your appointment via WhatsApp.'
    );
  }

  // Update active state in selector buttons
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('lang-btn--active', isActive);
  });
}

/**
 * Setup event listeners for language switcher buttons
 */
function setupLanguageSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang === 'en' || lang === 'es') {
        localStorage.setItem('davinchi_lang', lang);
        applyLanguage(lang);
      }
    });
  });
}

// Run before other scripts
document.addEventListener('DOMContentLoaded', () => {
  initTranslations();
  setupLanguageSwitcher();

  // Load user preference or default to English ('en')
  const savedLang = localStorage.getItem('davinchi_lang') || 'en';
  applyLanguage(savedLang);
});
