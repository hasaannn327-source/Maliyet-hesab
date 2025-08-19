const CACHE_NAME = 'imar-hesap-v6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.v2.png',
  '/icon-512.v2.png'
];

// Install event: sadece STATIC_ASSETS önbelleğe alınır
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event: eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch event: önce cache’de varsa döndür, yoksa network’ten getir ve cache’e ekle
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Chrome extension gibi özel istekleri atla
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        }).catch(() => {
          // Offline fallback olarak ana sayfa
          return caches.match('/');
        });
      })
  );
});
