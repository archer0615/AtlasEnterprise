export const pwaRuntimeResilienceSchema = "atlas-enterprise.pwa-runtime-resilience.v1";

export function createPwaRuntimeSnapshot(input = {}) {
  const serviceWorker = normalizeServiceWorkerState(input.serviceWorker);
  const storage = normalizeStorageState(input.storage);
  const network = normalizeNetworkState(input.network);
  const issues = [
    ...serviceWorker.issues,
    ...storage.issues,
    ...network.issues,
  ];

  return Object.freeze({
    schema: pwaRuntimeResilienceSchema,
    status: issues.length === 0 ? "healthy" : "degraded",
    serviceWorker,
    storage,
    network,
    issues,
  });
}

export function createPwaRecoveryPlan(snapshot = createPwaRuntimeSnapshot()) {
  const actions = [];
  if (snapshot.serviceWorker.status !== "ready") actions.push("service-worker-reload");
  if (snapshot.storage.status !== "ready") actions.push("storage-health-check");
  if (snapshot.network.status === "offline") actions.push("offline-cache-fallback");
  if (snapshot.issues.includes("cache-version-mismatch")) actions.push("cache-refresh");

  return Object.freeze({
    schema: "atlas-enterprise.pwa-recovery-plan.v1",
    status: actions.length === 0 ? "ready" : "recovery-required",
    actions,
  });
}

export function validatePwaRuntimeSnapshot(snapshot) {
  if (!snapshot || snapshot.schema !== pwaRuntimeResilienceSchema) {
    return { ok: false, reason: "invalid-pwa-runtime-schema" };
  }
  if (!["healthy", "degraded"].includes(snapshot.status)) {
    return { ok: false, reason: "invalid-pwa-runtime-status" };
  }
  if (!snapshot.serviceWorker || !snapshot.storage || !snapshot.network || !Array.isArray(snapshot.issues)) {
    return { ok: false, reason: "invalid-pwa-runtime-shape" };
  }
  return { ok: true };
}

function normalizeServiceWorkerState(input = {}) {
  const registered = Boolean(input.registered);
  const controlled = Boolean(input.controlled);
  const cacheVersion = String(input.cacheVersion || "");
  const latestVersion = String(input.latestVersion || cacheVersion);
  const issues = [];
  if (!registered) issues.push("service-worker-unregistered");
  if (registered && !controlled) issues.push("service-worker-not-controlling");
  if (cacheVersion && latestVersion && cacheVersion !== latestVersion) issues.push("cache-version-mismatch");

  return Object.freeze({
    status: registered && controlled && issues.length === 0 ? "ready" : "pending",
    registered,
    controlled,
    cacheVersion,
    latestVersion,
    updateAvailable: Boolean(input.updateAvailable || issues.includes("cache-version-mismatch")),
    issues,
  });
}

function normalizeStorageState(input = {}) {
  const quotaRatio = Number(input.quotaRatio || 0);
  const indexedDbReady = input.indexedDbReady !== false;
  const cacheReady = input.cacheReady !== false;
  const issues = [];
  if (!indexedDbReady) issues.push("indexeddb-unavailable");
  if (!cacheReady) issues.push("cache-unavailable");
  if (quotaRatio >= 0.8) issues.push("storage-quota-warning");

  return Object.freeze({
    status: issues.length === 0 ? "ready" : "warning",
    indexedDbReady,
    cacheReady,
    quotaRatio,
    issues,
  });
}

function normalizeNetworkState(input = {}) {
  const online = input.online !== false;
  return Object.freeze({
    status: online ? "online" : "offline",
    online,
    issues: online ? [] : ["network-offline"],
  });
}
