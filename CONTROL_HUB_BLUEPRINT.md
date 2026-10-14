# 💈 Davinchi Control Hub — Documento de Arquitectura y Especificación

> **Documento maestro para la inicialización y desarrollo del sistema de gestión interna de Davinchi BarberShop.**  
> Diseñado para operar con **costo $0 USD/mes**, arquitectura basada en **Python (FastAPI)**, el **mismo estilo visual premium (Dark & Aged Gold)** y con el **catálogo oficial de 23 productos STMNT y servicios de la barbería precargados**.

---

## 1. Resumen Ejecutivo y Alcance

- **Propósito:** Centro de control administrativo y operativo privado (con autenticación) para el personal de la barbería.
- **Volumen de transacciones:** 1 a 5 ventas de productos y 5 a 10 servicios de corte/barba por día (~300 a 450 registros al mes).
- **Módulos Principales:**
  1. **Autenticación y Roles:** Acceso restringido para `Administrador` (control total) y `Barbero` (registro rápido de servicios propios).
  2. **Inventario & Stock:** Catálogo de productos, control de existencias, alerta de stock mínimo y registro de entradas/salidas/mermas.
  3. **Punto de Servicios (Cortes):** Registro en un toque de cortes realizados, barbero que atendió, método de pago y comisión calculada.
  4. **Punto de Ventas (Productos):** Carrito rápido para venta de productos al cliente final con descuento automático de stock.
  5. **Control de Caja (Arqueo Diario):** Apertura con base inicial, balance en vivo (Efectivo vs. Transferencias) y cierre de jornada con cálculo de diferencias.
  6. **Auditoría & Exportación a Excel:** Reportes con filtros de fecha y generación directa de archivos `.xlsx` listos para contabilidad.

---

## 2. Stack Tecnológico (100% Gratuito)

| Capa | Tecnología | Justificación y Nivel Gratuito |
| :--- | :--- | :--- |
| **Backend** | **Python 3.11+ con FastAPI** | Ultrarrápido, asíncrono, tipado estático con Pydantic y documentación interactiva automática en `/docs` (Swagger UI). |
| **Servidor ASGI** | **Uvicorn** | Servidor ligero para ejecutar FastAPI en entornos locales y producción. |
| **ORM & Modelos** | **SQLAlchemy 2.0 / SQLModel** | Mapeo objeto-relacional robusto y seguro frente a inyecciones SQL. |
| **Base de Datos** | **SQLite (Desarrollo & Producción simple)** o **PostgreSQL en Neon.tech** | Para el volumen de la barbería, SQLite es un archivo único que no consume RAM ni cuesta nada. Si se desea en la nube, **Neon.tech** ofrece PostgreSQL serverless gratuito (0.5 GB de almacenamiento). |
| **Autenticación** | **JWT (JSON Web Tokens) + Bcrypt** | Tokens de sesión seguros almacenados en `HttpOnly Cookies` o `localStorage`, con contraseñas encriptadas mediante `passlib[bcrypt]`. |
| **Frontend** | **HTML5 + Vanilla CSS + JavaScript Moderno (Fetch API)** | Sin frameworks pesados (cero dependencias de Node.js). Se renderiza con plantillas Jinja2 o se sirve como una SPA estática servida por el propio FastAPI. |
| **Exportación Excel** | **openpyxl (Python) / SheetJS (JS)** | Generación nativa de archivos `.xlsx` reales con cabeceras y formato financiero sin librerías de pago. |
| **Hosting / Despliegue** | **Render.com / Koyeb** | Nivel gratuito de servicios web con HTTPS automático y conexión directa a repositorio Git. |

---

## 3. Tokens del Sistema de Diseño (Heredados de Davinchi)

Para mantener la misma identidad de marca de la página principal, el nuevo proyecto utilizará las siguientes variables CSS globales:

```css
:root {
  /* Paleta Base — Blackberry & Carbón */
  --color-black: #2c2c2c;
  --color-dark: #222024;
  --color-dark-alt: #28262a;
  --color-surface: #2c2a2e;
  --color-surface-alt: #353238;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-gold: rgba(176, 141, 87, 0.35);

  /* Acentos Dorados — Aged Gold (Oro Envejecido) */
  --color-gold: #b08d57;
  --color-gold-light: #b8860b;
  --color-gold-pale: #d4af37;
  --color-gold-muted: rgba(176, 141, 87, 0.12);

  /* Textos & Contrastes */
  --color-cream: #f5f0e8;
  --color-text-primary: #f0ece4;
  --color-text-secondary: #9e9589;
  --color-text-muted: #6b6560;

  /* Estados Funcionales */
  --color-success: #4e9a51;
  --color-warning: #d4973b;
  --color-danger: #c0392b;

  /* Tipografías (Google Fonts) */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-headline: 'Bebas Neue', 'Impact', sans-serif;

  /* Estética Geométrica (Bordes rectos y elegantes) */
  --radius-sharp: 0px;
  --radius-badge: 2px;
  
  /* Sombras Profundas */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.5);
  --shadow-gold: 0 0 15px rgba(176, 141, 87, 0.15);
}
```

