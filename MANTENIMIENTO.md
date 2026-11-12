# Tempo de Salón · Mantenimiento

Este zip es la copia de referencia de la versión: contiene el código fuente, las herramientas para
construirla y comprobarla, la app ya construida y la documentación. Con él se puede seguir trabajando
desde cero, en otra conversación o en otro ordenador, sin nada más.

## 1. Contenido

```
VERSION                 número de la versión (SemVer)
CAMBIOS.md              historial de versiones, con migraciones de esquema
ESPECIFICACIONES.md     qué hace, arquitectura, datos, decisiones, privacidad, pendientes
MANUAL.md               manual de uso
MANTENIMIENTO.md        este documento
fuente/                 código fuente
  app.html              la app entera (interfaz y lógica); construir.py le añade la cabecera de la PWA
  separador.js          Web Worker de separación (ONNX Runtime + demucs-js)
  sw.js                 plantilla del service worker (__VERSION__ y __SHELL__ se rellenan al construir)
  entradas/             puntos de entrada de las librerías empaquetadas (st, bp, osmd)
  vendor/demucs-js/     código de demucs-js 1.0.0 (MIT), sin modificar
  iconos/               iconos PNG y su original HTML (icono.html)
  LEEME.txt, LICENCIAS.txt   textos que acompañan a la versión publicada
  package.json, package-lock.json   dependencias con versiones exactas
herramientas/
  construir.sh          construye publicar/ desde fuente/
  construir.py          index.html, manifest, sw.js y huella (lo llama construir.sh)
  dividir_modelo.py     trocea el modelo (lo llama construir.sh si falta)
  entrega.sh            comprobaciones y zip de la versión
pruebas/                pruebas automáticas (ver §4)
publicar/               la app (PWA) ya construida: lo que se sube a GitHub Pages
```

No van en el zip: `fuente/node_modules/`, `.tmp/`, el audio y el vídeo de prueba (`pruebas/audio/`, se
generan) ni ningún vídeo o canción real.

## 2. Requisitos

- Node 20 o posterior (con npm) y Python 3.
- Para las pruebas: `pip install numpy playwright`, `python3 -m playwright install chromium` y ffmpeg.
  El vídeo de prueba es H.264 + AAC: con el Chromium de Playwright puede no reproducirse; en ese caso
  usa Google Chrome con `CHROME=/ruta/a/chrome`.
- Conexión la primera vez que se construye (dependencias de npm y, si falta en `publicar/`, el modelo
  del paquete npm `demucs` 1.0.0).

## 3. Construir

```
bash herramientas/construir.sh
```

Empaqueta las librerías con esbuild, copia ONNX Runtime, fuentes e iconos, comprueba el modelo
(lo descarga y trocea si falta o no coincide su huella), genera `index.html`, el manifest y el service
worker. Al final escribe la **huella**: los primeros 10 caracteres del SHA-256
de los archivos de la app. Si el código no cambia, la huella tampoco: así se comprueba que una
reconstrucción es idéntica.

| Versión | Huella |
| --- | --- |
| 0.3.0 | `8121db4a57` |
| 1.0.0 | `42347cd90a` |

## 4. Probar

```
bash pruebas/ejecutar.sh          # CHROME=/ruta/a/chrome si no se usa el Chromium de Playwright
```

- `generar_audio.py`: crea una mezcla de 16 s a 120 BPM con sus cuatro pistas originales (sonidos inventados)
  y un vídeo MP4 de prueba con esa mezcla como sonido.
- `separacion.py`: separa la mezcla con el separador real y exige coincidencia > 0,95 en batería y bajo.
- `extremo_a_extremo.py`: instala la app, añade el vídeo y comprueba sonido extraído, BPM, miniatura,
  sincronía del vídeo, BPM de ensayo, tramo y bucle, solo audio, análisis completo, canal elegido → su
  partitura y su sonido, recarga, sin conexión, desbordamientos y errores de JavaScript.
- `migracion.py` (con `sembrar_0_3.html`): deja una biblioteca con el formato de la 0.3.0 y comprueba que la
  versión actual la convierte sin perder nada.

**Registro de pruebas de la 1.0.0** (Google Chrome sin tarjeta gráfica, 2 núcleos, 12 de noviembre de 2026):

| Prueba | Resultado |
| --- | --- |
| Separación (procesador) | batería 0,998 · bajo 0,985 |
| App con vídeo | 19 de 19 comprobaciones; BPM 120,07; desfase vídeo-sonido < 0,25 s; análisis completo en 178 s |
| Migración desde 0.3.0 | 7 de 7 comprobaciones; también la actualización del service worker de 0.3.0 a 1.0.0 |
| Pantallas | 1180×820, 820×1180 y 390×844 (oscuro) sin desbordamiento |
| No probado | Safari en un iPad real: WebGPU, vídeos grandes (memoria), hoja de compartir, pantalla bloqueada |

**Registro de pruebas de la 0.3.0** (Chrome sin tarjeta gráfica, 2 núcleos, 3 de noviembre de 2026):

| Prueba | Resultado |
| --- | --- |
| Separación (procesador) | batería 0,998 · bajo 0,985 · 54 s para 16 s de música |
| Versión instalable | 12 de 12 comprobaciones correctas; separación completa en 62 s |
| Ejemplo integrado | BPM 84 y primer tiempo 0,30 s exactos; 24/24 bombos y 48/48 charles |
| Pantallas | 1180×820 y 820×1180 sin desbordamiento |
| No probado | Safari en un iPad real: WebGPU, hoja de compartir, memoria con canciones largas |

