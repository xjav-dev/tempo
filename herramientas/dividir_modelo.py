#!/usr/bin/env python3
"""Divide htdemucs.onnx en 8 trozos de menos de 25 MB (límite de subida de GitHub desde el navegador)
y escribe htdemucs.json con el tamaño y la huella SHA-256 de cada trozo.

Uso: python3 dividir_modelo.py <htdemucs.onnx> <carpeta-de-salida>
"""
import hashlib, json, os, sys

src, out = sys.argv[1], sys.argv[2]
data = open(src, "rb").read()
n = 8
size = -(-len(data) // n)
parts = []
for i in range(n):
    chunk = data[i * size:(i + 1) * size]
    name = f"htdemucs.parte{i + 1}.bin"
    open(os.path.join(out, name), "wb").write(chunk)
    parts.append({"file": name, "bytes": len(chunk), "sha256": hashlib.sha256(chunk).hexdigest()})
json.dump({"model": "htdemucs (Demucs v4, 4 pistas)", "bytes": len(data),
           "sha256": hashlib.sha256(data).hexdigest(), "parts": parts},
          open(os.path.join(out, "htdemucs.json"), "w"), indent=1)
print("modelo:", len(data), "bytes en", n, "trozos de", size)
