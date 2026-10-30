const CACHE_NAME = 'cartoon-studio-v1';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME && key.startsWith('cartoon-studio-')).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin && !url.pathname.endsWith('.glb')) return;
  if (url.pathname.endsWith('.glb')) {
    event.respondWith(caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(request);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        if (cached) return cached;
        throw error;
      }
    }));
    return;
  }
  event.respondWith(fetch(request).then(response => {
    if (response.ok && url.origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(async () => (await caches.match(request)) || (await caches.match('./index.html'))));
});