## 5. Publicar en GitHub Pages

1. Crea un repositorio **público** (GitHub Pages gratis solo funciona con repositorios públicos).
2. Sube **todo el contenido de `publicar/`** a la raíz del repositorio, sin carpetas. Desde el iPad,
   en dos tandas: primero todo menos los ocho `htdemucs.parteN.bin` y después esos ocho.
3. Settings → Pages → «Deploy from a branch» → `main` y `/ (root)`.
4. La app queda en `https://USUARIO.github.io/REPOSITORIO/`.

`publicar/LEEME.txt` repite estos pasos para quien solo tenga la carpeta publicada.

**Actualizar una publicación:** sube los archivos nuevos sustituyendo los antiguos. La app se
actualiza sola la siguiente vez que se abre con conexión, porque la huella cambia el nombre de la
caché. Los trozos del modelo solo hay que subirlos si cambian (`htdemucs.json` lo dice).

## 6. Probar en el Mac

```
cd publicar
python3 -m http.server 8000
```

Después abre `http://localhost:8000` en Safari o Chrome. Ctrl + C lo detiene. No sirve abrir
`index.html` con doble clic, porque el navegador bloquea el service worker y el modelo fuera de un servidor.

## 7. Procedimiento para una versión nueva

**Antes de tocar nada**
1. Partir siempre del zip de la última versión entregada (o de la carpeta actual si se ha cambiado
   algo a mano). Nunca reconstruir de memoria.
2. Descomprimirlo en una carpeta vacía, ejecutar `herramientas/construir.sh` y comprobar que la
   huella coincide con la de `MANTENIMIENTO.md` §3. Si no coincide, alguien ha cambiado algo:
   averiguar qué antes de seguir.
3. Pasar las pruebas (`pruebas/ejecutar.sh`) para partir de un estado correcto.

**Durante el trabajo**
- Anotar cada cambio en `CAMBIOS.md`, en «[Sin publicar]».
- Si cambia lo que se guarda en el navegador: clave nueva o campos nuevos con lectura de los antiguos.
  Anotarlo en «Migración de esquema». Nunca borrar la lectura de una versión anterior.
- Si cambia el uso, actualizar `MANUAL.md`. Si cambia una decisión, `ESPECIFICACIONES.md` (§6).
- Si se añade una prueba, que entre en `pruebas/ejecutar.sh`.

**Al entregar**
1. Subir `VERSION` y `fuente/package.json` (SemVer: MAYOR rompe compatibilidad, MENOR añade, PARCHE corrige).
2. En `CAMBIOS.md`, «[Sin publicar]» pasa a «[X.Y.Z] - AAAA-MM-DD» con Resumen y Migración de esquema,
   y se deja un «[Sin publicar]» vacío encima. No se reescriben las entradas de versiones entregadas.
3. Cambiar «Versión X.Y.Z» al principio de `MANUAL.md` y `APP_VERSION` en `fuente/app.html`, y anotar la huella nueva en este documento
   (§3), junto con el registro de pruebas (§4).
4. `bash herramientas/construir.sh` y después
   `bash herramientas/entrega.sh --pruebas --anterior <zip-anterior>`.
   Comprueba versiones (también la que muestra la app), sintaxis, que `publicar/` esté al día, la integridad del
   modelo, el tamaño de los archivos y que no haya audio ni credenciales; pasa las pruebas; genera
   `tempo-de-salon_vX.Y.Z_AAAA-MM-DD.zip` y lo compara con el anterior. **No se entrega con errores.**
5. Un zip entregado no se reemplaza nunca: si tiene un error, se corrige en una versión nueva.

## 8. Dependencias

| Paquete | Versión | Uso | Licencia |
| --- | --- | --- | --- |
| soundtouchjs | 0.3.0 | Tempo sin cambiar el tono (`st.js`) | LGPL-2.1 |
| @spotify/basic-pitch | 1.0.1 | Notas a partir del audio (`bp.js`, con su modelo y TensorFlow.js 3.21) | Apache-2.0 |
| opensheetmusicdisplay | 2.2.1 | Dibujo de la partitura (`osmd.js`) | BSD-3-Clause |
| onnxruntime-web | 1.23.2 | Ejecución del modelo de separación (`separador.js` y `ort-wasm-*`) | MIT |
| demucs (demucs-js) | 1.0.0 | Código de separación (en `fuente/vendor/`) y pesos htdemucs | MIT · pesos de uso personal o de investigación |
| @fontsource… Bodoni Moda, Figtree, IBM Plex Mono | 5.3.0 | Fuentes de la versión instalable | OFL-1.1 |
| esbuild | 0.28.2 | Empaquetado (solo para construir) | MIT |
| @tensorflow/tfjs | 4.22.0 | Solo para que npm conserve la instalación interna de Basic Pitch | Apache-2.0 |

`fuente/entradas/bp.js` importa TensorFlow.js desde `@spotify/basic-pitch/node_modules/...` para usar
exactamente la versión que espera Basic Pitch. Por eso `@tensorflow/tfjs` 4.22.0 sigue en
`package.json`: si se quita, npm cambia la instalación de sitio y el empaquetado falla.

## 9. Referencias

- Desde la 1.0.0 solo se mantiene la PWA. El artefacto «Tempo de Salón» de Claude se quedó en su versión 5
  (equivalente a la 0.4.0) y no se actualiza.
- La 0.4.0 (YouTube) se entregó sin zip de proyecto y no continúa; la 1.0.0 parte de la 0.3.0.
- Normas de YouTube: no permiten descargar, separar ni reproducir solo el sonido de sus vídeos.
