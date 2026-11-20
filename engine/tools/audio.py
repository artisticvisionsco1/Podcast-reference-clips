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
        x = load(f"{root}/assets/sfx/{n}.mp3")
        env = np.convolve(np.abs(x), np.ones(480) / 480, mode="same")
        # loudness-match every sample: RMS of its loudest 200 ms -> 0.2
        w = int(.2 * SR); pkc = int(np.argmax(env)); seg = x[max(0, pkc - w // 2):pkc + w // 2]
        x = x * (.2 / (np.sqrt(np.mean(seg ** 2)) + 1e-9)); x = np.tanh(x * 1.2) / 1.2
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

# v2 levels (owner 2026-11-20: whooshes were too loud/harsh) -> softer, low-hiss whooshes, ~5 dB lower
G = ev.get("sfxGain", 1.0)
place("whoosh_deep_impact", 0.0, .42 * G, align="start", maxlen=1.8)
for tr in ev["transitions"]:
    t, ty = tr["t"], tr["type"]
    if ty == "whip": place("air_woosh", t + .14, .42 * G); place("whoosh_cine_fast", t + .16, .12 * G)
    elif ty == "amber": place("whoosh_tunnel", t + .22, .38 * G, maxlen=1.2)
    elif ty in ("zoomin", "blur"): place("swoosh_wind_short", t + .1, .28 * G)
    elif ty == "slide": place("sweep_small", t + .1, .26 * G)
for sh in ev["shots"]:
    for ct in sh["cards"]: place("sweep_small", ct + .18, .24 * G)
for r in ev["runs"]:
    if r["k"] in ("b", "bo"): place("pop_light", r["t"] + .03, .22 * G)
    elif r["k"] == "hl": place("typing_soft", r["t"], .4 * G, align="start", maxlen=.55)
for e in ev.get("sfx", []): place(e["n"], e["t"], e.get("g", .4), e.get("align", "peak"), e.get("max"))

def wav(path, x):
    y = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(path, "w") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
fxp = f"{root}/out/{name}.sfx.wav"; wav(fxp, track * .9)
# de-click the voice at edit joins (12 ms raised-cosine dip)
vraw = load(f"{root}/videos/{name}/audio.wav")
for j in ev.get("joins", []):
    c = int(j * SR); h = int(.006 * SR)
    if h < c < len(vraw) - h: vraw[c - h:c + h] *= 1 - np.hanning(2 * h)
vpath = f"{root}/out/{name}.voice.wav"; wav(vpath, vraw)
os.makedirs(f"{root}/renders", exist_ok=True)
out = f"{root}/renders/{name}.mp4"
voice = ("[1:a]aformat=channel_layouts=mono,highpass=f=75,"
         "equalizer=f=220:t=q:w=1.1:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,equalizer=f=9000:t=h:w=1:g=1.5,"
         "deesser=i=.3,acompressor=threshold=-21dB:ratio=2.5:attack=8:release=120:makeup=2,"
         "loudnorm=I=-14:TP=-1.5:LRA=7,aformat=channel_layouts=stereo,asplit=3[v][vs][vs2];")
mus = (f"[2:a]atrim=0:{dur + .5},aformat=channel_layouts=stereo,highpass=f=90,lowpass=f=9000,"
       f"loudnorm=I=-24:TP=-6,afade=t=in:d=1.2,afade=t=out:st={max(0, dur - 1.5)}:d=1.5[m0];"
       "[m0][vs]sidechaincompress=threshold=0.03:ratio=5:attack=30:release=400[m];")
fx = "[3:a]aformat=channel_layouts=stereo,highpass=f=60,lowpass=f=7500,volume=1.0[f0];[f0][vs2]sidechaincompress=threshold=0.06:ratio=2.5:attack=15:release=250[f];"
mix = "[v][m][f]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.93:level=false[a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{root}/out/{name}.silent.mp4", "-i", vpath,
                "-i", music, "-i", fxp, "-filter_complex", voice + mus + fx + mix,
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", out], check=True)
print("wrote", out)
