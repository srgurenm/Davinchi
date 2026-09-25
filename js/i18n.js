/**
 * i18n.js
 * Davinchi BarberShop — Internationalization
 *
 * Responsibilities:
 *  - Handle switching between English and Spanish
 *  - Store user preference in localStorage
 *  - Update all DOM elements containing [data-i18n], [data-i18n-placeholder], [data-i18n-aria]
 *  - Emit 'languagechange' event for dynamic components (Store, Cart, Checkout)
 */

'use strict';

const TRANSLATIONS = {
  en: {
    // Page Title & Meta
    'page-title': 'Davinchi BarberShop',
    'meta-description': 'Davinchi BarberShop — Elite haircuts, classic style with a contemporary touch in Medellín. Book your appointment via WhatsApp.',

    // Navbar
    'nav-home': 'Home',
    'nav-services': 'Services',
    'nav-gallery': 'Gallery',
    'nav-about': 'About Us',
    'nav-contact': 'Contact',
    'nav-book': 'Book Now',
    'nav-shop': 'Shop STMNT',
    'nav-shop-aria': 'Open STMNT store',

    // Hero Section
    'hero-tagline': '— Medellín, Colombia',
    'hero-title': 'Where the craft<br /><em>becomes</em><br />art.',
    'hero-subtitle': 'Precision cuts. Tradition with style.<br />Every chair, a unique experience.',
    'hero-book-btn': 'Book Appointment',
    'hero-services-btn': 'View services',
    'scroll-text': 'Scroll',

    // Stats Section
    'stat-years-label': 'Years of experience',
    'stat-clients-label': 'Satisfied clients',
    'stat-services-label': 'Premium services',
    'stat-rating-label': 'Google Rating',

    // Services Section
    'services-label': 'Our Services',
    'services-title': 'The Art of <em>Style</em>',
    'services-subtitle': 'Each service is executed with precision, using the best products and techniques.',
    'service-fade-title': 'Fade Cut',
    'service-fade-desc': 'Precision gradients from high to low, with clean and professional finish.',
    'service-classic-title': 'Classic Cut',
    'service-classic-desc': 'Scissors and machine in perfect harmony. Classic style reinvented for the modern man.',
    'service-beard-title': 'Beard Grooming',
    'service-beard-desc': 'Shaping and defining beard with hot razor and premium products.',
    'service-shave-title': 'Razor Shave',
    'service-shave-desc': 'Complete experience: hot towel, artisan cream, and classic straight razor.',
    'service-combo-title': 'Full Combo',
    'service-combo-desc': 'Haircut + beard + wash + treatment. The complete Davinchi experience.',
    'service-kids-title': 'Kids Cut',
    'service-kids-desc': 'Patience and technique for future gentlemen. Friendly environment.',
    'services-whatsapp-btn': 'Book your appointment via WhatsApp',

    // Gallery Section
    'gallery-label': 'Gallery',
    'gallery-title': 'Our <em>Work</em>',
    'gallery-subtitle': 'Each cut tells a story. These are ours.',
    'gallery-caption-1': 'Our Space',
    'gallery-caption-2': 'Perfect Fade',
    'gallery-caption-3': 'Classic Shave',
    'gallery-caption-4': 'Elite Tools',
    'gallery-instagram-btn': 'Follow us on Instagram',

    // About Section
    'about-label': 'Our Story',
    'about-title': 'More than a <em>barbershop</em>',
    'about-desc-1': 'Davinchi BarberShop was born from the passion for the art of haircutting and barbering tradition. Located in the heart of Medellín, we combine classic techniques with the latest trends to offer you an unparalleled grooming experience.',
    'about-desc-2': 'Every detail of our space has been designed to make you feel like who you are: a gentleman who deserves the best. We speak English, and we serve everyone with the same level of excellence.',
    'about-value-1': 'Craft precision in every cut',
    'about-value-2': 'Premium international products',
    'about-value-3': 'Exclusive and relaxing environment',
    'about-value-4': 'Bilingual attention (Spanish & English)',
    'about-maps-btn': 'View on Google Maps',

    // STMNT Promo Banner
    'stmnt-banner-badge': 'Available Here',
    'stmnt-banner-title': 'Bring the <em>professional</em><br />to your home',
    'stmnt-banner-desc': 'The same products we use at Davinchi BarberShop, now available for you. STMNT quality, home delivery.',
    'stmnt-banner-btn-title': 'View Store',
    'stmnt-banner-btn-sub': 'STMNT Products',
    'stmnt-banner-note': 'Over 19 products available',
    'stmnt-banner-aria': 'STMNT products available in store',
    'stmnt-banner-btn-aria': 'Open STMNT store',

    // Store Popup Modal
    'store-popup-sub': 'Available at Davinchi BarberShop',
    'store-popup-aria': 'STMNT Grooming Goods Store',
    'store-close-aria': 'Close store',
    'cart-btn-aria': 'View cart',

    // Cart Sidebar
    'cart-title': 'My Cart',
    'cart-empty-text': 'Your cart is empty',
    'cart-label-products': 'Products',
    'cart-label-total': 'Estimated total',
    'cart-btn-checkout': 'Order via WhatsApp',
    'cart-sidebar-aria': 'Shopping cart',
    'cart-close-aria': 'Close cart',
    'cart-outside-aria': 'View shopping cart',
    'cart-checkout-aria': 'Proceed to checkout via WhatsApp',

    // Checkout Modal
    'checkout-title': 'Shipping Details',
    'checkout-note': '📦 You will be redirected to WhatsApp with your order and details ready. A Davinchi advisor will confirm availability, shipping costs, and delivery time.',
    'checkout-name-label': 'Full name *',
    'checkout-name-ph': 'e.g. Carlos Martínez',
    'checkout-doc-label': 'ID / Document number *',
    'checkout-doc-ph': 'e.g. 1012345678',
    'checkout-phone-label': 'WhatsApp number *',
    'checkout-phone-ph': 'e.g. 3001234567',
    'checkout-address-label': 'Delivery address *',
    'checkout-address-ph': 'Street, neighborhood, city',
    'checkout-submit-btn': 'Confirm order via WhatsApp',
    'modal-close-aria': 'Close',

    // CTA Section
    'cta-label': 'Ready?',
    'cta-title': 'Your next level<br />starts <em>here</em>',
    'cta-subtitle': 'Book now via WhatsApp and secure your chair.',
    'cta-whatsapp-btn': 'Book Appointment',
    'cta-hours': 'Mon – Sat | 9:00 AM – 7:00 PM',

    // Footer
    'footer-tagline': 'The art of the cut. The elegance of style.',
    'footer-nav-title': 'Navigation',
    'footer-shop': 'Shop STMNT',
    'footer-contact-title': 'Contact',
    'footer-hours': '🕐 Mon – Sat: 9AM – 7PM',
    'footer-credit': 'Design and development with ❤️ for the art of the cut.',
    'footer-copyright': 'All rights reserved.'
  },
  es: {
    // Page Title & Meta
    'page-title': 'Davinchi BarberShop',
    'meta-description': 'Davinchi BarberShop — Cortes de élite, estilo clásico con toque contemporáneo en Medellín. Reserva tu cita por WhatsApp.',

    // Navbar
    'nav-home': 'Inicio',
    'nav-services': 'Servicios',
    'nav-gallery': 'Galería',
    'nav-about': 'Nosotros',
    'nav-contact': 'Contacto',
    'nav-book': 'Reservar',
    'nav-shop': 'Tienda STMNT',
    'nav-shop-aria': 'Abrir tienda STMNT',

    // Hero Section
    'hero-tagline': '— Medellín, Colombia',
    'hero-title': 'Donde el oficio<br /><em>se convierte</em><br />en arte.',
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
    'service-classic-title': 'Corte Clásico',
    'service-classic-desc': 'Tijera y máquina en perfecta armonía. El estilo clásico reinventado para el hombre moderno.',
    'service-beard-title': 'Arreglo de Barba',
    'service-beard-desc': 'Perfilado y definición de barba con navaja caliente y productos de alta calidad.',
    'service-shave-title': 'Afeitado con Navaja',
    'service-shave-desc': 'Experiencia completa: toalla caliente, espuma artesanal y afeitado con navaja clásica.',
    'service-combo-title': 'Combo Completo',
    'service-combo-desc': 'Corte + barba + lavado + tratamiento. La experiencia Davinchi completa.',
    'service-kids-title': 'Corte Infantil',
    'service-kids-desc': 'Paciencia y técnica profesional para los pequeños caballeros. Ambiente amigable.',
    'services-whatsapp-btn': 'Reserva tu cita por WhatsApp',

    // Gallery Section
    'gallery-label': 'Galería',
    'gallery-title': 'Nuestro <em>trabajo</em>',
    'gallery-subtitle': 'Cada corte cuenta una historia. Estas son las nuestras.',
    'gallery-caption-1': 'Nuestro espacio',
    'gallery-caption-2': 'Fade perfecto',
    'gallery-caption-3': 'Afeitado clásico',
    'gallery-caption-4': 'Herramientas de élite',
    'gallery-instagram-btn': 'Síguenos en Instagram',

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

    // STMNT Promo Banner
    'stmnt-banner-badge': 'Disponible aquí',
    'stmnt-banner-title': 'Lleva el <em>profesional</em><br />a tu casa',
    'stmnt-banner-desc': 'Los mismos productos que usamos en Davinchi BarberShop, ahora disponibles para ti. Calidad STMNT, entrega a domicilio.',
    'stmnt-banner-btn-title': 'Ver Tienda',
    'stmnt-banner-btn-sub': 'Productos STMNT',
    'stmnt-banner-note': 'Más de 19 productos disponibles',
    'stmnt-banner-aria': 'Productos STMNT disponibles en tienda',
    'stmnt-banner-btn-aria': 'Abrir tienda STMNT',

    // Store Popup Modal
    'store-popup-sub': 'Disponible en Davinchi BarberShop',
    'store-popup-aria': 'Tienda STMNT Grooming Goods',
    'store-close-aria': 'Cerrar tienda',
    'cart-btn-aria': 'Ver carrito',

    // Cart Sidebar
    'cart-title': 'Mi Carrito',
    'cart-empty-text': 'Tu carrito está vacío',
    'cart-label-products': 'Productos',
    'cart-label-total': 'Total estimado',
    'cart-btn-checkout': 'Ordenar por WhatsApp',
    'cart-sidebar-aria': 'Carrito de compras',
    'cart-close-aria': 'Cerrar carrito',
    'cart-outside-aria': 'Ver carrito de compras',
    'cart-checkout-aria': 'Proceder al pago por WhatsApp',

    // Checkout Modal
    'checkout-title': 'Datos de Envío',
    'checkout-note': '📦 Serás redirigido a WhatsApp con tu pedido y datos listos. Un asesor de Davinchi confirmará disponibilidad, costos de envío y tiempo de entrega.',
    'checkout-name-label': 'Nombre completo *',
    'checkout-name-ph': 'Ej. Carlos Martínez',
    'checkout-doc-label': 'Documento de identidad *',
    'checkout-doc-ph': 'Ej. 1012345678',
    'checkout-phone-label': 'Número de WhatsApp *',
    'checkout-phone-ph': 'Ej. 3001234567',
    'checkout-address-label': 'Dirección de entrega *',
    'checkout-address-ph': 'Calle, barrio, ciudad',
    'checkout-submit-btn': 'Confirmar pedido por WhatsApp',
    'modal-close-aria': 'Cerrar',

    // CTA Section
    'cta-label': '¿Listo?',
    'cta-title': 'Tu próximo nivel<br />empieza <em>aquí</em>',
    'cta-subtitle': 'Reserva ahora por WhatsApp y asegura tu silla.',
    'cta-whatsapp-btn': 'Reservar mi cita ahora',
    'cta-hours': 'Lun – Sáb | 9:00 AM – 7:00 PM',

    // Footer
    'footer-tagline': 'El arte del corte. La elegancia del estilo.',
    'footer-nav-title': 'Navegación',
    'footer-shop': 'Tienda STMNT',
    'footer-contact-title': 'Contacto',
    'footer-hours': '🕐 Lun – Sáb: 9AM – 7PM',
    'footer-credit': 'Diseño y desarrollo con ❤️ para el arte del corte.',
    'footer-copyright': 'Todos los derechos reservados.'
  }
};

