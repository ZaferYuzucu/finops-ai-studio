// Dev service worker (NO caching) — only to satisfy "installable" criteria in localhost tests.
// We intentionally do not cache assets in dev to avoid stale content while developing.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

