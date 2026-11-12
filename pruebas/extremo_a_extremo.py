#!/usr/bin/env python3
"""Prueba de la app de punta a punta con un vídeo: instalación, sonido extraído, BPM, miniatura,
vídeo sincronizado, BPM de ensayo, tramo y bucle, solo audio, análisis (canales y partitura),
canal elegido → su partitura, recarga (todo se conserva) y sin conexión."""
import asyncio, os, sys, time
from playwright.async_api import async_playwright
from comun import RAIZ, servidor, chrome_args, comprueba, fallos
VIDEO = os.path.join(RAIZ, "pruebas", "audio", "prueba_video.mp4")
T = "window.TempoDeSalon"
async def main():
    with servidor(os.path.join(RAIZ, "publicar")) as url:
        async with async_playwright() as p:
            b = await p.chromium.launch(**chrome_args(), args=["--autoplay-policy=no-user-gesture-required"])
            ctx = await b.new_context(viewport={"width": 1180, "height": 820}); pg = await ctx.new_page()
            errores = []; pg.on("pageerror", lambda e: errores.append(str(e)))
            await pg.goto(url); await pg.wait_for_timeout(5000)
            r = await pg.evaluate(f"({{coi:self.crossOriginIsolated, sw:!!navigator.serviceWorker.controller, fuentes:[...document.fonts].filter(f=>f.status==='loaded').length, ver:{T}.APP_VERSION, pie:document.querySelector('#appVersion').textContent}})")
            comprueba(r["sw"] and r["coi"], "instalada: modo sin conexión y aislamiento", r)
            comprueba(r["fuentes"] >= 5, "fuentes locales cargadas", r)
            comprueba(r["ver"] == r["pie"] and r["ver"] == open(os.path.join(RAIZ, "VERSION")).read().strip(), "la versión del pie coincide con VERSION", r)
            await pg.set_input_files("#fileIn", VIDEO)
            for _ in range(60):
                await pg.wait_for_timeout(1000)
                r = await pg.evaluate(f"(()=>{{const s={T}.tracks[0]; return {{n:{T}.tracks.length, audio:!!s.audio, bpm:s.bpm, thumb:!!s.thumb}}}})()")
                if r["bpm"] and r["thumb"]: break
            comprueba(r["n"] == 1 and r["audio"], "vídeo añadido y su sonido extraído (el ejemplo desaparece)", r)
            comprueba(r["bpm"] and abs(r["bpm"] - 120) < 1, "BPM calculado ≈ 120", r)
            comprueba(r["thumb"], "miniatura creada", r)
            await pg.click("#playBtn"); await pg.wait_for_timeout(3000)
            r = await pg.evaluate(f"({{d:Math.abs(document.querySelector('#vid').currentTime-{T}.Eng.time()), m:document.querySelector('#vid').muted, p:!document.querySelector('#vid').paused}})")
            comprueba(r["m"] and r["p"] and r["d"] < 0.25, "vídeo silenciado y sincronizado con el sonido", r)
            await pg.click('[data-nudge="-5"]'); await pg.click('[data-nudge="-5"]'); await pg.wait_for_timeout(2500)
            r = await pg.evaluate(f"({{p:{T}.tracks[0].practice, r:{T}.Eng.tempo, d:Math.abs(document.querySelector('#vid').currentTime-{T}.Eng.time())}})")
            comprueba(r["p"] and abs(r["p"] - 110.1) < 0.2 and abs(r["r"] - 110.1 / 120.07) < 0.01, "BPM de ensayo manual (−10) y velocidad", r)
            comprueba(r["d"] < 0.25, "el vídeo sigue sincronizado a otra velocidad", r)
            await pg.fill("#segA", "0:04"); await pg.press("#segA", "Enter"); await pg.fill("#segB", "0:08"); await pg.press("#segB", "Enter")
            await pg.check("#loopChk"); await pg.evaluate(f"{T}.Eng.seek(7.6)"); await pg.wait_for_timeout(1500)
            r = await pg.evaluate(f"({{t:{T}.Eng.time(), seg:{T}.tracks[0].seg, loop:{T}.tracks[0].loop}})")
            comprueba(r["seg"] == {"a": 4, "b": 8} and r["loop"] and 4 <= r["t"] < 6, "tramo 0:04–0:08 en bucle: vuelve al inicio", r)
            await pg.click("#audioOnlyBtn"); await pg.wait_for_timeout(800)
            r = await pg.evaluate(f"({{box:getComputedStyle(document.querySelector('#videoBox')).display, vp:document.querySelector('#vid').paused, a:{T}.Eng.playing}})")
            comprueba(r["box"] == "none" and r["vp"] and r["a"], "solo audio: vídeo oculto y la música sigue", r)
            await pg.click("#audioOnlyBtn"); await pg.click("#playBtn")
            t0 = time.time(); await pg.click("#analyzeBtn")
            for _ in range(300):
                await pg.wait_for_timeout(3000)
                r = await pg.evaluate(f"(()=>{{const s={T}.tracks[0]; return {{job:!!s.job, stems:s.stems.map(x=>x.kind), score:s.hasScore}}}})()")
                if r["score"] and not r["job"]: break
            comprueba(sorted(r["stems"]) == ["bass", "drums", "other", "vocals"] and r["score"], f"análisis: 4 canales y partitura ({round(time.time() - t0)} s)", r)
            await pg.wait_for_timeout(1500)
            await pg.click('#chans [data-chan="drums"]'); await pg.wait_for_timeout(2000)
            r = await pg.evaluate(f"({{sel:{T}.tracks[0].sel, partes:[...document.querySelectorAll('#osmd text')].map(t=>t.textContent).filter(x=>/^(Batería|Bajo|Melodía|Acordes)$/.test(x)), g:{T}.Eng.tg, k:{T}.Eng.keys}})")
            ganancia = dict(zip(r["k"], r["g"]))
            comprueba(r["sel"] == ["drums"] and r["partes"] == ["Batería"], "elegir «Batería»: solo su partitura", r)
            comprueba(ganancia.get("drums") == 1 and ganancia.get("mix") == 0 and ganancia.get("vocals") == 0, "elegir «Batería»: solo suena la batería", ganancia)
            await pg.reload(); await pg.wait_for_timeout(6000)
            r = await pg.evaluate(f"(()=>{{const s={T}.tracks[0]; return {{stems:s.stems.length, score:s.hasScore, seg:s.seg, loop:s.loop, p:s.practice, sel:s.sel, thumb:!!s.thumb}}}})()")
            comprueba(r == {"stems": 4, "score": True, "seg": {"a": 4, "b": 8}, "loop": True, "p": 110.1, "sel": ["drums"], "thumb": True}, "al recargar se conserva todo", r)
            await ctx.set_offline(True); await pg.reload(); await pg.wait_for_timeout(5000)
            comprueba(await pg.evaluate(f"{T}.tracks.length===1 && !!document.querySelector('#vid').src"), "abre sin conexión con el vídeo guardado")
            comprueba(await pg.evaluate("document.documentElement.scrollWidth-innerWidth") == 0, "sin desbordamiento horizontal")
            comprueba(not errores, "sin errores de JavaScript", errores[:3])
            await b.close()
    sys.exit(1 if fallos else 0)
asyncio.run(main())
