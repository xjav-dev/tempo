#!/usr/bin/env bash
# Ejecuta todas las pruebas sobre publicar/. Requisitos: Python 3 con numpy y playwright, y ffmpeg
# (pip install numpy playwright && python3 -m playwright install chromium).
# Variable opcional CHROME=/ruta/a/chrome para usar otro navegador.
set -uo pipefail
cd "$(dirname "$0")"
[ -f audio/prueba_video.mp4 ] || python3 generar_audio.py
r=0
echo "== Separación";            python3 separacion.py       || r=1
echo "== App con vídeo";         python3 extremo_a_extremo.py || r=1
echo "== Migración desde 0.3.0"; python3 migracion.py         || r=1
[ $r = 0 ] && echo "TODAS LAS PRUEBAS CORRECTAS" || echo "HAY PRUEBAS FALLIDAS"
exit $r
