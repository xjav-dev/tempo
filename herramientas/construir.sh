#!/usr/bin/env bash
# Tempo de Salón · construye la app a partir de fuente/
#   publicar/  → la app (PWA) lista para subir a GitHub Pages
# Requisitos: Node 20 o posterior (npm) y Python 3. La primera vez necesita conexión
# para instalar las dependencias y, si falta, descargar el modelo (paquete npm «demucs» 1.0.0).
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
F="$RAIZ/fuente"; P="$RAIZ/publicar"; T="$RAIZ/.tmp"
mkdir -p "$P" "$T"
cd "$F"

echo "· dependencias"
[ -d node_modules ] || npm ci --ignore-scripts --no-audit --no-fund --loglevel=error

echo "· librerías"
EB=(npx esbuild --bundle --minify --target=safari16 --log-level=warning)
DEF=(--define:process.env.NODE_ENV='"production"' --define:global=globalThis)
"${EB[@]}" --format=iife "${DEF[@]}" entradas/st.js --outfile="$P/st.js"
"${EB[@]}" --format=iife "${DEF[@]}" --loader:.bin=binary entradas/bp.js --outfile="$P/bp.js"
"${EB[@]}" --format=iife "${DEF[@]}" entradas/osmd.js --outfile="$P/osmd.js"
"${EB[@]}" --format=esm separador.js --outfile="$P/separador.js"
cp node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.mjs "$P/"

echo "· fuentes e iconos"
cp node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2 \
   node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-italic.woff2 \
   node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2 \
   node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2 \
   node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2 "$P/"
cp iconos/icono-180.png iconos/icono-192.png iconos/icono-512.png "$P/"

echo "· modelo de separación"
if python3 - "$P" <<'EOF'
import hashlib, json, os, sys
p = sys.argv[1]
try:
    m = json.load(open(os.path.join(p, "htdemucs.json")))
    ok = all(hashlib.sha256(open(os.path.join(p, x["file"]), "rb").read()).hexdigest() == x["sha256"] for x in m["parts"])
except Exception:
    ok = False
sys.exit(0 if ok else 1)
EOF
then echo "  ya está y sus huellas coinciden"
else
  ( cd "$T" && npm pack demucs@1.0.0 --silent >/dev/null && tar xzf demucs-1.0.0.tgz package/htdemucs.onnx )
  python3 "$RAIZ/herramientas/dividir_modelo.py" "$T/package/htdemucs.onnx" "$P"
fi

echo "· página e instalación"
python3 "$RAIZ/herramientas/construir.py"

echo "Hecho."
