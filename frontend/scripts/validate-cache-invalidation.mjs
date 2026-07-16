import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
const swVersion = await readFile(path.join(frontendRoot, "sw-version.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(swVersion.includes("ATLAS_CACHE_NAME"), "sw-version.js must define ATLAS_CACHE_NAME");
assert(serviceWorker.includes("CACHE_NAME"), "service worker must use CACHE_NAME");
assert(serviceWorker.includes("caches.keys()"), "service worker must enumerate caches during activation");
assert(serviceWorker.includes("caches.delete(key)"), "service worker must delete stale caches during activation");
assert(serviceWorker.includes('"/fixtures/dashboard-runtime-snapshots.json"'), "service worker APP_SHELL must cache dashboard runtime snapshots");
assert(serviceWorker.includes('"/fixtures/generated-fixture-cache-policy.json"'), "service worker APP_SHELL must cache generated fixture cache policy");

console.log("Cache invalidation validation passed.");
