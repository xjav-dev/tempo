"""Utilidades de las pruebas: servidor local y navegador."""
import contextlib, functools, http.server, os, socket, threading
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def chrome_args():
    exe = os.environ.get("CHROME")  # ruta a Chrome si no se usa el Chromium de Playwright
    return {"executable_path": exe} if exe else {}
@contextlib.contextmanager
def servidor(carpeta):
    class H(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".wasm": "application/wasm", ".mjs": "text/javascript", ".webmanifest": "application/manifest+json"}
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(H, directory=carpeta))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    try: yield f"http://localhost:{port}/"
    finally: httpd.shutdown()
fallos = []
def comprueba(ok, desc, detalle=""):
    print(("✓ " if ok else "✗ ") + desc + ("" if ok else f"  → {detalle}"))
    if not ok: fallos.append(desc)
