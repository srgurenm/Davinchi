import os
import urllib.request
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image, ImageFont, ImageDraw

# ────────────────────────────────────────────────────────────
# 1. FUENTES OFICIALES (Auto-descarga si no existen)
# ────────────────────────────────────────────────────────────
fonts_needed = {
    'Cinzel-Bold.ttf': 'https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYo.ttf',
    'Inter-SemiBold.ttf': 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf'
}

for fname, url in fonts_needed.items():
    if not os.path.exists(fname):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(fname, 'wb') as f:
            f.write(resp.read())

cinzel = TTFont('Cinzel-Bold.ttf')
c_set = cinzel.getGlyphSet()
c_cmap = cinzel.getBestCmap()

inter = TTFont('Inter-SemiBold.ttf')
i_set = inter.getGlyphSet()
i_cmap = inter.getBestCmap()

# ────────────────────────────────────────────────────────────
# 2. GENERACIÓN VECTORIAL SVG (Curvas matemáticas exactas)
# ────────────────────────────────────────────────────────────
c_tracking = 70
x = 0
d_path = ''
avinchi_paths = []

for idx, ch in enumerate('DAVINCHI'):
    gname = c_cmap[ord(ch)]
    glyph = c_set[gname]
    pen = SVGPathPen(c_set)
    glyph.draw(pen)
    cmd = pen.getCommands()
    if idx == 0:
        d_path = f'<g transform="translate({x}, 0)"><path d="{cmd}" fill="url(#goldGrad)" /></g>'
    else:
        avinchi_paths.append(f'<g transform="translate({x}, 0)"><path d="{cmd}" fill="#F0ECE4" /></g>')
    x += glyph.width + c_tracking

total_dav_width = x - c_tracking

# Subtítulo BARBER SHOP
i_tracking = 750
ix = 0
inter_items = []
for ch in 'BARBER SHOP':
    gname = i_cmap[ord(ch)]
    glyph = i_set[gname]
    pen = SVGPathPen(i_set)
    glyph.draw(pen)
    cmd = pen.getCommands()
    if ch != ' ':
        inter_items.append((ix, cmd))
    ix += glyph.width + i_tracking

raw_inter_width = ix - i_tracking

# Subtítulo ocupa ~72% del ancho de DAVINCHI
target_sub_width = total_dav_width * 0.72
sub_scale = target_sub_width / raw_inter_width
sub_x_offset = (total_dav_width - target_sub_width) / 2

sub_paths = []
for glyph_x, cmd in inter_items:
    sub_paths.append(f'<g transform="translate({glyph_x}, 0)"><path d="{cmd}" fill="#B08D57" /></g>')

# Márgenes simétricos y generosos (sin ningún recorte)
pad_x = 750
pad_top = 450
pad_bottom = 450
gap = 180

dav_baseline_y = pad_top + 720
dav_bottom = dav_baseline_y + 20
sub_baseline_y = dav_bottom + gap + int(1510 * sub_scale)
sub_bottom = sub_baseline_y + int(23 * sub_scale) + 1

total_svg_w = total_dav_width + pad_x * 2
total_svg_h = sub_bottom + pad_bottom

print(f"SVG Dimensions: {total_svg_w}x{total_svg_h} (Top margin: {pad_top}, Bottom margin: {pad_bottom})")

def make_svg(bg_color=None, d_color='url(#goldGrad)', avinchi_color='#F0ECE4', sub_color='#B08D57'):
    bg_rect = f'  <rect width="100%" height="100%" fill="{bg_color}" rx="32"/>\n' if bg_color else ''
    
    d_elem = d_path.replace('fill="url(#goldGrad)"', f'fill="{d_color}"')
    av_elems = [p.replace('fill="#F0ECE4"', f'fill="{avinchi_color}"') for p in avinchi_paths]
    sub_elems = [p.replace('fill="#B08D57"', f'fill="{sub_color}"') for p in sub_paths]

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_svg_w} {total_svg_h}" width="{total_svg_w}" height="{total_svg_h}">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2C172" />
      <stop offset="50%" stop-color="#B08D57" />
      <stop offset="100%" stop-color="#8C6E26" />
    </linearGradient>
  </defs>
{bg_rect}  <!-- DAVINCHI (Letra D dorada a la misma altura del texto AVINCHI en tipografía Cinzel) -->
  <g transform="translate({pad_x}, {dav_baseline_y}) scale(1, -1)">
    {d_elem}
    {' '.join(av_elems)}
  </g>

  <!-- BARBER SHOP (Subtítulo centrado con tracking amplio) -->
  <g transform="translate({pad_x + sub_x_offset:.2f}, {sub_baseline_y:.2f}) scale({sub_scale:.5f}, -{sub_scale:.5f})">
    {' '.join(sub_elems)}
  </g>
