/* ================================
   SERVICE WORKER ULTRA LIGERO
   Radio La Luz Radiante
   ================================ */

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // ❌ NO cachear streaming ni APIs
  if (
    req.url.includes("icecast") ||
    req.url.includes("azuracast") ||
    req.destination === "audio"
  ) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res => {
        // Cache solo respuestas válidas
        if (res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open("radio-cache").then(cache => {
            cache.put(req, clone);
          });
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
