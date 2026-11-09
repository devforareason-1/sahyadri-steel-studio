"""Builds the kitchen preview's layers from one photograph.
Each region becomes a shade map: the photograph's own light and shadow, normalised so
1.0 = fully lit, with alpha marking where the finish goes. The browser multiplies a
finish by it, so the room's real lighting falls on whatever material is chosen.

Regions are traced by hand in the photo's pixels, so a new photo needs new polygons.
Needs numpy, scipy and pillow. Run from the repo root, with a 2400px download of
https://unsplash.com/photos/T-RFl1hCGpo (Unsplash License):
  python scripts/kitchen-preview.py kitchen-source.jpg public/images/kitchen-preview
"""
import io, sys, urllib.request
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter

SRC, OUT = sys.argv[1], Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1600, 1061
photo = Image.open(SRC).convert("RGB").resize((W, H), Image.LANCZOS)
rgb = np.asarray(photo).astype(np.float32) / 255
lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
SS = 3  # supersampled masks, for clean edges


def mask(add, cut=(), lines=(), soft=0.7):
    im = Image.new("L", (W * SS, H * SS), 0)
    d = ImageDraw.Draw(im)
    for p in add:
        d.polygon([(x * SS, y * SS) for x, y in p], fill=255)
    for p in cut:
        d.polygon([(x * SS, y * SS) for x, y in p], fill=0)
    for pts, width in lines:
        d.line([(x * SS, y * SS) for x, y in pts], fill=0, width=int(width * SS), joint="curve")
    im = im.resize((W, H), Image.LANCZOS)
    return np.asarray(im.filter(ImageFilter.GaussianBlur(soft))).astype(np.float32) / 255


