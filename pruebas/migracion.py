#!/usr/bin/env python3
"""Prueba de migración: una biblioteca guardada por la 0.3.0 se abre en la versión actual sin perder nada."""
import asyncio, sys
from playwright.async_api import async_playwright
from comun import RAIZ, servidor, chrome_args, comprueba, fallos
async def main():
    with servidor(RAIZ) as url:
        async with async_playwright() as p:
            b = await p.chromium.launch(**chrome_args()); pg = await b.new_page()
            errores = []; pg.on("pageerror", lambda e: errores.append(str(e)))
            await pg.goto(url + "pruebas/sembrar_0_3.html"); await pg.evaluate("sembrar()")
            await pg.goto(url + "publicar/"); await pg.wait_for_timeout(6000)
            r = await pg.evaluate("""(()=>{const T=window.TempoDeSalon, s=T.tracks[0], st=JSON.parse(localStorage.getItem('tempo-salon-v3')||'{}').settings||{};
              return {n:T.tracks.length, nombre:s.name, audio:!!s.audio, bpm:s.bpm, ensayo:s.practice, baile:s.dance, sel:s.sel, ganancia:s.gains.mix,
                repetir:st.repeatList, pausa:st.gap, retraso:st.lat, viejo:!!localStorage.getItem('tempo-salon-v2')}})()""")
            print(r)
            comprueba(r["n"] == 1 and r["nombre"] == "prueba_mezcla" and r["audio"], "la canción de la 0.3.0 aparece con su sonido", r)
            comprueba(r["bpm"] == 120.08 and r["baile"] == "tango", "conserva BPM y baile", r)
            comprueba(r["ensayo"] == 100, "el «BPM objetivo» pasa a BPM de ensayo", r)
            comprueba(r["sel"] == ["mix"] and r["ganancia"] == 0.8, "suena el original con su volumen de antes", r)
            comprueba(r["repetir"] is False and r["pausa"] == 5 and r["retraso"] == 180, "ajustes convertidos (bucle de tema → no repetir lista, pausa, retraso)", r)
            comprueba(r["viejo"], "los datos antiguos no se borran", r)
            comprueba(not errores, "sin errores de JavaScript", errores[:3])
            await b.close()
    sys.exit(1 if fallos else 0)
asyncio.run(main())
