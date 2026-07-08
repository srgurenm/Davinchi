/**
 * navbar.js
 * Davinchi BarberShop — Comportamiento de la barra de navegación
 *
 * Responsabilidades:
 *  - Estado de desplazamiento (efecto vidrio)
 *  - Abrir/cerrar menú móvil
 *  - Resaltado de enlace activo al desplazarse
 *  - Fondo para menú móvil
 */

'use strict';

const SELECTORS = {
  navbar:    '#navbar',
  toggle:    '#navToggle',
  menu:      '#navMenu',
  navLinks:  '.navbar__link',
  sections:  'section[id]',
};

const CLASSES = {
  scrolled: 'is-scrolled',
  open:     'is-open',
  active:   'is-active',
};

/* ─────────────────────────────────────────────
   Referencias del DOM
────────────────────────────────────────────── */
const navbar   = document.querySelector(SELECTORS.navbar);
const toggle   = document.querySelector(SELECTORS.toggle);
const menu     = document.querySelector(SELECTORS.menu);
const navLinks = document.querySelectorAll(SELECTORS.navLinks);

/* ─────────────────────────────────────────────
   1. DESPLAZAMIENTO — estado al hacer scroll
────────────────────────────────────────────── */
function onScroll() {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle(CLASSES.scrolled, scrolled);
  highlightActiveSection();
}

/* ─────────────────────────────────────────────
   2. MENÚ MÓVIL
────────────────────────────────────────────── */
let backdrop = null;

function createBackdrop() {
  if (backdrop) return backdrop;
  backdrop = document.createElement('div');
  backdrop.classList.add('navbar__backdrop');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(backdrop);
  backdrop.addEventListener('click', closeMenu);
  return backdrop;
}

function openMenu() {
  menu.classList.add(CLASSES.open);
  toggle.classList.add(CLASSES.open);
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  createBackdrop().classList.add(CLASSES.open);
}

function closeMenu() {
  menu.classList.remove(CLASSES.open);
  toggle.classList.remove(CLASSES.open);
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (backdrop) backdrop.classList.remove(CLASSES.open);
}

function toggleMenu() {
  const isOpen = menu.classList.contains(CLASSES.open);
  isOpen ? closeMenu() : openMenu();
}

// Cerrar menú al hacer clic en un enlace de navegación (móvil)
function onNavLinkClick(e) {
  const isMobile = window.innerWidth <= 900;
  if (isMobile) closeMenu();
}

/* ─────────────────────────────────────────────
   3. RESALTADO DE ENLACE ACTIVO
────────────────────────────────────────────── */
function highlightActiveSection() {
  const sections  = document.querySelectorAll(SELECTORS.sections);
  const scrollPos = window.scrollY + 120; // desplazamiento compensatorio para la barra fija

  let currentSection = '';

  sections.forEach((section) => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle(CLASSES.active, href === currentSection);
  });
}

/* ─────────────────────────────────────────────
   4. ACCESIBILIDAD CON TECLADO
────────────────────────────────────────────── */
function onKeyDown(e) {
  if (e.key === 'Escape' && menu.classList.contains(CLASSES.open)) {
    closeMenu();
    toggle.focus();
  }
}

/* ─────────────────────────────────────────────
   5. REDIMENSIONAMIENTO — cerrar menú móvil si se redimensiona por encima del punto de interrupción
────────────────────────────────────────────── */
function onResize() {
  if (window.innerWidth > 900 && menu.classList.contains(CLASSES.open)) {
    closeMenu();
  }
}

/* ─────────────────────────────────────────────
   INICIALIZACIÓN
────────────────────────────────────────────── */
function initNavbar() {
  if (!navbar || !toggle || !menu) return;

  // Scroll con limitación de velocidad
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  toggle.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', onNavLinkClick);
  });

  document.addEventListener('keydown', onKeyDown);

  window.addEventListener('resize', onResize);

  // Estado inicial
  onScroll();
}

document.addEventListener('DOMContentLoaded', initNavbar);
