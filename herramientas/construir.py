#!/usr/bin/env python3
"""Tempo de Salón · monta la versión instalable en publicar/ a partir de fuente/app.html.

Lo llama herramientas/construir.sh después de empaquetar las librerías.
Hace: index.html completo (con cabecera propia, fuentes locales y registro del service worker),
manifest.webmanifest, sw.js con la lista de archivos y una huella de versión, LEEME y LICENCIAS.
"""
import hashlib, json, os, re, shutil, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(RAIZ, "fuente")
P = os.path.join(RAIZ, "publicar")

app = open(os.path.join(F, "app.html"), encoding="utf-8").read()

# 1) Quitar Google Fonts (en la versión instalable las fuentes van incluidas)
app = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', app)
app = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>\s*', '', app)
app = app.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
title_m = re.match(r'\s*<title>[^<]*</title>\s*', app)
body = app[title_m.end():]

fonts = """@font-face{font-family:"Bodoni Moda";font-style:normal;font-weight:400 900;font-display:swap;src:url(bodoni-moda-latin-wght-normal.woff2) format("woff2")}
@font-face{font-family:"Bodoni Moda";font-style:italic;font-weight:400 900;font-display:swap;src:url(bodoni-moda-latin-wght-italic.woff2) format("woff2")}
@font-face{font-family:"Figtree";font-style:normal;font-weight:300 900;font-display:swap;src:url(figtree-latin-wght-normal.woff2) format("woff2")}
@font-face{font-family:"IBM Plex Mono";font-style:normal;font-weight:400;font-display:swap;src:url(ibm-plex-mono-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:"IBM Plex Mono";font-style:normal;font-weight:500;font-display:swap;src:url(ibm-plex-mono-latin-500-normal.woff2) format("woff2")}
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.4 system-ui,-apple-system,sans-serif}
img{max-width:100%}
[hidden]{display:none!important}"""

head = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Tempo de Salón</title>
<meta name="description" content="Ensaya bailes de salón con tus canciones: cambia el tempo sin cambiar el tono, separa instrumentos y sigue la partitura.">
<meta name="theme-color" content="#33133a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Tempo">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icono-192.png">
<link rel="apple-touch-icon" href="icono-180.png">
<style>
{fonts}
</style>
<script>
// Instala el modo sin conexión y, la primera vez, recarga una sola vez para activar el aislamiento (varios núcleos)
(function(){{
  if(!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js').then(function(){{
    if(window.crossOriginIsolated) return;
    var go=function(){{ try{{ if(sessionStorage.getItem('tds-coi')) return; sessionStorage.setItem('tds-coi','1'); }}catch(e){{ return; }} location.reload(); }};
    if(navigator.serviceWorker.controller) go(); else navigator.serviceWorker.addEventListener('controllerchange',go,{{once:true}});
  }}).catch(function(){{}});
}})();
</script>
</head>
<body>
"""
open(os.path.join(P, "index.html"), "w", encoding="utf-8").write(head + body + "\n</body>\n</html>\n")

# 2) Manifest
manifest = {
    "name": "Tempo de Salón", "short_name": "Tempo", "lang": "es",
    "description": "Ensaya bailes de salón con tus canciones: tempo sin cambiar el tono, pistas separadas y partitura.",
    "start_url": "./", "scope": "./", "display": "standalone", "orientation": "any",
    "background_color": "#f3eff5", "theme_color": "#33133a",
    "icons": [
        {"src": "icono-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
        {"src": "icono-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"},
    ],
}
json.dump(manifest, open(os.path.join(P, "manifest.webmanifest"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# 3) Textos que acompañan a la versión publicada
for f in ["LEEME.txt", "LICENCIAS.txt"]:
    shutil.copy(os.path.join(F, f), os.path.join(P, f))

# 4) Service worker: lista de archivos de la app y huella de versión según su contenido
shell = ["./", "index.html", "manifest.webmanifest", "st.js", "bp.js", "osmd.js", "separador.js",
         "ort-wasm-simd-threaded.jsep.wasm", "ort-wasm-simd-threaded.jsep.mjs", "htdemucs.json",
         "icono-180.png", "icono-192.png", "icono-512.png",
         "bodoni-moda-latin-wght-normal.woff2", "bodoni-moda-latin-wght-italic.woff2", "figtree-latin-wght-normal.woff2",
         "ibm-plex-mono-latin-400-normal.woff2", "ibm-plex-mono-latin-500-normal.woff2"]
h = hashlib.sha256()
for f in shell[1:]:
    h.update(open(os.path.join(P, f), "rb").read())
ver = h.hexdigest()[:10]
sw = open(os.path.join(F, "sw.js"), encoding="utf-8").read().replace("__VERSION__", ver).replace("__SHELL__", json.dumps(shell))
open(os.path.join(P, "sw.js"), "w", encoding="utf-8").write(sw)

files = sorted(os.listdir(P))
grandes = [f for f in files if os.path.getsize(os.path.join(P, f)) >= 25 * 1024 * 1024]
if grandes:
    sys.exit("Archivos de 25 MB o más (GitHub no los acepta desde el navegador): " + ", ".join(grandes))
print("huella", ver, "·", len(files), "archivos ·", round(sum(os.path.getsize(os.path.join(P, f)) for f in files) / 1048576, 1), "MB")
