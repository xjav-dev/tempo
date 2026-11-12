#!/usr/bin/env python3
"""Genera una mezcla de prueba de 16 s a 120 BPM con sus cuatro pistas conocidas
(batería, bajo, acordes y una melodía sintética) en pruebas/audio/, y un vídeo MP4 (H.264 + AAC)
con esa mezcla como sonido. Requiere numpy y ffmpeg.
Son sonidos inventados: no hay ninguna grabación real en las pruebas."""
import os, wave
import numpy as np
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio"); os.makedirs(OUT, exist_ok=True)
sr = 44100; dur = 16.0; n = int(sr * dur); beat = 60 / 120
rng = np.random.default_rng(1)
drums, bass, other, voc = (np.zeros(n) for _ in range(4))
env = lambda k, dec: np.exp(-np.arange(k) / sr / dec)
for b in range(int(dur / beat)):
    i = int(b * beat * sr)
    k = min(n - i, int(0.3 * sr)); tt = np.arange(k) / sr; f = 50 + 80 * np.exp(-tt / 0.03)
    drums[i:i + k] += 0.9 * np.sin(2 * np.pi * np.cumsum(f) / sr) * env(k, 0.12)
    if b % 2 == 1:
        k = min(n - i, int(0.2 * sr)); drums[i:i + k] += 0.5 * rng.standard_normal(k) * env(k, 0.05)
    for h in (0, 0.5):
        j = int((b + h) * beat * sr); k = min(n - j, int(0.05 * sr)); x = np.diff(np.concatenate([[0], rng.standard_normal(k)]))
        drums[j:j + k] += 0.25 * x * env(k, 0.015)
roots = [45, 41, 43, 40]
for bar in range(int(dur / (4 * beat))):
    i = int(bar * 4 * beat * sr); k = min(n - i, int(4 * beat * sr)); tt = np.arange(k) / sr; f = 440 * 2 ** ((roots[bar % 4] - 69) / 12)
    bass[i:i + k] += 0.5 * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt / 1.5)
    for m in (0, 4, 7):
        fm = 440 * 2 ** ((roots[bar % 4] + 24 + m - 69) / 12)
        other[i:i + k] += 0.12 * (np.sin(2 * np.pi * fm * tt) + 0.4 * np.sin(4 * np.pi * fm * tt) + 0.2 * np.sin(6 * np.pi * fm * tt)) * np.exp(-tt / 0.8)
mel = [69, 72, 74, 76, 74, 72, 69, 67]
for q in range(int(dur / (2 * beat))):
    i = int(q * 2 * beat * sr); k = min(n - i, int(2 * beat * sr * 0.95)); tt = np.arange(k) / sr
    f = 440 * 2 ** ((mel[q % 8] - 69) / 12) * (1 + 0.01 * np.sin(2 * np.pi * 5.5 * tt)); ph = 2 * np.pi * np.cumsum(f) / sr
    s = sum((1 / h) * np.sin(h * ph) * (1.0 if h in (2, 3, 5, 8) else 0.4) for h in range(1, 12))
    voc[i:i + k] += 0.25 * s * np.minimum(1, tt / 0.05) * np.minimum(1, (k / sr - tt) / 0.05)
mix = drums + bass + other + voc; g = 0.8 / np.abs(mix).max()
def w(name, x):
    x = np.clip(x * g, -1, 1); st = np.stack([x, x], 1)
    with wave.open(os.path.join(OUT, name), "wb") as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(sr); f.writeframes((st * 32767).astype("<i2").tobytes())
for nm, x in [("mezcla", mix), ("drums", drums), ("bass", bass), ("other", other), ("vocals", voc)]:
    w(f"prueba_{nm}.wav", x)
import shutil, subprocess
if shutil.which("ffmpeg"):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "testsrc2=size=640x360:rate=25", "-i", os.path.join(OUT, "prueba_mezcla.wav"),
                    "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", os.path.join(OUT, "prueba_video.mp4")], check=True)
else:
    print("AVISO: sin ffmpeg no se genera el vídeo de prueba")
print("audio y vídeo de prueba en", OUT)