</svg>'''

os.makedirs('assets/images', exist_ok=True)

# 1. Transparente oficial
with open('assets/images/davinchi-logo.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg())

# 2. Con fondo oscuro Charcoal (#141315)
with open('assets/images/davinchi-logo-dark.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg(bg_color='#141315'))

# 3. Todo dorado (Gold Luxury Edition)
with open('assets/images/davinchi-logo-gold.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg(d_color='url(#goldGrad)', avinchi_color='url(#goldGrad)', sub_color='#E2C172'))

# 4. Todo dorado versión alias allgold
with open('assets/images/davinchi-logo-allgold.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg(d_color='url(#goldGrad)', avinchi_color='url(#goldGrad)', sub_color='#E2C172'))

# 5. Todo blanco monocromático
with open('assets/images/davinchi-logo-white.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg(d_color='#FFFFFF', avinchi_color='#FFFFFF', sub_color='#FFFFFF'))

print("SVGs generated successfully!")

# ────────────────────────────────────────────────────────────
# 3. RENDERIZAR PNGs DE ALTA RESOLUCIÓN CON CENTRADO DINÁMICO
# ────────────────────────────────────────────────────────────
def render_logo_png(filename, canvas_w=3840, canvas_h=1600, bg_rgba=(0, 0, 0, 0)):
    im = Image.new('RGBA', (canvas_w, canvas_h), bg_rgba)
    draw = ImageDraw.Draw(im)

    # Ancho objetivo de DAVINCHI: 75% del ancho del lienzo
    target_dav_w = canvas_w * 0.75
    sample_font = ImageFont.truetype('Cinzel-Bold.ttf', 200)
    sample_bbox = draw.textbbox((0, 0), 'DAVINCHI', font=sample_font)
    sample_w = sample_bbox[2] - sample_bbox[0]
    cinzel_size = int(200 * (target_dav_w / sample_w))
    cinzel_font = ImageFont.truetype('Cinzel-Bold.ttf', cinzel_size)

    bbox_d = draw.textbbox((0, 0), 'D', font=cinzel_font)
    d_w = bbox_d[2] - bbox_d[0]
    bbox_av = draw.textbbox((0, 0), 'AVINCHI', font=cinzel_font)
    av_w = bbox_av[2] - bbox_av[0]

    c_tracking_px = int(cinzel_size * 0.08)
    dav_total_w = d_w + c_tracking_px + av_w

    bbox_dav_full = draw.textbbox((0, 0), 'DAVINCHI', font=cinzel_font)
    dav_h = bbox_dav_full[3] - bbox_dav_full[1]

    # Subtítulo: BARBER SHOP ocupa 72% del ancho de DAVINCHI
    target_sub_w = dav_total_w * 0.72
    sub_text = 'B  A  R  B  E  R     S  H  O  P'
    sub_sample = ImageFont.truetype('Inter-SemiBold.ttf', 50)
    sub_sample_bbox = draw.textbbox((0, 0), sub_text, font=sub_sample)
    sub_sample_w = sub_sample_bbox[2] - sub_sample_bbox[0]
    inter_size = int(50 * (target_sub_w / sub_sample_w))
    inter_font = ImageFont.truetype('Inter-SemiBold.ttf', inter_size)

    bbox_sub = draw.textbbox((0, 0), sub_text, font=inter_font)
    sub_w = bbox_sub[2] - bbox_sub[0]
    sub_h = bbox_sub[3] - bbox_sub[1]

    gap_px = int(cinzel_size * 0.28)
    total_block_h = dav_h + gap_px + sub_h

    # Centrado absoluto vertical y horizontal
    start_y = (canvas_h - total_block_h) // 2
    dav_y = start_y
    sub_y = start_y + dav_h + gap_px

    dav_x = (canvas_w - dav_total_w) // 2
    sub_x = (canvas_w - sub_w) // 2

    # Letra D dorada
    d_offset_y = dav_y - bbox_d[1]
    draw.text((dav_x - bbox_d[0], d_offset_y), 'D', font=cinzel_font, fill=(176, 141, 87, 255))

    # AVINCHI marfil
    av_x = dav_x + d_w + c_tracking_px
    draw.text((av_x - bbox_av[0], d_offset_y), 'AVINCHI', font=cinzel_font, fill=(240, 236, 228, 255))

    # BARBER SHOP dorado
    sub_offset_y = sub_y - bbox_sub[1]
    draw.text((sub_x - bbox_sub[0], sub_offset_y), sub_text, font=inter_font, fill=(176, 141, 87, 255))

    im.save(filename, 'PNG')
    print(f'Saved {filename} ({canvas_w}x{canvas_h})')

# 4K Ultra HD (3840 x 1600)
render_logo_png('assets/images/davinchi-logo-4k.png', canvas_w=3840, canvas_h=1600)
render_logo_png('assets/images/davinchi-logo-dark-4k.png', canvas_w=3840, canvas_h=1600, bg_rgba=(20, 19, 21, 255))

# Estándar Web (1200 x 500)
render_logo_png('assets/images/davinchi-logo.png', canvas_w=1200, canvas_h=500)
render_logo_png('assets/images/davinchi-logo-dark.png', canvas_w=1200, canvas_h=500, bg_rgba=(20, 19, 21, 255))

# ────────────────────────────────────────────────────────────
# 4. FAVICON VECTORIAL OFICIAL (Letra D en Cinzel)
# ────────────────────────────────────────────────────────────
d_glyph = c_set[c_cmap[ord('D')]]
d_pen = SVGPathPen(c_set)
d_glyph.draw(d_pen)
d_cmd = d_pen.getCommands()

fav_scale = 40 / 700
fav_x_off = (64 - (d_glyph.width * fav_scale)) / 2
fav_y_off = 52

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#141315"/>
  <g transform="translate({fav_x_off:.2f}, {fav_y_off:.2f}) scale({fav_scale:.5f}, -{fav_scale:.5f})">
    <path d="{d_cmd}" fill="#B08D57" />
  </g>
</svg>'''

with open('assets/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)
print('Saved assets/favicon.svg (Cinzel D vector)')
