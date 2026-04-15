
// UP Darbar Service Worker v3
const CACHE = 'updarbar-v3';
const STATIC = ['/index.html','/agent.html','/admin.html','/style.css','/common.js','/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(err => console.warn('Cache partial fail:', err))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Always fetch Firebase from network — never cache Firebase data
  if (url.includes('firestore.googleapis.com') || url.includes('firebase') || url.includes('googleapis.com') || url.includes('gstatic.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }
  // Static assets: cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached || new Response('Offline - Please check internet connection', { status: 503 }));
    })
  );
});