---

## 4. Catálogo Oficial de Productos Existentes (STMNT Grooming Goods)

Estos son los **23 productos reales** extraídos de la tienda Davinchi con sus códigos, tamaños y precios sugeridos de venta (COP):

### 🛁 Línea Care (Cuidado)
| Código | Producto | Presentación | Precio Venta (COP) | Stock Mínimo Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| `care-1` | All-in-One Shampoo | 300 ml | $84.990 | 3 |
| `care-2` | Shampoo | 300 ml | $78.990 | 3 |
| `care-3` | Hydro Shampoo | 300 ml | $84.990 | 3 |
| `care-4` | Conditioner | 275 ml | $84.990 | 3 |
| `care-5` | Beard Oil (Aceite para Barba) | 50 ml | $102.990 | 2 |
| `care-6` | HairBody Soapbar (Jabón Barra) | 125 g | $57.990 | 4 |
| `care-7` | Serum | 150 ml | $94.990 | 2 |

### ✂️ Colección Julius Cvesar
| Código | Producto | Presentación | Precio Venta (COP) | Stock Mínimo Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| `jul-1` | HairSpray | 200 ml | $78.990 | 2 |
| `jul-2` | Matte Paste | 100 ml | $105.990 | 3 |
| `jul-3` | Shine Paste | 100 ml | $105.990 | 3 |
| `jul-4` | Curl Cream | 150 ml | $94.990 | 2 |

### 🧭 Colección Nomad Barber
| Código | Producto | Presentación | Precio Venta (COP) | Stock Mínimo Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| `nom-1` | Grooming Spray | 200 ml | $78.990 | 3 |
| `nom-2` | Classic Pomade | 100 ml | $105.990 | 3 |
| `nom-3` | Dry Clay | 100 ml | $105.990 | 3 |
| `nom-4` | Gel | 150 ml | $94.990 | 2 |

### 👑 Colección Staygold
| Código | Producto | Presentación | Precio Venta (COP) | Stock Mínimo Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| `sg-1` | Fiber Pomade | 100 ml | $105.990 | 3 |
| `sg-2` | Wax Powder | 15 g | $84.990 | 3 |
| `sg-3` | Powder Spray | 4 g | $84.990 | 3 |
| `sg-4` | Definition Spray | 200 ml | $78.990 | 2 |

### 🧴 Lavacabezas (Backwash / Uso Profesional & Salón)
| Código | Producto | Presentación | Precio Venta / Uso | Stock Mínimo Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| `bw-1` | All-in-One Shampoo (Salón) | 750 ml | Precio Profesional | 1 |
| `bw-2` | Shampoo (Salón) | 750 ml | Precio Profesional | 1 |
| `bw-3` | Hydro Shampoo (Salón) | 750 ml | Precio Profesional | 1 |
| `bw-4` | Conditioner (Salón) | 675 ml | Precio Profesional | 1 |

---

## 5. Catálogo Oficial de Servicios Existentes

Servicios ofrecidos en Davinchi BarberShop para el módulo de registro de cortes:

| Código | Servicio | Descripción | Precio Sugerido (COP) | Comisión Sugerida (%) |
| :--- | :--- | :--- | :--- | :--- |
| `srv-fade` | Fade Cut | Cortes degradados de alta precisión con acabado profesional pulido. | $40.000 | 50% |
| `srv-classic`| Classic Cut | Tijera y máquina en armonía. Estilo clásico reinventado. | $35.000 | 50% |
| `srv-beard` | Beard Trim | Perfilado y definición de barba con navaja caliente y toalla. | $25.000 | 50% |
| `srv-shave` | Razor Shave | Afeitado clásico con toalla caliente, crema artesanal y navaja. | $30.000 | 50% |
| `srv-combo` | Full Combo | Corte + Barba + Lavado + Tratamiento capilar completo. | $60.000 | 50% |
| `srv-kids` | Kids Cut | Corte para niños con paciencia, técnica y ambiente amigable. | $30.000 | 50% |

---

## 6. Script de Precarga Automática (`seed_data.py`)

