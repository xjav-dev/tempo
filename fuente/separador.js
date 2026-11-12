// Tempo de Salón · separador de pistas (se ejecuta en un Web Worker)
// Usa Demucs v4 (htdemucs) en ONNX, adaptado a JavaScript por Kevin Gibbons (demucs-js, MIT).
import * as ort from 'onnxruntime-web';
import { separateTracks } from './vendor/demucs-js/apply.js';

ort.env.wasm.wasmPaths = new URL('./', self.location.href).href;
ort.env.logLevel = 'error';

let session = null, model = null, usedEP = null;

const post = (m, t) => self.postMessage(m, t || []);

async function sha256(buf) {
  const h = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loadWeights() {
  const manifest = await (await fetch('htdemucs.json', { cache: 'no-cache' })).json();
  const all = new Uint8Array(manifest.bytes);
  let off = 0, got = 0;
  for (const p of manifest.parts) {
    const res = await fetch(p.file);
    if (!res.ok) throw new Error(`Falta el archivo ${p.file} (${res.status}). Comprueba que lo has subido.`);
    let chunk;
    if (res.body && res.body.getReader) {
      const reader = res.body.getReader(); const parts = []; let n = 0;
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        parts.push(value); n += value.length; got += value.length;
        post({ type: 'progress', phase: 'model', done: got, total: manifest.bytes });
      }
      chunk = new Uint8Array(n); let o = 0; for (const v of parts) { chunk.set(v, o); o += v.length; }
    } else {
      chunk = new Uint8Array(await res.arrayBuffer()); got += chunk.length;
      post({ type: 'progress', phase: 'model', done: got, total: manifest.bytes });
    }
    if (chunk.length !== p.bytes) throw new Error(`El archivo ${p.file} está incompleto (${chunk.length} de ${p.bytes} bytes). Vuelve a subirlo.`);
    if (p.sha256 && crypto.subtle) {
      const h = await sha256(chunk);
      if (h !== p.sha256) throw new Error(`El archivo ${p.file} está dañado. Vuelve a subirlo.`);
    }
    all.set(chunk, off); off += chunk.length;
  }
  return all;
}

async function makeSession(weights, ep) {
  const opts = { executionProviders: [ep], graphOptimizationLevel: 'all' };
  return ort.InferenceSession.create(weights, opts);
}

async function ensureModel(prefer) {
  if (session) return;
  post({ type: 'progress', phase: 'model', done: 0, total: 1 });
  const weights = await loadWeights();
  post({ type: 'progress', phase: 'init', done: 0, total: 1 });
  const order = prefer === 'wasm' ? ['wasm'] : (self.navigator && navigator.gpu ? ['webgpu', 'wasm'] : ['wasm']);
  let lastErr = null;
  for (const ep of order) {
    try {
      if (ep === 'wasm') {
        const threads = self.crossOriginIsolated ? Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 4))) : 1;
        ort.env.wasm.numThreads = threads;
      }
      session = await makeSession(weights, ep);
      usedEP = ep; break;
    } catch (e) { lastErr = e; session = null; }
  }
  if (!session) throw lastErr || new Error('No se ha podido iniciar el modelo.');
  model = {
    sources: ['drums', 'bass', 'other', 'vocals'], audioChannels: 2, samplerate: 44100, segment: 7.8,
    validLength(length) { const t = Math.floor(this.segment * this.samplerate); if (t < length) throw new Error('trozo demasiado largo'); return t; },
    async forward(mix, magspec) {
      const feeds = {};
      feeds[session.inputNames[0]] = new ort.Tensor('float32', mix.data, mix.shape);
      feeds[session.inputNames[1]] = new ort.Tensor('float32', magspec.data, magspec.shape);
      const r = await session.run(feeds);
      const a = r[session.outputNames[0]], b = r[session.outputNames[1]];
      return { outX: { data: a.data, shape: a.dims }, outXt: { data: b.data, shape: b.dims } };
    }
  };
  post({ type: 'ready', ep: usedEP, threads: ort.env.wasm.numThreads || 1 });
}

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type === 'separate') {
    try {
      await ensureModel(m.prefer);
      const t0 = performance.now();
      let tracks;
      try {
        tracks = await separateTracks(model, { channelData: m.channels, sampleRate: 44100 },
          (done, total) => post({ type: 'progress', phase: 'sep', done, total, ep: usedEP }), m.overlap ?? 0.25);
      } catch (err) {
        if (usedEP !== 'webgpu') throw err;
        // Si la tarjeta gráfica falla a mitad, se repite con el procesador
        session = null; usedEP = null;
        post({ type: 'fallback', message: String(err && err.message || err) });
        await ensureModel('wasm');
        tracks = await separateTracks(model, { channelData: m.channels, sampleRate: 44100 },
          (done, total) => post({ type: 'progress', phase: 'sep', done, total, ep: usedEP }), m.overlap ?? 0.25);
      }
      const names = ['drums', 'bass', 'other', 'vocals'];
      const buf = tracks.drums.channelData[0].buffer;
      const length = tracks.drums.channelData[0].length;
      post({ type: 'done', id: m.id, buffer: buf, length, names, ep: usedEP, seconds: (performance.now() - t0) / 1000 }, [buf]);
    } catch (err) {
      post({ type: 'error', id: m.id, message: String(err && err.message || err) });
    }
  }
};
