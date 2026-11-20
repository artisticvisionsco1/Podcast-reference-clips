"""prep v3 (owner 2026-11-20: skin tone off, not sharp/HD): face-tracked 9:16 crop; Real-ESRGAN on the FACE region
at native source pixels (no pre-downscale), feather-blended over a Lanczos base; grade3 (skin-protected) + clamped sharpen.
Usage: prep3.py <src.mp4> <out_dir> [--sr-ranges "a-b,..."]   (whole file; times in src seconds)
Writes <out_dir>/frames/00001.jpg..., audio.wav (frame-exact), shots.json."""
import sys, os, json, subprocess, numpy as np, cv2
sys.path.insert(0, os.path.dirname(__file__)); from grade import grade3, sharpen
src, out = sys.argv[1], sys.argv[2]
FPS = int(sys.argv[sys.argv.index('--fps') + 1]) if '--fps' in sys.argv else 24; SW, SH = 1920, 1080   # 24 = source rate: no duplicate SR frames; CW = int(SH * 9 / 16)
os.makedirs(f"{out}/frames", exist_ok=True)
RANGES = [tuple(map(float, r.split("-"))) for r in sys.argv[sys.argv.index("--sr-ranges") + 1].split(",")] if "--sr-ranges" in sys.argv else None

def frames(vf, w, h):
    p = subprocess.Popen(["ffmpeg", "-nostdin", "-v", "error", "-i", src, "-vf", f"fps={FPS},{vf}", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
    n = w * h * 3
    while True:
        b = p.stdout.read(n)
        if len(b) < n: break
        yield np.frombuffer(b, np.uint8).reshape(h, w, 3)

# pass 1 (480x270): cuts + face boxes
face = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
prof = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_profileface.xml")
boxes, prev, cuts = [], None, [0]
for i, f in enumerate(frames("scale=480:270", 480, 270)):
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    if prev is not None and np.abs(g.astype(int) - prev).mean() > 28: cuts.append(i)
    prev = g.astype(int)
    det = list(face.detectMultiScale(g, 1.1, 5, minSize=(20, 20))) or list(prof.detectMultiScale(g, 1.1, 5, minSize=(20, 20)))
    boxes.append([v * 4 for v in max(det, key=lambda d: d[2] * d[3])] if det else None)
N = len(boxes); cuts.append(N)
centre = np.zeros(N); fbox = [None] * N; shots = []
for a, b in zip(cuts, cuts[1:]):
    v = [bx for bx in boxes[a:b] if bx is not None]
    cx = float(np.median([(x + w / 2) / SW for x, y, w, h in v])) if v else .5
    cx = min(1 - CW / 2 / SW, max(CW / 2 / SW, cx)); centre[a:b] = cx
    if v:  # smoothed face box per frame (median size for the shot, moving-average centre)
        sz = float(np.median([w for x, y, w, h in v]))
        cs = [(x + w / 2, y + h / 2) if (x is not None) else None for x, y, w, h in [bx if bx else (None,) * 4 for bx in boxes[a:b]]]
        last = next(c for c in cs if c)
        filled = []
        for c in cs: last = c or last; filled.append(last)
        arr = np.array(filled, float); k = 9
        sm = np.array([arr[max(0, j - k):j + k + 1].mean(0) for j in range(len(arr))])
        for j in range(len(arr)): fbox[a + j] = (sm[j][0], sm[j][1], sz)
    shots.append({"f0": a, "f1": b, "t0": round(a / FPS, 3), "t1": round(b / FPS, 3), "cx": round(cx, 3), "faces": len(v)})

import onnxruntime as ort
sess = ort.InferenceSession(os.path.join(os.path.dirname(__file__), "..", "models", "realesr-general-x4v3.onnx"), providers=["CPUExecutionProvider"])
iname = sess.get_inputs()[0].name
K = 1080 / CW
def sr(img):
    inp = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    o = sess.run(None, {iname: inp.transpose(2, 0, 1)[None]})[0][0].transpose(1, 2, 0)
    return cv2.cvtColor((np.clip(o, 0, 1) * 255).astype(np.uint8), cv2.COLOR_RGB2BGR)
for i, f in enumerate(frames("null", SW, SH)):
    if i >= N: break
    x0 = int(round(centre[i] * SW - CW / 2)); crop = np.ascontiguousarray(f[:, x0:x0 + CW])
    up = cv2.resize(crop, (1080, 1920), interpolation=cv2.INTER_LANCZOS4)
    t = i / FPS
    if fbox[i] and (RANGES is None or any(a - .3 <= t <= b + .3 for a, b in RANGES)):
        fx, fy, s = fbox[i]; fx -= x0
        half = s * 1.25; ax, bx_ = int(max(0, fx - half)), int(min(CW, fx + half)); ay, by = int(max(0, fy - half * 1.15)), int(min(SH, fy + half * 1.35))
        if bx_ - ax > 24 and by - ay > 24:
            reg = crop[ay:by, ax:bx_]; m = max(reg.shape[:2]); sc = min(1.0, 288 / m)
            if sc < 1: reg = cv2.resize(reg, (int(reg.shape[1] * sc), int(reg.shape[0] * sc)), interpolation=cv2.INTER_AREA)
            o = sr(reg)
            X0, Y0, X1, Y1 = int(ax * K), int(ay * K), min(1080, int(bx_ * K)), min(1920, int(by * K))
            o = cv2.resize(o, (X1 - X0, Y1 - Y0), interpolation=cv2.INTER_AREA)
            base = up[Y0:Y1, X0:X1].astype(np.float32)
            mk = np.zeros((Y1 - Y0, X1 - X0), np.float32); fe = int(min(X1 - X0, Y1 - Y0) * .16)
            mk[fe:-fe, fe:-fe] = 1; mk = cv2.GaussianBlur(mk, (0, 0), fe * .6 + 1)[..., None] * .68
            up[Y0:Y1, X0:X1] = np.clip(base * (1 - mk) + o.astype(np.float32) * mk, 0, 255).astype(np.uint8)
    up = sharpen(grade3(up), .55, 1.0)
    cv2.imwrite(f"{out}/frames/{i + 1:05d}.jpg", up, [cv2.IMWRITE_JPEG_QUALITY, 95])
    if i % 60 == 0: print("frame", i, "/", N, flush=True)
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", src, "-vn", "-ac", "2", "-ar", "48000", f"{out}/audio.wav"], check=True)
json.dump({"src": os.path.basename(src), "fps": FPS, "frames": N, "shots": shots}, open(f"{out}/shots.json", "w"), indent=1)
print(json.dumps(shots, indent=0))
