import assert from "node:assert/strict";
import { createResourceCache } from "../src/runtime/resource-cache.js";

let requests = 0;
const responses = new Map([
  ["data.json", { ok: true, json: async () => ({ value: 1 }) }],
  ["note.txt", { ok: true, text: async () => "cached note" }],
  ["shared", { ok: true, json: async () => ({ value: 2 }), text: async () => "shared text" }],
]);
const cache = createResourceCache(async (path) => {
  requests += 1;
  const response = responses.get(path);
  if (!response) return { ok: false, status: 404 };
  return response;
});

let concurrentRequests = 0;
const concurrentCache = createResourceCache(async () => {
  concurrentRequests += 1;
  await new Promise((resolve) => setTimeout(resolve, 5));
  return { ok: true, json: async () => ({ shared: true }) };
});
assert.deepEqual(await Promise.all([concurrentCache.json("shared"), concurrentCache.json("shared")]), [{ shared: true }, { shared: true }]);
assert.equal(concurrentRequests, 1, "concurrent cache calls should share one request");

assert.deepEqual(await cache.json("data.json"), { value: 1 });
assert.deepEqual(await cache.json("data.json"), { value: 1 });
assert.equal(await cache.text("note.txt"), "cached note");
assert.deepEqual(await cache.json("shared"), { value: 2 });
assert.equal(await cache.text("shared"), "shared text");
assert.equal(requests, 4);
assert.deepEqual(cache.getStats(), { hits: 1, misses: 4, size: 4, maxEntries: 256 });

await assert.rejects(() => cache.json("missing.json"), /404/);
await assert.rejects(() => cache.json("missing.json"), /404/);
assert.equal(requests, 6, "failed requests must be retried after eviction");
assert.deepEqual(cache.getStats(), { hits: 1, misses: 6, size: 4, maxEntries: 256 });

let boundedRequests = 0;
const boundedCache = createResourceCache(async (path) => {
  boundedRequests += 1;
  return { ok: true, json: async () => ({ path }) };
}, { maxEntries: 2 });
await boundedCache.json("one");
await boundedCache.json("two");
await boundedCache.json("one");
await boundedCache.json("three");
await boundedCache.json("two");
assert.equal(boundedRequests, 4, "bounded cache should evict the least recently used entry");

let staleReject;
let raceCalls = 0;
const raceCache = createResourceCache(async (path) => {
  if (path === "race" && raceCalls++ === 0) return new Promise((_, reject) => { staleReject = reject; });
  return { ok: true, json: async () => ({ fresh: true }) };
}, { maxEntries: 1 });
const staleRequest = raceCache.json("race");
await raceCache.json("fresh").catch(() => {});
const freshRequest = raceCache.json("race");
staleReject(new Error("stale failure"));
await assert.rejects(() => staleRequest, /stale failure/);
assert.deepEqual(await freshRequest, { fresh: true });
console.log("Resource cache tests passed.");
