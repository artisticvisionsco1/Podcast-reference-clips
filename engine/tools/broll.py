"""Extract a graded b-roll clip as frames. Usage: broll.py <src> <start> <dur> <out_dir> <mode: full|card> [cx]
full: 9:16 crop at cx (0..1) upscaled to 1080x1920.  card: 16:9 scaled to 960x540.  Grade: grade.py (v2)."""
import sys, os, subprocess, numpy as np, cv2
src, ss, dur, out, mode = sys.argv[1:6]; cx = float(sys.argv[6]) if len(sys.argv) > 6 else .5
sys.path.insert(0, os.path.dirname(__file__)); from grade import grade
os.makedirs(out, exist_ok=True)
if mode == "full":
    x = int(max(0, min(1920 - 607, cx * 1920 - 303)))
    vf, w, h = f"fps=30,crop=607:1080:{x}:0,scale=1080:1920:flags=lanczos", 1080, 1920
else:
    vf, w, h = "fps=30,scale=960:540:flags=lanczos", 960, 540
p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", ss, "-t", dur, "-i", src, "-vf", vf, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
i = 0
while True:
    b = p.stdout.read(w * h * 3)
    if len(b) < w * h * 3: break
    i += 1; cv2.imwrite(f"{out}/{i:05d}.jpg", grade(np.frombuffer(b, np.uint8).reshape(h, w, 3)), [cv2.IMWRITE_JPEG_QUALITY, 94])
print(out, i, "frames")
