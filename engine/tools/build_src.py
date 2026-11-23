"""Frame-exact source cut: cut points snapped to the source frame grid, video and audio trimmed with the SAME
times in one filter graph (no A/V drift). Usage: build_src.py <source.mp4> <videos/name>   (reads cuts.txt)
Writes src.mp4 and cuts.json [{a,b,off,dur}] (a,b snapped source s; off = start in src)."""
import sys, json, subprocess
src, d = sys.argv[1], sys.argv[2]
fps = eval(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip())
cuts = [tuple(map(float, l.split()[:2])) for l in open(f"{d}/cuts.txt") if l.strip() and not l.startswith("#")]
snap = lambda t: round(t * fps) / fps
cuts = [(snap(a), snap(b)) for a, b in cuts]
fc, off, meta, ins = "", 0.0, [], []
for i, (a, b) in enumerate(cuts):
    # one seeked input per cut (accurate seek: input t=0 is exactly a-PRE); trimming the whole file in one input
    # made concat buffer every decoded frame of out-of-order cuts and got OOM-killed on long sources
    pre = min(2.0, a); ins += ["-ss", f"{a - pre:.6f}", "-t", f"{b - a + pre + 1:.6f}", "-i", src]
    fc += f"[{i}:v:0]trim=start={pre:.6f}:end={pre + b - a:.6f},setpts=PTS-STARTPTS[v{i}];[{i}:a:0]atrim=start={pre:.6f}:end={pre + b - a:.6f},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st={b - a - .012:.6f}:d=0.012[a{i}];"
    meta.append({"a": a, "b": b, "off": round(off, 4), "dur": round(b - a, 4)}); off += b - a
fc += "".join(f"[v{i}][a{i}]" for i in range(len(cuts))) + f"concat=n={len(cuts)}:v=1:a=1[v][a]"
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *ins, "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "10", "-preset", "fast", "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", f"{d}/src.mov"], check=True)
json.dump(meta, open(f"{d}/cuts.json", "w"), indent=1)
print("total", round(off, 3), "joins", [m["off"] for m in meta[1:]])
