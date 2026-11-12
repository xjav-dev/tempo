// Tempo de Salón · service worker
// 1) Guarda la app para que funcione sin conexión.
// 2) Guarda el modelo de separación la primera vez que se descarga.
// 3) Añade las cabeceras de aislamiento (COOP/COEP) que permiten usar varios núcleos del procesador.
const VERSION = 'tds-__VERSION__';
const MODEL = 'tds-modelo';
const SHELL = __SHELL__;
const NETWORK_FIRST = /(\/|index\.html|htdemucs\.json|manifest\.webmanifest)$/;

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== MODEL) await caches.delete(k);
    await self.clients.claim();
  })());
});

function isolate(res) {
  if (!res || res.status === 0 || res.type === 'opaque' || res.type === 'opaqueredirect') return res;
  const h = new Headers(res.headers);
  h.set('Cross-Origin-Embedder-Policy', 'require-corp');
  h.set('Cross-Origin-Opener-Policy', 'same-origin');
  h.set('Cross-Origin-Resource-Policy', 'same-origin');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const url = new URL(r.url);
  if (url.origin !== self.location.origin) return;
  if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;

  if (/htdemucs\.parte\d+\.bin$/.test(url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(MODEL);
      const hit = await c.match(r, { ignoreSearch: true });
      if (hit) return isolate(hit);
      const res = await fetch(r);
      if (res.ok) e.waitUntil(c.put(r, res.clone()));
      return isolate(res);
    })());
    return;
  }

  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const networkFirst = r.mode === 'navigate' || NETWORK_FIRST.test(url.pathname);
    if (!networkFirst) {
      const hit = await c.match(r, { ignoreSearch: true });
      if (hit) return isolate(hit);
    }
    try {
      const res = await fetch(r);
      if (res.ok) e.waitUntil(c.put(r, res.clone()));
      return isolate(res);
    } catch (err) {
      const hit = (await c.match(r, { ignoreSearch: true })) || (r.mode === 'navigate' ? await c.match('index.html') : null);
      if (hit) return isolate(hit);
      throw err;
    }
  })());
});
