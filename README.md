# Davinchi BarberShop — Landing Page

Página web estática para **Davinchi BarberShop**, Medellín Colombia.

## 📁 Estructura del Proyecto

```
DavinchiPag/
├── index.html                   # Página principal (HTML semántico)
├── css/
│   ├── main.css                 # Tokens de diseño + estilos globales + stats + about + cta
│   └── components/
│       ├── navbar.css           # Barra de navegación (fija, scrolled, mobile)
│       ├── hero.css             # Sección hero (animaciones entrada, partículas)
│       ├── services.css         # Tarjetas de servicios
│       ├── gallery.css          # Galería de fotos (grid masonry)
│       ├── buttons.css          # ★ Todos los botones (incluyendo btn--glow)
│       └── footer.css           # Pie de página
├── js/
│   ├── animations.js            # Scroll reveal + contadores animados + partículas
│   ├── navbar.js                # Comportamiento navbar (scroll, mobile, active link)
│   └── main.js                  # Entry point: WhatsApp config, lightbox, smooth scroll
└── assets/
    └── images/
        ├── interior.png         # PLACEHOLDER — reemplazar con foto real del local
        ├── fade-cut.png         # PLACEHOLDER — reemplazar con foto real de corte
        ├── beard-shave.png      # PLACEHOLDER — reemplazar con foto de afeitado
        └── tools.png            # PLACEHOLDER — reemplazar con foto de herramientas
```

## 🚀 Cómo actualizar

### 1. Número de WhatsApp
Edita `js/main.js` y cambia:
```js
WHATSAPP_NUMBER: '573XXXXXXXXX', // Reemplaza con tu número real
```
Formato: código de país + número (sin +, sin espacios). Ejemplo: `573001234567`

### 2. Fotos reales
Reemplaza los archivos en `assets/images/` con tus fotos reales.
Los nombres a mantener o actualizar en `index.html`:
- `interior.png` → foto del interior del local
- `fade-cut.png` → foto de un corte fade
- `beard-shave.png` → foto de afeitado
- `tools.png` → foto de herramientas

Para agregar más fotos, descomenta los slots adicionales en la sección `#gallery` de `index.html`.

### 3. Botón animado (btn--glow)
El botón está en `css/components/buttons.css`, claramente marcado con:
```
/* ★ GLOW BUTTON — Uiverse.io adaptation */
```
Para reemplazarlo, simplemente elimina o reescribe las reglas `.btn--glow` y `.btn--glow::after` / `.btn--glow:hover` / `.btn--glow:active`.

### 4. Horarios y precios
Edita directamente el `index.html`:
- Precios de servicios: busca `<span class="service-card__price">`
- Horarios: busca `Lun – Sáb`

## 🎨 Diseño

| Elemento | Valor |
|---|---|
| Fuentes | Playfair Display (display) · Inter (body) · Bebas Neue (headline) |
| Color primario | `#c49b3a` (dorado) |
| Background | `#0a0a0a` (negro profundo) |
| Acento | Gradientes dorados, vidrio esmerilado en navbar |

## 🔗 Links configurados

- **Instagram**: [davinchi_barber_shop](https://www.instagram.com/davinchi_barber_shop)
- **Google Maps**: [Ver ubicación](https://www.google.com/maps/place/Davinchi+Barber+Shop+(We+speak+english))
- **WhatsApp**: Configurable en `js/main.js`
 
