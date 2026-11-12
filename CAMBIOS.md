# Cambios de Tempo de Salón

Formato: cada versión indica la fecha, un **Resumen** y la **Migración de esquema** (qué cambia
en los datos guardados en el navegador). Las versiones siguen SemVer: MAYOR rompe compatibilidad,
MENOR añade funciones, PARCHE corrige. Las entradas de versiones ya entregadas no se reescriben;
un error en una versión entregada se corrige con una versión nueva.

## [Sin publicar]

### Resumen
- Proyecto en GitHub (`xjav-dev/tempo`) con `.gitignore` y `README.md`. GitHub Pages publica la rama `main`
  desde la raíz: `.nojekyll` (se sirve tal cual) e `index.html` de portada que lleva a `publicar/`.
  La app queda en `https://xjav-dev.github.io/tempo/publicar/` (con `…/tempo/` como atajo).
- `herramientas/entrega.sh` deja fuera del zip y de la revisión la carpeta `.git`.

### Migración de esquema
Sin cambios.

## [1.0.0] - 2026-11-12

### Resumen
Primera versión como PWA únicamente (la versión dentro de Claude deja de mantenerse) y con una
lista de **vídeos**.
- **Lista de vídeos**: se añaden vídeos (MP4, MOV…) desde Fotos o Archivos; se guardan dentro de la
  app con una miniatura. Siguen admitiéndose archivos de audio.
- Al añadir un vídeo, la app **extrae su sonido** (WAV 44,1 kHz) y calcula **BPM y primer tiempo**.
  Si el sonido no se puede leer, el vídeo se reproduce con su propio sonido (tono conservado), sin análisis.
- **Vídeo sincronizado**: silenciado, sigue al motor de audio a cualquier tempo (corrección de deriva
  por velocidad y, si hace falta, por salto).
- Por vídeo y de forma permanente: **tramo** (desde/hasta, «Marcar aquí», teclas I y O, franja en la
  barra de posición), **bucle** del tramo, **BPM original** editable y **BPM de ensayo** manual
  (−5, −1, +1, +5, «Original», o escrito). Desaparece la progresión automática y la duración máxima por tema.
- **Análisis** por vídeo («Analizar canales y partitura»): separación en voz, batería, bajo y resto,
  nuevo cálculo del pulso con batería y bajo, y partitura de cada canal. Cola de trabajos con progreso,
  cancelar, guardar los canales en Archivos y borrar canales y partitura. Los vídeos de más de 8 minutos
  se separan solo en su tramo (8 minutos como máximo).
- **Canales**: botones Original · Voz · Batería · Bajo · Resto bajo el vídeo. Suenan los elegidos y la
  **partitura muestra solo sus partes**, avanzando con el vídeo; volumen por canal.
- Lista: repetir la lista, pausa entre vídeos, **solo audio** (oculta el vídeo; tecla A) y espacio usado.
- Nombre de cada elemento editable; versión de la app en el pie de página.
- Los canales se decodifican solo cuando hace falta oírlos o analizarlos (menos memoria).

### Migración de esquema
- `localStorage`: clave nueva `tempo-salon-v3` (`settings`: `vol, lat, gap, repeatList, audioOnly`;
  `items[clave]`: `name, bpm, bpmSrc, downbeat, dbSrc, dance, practice, pct, seg{a,b}, loop, sel, gains, stemOff, audioErr`).
  Si no existe, se convierte `tempo-salon-v2` (o `v1`): el «BPM objetivo» pasa a BPM de ensayo, el volumen
  de cada pista se conserva, «Solo este tema» pasa a «Repetir la lista» desactivado, y se mantienen pausa,
  retraso y volumen. Los datos antiguos no se borran.
- IndexedDB `tempo-salon` (sigue en la versión 1): los registros de `songs` pasan a la forma
  `{key, v:3, name, kind, video{blob,type,fname}, thumb, audio, stems[{kind,blob}], stemOff}`. Los registros
  antiguos se convierten al leerlos (la pista `mix` pasa a `audio`) y se reescriben al guardarlos.
- Claves nuevas: `video|nombre|tamaño` para vídeos.

## [0.4.0] - 2026-11-03

### Resumen
- Vídeos de YouTube mediante el reproductor oficial: tema «solo vídeo» o vídeo enlazado a un archivo de
  audio propio. Se quitó el aislamiento COOP/COEP porque impedía incrustar YouTube.
- Entregada solo como paquete instalable, sin documentación ni zip de proyecto. **No continúa:** la 1.0.0
  parte de la 0.3.0 y no incluye YouTube (sus normas no permiten analizar ni separar el sonido de sus
  vídeos, y la nueva lista trabaja con archivos de vídeo propios).

### Migración de esquema
Campos `yt` y `nameAuto` por canción en `tempo-salon-v2`. La 1.0.0 los ignora.

## [0.3.0] - 2026-11-03