def rect(x0, y0, x1, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


def masked_blur(a, m, sigma):
    weight = gaussian_filter(m, sigma)
    return gaussian_filter(a * m, sigma) / np.maximum(weight, 1e-3)


def save(name, shade, alpha):
    a = np.dstack([np.clip(shade, 0, 1), alpha])
    Image.fromarray((a * 255).astype(np.uint8), "RGBA").save(OUT / f"{name}.webp", quality=86, alpha_quality=90, method=6)


# ── Fronts: the white doors, then the grey tall units, brought to the same scale ──
white = mask(
    [
        [(255, 28), (1141, 26), (1143, 431), (1100, 433), (257, 435)],
        [(0, 28), (255, 28), (255, 155), (0, 155)],
        [(154, 697), (1204, 695), (1206, 1019), (412, 1019), (412, 1021), (154, 1021)],
    ]
)
tall = mask(
    [
        [(1147, 28), (1166, 0), (W, 0), (W, 797), (1426, 736), (1426, 458), (1218, 478), (1218, 432), (1147, 434)],
        [(1216, 703), (1426, 792), (W, 853), (W, H), (1246, H), (1216, 1022)],
        [(1102, 437), (1218, 434), (1218, 680), (1190, 658), (1102, 628)],
    ]
)
white_lit = np.percentile(lum[white > 0.9], 80)
tall_lit = np.percentile(lum[tall > 0.9], 70)
white_shade = np.clip(lum / white_lit, 0, 1) ** 1.05
# A face turned from the window takes less light than one facing it.
tall_shade = np.clip(lum / tall_lit, 0, 1.12) * 0.74
fronts_shade = np.where(tall > white, tall_shade, white_shade)
fronts_alpha = np.maximum(white, tall)
save("fronts", np.dstack([fronts_shade] * 3), fronts_alpha)

# ── Backsplash: slate is too textured to keep, so only its broad light survives ──
sockets = [rect(686, 557, 738, 587), rect(793, 557, 845, 587)]
hob_above = [[(312, 636), (318, 622), (404, 616), (424, 622), (424, 634), (360, 640)]]
tap = [
    ([(999, 560), (999, 530), (1006, 506), (1022, 494), (1036, 502), (1045, 528), (1045, 562)], 11),
    ([(1000, 556), (1000, 592)], 14),
    ([(1000, 558), (1047, 559)], 11),
    ([(1042, 556), (1042, 634)], 15),
    ([(1056, 606), (1098, 606)], 7),
    ([(1094, 604), (1094, 632)], 15),
]
splash_add = [rect(328, 441, 508, 632), rect(600, 438, 1101, 632)]
splash = mask(splash_add, cut=sockets + hob_above, lines=tap)
whole = mask(splash_add, cut=sockets + hob_above, lines=tap, soft=2)
broad = np.dstack([masked_blur(rgb[..., i], whole, 30) for i in range(3)])
broad_lum = broad @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
top_light = np.percentile(broad_lum[whole > 0.9], 98)
level = np.clip(broad_lum / top_light, 0.02, 1) ** 0.55
tint = broad / np.maximum(broad_lum[..., None], 1e-3)
tint = 1 + (tint - 1) * 0.55
splash_shade = level[..., None] * tint
# The shadow the wall units throw on the wall just beneath them.
ramp = np.clip((np.arange(H) - 436) / 16, 0, 1)[:, None, None]
splash_shade = splash_shade * (0.62 + 0.38 * ramp)
save("splash", splash_shade / max(1, splash_shade.max()), splash)

# ── Worktop: the top surface and its front edge, left clear of hob and sink ──
hob = [(244, 662), (316, 632), (424, 622), (458, 632), (300, 663)]
sink = [(901, 629), (1132, 630), (1192, 660), (927, 661)]
surface_tap = [([(1042, 620), (1042, 636)], 18), ([(1094, 620), (1094, 636)], 14)]
top = mask([[(328, 629), (1108, 629), (1212, 666), (154, 668)]], cut=[hob, sink], lines=surface_tap)
edge = mask([[(153, 668), (1213, 666), (1213, 682), (153, 683)]])
top_soft = masked_blur(lum, mask([[(328, 629), (1108, 629), (1212, 666), (154, 668)]], cut=[hob, sink], lines=surface_tap, soft=2), 20)
edge_soft = masked_blur(lum, edge, 18)
top_level = np.clip(top_soft / np.percentile(top_soft[top > 0.9], 95), 0, 1) ** 0.5
edge_level = np.clip(edge_soft / np.percentile(edge_soft[edge > 0.9], 95), 0, 1) ** 0.5 * 0.86
save("top", np.dstack([top_level] * 3), top)
save("edge", np.dstack([edge_level] * 3), edge)

photo.save(OUT / "kitchen.jpg", quality=84, optimize=True, progressive=True)

# ── True-scale material tiles ──
def fetch(photo_id, adjust=""):
    url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=800&h=800&q=80{adjust}"
    return Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=60).read())).convert("RGB")


