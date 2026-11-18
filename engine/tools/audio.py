"""Final audio: cleaned voice + real SFX (Mixkit, assets/sfx) placed on scene events + ducked music bed.
Usage: audio.py <name> [music.mp3]
Reads videos/<name>/audio.wav, out/<name>.events.json (written by render.mjs), out/<name>.silent.mp4.
Writes renders/<name>.mp4
"""
import sys, os, json, subprocess, numpy as np, wave
name = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
music = sys.argv[2] if len(sys.argv) > 2 else f"{root}/assets/music/vastness.mp3"
SR = 48000
ev = json.load(open(f"{root}/out/{name}.events.json"))
dur = ev["duration"]; N = int(dur * SR) + SR

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).copy()
cache = {}
def sfx(n):
    if n not in cache:
        x = load(f"{root}/assets/sfx/{n}.mp3"); x /= (np.abs(x).max() + 1e-9)
        env = np.convolve(np.abs(x), np.ones(480) / 480, mode="same")
        cache[n] = (x, int(np.argmax(env)))
    return cache[n]

track = np.zeros(N)
def place(n, t, gain, align="peak", maxlen=None, fade=.08):
    x, pk = sfx(n)
    if maxlen: x = x[:int(maxlen * SR)].copy(); f = int(fade * SR); x[-f:] *= np.linspace(1, 0, f)
    off = pk if align == "peak" else 0
    s = int(t * SR) - off
    a, b = max(0, s), min(N, s + len(x))
    if b > a: track[a:b] += x[a - s:b - s] * gain

# hook hit at the very start
place("whoosh_deep_impact", 0.02, .28, align="start", maxlen=1.6)
for tr in ev["transitions"]:
    t, ty = tr["t"], tr["type"]
    if ty == "whip": place("whoosh_cine_fast", t + .05, .5)
    elif ty == "amber": place("air_zoom", t + .18, .4)
    elif ty == "blur": place("sweep_small", t + .04, .18)
    elif ty == "slide": place("swoosh_fast", t + .1, .35)
for sh in ev["shots"]:
    for ct in sh["cards"]: place("swoosh_fast", ct + .2, .4)
for r in ev["runs"]:
    if r["k"] in ("b", "bo"): place("pop_light", r["t"] + .03, .3)
    elif r["k"] == "hl": place("typing_soft", r["t"], .35, align="start", maxlen=.5)
    elif r["k"] == "sc": place("sparkle", r["t"] + .05, .08, maxlen=.9)
for e in ev.get("sfx", []): place(e["n"], e["t"], e.get("g", .4), e.get("align", "peak"), e.get("max"))

def wav(path, x):
    y = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(path, "w") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
fxp = f"{root}/out/{name}.sfx.wav"; wav(fxp, track * .9)
os.makedirs(f"{root}/renders", exist_ok=True)
out = f"{root}/renders/{name}.mp4"
voice = ("[1:a]aformat=channel_layouts=mono,highpass=f=75,"
         "equalizer=f=220:t=q:w=1.1:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,equalizer=f=9000:t=h:w=1:g=1.5,"
         "deesser=i=.3,acompressor=threshold=-21dB:ratio=2.5:attack=8:release=120:makeup=2,"
         "loudnorm=I=-14:TP=-1.5:LRA=7,aformat=channel_layouts=stereo,asplit=2[v][vs];")
mus = (f"[2:a]atrim=0:{dur + .5},aformat=channel_layouts=stereo,highpass=f=90,lowpass=f=9000,"
       f"loudnorm=I=-24:TP=-6,afade=t=in:d=1.2,afade=t=out:st={max(0, dur - 1.5)}:d=1.5[m0];"
       "[m0][vs]sidechaincompress=threshold=0.03:ratio=5:attack=30:release=400[m];")
fx = "[3:a]aformat=channel_layouts=stereo,volume=1.0[f];"
mix = "[v][m][f]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.93:level=false[a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{root}/out/{name}.silent.mp4", "-i", f"{root}/videos/{name}/audio.wav",
                "-i", music, "-i", fxp, "-filter_complex", voice + mus + fx + mix,
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", out], check=True)
print("wrote", out)
