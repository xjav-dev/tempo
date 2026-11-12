# Tempo de Salón · Especificaciones (versión 1.0.0)

## 1. Objetivo

Ensayar bailes de salón con vídeos propios: fijar a mano el tempo de ensayo sin que la música cambie
de tono, repetir el tramo que interesa, separar los instrumentos y ver la partitura de los que se
eligen, avanzando con el vídeo.

**Usuario principal:** una persona que baila y ensaya sola o en pareja, con un iPad (iPad Pro M4)
en la sala de ensayo. También se usa en un Mac.

**Nombre:** Tempo de Salón · nombre técnico `tempo-de-salon` (prefijo de los zips; no cambia).

## 2. Plataforma

Una sola versión: **PWA** (app web instalable) en `publicar/`, para cualquier web estática con https
(GitHub Pages) y, en el Mac, con un servidor local. Safari 26 o Chrome recientes. Se añade a la
pantalla de inicio y funciona sin conexión. La versión que funcionaba dentro de Claude deja de
mantenerse desde la 1.0.0 (decisión del propietario, 12-11-2026).

## 3. Funciones y criterios de aceptación

Estado: ✓ comprobado en las pruebas automáticas (Chrome) · ◐ parcialmente · ○ pendiente de probar en un iPad real.

| # | Función | Criterio de aceptación | Estado |
| --- | --- | --- | --- |
| F1 | Lista de vídeos | Añadir vídeos (MP4, MOV, M4V, WebM) y audios; miniatura; ordenar, quitar y renombrar; se guardan en el dispositivo. | ✓ |
| F2 | Sonido del vídeo | Al añadir un vídeo se extrae su sonido y se guarda; si no se puede, el vídeo suena por sí mismo con el tempo cambiado y el tono conservado. | ✓ (extracción) · ○ (vídeos grandes en iPad) |
| F3 | BPM | Cálculo automático; Tap; ½, ×2; escribirlo. Mezcla de prueba a 120 BPM → 120,07. | ✓ |
| F4 | BPM de ensayo manual | −5, −1, +1, +5, «Original» o escrito; entre el 40 % y el 160 % del original; se guarda por vídeo. Sin progresión automática. | ✓ |
| F5 | Tramo | Desde/hasta por vídeo (escrito o «Marcar aquí»), permanente; la reproducción empieza y acaba en el tramo. | ✓ |
| F6 | Bucle | Por vídeo; al final del tramo vuelve al inicio sin parar. | ✓ |
| F7 | Vídeo sincronizado | Silenciado y a la par del sonido a cualquier tempo (desfase < 0,25 s). | ✓ |
| F8 | Solo audio | Oculta el vídeo y sigue sonando la lista. | ✓ |
| F9 | Análisis | Separa voz, batería, bajo y resto (Demucs) y escribe la partitura; progreso, cancelar, borrar. Batería y bajo de la mezcla de prueba con coincidencia > 0,95. | ✓ (procesador) · ○ (WebGPU en iPad) |
| F10 | Canales | Elegir Original o uno o varios canales: suenan solo esos y la partitura muestra solo sus partes. | ✓ |
| F11 | Partitura sincronizada | Franja y cursor siguen al sonido y al vídeo; tocar un compás salta a él. | ✓ |
| F12 | Compás | Contador de tiempos y compases; «Marcar el 1»; ±1 tiempo; retraso del altavoz. | ✓ |
| F13 | Lista | Repetir la lista; pausa entre vídeos; fin de lista si no se repite. | ✓ |
| F14 | Persistencia y sin conexión | Todo se conserva al cerrar; la app abre sin red con los vídeos guardados. | ✓ |
| F15 | Migración | La biblioteca de la 0.3.0 aparece en la 1.0.0 con su BPM, baile, volumen y «BPM objetivo» como BPM de ensayo. | ✓ |
| F16 | Pantallas | iPad horizontal y vertical y móvil, claro y oscuro, sin desbordamiento; controles de 38–44 px o más. | ✓ (tamaños) · ○ (dispositivo) |

## 4. Arquitectura

Una página (`fuente/app.html`, unas 1750 líneas) con todo el código propio, más cuatro librerías
empaquetadas y el modelo de separación. Sin servidor: todo se procesa y se guarda en el navegador.

```
app.html ── Motor de audio (Web Audio + ScriptProcessor + SoundTouch): suma los canales elegidos con su volumen
   │         └─ los canales se decodifican al elegirlos (caché de 10); los separados pueden empezar en un desfase
   ├────── Motor de vídeo de reserva (<video> con su sonido) si no hay sonido extraído
   ├────── Vídeo silenciado sincronizado con el motor de audio (velocidad corregida cada 120 ms)
   ├────── Tramo y bucle (comprobación en cada fotograma)
   ├────── Cola de trabajos: sonido del vídeo → BPM y compás → canales (separador.js) → partitura (bp.js)
   ├────── Partitura: notas → cuantización al compás → MusicXML con las partes de los canales elegidos → osmd.js
   └────── Biblioteca: localStorage (ajustes y datos por vídeo) + IndexedDB (vídeo, sonido, canales, partituras)
separador.js (Web Worker): ONNX Runtime Web (WebGPU / WASM) + demucs-js + modelo htdemucs en 8 trozos
sw.js: caché de la app, caché del modelo, cabeceras COOP/COEP
```