Para que la base de datos se inicialice con todos estos productos y servicios desde el día 1, se incluirá este script en `app/core/seed_data.py`:

```python
# app/core/seed_data.py
INITIAL_PRODUCTS = [
    # Care
    {"codigo": "care-1", "nombre": "All-in-One Shampoo (300ml)", "categoria": "Care", "precio_compra": 55000, "precio_venta": 84990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "care-2", "nombre": "Shampoo (300ml)", "categoria": "Care", "precio_compra": 50000, "precio_venta": 78990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "care-3", "nombre": "Hydro Shampoo (300ml)", "categoria": "Care", "precio_compra": 55000, "precio_venta": 84990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "care-4", "nombre": "Conditioner (275ml)", "categoria": "Care", "precio_compra": 55000, "precio_venta": 84990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "care-5", "nombre": "Beard Oil (50ml)", "categoria": "Care", "precio_compra": 68000, "precio_venta": 102990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "care-6", "nombre": "HairBody Soapbar (125g)", "categoria": "Care", "precio_compra": 35000, "precio_venta": 57990, "stock_actual": 6, "stock_minimo": 3},
    {"codigo": "care-7", "nombre": "Serum (150ml)", "categoria": "Care", "precio_compra": 62000, "precio_venta": 94990, "stock_actual": 4, "stock_minimo": 2},
    # Julius Cvesar
    {"codigo": "jul-1", "nombre": "HairSpray (200ml)", "categoria": "Julius Cvesar", "precio_compra": 50000, "precio_venta": 78990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "jul-2", "nombre": "Matte Paste (100ml)", "categoria": "Julius Cvesar", "precio_compra": 70000, "precio_venta": 105990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "jul-3", "nombre": "Shine Paste (100ml)", "categoria": "Julius Cvesar", "precio_compra": 70000, "precio_venta": 105990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "jul-4", "nombre": "Curl Cream (150ml)", "categoria": "Julius Cvesar", "precio_compra": 62000, "precio_venta": 94990, "stock_actual": 3, "stock_minimo": 2},
    # Nomad Barber
    {"codigo": "nom-1", "nombre": "Grooming Spray (200ml)", "categoria": "Nomad Barber", "precio_compra": 50000, "precio_venta": 78990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "nom-2", "nombre": "Classic Pomade (100ml)", "categoria": "Nomad Barber", "precio_compra": 70000, "precio_venta": 105990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "nom-3", "nombre": "Dry Clay (100ml)", "categoria": "Nomad Barber", "precio_compra": 70000, "precio_venta": 105990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "nom-4", "nombre": "Gel (150ml)", "categoria": "Nomad Barber", "precio_compra": 62000, "precio_venta": 94990, "stock_actual": 4, "stock_minimo": 2},
    # Staygold
    {"codigo": "sg-1", "nombre": "Fiber Pomade (100ml)", "categoria": "Staygold", "precio_compra": 70000, "precio_venta": 105990, "stock_actual": 5, "stock_minimo": 2},
    {"codigo": "sg-2", "nombre": "Wax Powder (15g)", "categoria": "Staygold", "precio_compra": 55000, "precio_venta": 84990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "sg-3", "nombre": "Powder Spray (4g)", "categoria": "Staygold", "precio_compra": 55000, "precio_venta": 84990, "stock_actual": 4, "stock_minimo": 2},
    {"codigo": "sg-4", "nombre": "Definition Spray (200ml)", "categoria": "Staygold", "precio_compra": 50000, "precio_venta": 78990, "stock_actual": 4, "stock_minimo": 2},
    # Lavacabezas
    {"codigo": "bw-1", "nombre": "All-in-One Shampoo Salón (750ml)", "categoria": "Lavacabezas", "precio_compra": 95000, "precio_venta": 140000, "stock_actual": 2, "stock_minimo": 1},
    {"codigo": "bw-2", "nombre": "Shampoo Salón (750ml)", "categoria": "Lavacabezas", "precio_compra": 90000, "precio_venta": 135000, "stock_actual": 2, "stock_minimo": 1},
    {"codigo": "bw-3", "nombre": "Hydro Shampoo Salón (750ml)", "categoria": "Lavacabezas", "precio_compra": 95000, "precio_venta": 140000, "stock_actual": 2, "stock_minimo": 1},
    {"codigo": "bw-4", "nombre": "Conditioner Salón (675ml)", "categoria": "Lavacabezas", "precio_compra": 95000, "precio_venta": 140000, "stock_actual": 2, "stock_minimo": 1},
]

INITIAL_SERVICES = [
    {"codigo": "srv-fade", "nombre": "Fade Cut", "precio_base": 40000, "comision_porcentaje": 50.0},
    {"codigo": "srv-classic", "nombre": "Classic Cut", "precio_base": 35000, "comision_porcentaje": 50.0},
    {"codigo": "srv-beard", "nombre": "Beard Trim", "precio_base": 25000, "comision_porcentaje": 50.0},
    {"codigo": "srv-shave", "nombre": "Razor Shave", "precio_base": 30000, "comision_porcentaje": 50.0},
    {"codigo": "srv-combo", "nombre": "Full Combo", "precio_base": 60000, "comision_porcentaje": 50.0},
    {"codigo": "srv-kids", "nombre": "Kids Cut", "precio_base": 30000, "comision_porcentaje": 50.0},
]
```