### Resumen
- **Separación de pistas en el dispositivo** (solo en la versión instalable): botón «Separar en voz,
  batería, bajo y resto» en Mezcla. Usa Demucs v4 (htdemucs) en ONNX dentro de un Web Worker, con la
  tarjeta gráfica (WebGPU) si está disponible y el procesador (WASM) si no; si la tarjeta gráfica
  falla a mitad, sigue con el procesador. Progreso por fases, cálculo del tiempo restante y «Cancelar».
- El resultado sustituye la pista única por cuatro pistas WAV estéreo de 16 bits a 44,1 kHz,
  se guarda en la biblioteca y se recalculan pulso y compás (respetando un primer tiempo marcado a mano).
- **Guardar las pistas en Archivos** (hoja de compartir del iPad o descarga).
- **Versión instalable** fuera de Claude: página completa, fuentes incluidas, `manifest.webmanifest`,
  iconos, service worker con modo sin conexión y caché del modelo, y aislamiento COOP/COEP para usar
  varios núcleos del procesador. Estructura plana con archivos de menos de 25 MB para poder subirla a
  GitHub Pages desde el navegador del iPad. Modelo dividido en 8 trozos con huella SHA-256.
- Ayuda «Separar las pistas» reescrita: la separación integrada primero; Moises o Logic Pro como alternativa.
- En la versión dentro de Claude, la Mezcla indica que la separación está en la versión instalable.
- Correcciones: el aviso «Hace falta el BPM» de la partitura se actualiza al terminar el cálculo;
  los MB de la descarga del modelo se muestran en unidades decimales (175 MB).

### Migración de esquema
Sin cambios en `localStorage` ni en IndexedDB. Nuevos almacenes de Cache Storage en la versión
instalable: `tds-<huella>` (archivos de la app) y `tds-modelo` (trozos del modelo, se conserva
entre versiones).

## [0.2.1] - 2026-11-03

### Resumen
- Batería de la partitura: detección por bandas (bombo, caja, charles) con suavizado de graves,
  enmascaramiento de colas y filtro de nivel. En el ejemplo detecta 24/24 bombos y 48/48 charles.
- Pulso: la energía grave se promedia en 30 ms y se usa la frecuencia de tramas exacta; el BPM y el
  primer tiempo del ejemplo salen exactos (84 BPM, 0,30 s).
- Bajo y melodía: se unen los trozos de una misma nota y se rellenan huecos pequeños; menos silencios cortos.

### Migración de esquema
Sin cambios. Las partituras ya guardadas no se rehacen solas: «Volver a generar» aplica las mejoras.

## [0.2.0] - 2026-11-03

### Resumen
- **Multipista**: canciones con pistas separadas (agrupación por nombre de archivo o «Añadir pistas
  de una canción») y **Mezcla** con volumen, silencio (M) y solo (S) por instrumento, y preajustes
  «Todo», «Solo ritmo» y «Sin voz».
- Motor de audio propio (Web Audio + SoundTouch) que cambia el tempo de todas las pistas a la vez,
  sincronizadas y sin cambiar el tono.
- **Partitura generada** (Basic Pitch → MusicXML → OpenSheetMusicDisplay) con melodía, bajo, batería
  y acordes, tonalidad estimada, compases según el baile; franja y cursor que siguen la música a
  cualquier tempo; tocar un compás salta a él.
- **Contador de compás** (tiempos y número de compás), detección del primer tiempo, «Marcar el 1»
  y mover el 1 un tiempo; compensación del retraso de altavoces Bluetooth/AirPlay.
- **Biblioteca en el dispositivo** (IndexedDB): canciones y partituras se conservan entre sesiones.
- Diseño pensado para iPad (horizontal y vertical, controles táctiles); ejemplo generado de vals en La
  con cuatro pistas y su partitura exacta.

### Migración de esquema
- `localStorage`: clave nueva `tempo-salon-v2`; si no existe, se leen los datos de `tempo-salon-v1`.
  Campos nuevos por canción: `downbeat`, `dbSrc`, `mix`. Ajustes nuevos: `lat`, `keepLib`, `parts`.
- IndexedDB nueva `tempo-salon` (versión 1) con los almacenes `songs` y `trans`.

## [0.1.0] - 2026-11-02

### Resumen
- Primera versión, como artefacto de Claude: cargar una playlist de MP3, cambiar la velocidad sin
  cambiar el tono (`preservesPitch` del navegador), BPM automático y con Tap, ½ y ×2.
- Baile por canción con el tempo de competición WDSF como objetivo y tabla de referencia.
- Bucle de toda la lista o de un tema, **progresión** de tempo por vueltas, duración máxima por tema
  con fundido y pausa entre temas. Atajos de teclado.

### Migración de esquema
Primera versión: `localStorage` `tempo-salon-v1` con ajustes y datos por canción (clave `nombre|tamaño`).
