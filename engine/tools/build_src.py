"""Frame-exact source cut: cut points snapped to the source frame grid, video and audio trimmed with the SAME
times in one filter graph (no A/V drift). Usage: build_src.py <source.mp4> <videos/name>   (reads cuts.txt)
Writes src.mp4 and cuts.json [{a,b,off,dur}] (a,b snapped source s; off = start in src)."""
import sys, json, subprocess
src, d = sys.argv[1], sys.argv[2]
fps = eval(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip())
cuts = [tuple(map(float, l.split()[:2])) for l in open(f"{d}/cuts.txt") if l.strip() and not l.startswith("#")]
snap = lambda t: round(t * fps) / fps
cuts = [(snap(a), snap(b)) for a, b in cuts]
fc, off, meta = "", 0.0, []
for i, (a, b) in enumerate(cuts):
    fc += f"[0:v:0]trim=start={a:.6f}:end={b:.6f},setpts=PTS-STARTPTS[v{i}];[0:a:0]atrim=start={a:.6f}:end={b:.6f},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st={b - a - .012:.6f}:d=0.012[a{i}];"
    meta.append({"a": a, "b": b, "off": round(off, 4), "dur": round(b - a, 4)}); off += b - a
fc += "".join(f"[v{i}][a{i}]" for i in range(len(cuts))) + f"concat=n={len(cuts)}:v=1:a=1[v][a]"
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", src, "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "10", "-preset", "fast", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", f"{d}/src.mov"], check=True)
json.dump(meta, open(f"{d}/cuts.json", "w"), indent=1)
print("total", round(off, 3), "joins", [m["off"] for m in meta[1:]])
