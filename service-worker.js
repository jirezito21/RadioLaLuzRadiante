const CACHE_VERSION = "v2026-01-07";
const STATIC_CACHE = `radio-static-${CACHE_VERSION}`;

const STATIC_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/logoradio.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// =======================
// INSTALACIÓN
// =======================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_FILES);
    })
  );
  self.skipWaiting();
});

// =======================
// ACTIVACIÓN
// =======================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// =======================
// FETCH
// =======================
self.addEventListener("fetch", event => {
  const request = event.request;

  // HTML → SIEMPRE red (evita caché viejo)
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Otros archivos → caché + actualización
  event.respondWith(
    caches.match(request).then(response => {
      return (
        response ||
        fetch(request).then(fetchResponse => {
          return caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});