def seamless(im, sat=1.0, calm=0.0):
    """Repeats without seams or mirror patterns: the photo fades, towards its edges,
    into itself shifted by half, whose edges are the photo's continuous middle."""
    a = np.asarray(im).astype(np.float32) / 255
    h, w = a.shape[:2]
    shifted = np.roll(a, (h // 2, w // 2), (0, 1))
    wx = np.sin(np.pi * np.arange(w) / w) ** 2
    wy = np.sin(np.pi * np.arange(h) / h) ** 2
    window = np.minimum(wx[None, :], wy[:, None])
    window = np.clip(window * 2.4, 0, 1)[..., None]
    t = a * window + shifted * (1 - window)
    # A honed slab shows far less relief than a close-up of the raw stone.
    soft = np.dstack([gaussian_filter(t[..., i], 40, mode="wrap") for i in range(3)])
    t = soft + (t - soft) * (1 - calm)
    grey = t.mean(axis=2, keepdims=True)
    t = grey + (t - grey) * sat
    return Image.fromarray((np.clip(t, 0, 1) * 255).astype(np.uint8))


rng = np.random.default_rng(7)


def unit(a):
    return (a - a.mean()) / a.std()


def grain(colour, contrast):
    """Straight-grained timber, repeating seamlessly, in a photo's own average colour."""
    n = 1000
    fine = unit(gaussian_filter(rng.normal(size=(n, n)), (110, 0.9), mode="wrap"))
    medium = unit(gaussian_filter(rng.normal(size=(n, n)), (190, 4), mode="wrap"))
    broad = unit(gaussian_filter(rng.normal(size=(n, n)), (260, 26), mode="wrap"))
    pores = np.minimum(unit(gaussian_filter(rng.normal(size=(n, n)), (26, 0.7), mode="wrap")) + 1.6, 0)
    v = 0.42 * fine + 0.46 * medium + 0.62 * broad + 0.34 * pores
    for y in range(n):  # the gentle drift of real grain
        v[y] = np.roll(v[y], int(9 * np.sin(2 * np.pi * y / n)))
    light = 1 + contrast * v[..., None]
    rich = np.asarray(colour, dtype=np.float32) ** (1 + 0.12 * np.clip(-v[..., None], 0, 2))
    return Image.fromarray((np.clip(rich * light, 0, 1) * 255).astype(np.uint8))


woods = {
    "ash-oak": ("1611600700192-d87eaeed4f81", 0.1),
    "natural-teak": ("1644931551533-02906718127f", 0.13),
    "smoked-walnut": ("1576092762791-dd9e2220abd1", 0.17),
    "wenge": ("1546484396-fb3fc6f95f98", 0.2),
}
stones = {
    "statuario": ("1566041510394-cf7c8fe21800", "", 1, 0),
    "nero-marquina": ("1550053808-52a75a05955d", "", 0.3, 0),
    "travertine": ("1780253460324-9d49f88c74fc", "&crop=focalpoint&fp-x=0.36&fp-y=0.36&fp-z=6", 1, 0.72),
    "concrete": ("1521459467264-802e2ef3141f", "", 1, 0.3),
    "ivory-concrete": ("1617713965103-9fda56c89fad", "", 1, 0.3),
}
tiles = OUT / "tiles"
tiles.mkdir(exist_ok=True)
for name, (pid, contrast) in woods.items():
    mean = np.asarray(fetch(pid)).reshape(-1, 3).mean(axis=0) / 255
    grain(mean, contrast).save(tiles / f"{name}.jpg", quality=80, optimize=True, progressive=True)
for name, (pid, adjust, sat, calm) in stones.items():
    seamless(fetch(pid, adjust), sat, calm).save(tiles / f"{name}.jpg", quality=76, optimize=True, progressive=True)

# Brushed stainless: very fine vertical streaks in a soft silver. Seen from a few
# metres it is nearly even, so the streaks stay faint.
noise = rng.normal(0, 1, (900, 900))
streak = unit(gaussian_filter(noise, (90, 0.5), mode="wrap")) * 0.012 + unit(gaussian_filter(noise, (260, 18), mode="wrap")) * 0.016
steel = np.clip(0.74 + streak, 0, 1)
steel_rgb = np.dstack([steel * 0.985, steel * 0.992, steel])
Image.fromarray((steel_rgb * 255).astype(np.uint8)).save(tiles / "brushed-steel.jpg", quality=84)
# Fluted glass: pale ribs, each lit on one side.
x = np.arange(896)
rib = 0.5 + 0.5 * np.sin(2 * np.pi * x / 32)
line = 0.53 + 0.34 * rib ** 1.5
flute = np.tile(line[None, :], (64, 1))
Image.fromarray((np.dstack([flute * 0.96, flute, flute * 0.99]) * 255).astype(np.uint8)).save(tiles / "fluted-glass.jpg", quality=86)
print("done", {p.name: p.stat().st_size // 1024 for p in OUT.rglob("*") if p.is_file()})
