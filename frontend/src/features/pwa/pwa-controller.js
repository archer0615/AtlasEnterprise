import { renderPwaState } from "./pwa-view.js";

export function createPwaController({ dom, services, runtimeContext }) {
  const resilience = services.resolve("pwa-runtime-resilience");
  const authorization = services.resolve("frontend-authorization");

  function updateRuntimeHealth(input = {}) {
    authorization.assertAllowed({ boundary: "pwa-runtime-health", sessionStatus: input.sessionStatus || "active" });
    return resilience.update({
      serviceWorker: {
        registered: Boolean(input.registered),
        controlled: Boolean(input.controlled),
        cacheVersion: input.cacheVersion || "",
        latestVersion: input.latestVersion || input.cacheVersion || "",
        updateAvailable: Boolean(input.updateAvailable),
      },
      storage: {
        indexedDbReady: true,
        cacheReady: true,
        quotaRatio: Number(input.quotaRatio || 0),
      },
      network: {
        online: input.online !== false,
      },
    });
  }

  return {
    async initialize() {
      const browserRuntime = runtimeContext.browserRuntime;
      const navigatorRef = browserRuntime.navigator;
      const isOnline = navigatorRef && "onLine" in navigatorRef ? navigatorRef.onLine : true;
      renderPwaState(dom.optional("#offlineRepairPanel"), isOnline ? "ready" : "offline");
      updateRuntimeHealth({
        registered: Boolean(navigatorRef?.serviceWorker),
        controlled: Boolean(navigatorRef?.serviceWorker?.controller),
        online: isOnline,
      });
    },
    updateRuntimeHealth,
    getRuntimeHealth() {
      return resilience.snapshot();
    },
    getRecoveryPlan() {
      return resilience.recoveryPlan();
    },
    dispose() {},
  };
}