// Internal cache for default English texts (read from DOM on load as fallback)
const nativeEnglishTexts = {};

/**
 * Initialize translations by scanning the DOM and saving native English values
 */
function initTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key.includes('title') || key.includes('subtitle') || key.includes('desc') || key.includes('tagline') || key.includes('value') || key.includes('credit') || key.includes('note')) {
      nativeEnglishTexts[key] = el.innerHTML.trim();
    } else {
      nativeEnglishTexts[key] = el.textContent.trim();
    }
  });
}

/**
 * Apply selected language translations across the page
 * @param {string} lang - 'en' or 'es'
 */
function applyLanguage(lang) {
  const targetLang = (lang === 'es') ? 'es' : 'en';
  document.documentElement.setAttribute('lang', targetLang);

  // 1. Text elements with [data-i18n]
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = (TRANSLATIONS[targetLang] && TRANSLATIONS[targetLang][key]) || nativeEnglishTexts[key];
    if (!text) return;

    if (key.includes('title') || key.includes('subtitle') || key.includes('desc') || key.includes('tagline') || key.includes('value') || key.includes('credit') || key.includes('note')) {
      el.innerHTML = text;
    } else {
      const iconSpan = el.querySelector('.btn__icon');
      if (iconSpan) {
        el.innerHTML = '';
        el.appendChild(iconSpan);
        el.appendChild(document.createTextNode(' ' + text));
      } else {
        el.textContent = text;
      }
    }
  });

  // 2. Input Placeholders with [data-i18n-placeholder]
  const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderEls.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = (TRANSLATIONS[targetLang] && TRANSLATIONS[targetLang][key]);
    if (text) {
      el.placeholder = text;
    }
  });

  // 3. Accessibility aria-label with [data-i18n-aria]
  const ariaEls = document.querySelectorAll('[data-i18n-aria]');
  ariaEls.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    const text = (TRANSLATIONS[targetLang] && TRANSLATIONS[targetLang][key]);
    if (text) {
      el.setAttribute('aria-label', text);
    }
  });

  // 4. Update Page Title and Meta Description
  if (TRANSLATIONS[targetLang]['page-title']) {
    document.title = TRANSLATIONS[targetLang]['page-title'];
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && TRANSLATIONS[targetLang]['meta-description']) {
    metaDesc.setAttribute('content', TRANSLATIONS[targetLang]['meta-description']);
  }

  // 5. Update appointment WhatsApp booking links message according to language
  const bookingLinks = [
    document.getElementById('nav-whatsapp-btn'),
    document.getElementById('hero-whatsapp-btn'),
    document.getElementById('services-whatsapp-btn'),
    document.getElementById('cta-whatsapp-btn')
  ];
  const bookingMsg = targetLang === 'es'
    ? encodeURIComponent('Hola Davinchi BarberShop, estoy interesado en una cita.')
    : encodeURIComponent('Hello Davinchi BarberShop, I would like to book an appointment.');

  bookingLinks.forEach((link) => {
    if (link) {
      link.href = `https://wa.me/573022903588?text=${bookingMsg}`;
    }
  });

  // 6. Update active state in selector buttons
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === targetLang;
    btn.classList.toggle('lang-btn--active', isActive);
  });

  // 7. Dispatch event for dynamic modules like store.js
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: targetLang } }));
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

// Global API
window.DavinchiI18n = {
  getLang: () => document.documentElement.getAttribute('lang') || localStorage.getItem('davinchi_lang') || 'en',
  applyLanguage,
  t: (key, lang) => {
    const l = lang || document.documentElement.getAttribute('lang') || 'en';
    return (TRANSLATIONS[l] && TRANSLATIONS[l][key]) || key;
  },
  TRANSLATIONS
};

// Run before other scripts
document.addEventListener('DOMContentLoaded', () => {
  initTranslations();
  setupLanguageSwitcher();

  // Load user preference or default to English ('en')
  const savedLang = localStorage.getItem('davinchi_lang') || 'en';
  applyLanguage(savedLang);
});
