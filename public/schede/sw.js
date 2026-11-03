const CACHE_NAME = 'fire-toolkit-v1';
const ASSETS_TO_CACHE = [
  '/schede/',
  '/schede/index.html',
  '/schede/manifest.webmanifest',
  '/schede/icons/icon-192.png',
  '/schede/icons/icon-512.png',
  '/schede/icons/apple-touch-icon.png'
];

// Install: cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Initial cache error (non-fatal):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network First with cache fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Solo richieste GET e dello stesso origin o schede
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(req);
        if (cachedResponse) return cachedResponse;
        if (req.mode === 'navigate') {
          return caches.match('/schede/index.html');
        }
        return new Response('Offline - Risorsa non in cache', { status: 503 });
      })
  );
});
