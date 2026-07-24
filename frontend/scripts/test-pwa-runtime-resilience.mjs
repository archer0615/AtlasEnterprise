import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createFrontendCompositionRoot } from "../src/app/composition-root.js";
import { createPwaRecoveryPlan, createPwaRuntimeSnapshot, validatePwaRuntimeSnapshot } from "../src/pwa-runtime-resilience.js";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");

const healthy = createPwaRuntimeSnapshot({
  serviceWorker: { registered: true, controlled: true, cacheVersion: "v1", latestVersion: "v1" },
  storage: { indexedDbReady: true, cacheReady: true, quotaRatio: 0.2 },
  network: { online: true },
});
assert.equal(healthy.status, "healthy");
assert.deepEqual(validatePwaRuntimeSnapshot(healthy), { ok: true });
assert.equal(createPwaRecoveryPlan(healthy).status, "ready");

const degraded = createPwaRuntimeSnapshot({
  serviceWorker: { registered: true, controlled: false, cacheVersion: "v1", latestVersion: "v2" },
  storage: { indexedDbReady: false, cacheReady: true, quotaRatio: 0.9 },
  network: { online: false },
});
assert.equal(degraded.status, "degraded");
assert.equal(degraded.issues.includes("cache-version-mismatch"), true);
assert.equal(createPwaRecoveryPlan(degraded).actions.includes("cache-refresh"), true);

const events = [];
const documentRef = { querySelector: () => null };
const rootInstance = createFrontendCompositionRoot({
  documentRef,
  loadRuntime: async () => ({}),
  runtimeOverrides: { browserRuntime: { navigator: { onLine: false } } },
});
rootInstance.stateEvents.subscribe("pwa.runtime-health-changed", (event) => events.push(event.payload));
await rootInstance.initialize();
assert.equal(rootInstance.controllers.pwa.getRuntimeHealth().network.status, "offline");
assert.equal(events.length > 0, true);
assert.equal(rootInstance.services.resolve("pwa-runtime-resilience").validate().ok, true);
rootInstance.dispose();

const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
assert(serviceWorker.includes("ATLAS_SW_HEALTH"), "service worker health message is missing");
assert(serviceWorker.includes("ATLAS_SW_SKIP_WAITING"), "service worker update activation message is missing");
assert(serviceWorker.includes('"src/pwa-runtime-resilience.js"'), "service worker must cache PWA resilience module");
assert(serviceWorker.includes('"src/app/composition-root.js"'), "service worker must cache composition root");

const manifest = JSON.parse(await readFile(path.join(frontendRoot, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.scope, "./");
assert.equal(manifest.orientation, "any");
assert.equal(Array.isArray(manifest.categories), true);

console.log("PWA runtime resilience tests passed.");
