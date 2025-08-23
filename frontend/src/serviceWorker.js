// ----------------------------------------
// FRONTEND: src/serviceWorker.js
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
  }
});
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reports') {
    event.waitUntil(
      (async () => {
        const reports = await localforage.getItem('reports');
        for (const r of reports) await fetch('/api/report-sighting', { method: 'POST', body: JSON.stringify(r) });
        await localforage.removeItem('reports');
      })()
    );
  }
});