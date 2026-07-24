importScripts("sw-version.js");

const CACHE_NAME = self.ATLAS_CACHE_NAME || "atlas-knowledge-dev";
const APP_SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "sw-version.js",
  "src/main.js",
  "src/legacy-main.js",
  "src/app/bootstrap.js",
  "src/app/application-context.js",
  "src/app/application-lifecycle.js",
  "src/app/application-error-handler.js",
  "src/app/composition-root.js",
  "src/app/dom-registry.js",
  "src/security-boundary.js",
  "src/pwa-runtime-resilience.js",
  "src/application/ownership/current-owner-provider.js",
  "src/application/assets/asset-application-service.js",
  "src/application/incomes/income-application-service.js",
  "src/application/expenses/expense-application-service.js",
  "src/application/goals/goal-application-service.js",
  "src/application/liabilities/liability-application-service.js",
  "src/domain/asset/asset-contract.js",
  "src/domain/asset/asset-status.js",
  "src/domain/asset/asset-validation.js",
  "src/domain/income/income-contract.js",
  "src/domain/income/income-status.js",
  "src/domain/income/income-validation.js",
  "src/domain/expense/expense-contract.js",
  "src/domain/expense/expense-status.js",
  "src/domain/expense/expense-validation.js",
  "src/domain/goal/goal-contract.js",
  "src/domain/goal/goal-lifecycle.js",
  "src/domain/goal/goal-status.js",
  "src/domain/goal/goal-validation.js",
  "src/domain/liability/liability-contract.js",
  "src/domain/liability/liability-status.js",
  "src/domain/liability/liability-validation.js",
  "src/runtime/cashflow-projection.js",
  "src/runtime/financial-health-projection.js",
  "src/runtime/goal-progress-projection.js",
  "src/runtime/net-worth-projection.js",
  "src/indexeddb-runtime.js",
  "src/dashboard-model.js",
  "src/styles.css",
  "fixtures/dashboard-snapshot.json",
  "fixtures/dashboard-snapshots.json",
  "fixtures/dashboard-runtime-snapshots.json",
  "fixtures/dashboard-field-traceability.json",
  "fixtures/scenario-results.json",
  "fixtures/generated-fixture-cache-policy.json",
  "knowledge/index.json",
  "knowledge/search-index.json",
  "knowledge/document-assets.json",
  "icons/atlas-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL);
      const response = await fetch("knowledge/document-assets.json");
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

self.addEventListener("message", (event) => {
  const message = event.data || {};
  const allowedMessages = ["ATLAS_SW_HEALTH", "ATLAS_SW_SKIP_WAITING"];
  if (!allowedMessages.includes(message.type)) return;
  if (message.type === "ATLAS_SW_SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    event.ports?.[0]?.postMessage({
      schema: "atlas-enterprise.service-worker-health.v1",
      status: "ready",
      cacheName: CACHE_NAME,
      cachedRequestCount: keys.length,
      appShellCount: APP_SHELL.length
    });
  })());
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
      }).catch(() => caches.match("index.html"));
    })
  );
});
