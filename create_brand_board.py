import os
import urllib.request
from PIL import Image, ImageFont, ImageDraw

# Download TTF fonts if not present
fonts_needed = {
    'BebasNeue.ttf': 'https://fonts.gstatic.com/s/bebasneue/v16/JTUSjIg69CK48gW7PXooxW4.ttf',
    'Inter.ttf': 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf'
}

for fname, url in fonts_needed.items():
    if not os.path.exists(fname):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(fname, 'wb') as f:
            f.write(resp.read())

W = 2400
H = 1700
im = Image.new('RGB', (W, H), (20, 19, 21)) # #141315
draw = ImageDraw.Draw(im)

# Colors
C_GOLD = (176, 141, 87)       # #B08D57
C_PALE_GOLD = (212, 175, 55)  # #D4AF37
C_CREAM = (240, 236, 228)     # #F0ECE4
C_TEXT_SEC = (158, 149, 137)  # #9E9589
C_BORDER = (45, 42, 48)

# Fonts
f_brand_title = ImageFont.truetype('BebasNeue.ttf', 110)
f_brand_sub = ImageFont.truetype('Inter.ttf', 24)
f_sec_title = ImageFont.truetype('BebasNeue.ttf', 56)
f_label_bold = ImageFont.truetype('Inter.ttf', 26)
f_label_code = ImageFont.truetype('Inter.ttf', 22)
f_body = ImageFont.truetype('Inter.ttf', 24)

# Top Gold Line
draw.rectangle([(0, 0), (W, 8)], fill=C_GOLD)

# Header Section
# Logo on Left
draw.text((120, 70), 'D', font=f_brand_title, fill=C_GOLD)
bbox_d = draw.textbbox((120, 70), 'D', font=f_brand_title)
draw.text((bbox_d[2] + 12, 70), 'AVINCHI', font=f_brand_title, fill=C_CREAM)
draw.text((124, 185), 'B A R B E R   S H O P', font=f_brand_sub, fill=C_GOLD)

# Right Header Tag
badge_text = 'MANUAL OFICIAL DE IDENTIDAD & GUÍA DE MARCA'
bbox_b = draw.textbbox((0, 0), badge_text, font=f_label_code)
bw = bbox_b[2] - bbox_b[0]
draw.rectangle([(W - 120 - bw - 40, 95), (W - 120, 155)], outline=C_GOLD, width=1)
draw.text((W - 120 - bw - 20, 115), badge_text, font=f_label_code, fill=C_PALE_GOLD)

# Separator
draw.line([(120, 250), (W - 120, 250)], fill=C_BORDER, width=2)

# ============================================================
# SECCIÓN 1: PALETA DE COLORES OFICIAL
# ============================================================
draw.text((120, 290), '1. PALETA CROMÁTICA OFICIAL (AGED GOLD & BLACKBERRY)', font=f_sec_title, fill=C_CREAM)
draw.text((120, 360), 'Tonos seleccionados para transmitir elegancia clásica, calidez y alto contraste sobre fondos oscuros.', font=f_body, fill=C_TEXT_SEC)

swatches = [
    ('AGED GOLD', '#B08D57', (176, 141, 87), 'Color Primario • Letra D & Botones'),
    ('PALE GOLD', '#D4AF37', (212, 175, 55), 'Brillos • Acentos Metálicos'),
    ('CREAM IVORY', '#F0ECE4', (240, 236, 228), 'Texto Principal & AVINCHI'),
    ('CHARCOAL PURE', '#141315', (20, 19, 21), 'Fondo Oficial de Servicios'),
    ('DARK BASE', '#222024', (34, 32, 36), 'Fondo Base Alternativo'),
    ('SURFACE CARD', '#2C2A2E', (44, 42, 46), 'Tarjetas & Contenedores'),
    ('TEXT MUTED', '#9E9589', (158, 149, 137), 'Párrafos & Descripciones')
]

sw_w = 280
sw_h = 160
start_x = 120
start_y = 420
gap_x = 33

for idx, (name, hex_code, rgb, role) in enumerate(swatches):
    sx = start_x + idx * (sw_w + gap_x)
    sy = start_y

    # Swatch box
    draw.rectangle([(sx, sy), (sx + sw_w, sy + sw_h)], fill=rgb, outline=(60, 56, 64), width=1)
    
    # Card below
    draw.rectangle([(sx, sy + sw_h), (sx + sw_w, sy + sw_h + 150)], fill=(34, 32, 36), outline=(45, 42, 48), width=1)
    
    # Texts
    draw.text((sx + 16, sy + sw_h + 18), name, font=f_label_bold, fill=C_CREAM)
    draw.text((sx + 16, sy + sw_h + 56), hex_code, font=f_label_code, fill=C_GOLD)
    
    # Multi-line role
    draw.text((sx + 16, sy + sw_h + 92), role, font=ImageFont.truetype('Inter.ttf', 16), fill=C_TEXT_SEC)

# Separator 2
draw.line([(120, 800), (W - 120, 800)], fill=C_BORDER, width=2)

