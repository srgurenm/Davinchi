# 💈 Davinchi BarberShop — Manual de Identidad Visual & Guía de Estilo

> **Documento oficial de referencia de marca.**  
> Contiene la especificación exacta de las tipografías oficiales, la paleta cromática (*Aged Gold & Blackberry*), las variantes del logotipo vectorial y los tokens de diseño aplicables a la web, papelería, redes sociales y nuevos desarrollos de software.

---

## 1. Concepto e Identidad de Marca

- **Eslogan / Posicionamiento:** *"Estilo clásico con un toque contemporáneo"*.
- **Personalidad:** Sofisticada, masculina, artesanal, de alta precisión y bilingüe.
- **Atmósfera cromática:** Fondos oscuros profundos (*Blackberry & Charcoal*) combinados con acentos en oro envejecido (*Aged Gold*) y blancos marfil/crema. Se evita deliberadamente el oro amarillo chillón o saturado en favor de un tono bronce-dorado cálido y sobrio.

---

## 2. Tipografías Oficiales (Google Fonts)

Todas las fuentes son de uso libre, gratuitas y de alta calidad tipográfica disponibles en **Google Fonts**.

| Familia Tipográfica | Pesos Utilizados | Rol de Marca | Enlace Oficial |
| :--- | :--- | :--- | :--- |
| **Bebas Neue** | Regular (400) | **Logotipo principal**, números de impacto, estadísticas y titulares principales (H1 / H2). | [Google Fonts — Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) |
| **Cormorant Garamond** | Regular (400), Bold (700), Italic (400i) | **Titulares editoriales**, subtítulos poéticos y palabras con énfasis cursivo (*The Art of Style*). | [Google Fonts — Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) |
| **Inter** | Light (300), Regular (400), Medium (500), SemiBold (600) | **Cuerpo de texto**, párrafos, subtítulo del logo (`BARBER SHOP`), botones, precios y formularios. | [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) |

### Enlace de Importación Web (HTML):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

### Reglas CSS de Fuentes:
```css
--font-headline: 'Bebas Neue', 'Impact', sans-serif;
--font-display:  'Cormorant Garamond', Georgia, serif;
--font-sans:     'Inter', system-ui, -apple-system, sans-serif;
```

---

## 3. Paleta Cromática Oficial

### A. Acentos Dorados (*Aged Gold*)
Tonos dorados envejecidos con balance cálido para logotipos, botones de acción, bordes destacados y detalles prémium.

| Muestra | Nombre | HEX | RGB | HSL | Uso Principal |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 🟨 | **Aged Gold (Principal)** | `#B08D57` | `rgb(176, 141, 87)` | `hsl(36°, 34%, 52%)` | Letra **D** del logo, botones CTA, subtítulo `BARBER SHOP`, bordes destacados. |
| 🟨 | **Gold Light** | `#B8860B` | `rgb(184, 134, 11)` | `hsl(43°, 89%, 38%)` | Estados *hover*, degradados y acentos interactivos. |
| 🟨 | **Gold Pale (Brillo)** | `#D4AF37` | `rgb(212, 175, 55)` | `hsl(46°, 65%, 52%)` | Destellos, inicio de degradados metálicos y estrellas de valoración. |
| 🟨 | **Gold Muted (12%)** | `rgba(176, 141, 87, 0.12)` | — | — | Fondos translúcidos de etiquetas, badges y tarjetas de servicios. |
| 🟨 | **Degradado Oro Oficial** | `linear-gradient(135deg, #E2C172 0%, #B08D57 50%, #8C6E26 100%)` | — | — | Botón principal "BOOK NOW", isotipos y tarjetas de regalo. |

---

### B. Fondos y Superficies (*Blackberry Charcoal*)
Gama profunda de carbón oscuro con sutil matiz mora/blackberry que aporta elegancia y alto contraste con el dorado y blanco.

| Muestra | Nombre | HEX | RGB | HSL | Uso Principal |
| :---: | :--- | :--- | :--- | :--- | :--- |
| ⬛ | **Charcoal Pure** | `#141315` | `rgb(20, 19, 21)` | `hsl(270°, 5%, 8%)` | Fondo de la sección de servicios y fondo base del logotipo oscuro. |
| ⬛ | **Dark Base** | `#222024` | `rgb(34, 32, 36)` | `hsl(270°, 6%, 13%)` | Fondo alternado de secciones y pie de página. |
| ⬛ | **Blackberry Black** | `#2C2C2C` | `rgb(44, 44, 44)` | `hsl(0°, 0%, 17%)` | Fondo general del sitio (`body`), navbar con efecto vidrio (`blur`). |
| ⬛ | **Surface Card** | `#2C2A2E` | `rgb(44, 42, 46)` | `hsl(270°, 5%, 17%)` | Fondo de tarjetas de producto, cuadros de servicio y popups. |
| ⬛ | **Surface Elevated** | `#353238` | `rgb(53, 50, 56)` | `hsl(270°, 6%, 21%)` | Estados *hover* de tarjetas, inputs de formulario y dropdowns. |