---

## 7. Estructura de Carpetas Recomendada para el Nuevo Proyecto

```text
davinchi-control/
│
├── .gitignore
├── README.md
├── requirements.txt
├── config.py                 # Variables de entorno y ajustes
├── main.py                   # Punto de entrada de FastAPI
│
├── app/
│   ├── core/
│   │   ├── database.py       # Conexión SQLAlchemy y SessionLocal
│   │   ├── security.py       # Hashing de passwords y generación de JWT
│   │   └── seed_data.py      # Catálogo de productos y servicios precargados
│   │
│   ├── models/               # Tablas de Base de Datos
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── service.py
│   │   ├── sale.py
│   │   └── cash.py
│   │
│   ├── schemas/              # Modelos de validación Pydantic (Request / Response)
│   │   ├── user_schema.py
│   │   ├── product_schema.py
│   │   ├── service_schema.py
│   │   └── report_schema.py
│   │
│   ├── routers/              # Controladores / Rutas de la API
│   │   ├── auth.py           # Login, logout, perfil
│   │   ├── products.py       # CRUD inventario y ajuste de stock
│   │   ├── services.py       # Servicios y registro de cortes
│   │   ├── sales.py          # Ventas de productos
│   │   ├── cash.py           # Arqueos de caja diaria
│   │   └── reports.py        # Auditoría y exportación a Excel
│   │
│   └── services/             # Lógica de negocio (Excel exporter, métricas)
│       └── excel_export.py
│
├── static/                   # Recursos del frontend
│   ├── css/
│   │   ├── tokens.css        # Variables de diseño Davinchi
│   │   ├── base.css          # Estructura general, botones, inputs
│   │   └── dashboard.css     # Estilos de tarjetas, tablas y modales
│   ├── js/
│   │   ├── api.js            # Cliente HTTP fetch unificado
│   │   ├── auth.js           # Manejo de sesión y logout
│   │   ├── inventory.js      # Operaciones de inventario
│   │   ├── pos.js            # Punto de venta y registro de cortes
│   │   └── reports.js        # Tablas y botón exportar Excel
│   └── assets/
│       └── logo.png
│
└── templates/                # Vistas HTML (servidas por FastAPI con Jinja2 o HTML plano)
    ├── login.html            # Pantalla de acceso
    ├── index.html            # Dashboard principal
    ├── inventario.html       # Gestión de artículos y stock
    ├── servicios.html        # Registro de cortes del día
    ├── caja.html             # Control de caja y arqueo
    └── auditoria.html        # Historial de ingresos y descarga Excel
```

---

## 8. Modelos de Base de Datos (SQLAlchemy)

### 1. Usuarios (`users`)
- `id` (Integer, PK)
- `nombre` (String)
- `email` (String, Unique)
- `password_hash` (String)
- `rol` (String: `'admin'`, `'barbero'`)
- `activo` (Boolean, default True)

### 2. Productos & Inventario (`products` & `stock_movements`)
- `products`:
  - `id` (Integer, PK)
  - `codigo` (String, Unique, Index)
  - `nombre` (String)
  - `categoria` (String)
  - `precio_compra` (Float) — Para cálculo de rentabilidad
  - `precio_venta` (Float)
  - `stock_actual` (Integer)
  - `stock_minimo` (Integer) — Alerta si `stock_actual <= stock_minimo`
- `stock_movements`:
  - `id` (Integer, PK)
  - `product_id` (FK a products.id)
  - `tipo` (String: `'ENTRADA'`, `'SALIDA'`, `'AJUSTE'`)
  - `cantidad` (Integer)
  - `motivo` (String: compra, daño, corrección)
  - `fecha` (DateTime)
  - `usuario_id` (FK a users.id)

