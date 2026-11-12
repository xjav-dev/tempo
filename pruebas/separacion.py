#!/usr/bin/env python3
"""Prueba del separador: la batería y el bajo separados deben coincidir con los originales."""
import asyncio, json, sys
from playwright.async_api import async_playwright
from comun import RAIZ, servidor, chrome_args, comprueba, fallos
async def main():
    with servidor(RAIZ) as url:
        async with async_playwright() as p:
            b = await p.chromium.launch(**chrome_args()); pg = await b.new_page()
            await pg.goto(url + "pruebas/separacion.html")
            r = await pg.evaluate("prueba()"); await b.close()
    print(json.dumps(r, ensure_ascii=False))
    c = r["coincidencia"]
    comprueba(c["drums"] > 0.95, "batería separada ≈ batería original", c["drums"])
    comprueba(c["bass"] > 0.95, "bajo separado ≈ bajo original", c["bass"])
    sys.exit(1 if fallos else 0)
asyncio.run(main())
