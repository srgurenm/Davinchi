import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image, ImageFont, ImageDraw

bebas = TTFont('BebasNeue.ttf')
b_set = bebas.getGlyphSet()
b_cmap = bebas.getBestCmap()

inter = TTFont('Inter-SemiBold.ttf')
i_set = inter.getGlyphSet()
i_cmap = inter.getBestCmap()

# Bebas settings
b_tracking = 40
x = 0
d_path = ''
avinchi_paths = []

for idx, ch in enumerate('DAVINCHI'):
    gname = b_cmap[ord(ch)]
    glyph = b_set[gname]
    pen = SVGPathPen(b_set)
    glyph.draw(pen)
    cmd = pen.getCommands()
    if idx == 0:
        d_path = f'<g transform="translate({x}, 0)"><path d="{cmd}" fill="url(#goldGrad)" /></g>'
    else:
        avinchi_paths.append(f'<g transform="translate({x}, 0)"><path d="{cmd}" fill="#F0ECE4" /></g>')
    x += glyph.width + b_tracking

total_dav_width = x - b_tracking

# Inter settings for BARBER SHOP
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
# Elegante proporción: BARBER SHOP ocupa ~82% del ancho de DAVINCHI
target_sub_width = total_dav_width * 0.82
sub_scale = target_sub_width / raw_inter_width
sub_x_offset = (total_dav_width - target_sub_width) / 2

sub_paths = []
for glyph_x, cmd in inter_items:
    sub_paths.append(f'<g transform="translate({glyph_x}, 0)"><path d="{cmd}" fill="#B08D57" /></g>')

# Dimensions
pad_x = 200
pad_top = 180
pad_bottom = 200
gap = 100

total_svg_w = int(total_dav_width + pad_x * 2)

# DAVINCHI letters: from dav_baseline_y UP to (dav_baseline_y - 700)
dav_baseline_y = pad_top + 700

# Subtitle letters: cap height in Inter is ~1490
# Top of subtitle at dav_baseline_y + gap
sub_cap_h = 1490 * sub_scale
sub_baseline_y = dav_baseline_y + gap + sub_cap_h
total_svg_h = int(sub_baseline_y + (494 * sub_scale) + pad_bottom)

print(f"SVG Dimensions: {total_svg_w}x{total_svg_h}, sub_scale: {sub_scale:.5f}")

def make_svg(bg_color=None, d_color='url(#goldGrad)', avinchi_color='#F0ECE4', sub_color='#B08D57'):
    bg_rect = f'  <rect width="100%" height="100%" fill="{bg_color}" rx="20"/>\n' if bg_color else ''
    
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
{bg_rect}  <!-- DAVINCHI (Letra D dorada a la misma altura del texto AVINCHI blanco) -->
  <g transform="translate({pad_x}, {dav_baseline_y}) scale(1, -1)">
    {d_elem}
    {' '.join(av_elems)}
  </g>

  <!-- BARBER SHOP (Subtítulo centrado en tracking ancho) -->
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

# 4. Todo blanco monocromático
with open('assets/images/davinchi-logo-white.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg(d_color='#FFFFFF', avinchi_color='#FFFFFF', sub_color='#FFFFFF'))

# ============================================================
# RENDERIZAR PNGs 4K ULTRA HD
# ============================================================
png_w = 3840
scale_png = png_w / total_svg_w
png_h = int(total_svg_h * scale_png)

# Bebas font size
bebas_size = int(700 * scale_png * 1.365)
bebas_font = ImageFont.truetype('BebasNeue.ttf', bebas_size)

# Inter font size
inter_size = int(sub_cap_h * scale_png * 1.34)
inter_font = ImageFont.truetype('Inter-SemiBold.ttf', inter_size)

def render_highres_png(filename, bg_rgba=(0,0,0,0)):
    im = Image.new('RGBA', (png_w, png_h), bg_rgba)
    draw = ImageDraw.Draw(im)

    top_y = int(pad_top * scale_png)
    left_x = int(pad_x * scale_png)

    # Medir D
    bbox_d = draw.textbbox((left_x, top_y), 'D', font=bebas_font)
    draw.text((left_x, top_y), 'D', font=bebas_font, fill=(176, 141, 87, 255))

    # AVINCHI al lado de D
    av_x = bbox_d[2] + int(b_tracking * scale_png)
    draw.text((av_x, top_y), 'AVINCHI', font=bebas_font, fill=(240, 236, 228, 255))

    bbox_full = draw.textbbox((left_x, top_y), 'DAVINCHI', font=bebas_font)
    actual_dav_bottom = bbox_full[3]

    # BARBER SHOP centrado
    sub_text = 'B  A  R  B  E  R     S  H  O  P'
    bbox_sub = draw.textbbox((0, 0), sub_text, font=inter_font)
    sub_w = bbox_sub[2] - bbox_sub[0]
    center_sub_x = (png_w - sub_w) // 2
    sub_top_y = actual_dav_bottom + int(gap * scale_png * 0.9)

    draw.text((center_sub_x, sub_top_y), sub_text, font=inter_font, fill=(176, 141, 87, 255))

    im.save(filename, 'PNG')
    print('Saved', filename)

render_highres_png('assets/images/davinchi-logo-4k.png')
render_highres_png('assets/images/davinchi-logo-dark-4k.png', bg_rgba=(20, 19, 21, 255))
