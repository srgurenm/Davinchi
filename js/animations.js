/**
 * animations.js
 * Davinchi BarberShop — Utilidades de animación
 *
 * Responsabilidades:
 *  - Animaciones de revelado al desplazarse (IntersectionObserver)
 *  - Contadores animados de estadísticas
 *  - Sistema de partículas para el Hero
 */

'use strict';

/* ─────────────────────────────────────────────
   1. REVELADO AL HACER SCROLL — IntersectionObserver
────────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Ejecutar solo una vez
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────────
   2. CONTADORES ANIMADOS
────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  const start    = performance.now();
  const startVal = 0;

  function update(currentTime) {
    const elapsed  = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    // easing cubic-out
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * eased);

    el.textContent = current >= 1000
      ? current.toLocaleString('es-CO')
      : current;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const numbers = document.querySelectorAll('.stats__number[data-target]');
  if (!numbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  numbers.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────────
   3. SISTEMA DE PARTÍCULAS DEL HERO
────────────────────────────────────────────── */
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  // Respetar la preferencia de movimiento reducida del usuario
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const PARTICLE_COUNT = 30;
  const particles      = [];

  function createParticle() {
    const el = document.createElement('span');
    el.classList.add('hero__particle');

    const size   = Math.random() * 3 + 1;          // 1–4px
    const x      = Math.random() * 100;             // % desde la izquierda
    const delay  = Math.random() * 8;               // 0–8s de retraso
    const dur    = Math.random() * 12 + 8;          // 8–20s de duración
    const blur   = Math.random() < 0.3 ? 1 : 0;    // 30% tienen desenfoque

    el.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${x}%;
      bottom: -10px;
      animation-duration:  ${dur}s;
      animation-delay:     -${delay}s;
      filter: blur(${blur}px);
      box-shadow: 0 0 ${size * 2}px rgba(196,155,58,0.6);
    `;

    container.appendChild(el);
    particles.push(el);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }
}

/* ─────────────────────────────────────────────
   4. APLICAR ATRIBUTOS data-animate
   (Agregar programáticamente para mantener el HTML limpio)
────────────────────────────────────────────── */
function applyAnimationAttributes() {
  const animatable = [
    { selector: '#stat-years',     delay: '0' },
    { selector: '#stat-clients',   delay: '100' },
    { selector: '#stat-services',  delay: '200' },
    { selector: '#stat-rating',    delay: '300' },
    { selector: '.service-card',   delay: null, all: true },
    { selector: '.gallery__item',  delay: null, all: true },
    { selector: '.about__image-col',  delay: '0' },
    { selector: '.about__content-col', delay: '200' },
    { selector: '.cta-section__content', delay: '0' },
  ];

  animatable.forEach(({ selector, delay, all }) => {
    const els = all
      ? document.querySelectorAll(selector)
      : [document.querySelector(selector)].filter(Boolean);

    els.forEach((el, idx) => {
      el.setAttribute('data-animate', '');
      if (delay !== null) {
        el.setAttribute('data-animate-delay', delay);
      } else {
        // Retraso escalonado para listas
        const d = Math.min(idx * 100, 500);
        el.setAttribute('data-animate-delay', d.toString());
      }
    });
  });
}

/* ─────────────────────────────────────────────
   INICIALIZACIÓN
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyAnimationAttributes();
  initScrollReveal();
  initCounters();
  initHeroParticles();
});