---

### C. Textos, Marfil y Delimitadores
Tonos de texto cuidadosamente balanceados para garantizar lectura sin fatiga visual sobre fondos oscuros.

| Muestra | Nombre | HEX | RGB | HSL | Uso Principal |
| :---: | :--- | :--- | :--- | :--- | :--- |
| ⬜ | **Cream Primary** | `#F0ECE4` | `rgb(240, 236, 228)` | `hsl(38°, 27%, 92%)` | Titulares principales, texto `AVINCHI` en el logotipo, textos clave. |
| ⬜ | **Warm Cream** | `#F5F0E8` | `rgb(245, 240, 232)` | `hsl(37°, 37%, 94%)` | Resaltados de texto e información destacada. |
| 🔘 | **Text Secondary** | `#9E9589` | `rgb(158, 149, 137)` | `hsl(34°, 10%, 58%)` | Párrafos descriptivos, subtítulos, horas de atención. |
| 🔘 | **Text Muted** | `#6B6560` | `rgb(107, 101, 96)` | `hsl(30°, 5%, 40%)` | Textos legales, copyright, placeholders y leyendas secundarias. |
| ◽ | **Border Subtle** | `rgba(255, 255, 255, 0.08)` | — | — | Líneas divisorias de tarjetas, modales y bordes de interfaz. |
| 🟨 | **Border Gold** | `rgba(176, 141, 87, 0.35)` | — | — | Bordes activos, marcos de productos y enfoque de inputs. |

---

## 4. Logotipo Oficial y Reglas de Aplicación

El imagotipo oficial consta de tres componentes perfectamente alineados:
1. **Isotipo / Letra D:** En **Aged Gold** (`#B08D57` o degradado oro), con la misma altura y línea base que el texto blanco.
2. **Nombre de Marca (`AVINCHI`):** En **Bebas Neue**, color Cream (`#F0ECE4`), tracking estándar.
3. **Descriptor (`BARBER SHOP`):** En **Inter SemiBold 600**, mayúsculas, centrado debajo de `DAVINCHI` con tracking amplio (`0.3em`).

### Archivos Vectoriales y Renders en Alta Definición:
Todos los archivos se encuentran en la carpeta del proyecto `assets/images/`:

- **[davinchi-logo.svg](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo.svg):** Versión oficial con **fondo transparente** (vectorial puro, escalable sin pérdida de calidad).
- **[davinchi-logo-dark.svg](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo-dark.svg):** Versión con fondo oscuro de marca (`#141315`).
- **[davinchi-logo-gold.svg](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo-gold.svg):** Versión especial 100% en oro degradado.
- **[davinchi-logo-white.svg](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo-white.svg):** Versión monocromática en blanco puro (para sellos, uniformes o serigrafía a una tinta).
- **[davinchi-logo-4k.png](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo-4k.png):** Export PNG transparente a 3840 píxeles Ultra HD (300 DPI equivalente).
- **[davinchi-logo-dark-4k.png](file:///c:/Users/practicantesap/proyectosPython/DavinchiPag/assets/images/davinchi-logo-dark-4k.png):** Export PNG fondo oscuro a 3840 píxeles Ultra HD.

---

## 5. Tokens CSS Universales (Para Nuevos Proyectos y Módulos)

Copia este bloque de variables `:root` en el archivo CSS de cualquier nueva aplicación o módulo (por ejemplo en el sistema interno `davinchi-control`):

```css
:root {
  /* ─── Paleta de Color Oficial ─── */
  --color-gold: #b08d57;
  --color-gold-light: #b8860b;
  --color-gold-pale: #d4af37;
  --color-gold-muted: rgba(176, 141, 87, 0.12);
  --color-gold-gradient: linear-gradient(135deg, #e2c172 0%, #b08d57 50%, #8c6e26 100%);

  --color-black: #2c2c2c;
  --color-dark: #222024;
  --color-dark-alt: #28262a;
  --color-surface: #2c2a2e;
  --color-surface-alt: #353238;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-gold: rgba(176, 141, 87, 0.35);

  --color-cream: #f5f0e8;
  --color-text-primary: #f0ece4;
  --color-text-secondary: #9e9589;
  --color-text-muted: #6b6560;

  /* ─── Tipografía ─── */
  --font-headline: 'Bebas Neue', 'Impact', sans-serif;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* ─── Bordes y Formas ─── */
  /* Esquinas rectas y pulidas que transmiten elegancia clásica y precisión */
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  /* ─── Sombras ─── */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-gold: 0 0 25px rgba(176, 141, 87, 0.2);
}
```
