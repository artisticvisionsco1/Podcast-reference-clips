"""Cinematic grade v2 (this account): deep blacks, filmic S-curve with soft highlight roll-off,
warm natural skin, subtle teal shadows / amber highlights, gentle local contrast. Input/Output: BGR uint8."""
import numpy as np, cv2

def _curve(x, pivot=.40, k=1.28, black=.012, shoulder=.92):
    # S-curve around pivot (power on both sides), then soft shoulder for highlights
    lo = pivot * np.power(np.clip(x / pivot, 0, 1), k)
    hi = 1 - (1 - pivot) * np.power(np.clip((1 - x) / (1 - pivot), 0, 1), k * .85)
    y = np.where(x < pivot, lo, hi)
    y = np.where(y > shoulder, shoulder + (1 - shoulder) * np.tanh((y - shoulder) / (1 - shoulder)), y)
    return np.clip((y - black) / (1 - black), 0, 1)

LUT = None
def grade(img, exposure=1.08, sat=1.12):
    global LUT
    if LUT is None: LUT = (_curve(np.arange(256) / 255.) * 255).astype(np.float32)
    x = img.astype(np.float32) / 255.
    # white balance: warm, slightly less blue (source is cool/grey)
    x *= np.array([.955, 1.0, 1.05], np.float32)  # B,G,R
    x = np.clip(x * exposure, 0, 1)
    # luminance-preserving S-curve: apply curve to luma, scale channels
    Y = (.114 * x[..., 0] + .587 * x[..., 1] + .299 * x[..., 2])
    Yc = cv2.LUT(np.clip(Y * 255, 0, 255).astype(np.uint8), LUT) / 255.
    Yc = Yc.astype(np.float32)
    r = (Yc + 1e-4) / (Y + 1e-4)
    x = np.clip(x * r[..., None], 0, 1)
    # split tone: shadows teal, highlights amber (weights by luma)
    ws = np.clip(1 - Yc / .35, 0, 1)[..., None]; wh = np.clip((Yc - .5) / .5, 0, 1)[..., None]
    x += ws * np.array([.018, .008, -.012], np.float32) + wh * np.array([-.03, .004, .025], np.float32)
    # saturation with skin protection (hue ~ orange gets less boost)
    Y2 = (.114 * x[..., 0] + .587 * x[..., 1] + .299 * x[..., 2])[..., None]
    x = np.clip(Y2 + (x - Y2) * sat, 0, 1)
    out = (x * 255 + .5).astype(np.uint8)
    # gentle local contrast + fine detail (no CLAHE: it flattens and looks processed)
    f = out.astype(np.float32)
    big = cv2.GaussianBlur(f, (0, 0), 24); f = f + (f - big) * .16
    fine = cv2.GaussianBlur(f, (0, 0), 1.0); f = f + (f - fine) * .45
    return np.clip(f, 0, 255).astype(np.uint8)


# ---------- v3 (owner 2026-11-20: skin tone off, not sharp enough) ----------
# neutral-warm white balance, skin hues protected (no red push, no extra saturation on skin),
# rest of the image gets the cinematic contrast; detail via fine-radius sharpening only.
def skin_mask(img):
    ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb).astype(np.float32)
    cr, cb = ycc[..., 1], ycc[..., 2]
    m = np.exp(-(((cr - 150) / 14) ** 2 + ((cb - 110) / 14) ** 2))  # soft skin cluster
    return cv2.GaussianBlur(m, (0, 0), 6)[..., None]

LUT3 = None
def grade3(img, exposure=1.06, sat=1.08):
    global LUT3
    if LUT3 is None: LUT3 = (_curve(np.arange(256) / 255., pivot=.42, k=1.24, black=.01, shoulder=.9) * 255).astype(np.float32)
    sk = skin_mask(img)
    x = img.astype(np.float32) / 255.
    x *= np.array([.985, 1.0, 1.015], np.float32)            # very light warmth only
    x = np.clip(x * exposure, 0, 1)
    Y = (.114 * x[..., 0] + .587 * x[..., 1] + .299 * x[..., 2])
    Yc = (cv2.LUT(np.clip(Y * 255, 0, 255).astype(np.uint8), LUT3) / 255.).astype(np.float32)
    x = np.clip(x * ((Yc + 1e-4) / (Y + 1e-4))[..., None], 0, 1)
    ws = np.clip(1 - Yc / .3, 0, 1)[..., None] * (1 - sk); wh = np.clip((Yc - .55) / .45, 0, 1)[..., None]
    x += ws * np.array([.014, .006, -.008], np.float32) + wh * np.array([-.012, .002, .01], np.float32)
    Y2 = (.114 * x[..., 0] + .587 * x[..., 1] + .299 * x[..., 2])[..., None]
    s_eff = sat * (1 - sk) + .97 * sk                          # skin keeps natural saturation
    x = Y2 + (x - Y2) * s_eff
    # skin: tiny shift from red/pink toward golden (less R vs G), slight lift
    x += sk * np.array([0, .006, -.004], np.float32) + sk * .012
    out = np.clip(x * 255 + .5, 0, 255).astype(np.float32)
    big = cv2.GaussianBlur(out, (0, 0), 20); out = out + (out - big) * .12
    return np.clip(out, 0, 255).astype(np.uint8)

def sharpen(img, amt=.7, sigma=.9):
    f = img.astype(np.float32); b = cv2.GaussianBlur(f, (0, 0), sigma)
    d = f - b; d = np.clip(d, -18, 18)                         # clamp halos
    return np.clip(f + d * amt, 0, 255).astype(np.uint8)
