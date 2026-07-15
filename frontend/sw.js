importScripts("/sw-version.js");

const CACHE_NAME = self.ATLAS_CACHE_NAME || "atlas-knowledge-dev";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw-version.js",
  "/src/main.js",
  "/src/dashboard-model.js",
  "/src/styles.css",
  "/fixtures/dashboard-snapshot.json",
  "/fixtures/dashboard-snapshots.json",
  "/knowledge/index.json",
  "/knowledge/search-index.json",
  "/knowledge/document-assets.json",
  "/icons/atlas-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL);
      const response = await fetch("/knowledge/document-assets.json");
      const assets = await response.json();
      await cache.addAll(assets.documents || []);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("/index.html"));
    })
  );
});
