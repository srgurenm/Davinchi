/**
 * main.js
 * Davinchi BarberShop — Application entry point
 *
 * Responsibilities:
 *  - Footer year
 *  - WhatsApp number configuration (update WHATSAPP_NUMBER)
 *  - Smooth scroll for anchor links
 *  - Gallery lightbox
 */

'use strict';

/* ─────────────────────────────────────────────
   CONFIGURATION — UPDATE THESE VALUES
────────────────────────────────────────────── */
const CONFIG = {
  /**
   * WhatsApp number — full international format, digits only
   * Example: '573001234567' (Colombia +57, then 10 digits)
   */
  WHATSAPP_NUMBER: '573XXXXXXXXX',

  /**
   * Default WhatsApp message (URL-encoded)
   */
  WHATSAPP_MESSAGE: encodeURIComponent(
    'Hola Davinchi BarberShop 💈 Me interesa reservar una cita. ¿Me pueden ayudar?'
  ),
};

/* ─────────────────────────────────────────────
   1. UPDATE WHATSAPP LINKS
   Replaces placeholder number with real one from CONFIG
────────────────────────────────────────────── */
function updateWhatsAppLinks() {
  const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${CONFIG.WHATSAPP_MESSAGE}`;
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');

  waLinks.forEach((link) => {
    link.href = url;
  });
}

/* ─────────────────────────────────────────────
   2. FOOTER YEAR
────────────────────────────────────────────── */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ─────────────────────────────────────────────
   3. SMOOTH SCROLL (enhanced for older browsers)
────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.querySelector('#navbar')?.offsetHeight ?? 0;
      const targetY      = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   4. GALLERY LIGHTBOX
   Simple click-to-enlarge for gallery images
────────────────────────────────────────────── */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery__item');
  if (!galleryItems.length) return;

  // Create lightbox overlay
  const overlay = document.createElement('div');
  overlay.id    = 'galleryLightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Imagen ampliada');
  overlay.setAttribute('aria-modal', 'true');
  overlay.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    padding: 2rem;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  `;

  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = `
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 0 60px rgba(0,0,0,0.8);
    border: 1px solid rgba(196,155,58,0.2);
  `;
  lightboxImg.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Cerrar imagen');
  closeBtn.style.cssText = `
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(196,155,58,0.15);
    border: 1px solid rgba(196,155,58,0.4);
    color: #c49b3a;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  `;
  closeBtn.innerHTML = '✕';

  overlay.appendChild(lightboxImg);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Open lightbox
  function openLightbox(imgSrc, alt) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = alt;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    });
  }

  // Close lightbox
  function closeLightbox() {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Event listeners
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery__img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closeLightbox();
    }
  });
}

/* ─────────────────────────────────────────────
   5. PHONE NUMBER DISPLAY
   Updates visible phone text with real number
────────────────────────────────────────────── */
function updatePhoneNumbers() {
  const DISPLAY_NUMBER = '+57 3XX XXX XXXX'; // Update with real number
  const phoneEls = document.querySelectorAll('#cta-phone-link, #footer-phone');

  phoneEls.forEach((el) => {
    if (el.textContent.includes('3XX')) {
      el.textContent = `📱 ${DISPLAY_NUMBER}`;
    }
  });
}

/* ─────────────────────────────────────────────
   INIT — DOMContentLoaded
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  updateWhatsAppLinks();
  updatePhoneNumbers();
  initSmoothScroll();
  initGalleryLightbox();

  // Log a welcome message for developers
  console.log(
    '%c💈 Davinchi BarberShop %c— Website loaded',
    'color: #c49b3a; font-size: 14px; font-weight: bold;',
    'color: #9e9589; font-size: 12px;'
  );
  console.log(
    '%cPara actualizar el número de WhatsApp, edita CONFIG.WHATSAPP_NUMBER en js/main.js',
    'color: #6b6560; font-size: 11px;'
  );
});
