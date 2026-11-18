"""Extract a graded b-roll clip as frames. Usage: broll.py <src> <start> <dur> <out_dir> <mode: full|card> [cx]
full: 9:16 crop at cx (0..1) upscaled to 1080x1920.  card: 16:9 scaled to 960x540."""
import sys, os, subprocess
src, ss, dur, out, mode = sys.argv[1:6]; cx = float(sys.argv[6]) if len(sys.argv) > 6 else .5
sys.path.insert(0, os.path.dirname(__file__))
GRADE = ("eq=contrast=1.2:saturation=1.22:gamma=.95,colorbalance=rs=.04:gs=0:bs=-.05:rm=.07:gm=.01:bm=-.08:rh=.05:gh=.02:bh=-.06,"
         "curves=all='0/0 0.1/0.04 0.5/0.5 0.85/0.9 1/1'")
os.makedirs(out, exist_ok=True)
if mode == "full":
    x = int(max(0, min(1920 - 607, cx * 1920 - 303)))
    vf = f"fps=30,{GRADE},crop=607:1080:{x}:0,scale=1080:1920:flags=lanczos,unsharp=7:7:1.0"
else:
    vf = f"fps=30,{GRADE},scale=960:540:flags=lanczos,unsharp=5:5:.8"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", ss, "-t", dur, "-i", src, "-vf", vf, "-q:v", "3", f"{out}/%05d.jpg"], check=True)
print(out, len(os.listdir(out)), "frames")
