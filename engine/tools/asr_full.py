# Full-episode transcript with word timings (faster-whisper). Usage: asr_full.py in.mp4 out.json [model]
import sys, json, subprocess, numpy as np
from faster_whisper import WhisperModel
f, out = sys.argv[1], sys.argv[2]; model = sys.argv[3] if len(sys.argv) > 3 else "small.en"
m = WhisperModel(model, device="cpu", compute_type="int8", cpu_threads=0)
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True).stdout
a = np.frombuffer(raw, np.float32)
segs, _ = m.transcribe(a, word_timestamps=True, beam_size=1, vad_filter=True)
res = []
for s in segs:
    res.append({"s": round(s.start, 2), "e": round(s.end, 2), "text": s.text.strip(), "words": [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for w in s.words]})
    if len(res) % 50 == 0:
        print(f"{s.end/60:.1f} min", flush=True); json.dump(res, open(out, "w"))
json.dump(res, open(out, "w")); print("DONE", flush=True)
