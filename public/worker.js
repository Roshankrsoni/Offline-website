var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
  '/todos/:id',
  '/index.html',
  '/worker.js'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(urlsToCache);
      }).then(self.skipWaiting())
  );


});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');

  evt.waitUntil(
      caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
              if (key !== CACHE_NAME) {
                  console.log('[ServiceWorker] Removing old cache', key);
                  return caches.delete(key);
              }
          }));
      })
  );

  self.clients.claim();
});
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.googleAnalytics.initialize();

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  if (evt.request.url.includes('nariohtools.com/')) {
      evt.respondWith(

          caches.open(CACHE_NAME).then(cache => {
              return cache.match(evt.request).then(cacheResponse => cacheResponse || fetch(evt.request).then(networkResponse => {
                  cache.put(evt.request, networkResponse.clone());
                  return networkResponse;
              }));

          }))

  } else {
      evt.respondWith(
          fetch(evt.request)
      )
  }


});