# ============================================================
# SECCIÓN 2: TIPOGRAFÍAS OFICIALES
# ============================================================
draw.text((120, 840), '2. TIPOGRAFÍAS DE MARCA (GOOGLE FONTS)', font=f_sec_title, fill=C_CREAM)
draw.text((120, 910), 'Tres familias armónicas que equilibran fuerza publicitaria, elegancia editorial y legibilidad moderna.', font=f_body, fill=C_TEXT_SEC)

# Box 1: Bebas Neue
bx1 = 120
by1 = 970
bw_box = 1050
bh_box = 280
draw.rectangle([(bx1, by1), (bx1 + bw_box, by1 + bh_box)], fill=(34, 32, 36), outline=(45, 42, 48), width=1)
draw.text((bx1 + 30, by1 + 25), 'BEBAS NEUE — TITULARES & LOGOTIPO', font=f_label_bold, fill=C_GOLD)
draw.text((bx1 + 30, by1 + 65), 'Google Fonts • 400 Regular • Mayúsculas', font=ImageFont.truetype('Inter.ttf', 18), fill=C_TEXT_SEC)
f_bebas_sample = ImageFont.truetype('BebasNeue.ttf', 72)
draw.text((bx1 + 30, by1 + 115), 'THE ART OF STYLE • DAVINCHI', font=f_bebas_sample, fill=C_CREAM)
draw.text((bx1 + 30, by1 + 215), 'Uso: Logotipo, encabezados H1/H2, números de estadísticas de impacto y precios.', font=ImageFont.truetype('Inter.ttf', 18), fill=C_TEXT_SEC)

# Box 2: Inter
bx2 = 1230
by2 = 970
draw.rectangle([(bx2, by2), (bx2 + bw_box, by2 + bh_box)], fill=(34, 32, 36), outline=(45, 42, 48), width=1)
draw.text((bx2 + 30, by2 + 25), 'INTER — LECTURA, INTERFAZ & SUBTÍTULO', font=f_label_bold, fill=C_GOLD)
draw.text((bx2 + 30, by2 + 65), 'Google Fonts • 300 / 400 / 500 / 600 • Sans-serif', font=ImageFont.truetype('Inter.ttf', 18), fill=C_TEXT_SEC)
f_inter_sample = ImageFont.truetype('Inter.ttf', 26)
draw.text((bx2 + 30, by2 + 115), 'Cortes clásicos y contemporáneos con precisión élite.', font=f_inter_sample, fill=C_CREAM)
draw.text((bx2 + 30, by2 + 160), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ  abcdefghijklmnopqrstuvwxyz  1234567890', font=ImageFont.truetype('Inter.ttf', 20), fill=C_PALE_GOLD)
draw.text((bx2 + 30, by2 + 215), 'Uso: Subtítulo BARBER SHOP (tracking amplio), párrafos de lectura, botones y web.', font=ImageFont.truetype('Inter.ttf', 18), fill=C_TEXT_SEC)

# ============================================================
# SECCIÓN 3: LOGO EN ALTA DEFINICIÓN
# ============================================================
draw.line([(120, 1310), (W - 120, 1310)], fill=C_BORDER, width=2)
draw.text((120, 1350), '3. ESTRUCTURA OFICIAL DEL LOGOTIPO (D Y AVINCHI A LA MISMA ALTURA)', font=f_sec_title, fill=C_CREAM)

# Draw Logo Box
logo_box_w = 900
logo_box_h = 230
lx = 120
ly = 1420
draw.rectangle([(lx, ly), (lx + logo_box_w, ly + logo_box_h)], fill=(20, 19, 21), outline=C_GOLD, width=1)

f_logo_d = ImageFont.truetype('BebasNeue.ttf', 130)
draw.text((lx + 100, ly + 25), 'D', font=f_logo_d, fill=C_GOLD)
bbox_ld = draw.textbbox((lx + 100, ly + 25), 'D', font=f_logo_d)
draw.text((bbox_ld[2] + 16, ly + 25), 'AVINCHI', font=f_logo_d, fill=C_CREAM)
draw.text((lx + 105, ly + 160), 'B  A  R  B  E  R     S  H  O  P', font=ImageFont.truetype('Inter.ttf', 28), fill=C_GOLD)

# Specs note next to logo
nx = lx + logo_box_w + 60
draw.text((nx, ly + 30), 'ESPECIFICACIONES DE USO:', font=f_label_bold, fill=C_PALE_GOLD)
draw.text((nx, ly + 75), '• La letra D dorada y el texto AVINCHI comparten exactamente la misma línea base y escala.', font=f_body, fill=C_TEXT_SEC)
draw.text((nx, ly + 115), '• El subtítulo BARBER SHOP se centra debajo con espaciado amplio entre caracteres (tracking 0.3em).', font=f_body, fill=C_TEXT_SEC)
draw.text((nx, ly + 155), '• Archivos vectoriales listos en el proyecto: assets/images/davinchi-logo.svg (transparente) y versiones 4K.', font=f_body, fill=C_CREAM)

# Save
out_path = 'assets/images/brand-style-guide.png'
im.save(out_path, 'PNG')
print('Brand style guide image saved to:', out_path)

# Clean up TTFs
for fname in fonts_needed.keys():
    if os.path.exists(fname):
        os.remove(fname)
