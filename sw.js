
const CACHE='updarbar-v4';
const STATIC=['/index.html','/agent.html','/admin.html','/style.css','/common.js','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('firestore')||u.includes('firebase')||u.includes('googleapis')||u.includes('gstatic')){
    e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return;
  }
  e.respondWith(caches.match(e.request).then(cached=>{
    if(cached)return cached;
    return fetch(e.request).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(e.request,res.clone()));return res;}).catch(()=>cached||new Response('Offline',{status:503}));
  }));
});
