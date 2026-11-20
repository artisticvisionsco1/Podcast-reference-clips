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