Secciones de `fuente/app.html` (marcadas con `/* ==== … ==== */`): Datos · Almacenamiento · Estado ·
Motor de audio · Vídeo · Tramo y bucle · Análisis de pulso · Ejemplo generado · Partitura: transcripción ·
Partitura: escritura MusicXML · Partitura: dibujo y seguimiento · Análisis: trabajos · Lista ·
Reproducción · Pulso · Bucle de pantalla · Pintar · Sistema · Eventos · Arranque.

## 5. Datos guardados (esquema 3)

**localStorage `tempo-salon-v3`:**
- `settings`: `vol, lat, gap, repeatList, audioOnly`.
- `items[clave]`: `name, bpm, bpmSrc ('auto'|'tap'|'manual'), downbeat, dbSrc, dance, practice (BPM de ensayo o null = original), pct (velocidad si no hay BPM), seg{a, b|null}, loop, sel (canales elegidos), gains{canal: volumen}, stemOff, audioErr`.
- `order`: claves en el orden de la lista.
- Claves: `video|nombre|tamaño` (vídeos), `nombre|tamaño` (audios y canciones de la 0.3.0), `multi|…` (pistas propias de la 0.3.0).

**IndexedDB `tempo-salon` (versión 1):**
- `songs` `{key, v:3, name, kind:'video'|'audio', video:{blob,type,fname}|null, thumb (JPEG en data URL), audio (WAV 44,1 kHz 16 bits estéreo), stems:[{kind,blob}], stemOff}`.
  Canales: `mix` = `audio`; `vocals, drums, bass, other` (y `guitar`, `piano` de pistas propias antiguas).
- `trans` `{key, mode, off, melody, harmony, bass:[[inicio, duración, midi, intensidad]], drums:{kick,snare,hat}}` con tiempos absolutos del vídeo.

**Datos anteriores:** `tempo-salon-v2` y los registros antiguos de `songs` se leen y convierten
(ver `CAMBIOS.md`, 1.0.0). No se borran.

## 6. Decisiones de diseño

- **DD-01 · Todo en el dispositivo.** Ni los vídeos ni los resultados salen del iPad.
- **DD-02 · Motor propio con SoundTouch**: varios canales sincronizados y posición exacta para la partitura y el vídeo.
- **DD-03 · Tempo constante** para compás y partitura (grabaciones de estudio para baile).
- **DD-04 · Solo PWA** desde la 1.0.0: el modelo no cabe en un artefacto y una sola versión es más fácil de mantener.
- **DD-05 · Modelo htdemucs en 32 bits, en 8 trozos de menos de 25 MB** con huella SHA-256.
- **DD-06 · Versión publicada plana** (sin carpetas) para subirla a GitHub desde el iPad.
- **DD-07 · Aislamiento COOP/COEP** con el service worker, para usar varios núcleos sin tarjeta gráfica.
  La página no puede incrustar contenido de otras webs (ver DD-11).
- **DD-08 · Fuentes incluidas.**
- **DD-09 · Sonido y canales en WAV de 16 bits** (sin pérdida, sin codificador extra): unos 42 MB por
  canal y 4 minutos. Se pueden borrar canales y partitura para liberar espacio.
- **DD-10 · Partitura como guía**: ritmo, bajo, melodía y frases.
- **DD-11 · Solo archivos de vídeo propios; sin YouTube** (decisión del propietario, 12-11-2026). YouTube no
  permite analizar, separar ni reproducir solo el sonido de sus vídeos.
- **DD-12 · Vídeo silenciado que sigue al audio**: el sonido manda (canales, tempo exacto, partitura) y el
  vídeo se ajusta. Si no se puede extraer el sonido, manda el vídeo (motor de reserva).
- **DD-13 · BPM de ensayo manual por vídeo**, sin progresión automática (petición del propietario).
- **DD-14 · Separación limitada a 8 minutos** por la memoria del iPad: en vídeos más largos se separa el tramo.
- **DD-15 · Canales y partitura enlazados**: los canales elegidos deciden lo que suena y lo que se ve.
  «Original» muestra todas las partes.

## 7. Privacidad y exposición

- **Datos personales:** ninguno. No se piden cuentas ni se envía nada a terceros.
- **Conexiones de red:** solo a su propio sitio (app y modelo). Ninguna a terceros.
- **Exposición:** sitio estático sin servidor ni API. Quien tenga la dirección abre la app, pero solo ve lo
  que haya cargado en su propio navegador. Los nombres se escapan antes de mostrarse.
- **Repositorio público (GitHub Pages gratis):** cualquiera puede descargar los archivos de la app, incluido el
  modelo, cuyos pesos son de uso personal o de investigación (`fuente/LICENCIAS.txt`). Los vídeos nunca se suben.
- **Almacenamiento:** en iPad, la app de la pantalla de inicio y Safari guardan cada una sus datos.

## 8. Límites conocidos

- Vídeos muy grandes: extraer el sonido carga el archivo entero en memoria; si falla, suena el vídeo sin análisis.
- Separación sin tarjeta gráfica: unos 3–4 s de cálculo por segundo de música en un ordenador modesto.
- Con la pantalla bloqueada, iPadOS puede detener el sonido (el motor de audio es de la página).
- La partitura de canciones reales tendrá errores, sobre todo en el acompañamiento.
- Sin pruebas todavía en Safari de un iPad real (WebGPU, vídeos grandes, hoja de compartir).

## 9. Decisiones pendientes

- Titular y licencia del código propio.
- Crear el repositorio de GitHub y publicar.
