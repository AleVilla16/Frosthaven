// Service worker del Compagno di Frosthaven.
// Quando pubblichi una nuova versione dell'app, aumenta VERSIONE: i vecchi file in cache vengono cancellati.
const VERSIONE = 'v2';
const CACHE = 'compagno-frosthaven-' + VERSIONE;
const FILE_APP = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png',
  'favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILE_APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomi) => Promise.all(nomi.filter((n) => n.startsWith('compagno-frosthaven-') && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Pagina: prima la rete (così ricevi gli aggiornamenti), poi la copia salvata se sei offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copia = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copia)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Caratteri di Google Fonts: copia salvata subito, aggiornata in background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then((c) => c.match(req).then((salvata) => {
        const rete = fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => salvata);
        return salvata || rete;
      }))
    );
    return;
  }

  // Altri file dell'app: prima la cache, poi la rete.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then((salvata) => salvata || fetch(req)));
  }
});
