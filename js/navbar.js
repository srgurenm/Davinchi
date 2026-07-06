/**
 * navbar.js
 * Davinchi BarberShop — Navbar behavior
 *
 * Responsibilities:
 *  - Scrolled state (glass effect)
 *  - Mobile menu open/close
 *  - Active link highlighting on scroll
 *  - Mobile backdrop
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
   DOM References
────────────────────────────────────────────── */
const navbar   = document.querySelector(SELECTORS.navbar);
const toggle   = document.querySelector(SELECTORS.toggle);
const menu     = document.querySelector(SELECTORS.menu);
const navLinks = document.querySelectorAll(SELECTORS.navLinks);

/* ─────────────────────────────────────────────
   1. SCROLL — scrolled state
────────────────────────────────────────────── */
function onScroll() {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle(CLASSES.scrolled, scrolled);
  highlightActiveSection();
}

/* ─────────────────────────────────────────────
   2. MOBILE MENU
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

/* Close menu when a nav link is clicked (mobile) */
function onNavLinkClick(e) {
  const isMobile = window.innerWidth <= 900;
  if (isMobile) closeMenu();
}

/* ─────────────────────────────────────────────
   3. ACTIVE LINK HIGHLIGHTING
────────────────────────────────────────────── */
function highlightActiveSection() {
  const sections  = document.querySelectorAll(SELECTORS.sections);
  const scrollPos = window.scrollY + 120; // offset for fixed navbar

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
   4. KEYBOARD ACCESSIBILITY
────────────────────────────────────────────── */
function onKeyDown(e) {
  if (e.key === 'Escape' && menu.classList.contains(CLASSES.open)) {
    closeMenu();
    toggle.focus();
  }
}

/* ─────────────────────────────────────────────
   5. RESIZE — close mobile menu if resized above breakpoint
────────────────────────────────────────────── */
function onResize() {
  if (window.innerWidth > 900 && menu.classList.contains(CLASSES.open)) {
    closeMenu();
  }
}

/* ─────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
function initNavbar() {
  if (!navbar || !toggle || !menu) return;

  // Throttled scroll
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

  // Initial state
  onScroll();
}

document.addEventListener('DOMContentLoaded', initNavbar);
