"""Cut a source segment into graded 9:16 frames with face-tracked crop.
Usage: prep.py <src.mp4> <start_s> <end_s> <out_dir> [--fps 30]
Writes <out_dir>/frames/00001.jpg..., <out_dir>/audio.wav, <out_dir>/shots.json (camera cuts + crop centre).
"""
import sys, os, json, subprocess, numpy as np, cv2

src, t0, t1, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
FPS = 30
SW, SH = 1920, 1080          # source size
CW = int(SH * 9 / 16)        # 607: 9:16 window at full source height
os.makedirs(f"{out}/frames", exist_ok=True)
dur = t1 - t0

# warm cinematic grade (this account's look): lift warmth, deepen blacks, gentle contrast
GRADE = ("eq=contrast=1.12:saturation=.98:gamma=1.06,"
         "colorbalance=rs=-.07:gs=-.01:bs=.09:rm=.05:gm=-.01:bm=-.03:rh=.06:gh=.02:bh=-.04,"
         "curves=all='0/0.015 0.5/0.52 1/1'")

def frames(vf, w, h):
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", str(t0), "-t", str(dur), "-i", src, "-vf", f"fps={FPS},{vf}",
                          "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
    n = w * h * 3
    while True:
        b = p.stdout.read(n)
        if len(b) < n: break
        yield np.frombuffer(b, np.uint8).reshape(h, w, 3)

# pass 1: low-res analysis -> shot cuts + face centre per frame
face = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
prof = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_profileface.xml")
small, xs, prev = [], [], None
cuts = [0]
for i, f in enumerate(frames("scale=480:270", 480, 270)):
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    if prev is not None and np.abs(g.astype(int) - prev).mean() > 28: cuts.append(i)
    prev = g.astype(int)
    det = list(face.detectMultiScale(g, 1.1, 5, minSize=(24, 24))) or list(prof.detectMultiScale(g, 1.1, 5, minSize=(24, 24)))
    if det:
        x, y, w, h = max(det, key=lambda d: d[2] * d[3]); xs.append((x + w / 2) / 480)
    else: xs.append(None)
N = len(xs); cuts.append(N)
# per shot: median face x (robust), clamp window inside frame
centre = np.zeros(N)
shots = []
for a, b in zip(cuts, cuts[1:]):
    v = [x for x in xs[a:b] if x is not None]
    cx = float(np.median(v)) if v else 0.5
    lo, hi = CW / 2 / SW, 1 - CW / 2 / SW
    cx = min(hi, max(lo, cx))
    centre[a:b] = cx
    shots.append({"f0": a, "f1": b, "t0": round(a / FPS, 3), "t1": round(b / FPS, 3), "cx": round(cx, 3), "faces": len(v)})

# pass 2: full-res graded frames, crop 607x1080 around centre -> 1080x1920
# --sr: Real-ESRGAN general x4v3 (engine/models, BSD-3) on a 405x720 copy -> 1620x2880 -> area-down to 1080x1920,
#       blended 70/30 with Lanczos to keep skin texture; then "HDR" local contrast (CLAHE on L) + clarity.
SR = "--sr" in sys.argv
SR_RANGES = [tuple(map(float, r.split("-"))) for r in sys.argv[sys.argv.index("--sr-ranges") + 1].split(",")] if "--sr-ranges" in sys.argv else None
if SR:
    import onnxruntime as ort
    sess = ort.InferenceSession(os.path.join(os.path.dirname(__file__), "..", "models", "realesr-general-x4v3.onnx"), providers=["CPUExecutionProvider"])
    iname = sess.get_inputs()[0].name
clahe = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8))
def hdr(img):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB); L = lab[..., 0]
    lab[..., 0] = cv2.addWeighted(L, .45, clahe.apply(L), .55, 0)
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    big = cv2.GaussianBlur(img, (0, 0), 14); img = cv2.addWeighted(img, 1.22, big, -.22, 0)      # clarity
    fine = cv2.GaussianBlur(img, (0, 0), 1.2); return cv2.addWeighted(img, 1.35, fine, -.35, 0)  # micro sharpness
# grade v2 (owner 2026-11-20: old grade felt low/dull): engine/tools/grade.py, applied after the crop; no CLAHE
V2 = "--v1" not in sys.argv
if V2:
    sys.path.insert(0, os.path.dirname(__file__)); from grade import grade
start = int(sys.argv[sys.argv.index("--from") + 1]) if "--from" in sys.argv else 0
for i, f in enumerate(frames("null" if V2 else GRADE, SW, SH)):
    if i >= N: break
    if i < start: continue
    x0 = int(round(centre[i] * SW - CW / 2))
    crop = np.ascontiguousarray(f[:, x0:x0 + CW])
    lz = cv2.resize(crop, (1080, 1920), interpolation=cv2.INTER_LANCZOS4)
    if SR and (SR_RANGES is None or any(a - .5 <= i / FPS <= b + .5 for a, b in SR_RANGES)):
        inp = cv2.cvtColor(cv2.resize(crop, (405, 720), interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
        o = sess.run(None, {iname: inp.transpose(2, 0, 1)[None]})[0][0].transpose(1, 2, 0)
        o = cv2.cvtColor((np.clip(o, 0, 1) * 255).astype(np.uint8), cv2.COLOR_RGB2BGR)
        up = cv2.addWeighted(cv2.resize(o, (1080, 1920), interpolation=cv2.INTER_AREA), .55 if V2 else .7, lz, .45 if V2 else .3, 0)
    else: up = lz
    up = grade(up) if V2 else hdr(up)
    cv2.imwrite(f"{out}/frames/{i + 1:05d}.jpg", up, [cv2.IMWRITE_JPEG_QUALITY, 94])
    if i % 60 == 0: print("frame", i, "/", N, flush=True)

subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t0), "-t", str(dur), "-i", src, "-vn", "-ac", "2", "-ar", "48000", f"{out}/audio.wav"], check=True)
json.dump({"src": os.path.basename(src), "t0": t0, "t1": t1, "fps": FPS, "frames": N, "shots": shots}, open(f"{out}/shots.json", "w"), indent=1)
print(json.dumps(shots, indent=0))
