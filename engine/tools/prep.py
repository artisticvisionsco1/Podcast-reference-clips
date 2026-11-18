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
GRADE = ("eq=contrast=1.2:saturation=1.22:gamma=.95,"
         "colorbalance=rs=.04:gs=0:bs=-.05:rm=.07:gm=.01:bm=-.08:rh=.05:gh=.02:bh=-.06,"
         "curves=all='0/0 0.1/0.04 0.5/0.5 0.85/0.9 1/1'")

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

# pass 2: full-res graded frames, crop 607x1080 around centre, upscale to 1080x1920
for i, f in enumerate(frames(GRADE, SW, SH)):
    if i >= N: break
    x0 = int(round(centre[i] * SW - CW / 2))
    crop = f[:, x0:x0 + CW]
    up = cv2.resize(crop, (1080, 1920), interpolation=cv2.INTER_LANCZOS4)
    # mild unsharp to recover upscale softness
    blur = cv2.GaussianBlur(up, (0, 0), 2.0)
    up = cv2.addWeighted(up, 1.6, blur, -.6, 0)
    cv2.imwrite(f"{out}/frames/{i + 1:05d}.jpg", up, [cv2.IMWRITE_JPEG_QUALITY, 92])

subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t0), "-t", str(dur), "-i", src, "-vn", "-ac", "2", "-ar", "48000", f"{out}/audio.wav"], check=True)
json.dump({"src": os.path.basename(src), "t0": t0, "t1": t1, "fps": FPS, "frames": N, "shots": shots}, open(f"{out}/shots.json", "w"), indent=1)
print(json.dumps(shots, indent=0))
