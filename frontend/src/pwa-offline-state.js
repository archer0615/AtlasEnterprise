export const pwaOfflineStateSchema = "atlas-enterprise.pwa-offline-state.v1";

export function createOfflineUxState(input = {}) {
  return {
    schema: pwaOfflineStateSchema,
    offlineIndicator: input.isOnline === false ? "Offline" : "Online",
    updateAvailable: Boolean(input.waitingServiceWorker),
    applyUpdateEnabled: Boolean(input.waitingServiceWorker && !input.hasPendingWrite),
    staleData: Boolean(input.cacheVersion && input.latestVersion && input.cacheVersion !== input.latestVersion),
    quotaWarning: Number(input.usageRatio || 0) >= 0.8,
    backupReminder: Number(input.hoursSinceLastBackup ?? 0) >= 24,
  };
}

export function diffCacheManifest(previous = [], next = [], basePath = "/AtlasEnterprise/") {
  const previousSet = new Set(previous);
  const nextSet = new Set(next);
  return {
    schema: "atlas-enterprise.cache-manifest-diff.v1",
    basePath,
    added: next.filter((item) => !previousSet.has(item)),
    removed: previous.filter((item) => !nextSet.has(item)),
    retained: next.filter((item) => previousSet.has(item)),
  };
}

export function classifyPwaStorageFailure(error = {}) {
  const message = String(error.message || error);
  if (/quota/i.test(message)) return "Quota Warning";
  if (/indexeddb/i.test(message)) return "IndexedDB Unavailable";
  if (/cache/i.test(message)) return "Missing Cache Asset";
  return "Storage Error";
}
