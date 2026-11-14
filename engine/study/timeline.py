"""Build a segment timeline for a reference reel: cut points inside the 'finished' card,
segment type per cut (face / white / navy / transition), and the words spoken in it."""
import sys, json, subprocess, numpy as np
CROPS = {"A": (382, 677, 250, 235), "B": (392, 696, 270, 259)}

def frames(f, crop):
    w, h, x, y = crop
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", f"crop={w}:{h}:{x}:{y},scale=96:170",
                          "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, 170, 96, 3).astype(np.float32)

def kind(fr):
    m = fr.reshape(-1, 3).mean(0)
    sat_blue = m[2] - m[0]
    if m.mean() > 225: 
        dark = (fr.mean(2) < 160)
        top = dark[30:80].mean()  # icon zone above the word line
        return "white+icon" if top > 0.01 else "white"
    if m[0] < 25 and m[2] > 60 and sat_blue > 45: return "navy"
    if m[2] > 170 and m.mean() > 150: return "glitch/flash"
    return "face"

def main(f, style, words_json):
    fr = frames(f, CROPS[style]); fps = 30
    diff = np.abs(np.diff(fr, axis=0)).mean((1, 2, 3))
    cuts = [0] + [i + 1 for i, d in enumerate(diff) if d > 18] + [len(fr)]
    segs = []
    for a, b in zip(cuts, cuts[1:]):
        if b - a < 1: continue
        k = kind(fr[min(b - 1, a + (b - a) // 2)])
        if segs and segs[-1]["k"] == k and a - segs[-1]["e"] <= 0 and b - a <= 3:
            segs[-1]["e"] = b; continue
        segs.append({"s": a, "e": b, "k": k})
    W = json.load(open(words_json))
    out = []
    for s in segs:
        t0, t1 = s["s"] / fps, s["e"] / fps
        ws = [w["w"] for w in W if t0 - 0.05 <= w["s"] < t1 - 0.05]
        out.append(dict(t0=round(t0, 2), t1=round(t1, 2), dur=round(t1 - t0, 2), kind=s["k"], words=" ".join(ws)))
    return out

if __name__ == "__main__":
    f, style, wj, oj = sys.argv[1:5]
    res = main(f, style, wj)
    json.dump(res, open(oj, "w"), indent=1)
    for r in res: print(f'{r["t0"]:6.2f}-{r["t1"]:6.2f} ({r["dur"]:.2f}s) {r["kind"]:12s} {r["words"]}')