### 3. Servicios & Registros de Cortes (`services` & `service_records`)
- `services`:
  - `id` (Integer, PK)
  - `codigo` (String, Unique)
  - `nombre` (String: "Fade Cut", "Classic Cut", etc.)
  - `precio_base` (Float)
  - `comision_porcentaje` (Float)
- `service_records`:
  - `id` (Integer, PK)
  - `fecha` (DateTime)
  - `barbero_id` (FK a users.id)
  - `servicio_id` (FK a services.id)
  - `precio_cobrado` (Float)
  - `ganancia_barberia` (Float)
  - `comision_barbero` (Float)
  - `metodo_pago` (String: `'Efectivo'`, `'Transferencia/Nequi'`, `'Tarjeta'`)
  - `caja_id` (FK opcional a cash_register.id)

### 4. Ventas de Artículos (`sales` & `sale_items`)
- `sales`:
  - `id` (Integer, PK)
  - `fecha` (DateTime)
  - `vendedor_id` (FK a users.id)
  - `total` (Float)
  - `metodo_pago` (String)
  - `caja_id` (FK a cash_register.id)
- `sale_items`:
  - `id` (Integer, PK)
  - `sale_id` (FK a sales.id)
  - `product_id` (FK a products.id)
  - `cantidad` (Integer)
  - `precio_unitario` (Float)

### 5. Control de Caja (`cash_register`)
- `id` (Integer, PK)
- `fecha_apertura` (DateTime)
- `fecha_cierre` (DateTime, Nullable)
- `base_inicial` (Float)
- `total_efectivo_servicios` (Float)
- `total_efectivo_ventas` (Float)
- `total_transferencias` (Float)
- `total_esperado` (Float)
- `total_real` (Float, Nullable)
- `diferencia` (Float, Nullable)
- `estado` (String: `'ABIERTA'`, `'CERRADA'`)
- `usuario_id` (FK a users.id)

---

## 9. Endpoints de la API REST

### Autenticación
- `POST /api/auth/login` → Devuelve token JWT de acceso.
- `GET /api/auth/me` → Información del usuario activo y su rol.

### Inventario
- `GET /api/products` → Lista de artículos con indicador de alerta de stock.
- `POST /api/products` → Crear nuevo artículo.
- `PUT /api/products/{id}` → Editar precios o datos del producto.
- `POST /api/products/{id}/adjust-stock` → Sumar/restar unidades con registro en auditoría.

### Servicios & Cortes
- `GET /api/services` → Lista de servicios disponibles.
- `POST /api/services/record` → Registrar servicio completado por un barbero.
- `GET /api/services/records?fecha_inicio=...&fecha_fin=...` → Historial de servicios.

### Ventas
- `POST /api/sales` → Registrar venta con descuento automático de inventario.

### Caja
- `POST /api/cash/open` → Abrir turno de caja con base inicial.
- `GET /api/cash/current` → Resumen en tiempo real del dinero en caja.
- `POST /api/cash/close` → Cierre de turno, cálculo de faltante/sobrante.

### Auditoría & Exportación
- `GET /api/reports/dashboard` → Métricas diarias y mensuales (Total ingresos, cortes, ventas, utilidad).
- `GET /api/reports/export-excel?fecha_inicio=...&fecha_fin=...` → Descarga archivo `.xlsx` con hojas separadas:
  - Hoja 1: Resumen General de Ingresos y Ganancias
  - Hoja 2: Detalle de Servicios por Barbero
  - Hoja 3: Ventas de Productos
  - Hoja 4: Movimientos de Inventario

---

## 10. Dependencias Python (`requirements.txt`)

```text
fastapi>=0.110.0
uvicorn[standard]>=0.28.0
sqlalchemy>=2.0.28
pydantic>=2.6.4
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.9
openpyxl>=3.1.2
pandas>=2.2.1
jinja2>=3.1.3
python-dotenv>=1.0.1
```

---

## 11. Guía de Puesta en Marcha (Paso a Paso en la Nueva Carpeta)

### Paso 1: Crear la carpeta del proyecto
```powershell
# En la terminal (ejemplo en c:\Users\practicantesap\proyectosPython\):
mkdir davinchi-control
cd davinchi-control
```

### Paso 2: Crear y activar el entorno virtual
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Paso 3: Instalar las dependencias
```powershell
pip install -r requirements.txt
```

### Paso 4: Ejecutar en modo desarrollo
```powershell
uvicorn main:app --reload --port 8000
```
- La aplicación estará disponible en `http://localhost:8000`.
- La documentación interactiva de la API estará en `http://localhost:8000/docs`.
- La base de datos SQLite se creará y precargará automáticamente con los 23 productos y 6 servicios en el primer arranque.
