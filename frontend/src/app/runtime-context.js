export function createRuntimeContext(overrides = {}) {
  const now = overrides.clock?.now || (() => new Date());
  return Object.freeze({
    configuration: Object.freeze({ appName: "Atlas Enterprise", ...(overrides.configuration || {}) }),
    environment: overrides.environment || "browser",
    logger: overrides.logger || console,
    storage: overrides.storage || null,
    cache: overrides.cache || null,
    browserRuntime: createBrowserRuntimeContract(overrides.browserRuntime),
    theme: overrides.theme || "system",
    localization: Object.freeze({ locale: overrides.locale || "zh-TW" }),
    permission: Object.freeze({ mode: "local-user", ...(overrides.permission || {}) }),
    featureFlag: Object.freeze({ ...(overrides.featureFlag || {}) }),
    session: Object.freeze({ mode: "local", ...(overrides.session || {}) }),
    clock: Object.freeze({ now }),
    version: overrides.version || "0.1.0",
    buildInformation: Object.freeze({ source: "static-pwa", ...(overrides.buildInformation || {}) }),
    runtimeMetadata: Object.freeze({ runtimeId: overrides.runtimeId || "atlas-frontend-runtime", createdAt: now().toISOString() }),
  });
}

function createBrowserRuntimeContract(browserRuntime = globalThis) {
  const navigatorRef = browserRuntime?.navigator;
  const serviceWorker = navigatorRef?.serviceWorker
    ? Object.freeze({ controller: navigatorRef.serviceWorker.controller || null })
    : null;
  return Object.freeze({
    navigator: navigatorRef
      ? Object.freeze({
        onLine: navigatorRef.onLine !== false,
        serviceWorker,
      })
      : null,
  });
}
