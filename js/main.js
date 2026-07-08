/**
 * main.js
 * Davinchi BarberShop — Punto de entrada de la aplicación
 *
 * Responsabilidades:
 *  - Año en el pie de página
 *  - Configuración del número de WhatsApp (actualizar WHATSAPP_NUMBER)
 *  - Desplazamiento suave para enlaces de anclaje
 *  - Lightbox de galería
 */

'use strict';

/* ─────────────────────────────────────────────
   CONFIGURACIÓN — ACTUALIZAR ESTOS VALORES
────────────────────────────────────────────── */
const CONFIG = {
  /**
   * Número de WhatsApp — formato internacional completo, solo dígitos
   * Ejemplo: '573001234567' (Colombia +57, luego 10 dígitos)
   */
  WHATSAPP_NUMBER: '573022903588',

  /**
   * Mensaje de WhatsApp por defecto (codificado en URL)
   */
  WHATSAPP_MESSAGE: encodeURIComponent(
    'Hola Davinchi BarberShop 💈 Me interesa reservar una cita. ¿Me pueden ayudar?'
  ),
};

/* ─────────────────────────────────────────────
   2. AÑO EN EL PIE DE PÁGINA
────────────────────────────────────────────── */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ─────────────────────────────────────────────
   3. DESPLAZAMIENTO SUAVE
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
   4. LIGHTBOX DE GALERÍA
   Clic para ampliar imágenes de la galería
────────────────────────────────────────────── */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery__item');
  if (!galleryItems.length) return;

  // Crear superposición del lightbox
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

  // Abrir lightbox
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

  // Cerrar lightbox
  function closeLightbox() {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Escuchadores de eventos
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
   INICIALIZACIÓN — DOMContentLoaded
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initSmoothScroll();
  initGalleryLightbox();

  // Registro de mensaje de bienvenida para desarrolladores
  console.log(
    '%c💈 Davinchi BarberShop %c— Sitio web cargado',
    'color: #c49b3a; font-size: 14px; font-weight: bold;',
    'color: #9e9589; font-size: 12px;'
  );
});
