// Service Worker de CDraw - SIN modo offline.
// Siempre carga los archivos desde la red para evitar versiones antiguas.
// Al activarse, elimina cualquier caché previa de versiones anteriores.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Sin caché: siempre a la red
  event.respondWith(fetch(event.request));
});