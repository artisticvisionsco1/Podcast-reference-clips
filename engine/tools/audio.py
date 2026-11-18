"""Mix voice + warm ambient pad + transition whooshes, mux with the silent render.
Usage: audio.py <name>   (reads videos/<name>/audio.wav, videos/<name>/scene.js, out/<name>.silent.mp4)
Writes renders/<name>.mp4
"""
import sys, re, subprocess, numpy as np, wave, os
name = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V = f"{root}/videos/{name}"; SR = 48000
src = open(f"{V}/scene.js").read()
dur = float(re.search(r"duration:\s*([\d.]+)", src).group(1))
trans = [(float(m.group(1)), m.group(2)) for m in re.finditer(r"t0:\s*([\d.]+)[^\n]*?in:\s*\{\s*type:\s*'(\w+)'", src)]
N = int(dur * SR); t = np.arange(N) / SR
rng = np.random.default_rng(7)

# warm pad: low chord (A1 E2 A2 C#3 E3) with slow swells, soft saturation, lowpassed by averaging
pad = np.zeros(N)
for f, a in [(55, .5), (82.4, .35), (110, .3), (138.6, .16), (164.8, .14), (220, .06)]:
    pad += a * np.sin(2 * np.pi * f * t + rng.random() * 6) * (0.75 + 0.25 * np.sin(2 * np.pi * t / (7 + f % 5) + rng.random() * 6))
pad = np.tanh(pad * .8)
k = np.ones(64) / 64; pad = np.convolve(pad, k, mode="same")
pad *= np.minimum(1, t / 1.5) * np.minimum(1, (dur - t) / 1.0)

def bandnoise(n, lo, hi):
    x = rng.standard_normal(n); X = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, n)

fx = np.zeros(N)
for t0, kind in trans:
    L = {"whip": .55, "amber": .7, "blur": .3, "slide": .45}.get(kind, .4); n = int(L * SR)
    s = int(max(0, t0 - L * .55) * SR)
    w = bandnoise(n, 300, 6000) if kind != "blur" else bandnoise(n, 1500, 9000)
    env = np.sin(np.linspace(0, np.pi, n)) ** (2 if kind == "whip" else 3)
    # pitch-rise feel: emphasise highs toward the cut
    w = w * env * (np.linspace(.4, 1, n))
    gain = {"whip": .5, "amber": .3, "blur": .12, "slide": .3}.get(kind, .3)
    e = min(N, s + n); fx[s:e] += (w[:e - s] / (np.abs(w).max() + 1e-9)) * gain
    if kind == "whip":  # low thump on the cut
        m = int(.25 * SR); tt = np.arange(m) / SR
        th = np.sin(2 * np.pi * (70 - 30 * tt / .25) * tt) * np.exp(-tt * 18) * .5
        c = int(t0 * SR); e = min(N, c + m); fx[c:e] += th[:e - c]

def wav(path, x):
    x = np.clip(x, -1, 1); y = (x * 32767).astype(np.int16)
    with wave.open(path, "w") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
tmp = f"{root}/out/{name}"
wav(f"{tmp}.pad.wav", pad * .9); wav(f"{tmp}.fx.wav", fx)
os.makedirs(f"{root}/renders", exist_ok=True)
out = f"{root}/renders/{name}.mp4"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{root}/out/{name}.silent.mp4", "-i", f"{V}/audio.wav", "-i", f"{tmp}.pad.wav", "-i", f"{tmp}.fx.wav",
  "-filter_complex",
  "[1:a]highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,loudnorm=I=-14:TP=-1.5:LRA=9,asplit=2[v][vs];"
  "[2:a]volume=0.09[p];[3:a]volume=0.55[f];"
  "[p][vs]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[pd];"
  "[v][pd][f]amix=inputs=3:normalize=0,alimiter=limit=0.95[a]",
  "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", out], check=True)
print("wrote", out, "transitions:", trans)
