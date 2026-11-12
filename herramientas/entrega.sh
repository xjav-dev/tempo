#!/usr/bin/env bash
# Tempo de Salón · comprueba el proyecto y genera el zip de una versión.
# Uso: bash herramientas/entrega.sh [--pruebas] [--anterior <zip-de-la-versión-anterior>] [--salida <carpeta>]
#   --pruebas   ejecuta también pruebas/ejecutar.sh (necesita Python con numpy y playwright)
#   --anterior  compara el zip nuevo con el anterior: archivos añadidos, modificados y eliminados
# No se entrega con errores: si alguna comprobación falla, no se genera el zip.
set -uo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
PRUEBAS=0; ANTERIOR=""; SALIDA="$(dirname "$RAIZ")"
while [ $# -gt 0 ]; do case "$1" in
  --pruebas) PRUEBAS=1;; --anterior) ANTERIOR="$2"; shift;; --salida) SALIDA="$2"; shift;;
  *) echo "Opción desconocida: $1"; exit 2;; esac; shift; done
cd "$RAIZ"; ERR=0; fallo(){ echo "✗ $*"; ERR=1; }; bien(){ echo "✓ $*"; }
mkdir -p .tmp

# 1) Versiones coherentes
V="$(tr -d ' \n' < VERSION 2>/dev/null)"
[[ "$V" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] && bien "VERSION $V" || fallo "VERSION no es X.Y.Z: '$V'"
PV="$(python3 -c "import json;print(json.load(open('fuente/package.json'))['version'])")"
[ "$PV" = "$V" ] && bien "package.json coincide" || fallo "package.json dice $PV y VERSION dice $V"
grep -q '^## \[Sin publicar\]' CAMBIOS.md && bien "CAMBIOS.md tiene la sección [Sin publicar]" || fallo "falta «## [Sin publicar]» en CAMBIOS.md"
PRIMERA="$(grep -m1 -E '^## \[[0-9]+\.[0-9]+\.[0-9]+\]' CAMBIOS.md)"
FECHA="$(echo "$PRIMERA" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')"
echo "$PRIMERA" | grep -q "\[$V\]" && [ -n "$FECHA" ] && bien "CAMBIOS.md: la última versión es $V ($FECHA)" || fallo "la primera versión de CAMBIOS.md no es $V con fecha: '$PRIMERA'"
grep -q "Versión $V" MANUAL.md && bien "MANUAL.md indica la versión $V" || fallo "MANUAL.md no indica «Versión $V»"
grep -q "const APP_VERSION='$V'" fuente/app.html && bien "la app muestra la versión $V" || fallo "APP_VERSION de fuente/app.html no es $V"

# 2) Sintaxis
python3 - <<'EOF' > .tmp/scripts.js
import re; s=open('fuente/app.html',encoding='utf-8').read()
print('\n;\n'.join(m for m in re.findall(r'<script>(.*?)</script>',s,re.S)))
EOF
node --check .tmp/scripts.js 2>.tmp/err && bien "sintaxis de fuente/app.html" || { fallo "sintaxis de fuente/app.html"; head -5 .tmp/err; }
cp fuente/separador.js .tmp/separador.mjs; node --check .tmp/separador.mjs 2>.tmp/err && bien "sintaxis de fuente/separador.js" || fallo "sintaxis de fuente/separador.js"
node --check publicar/sw.js 2>.tmp/err && bien "sintaxis de publicar/sw.js" || fallo "sintaxis de publicar/sw.js"
python3 -m py_compile herramientas/*.py pruebas/*.py 2>.tmp/err && bien "sintaxis de las herramientas y pruebas en Python" || fallo "sintaxis Python: $(head -2 .tmp/err)"

# 3) Versión publicada completa y al día
python3 - <<'EOF' || ERR=1
import hashlib, json, os, re, sys
P = 'publicar'; ok = True
def mal(t):
    global ok; ok = False; print('✗', t)
sw = open(os.path.join(P, 'sw.js'), encoding='utf-8').read()
if '__VERSION__' in sw or '__SHELL__' in sw: mal('sw.js sin construir (marcadores sin sustituir)')
shell = json.loads(re.search(r'const SHELL = (\[.*?\]);', sw).group(1))
falta = [f for f in shell[1:] if not os.path.exists(os.path.join(P, f))]
if falta: mal('faltan archivos de la app en publicar/: ' + ', '.join(falta))
m = json.load(open(os.path.join(P, 'htdemucs.json')))
for x in m['parts']:
    pth = os.path.join(P, x['file'])
    if not os.path.exists(pth) or hashlib.sha256(open(pth, 'rb').read()).hexdigest() != x['sha256']: mal('trozo del modelo incorrecto: ' + x['file'])
grandes = [f for f in os.listdir(P) if os.path.getsize(os.path.join(P, f)) >= 25 * 1024 * 1024]
if grandes: mal('archivos de 25 MB o más: ' + ', '.join(grandes))
sub = [f for f in os.listdir(P) if os.path.isdir(os.path.join(P, f))]
if sub: mal('publicar/ debe ser plana (sin carpetas): ' + ', '.join(sub))
idx = open(os.path.join(P, 'index.html'), encoding='utf-8').read()
cuerpo = open('fuente/app.html', encoding='utf-8').read().split('</style>', 1)[1][:400]
if cuerpo.strip()[:200] not in idx: mal('publicar/index.html no está al día: ejecuta herramientas/construir.sh')
if ok: print('✓ publicar/ completa: %d archivos, modelo íntegro, ninguno de 25 MB o más' % len(os.listdir(P)))
sys.exit(0 if ok else 1)
EOF

# 4) Contenido prohibido (datos, credenciales, restos)
PROH="$(find . -path ./.git -prune -o -path ./fuente/node_modules -prune -o -path ./.tmp -prune -o -path ./pruebas/audio -prune -o -type f \
  \( -iname '*.mp3' -o -iname '*.m4a' -o -iname '*.wav' -o -iname '*.aif*' -o -iname '*.flac' -o -iname '*.zip' -o -name '.env' -o -iname '*.pem' -o -name '*.key' \) -print)"
[ -z "$PROH" ] && bien "sin audio, zips ni credenciales en el proyecto" || fallo "contenido que no puede ir en el zip: $PROH"

# 5) Pruebas
if [ $PRUEBAS = 1 ]; then bash pruebas/ejecutar.sh && bien "pruebas correctas" || fallo "pruebas fallidas"; else echo "· pruebas no ejecutadas (usa --pruebas)"; fi

[ $ERR = 0 ] || { echo "HAY ERRORES: no se genera el zip."; exit 1; }

# 6) Zip (nunca se reemplaza uno ya entregado)
ZIP="$SALIDA/tempo-de-salon_v${V}_${FECHA}.zip"
[ -e "$ZIP" ] && { echo "✗ $ZIP ya existe: una versión entregada no se reemplaza. Sube la versión."; exit 1; }
zip -q -r -9 "$ZIP" . -x '.git/*' 'fuente/node_modules/*' '.tmp/*' 'pruebas/audio/*' '*/__pycache__/*' '.DS_Store' '*/.DS_Store'
echo "✓ $(basename "$ZIP") · $(unzip -Z1 "$ZIP" | grep -vc '/$') archivos · $(du -m "$ZIP" | cut -f1) MB"

# 7) Comparación con la versión anterior
if [ -n "$ANTERIOR" ]; then python3 - "$ANTERIOR" "$ZIP" <<'EOF'
import sys, zipfile
a = {i.filename: i.CRC for i in zipfile.ZipFile(sys.argv[1]).infolist() if not i.is_dir()}
b = {i.filename: i.CRC for i in zipfile.ZipFile(sys.argv[2]).infolist() if not i.is_dir()}
for t, l in [('añadidos', sorted(set(b) - set(a))), ('modificados', sorted(f for f in set(a) & set(b) if a[f] != b[f])), ('eliminados', sorted(set(a) - set(b)))]:
    print(f'{t} ({len(l)}): ' + (', '.join(l) if l else '—'))
EOF
fi
rm -rf .tmp
