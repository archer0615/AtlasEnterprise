import { strict as assert } from "node:assert";
import { createApplicationLifecycle } from "../src/app/application-lifecycle.js";

let initialized = 0;
let disposed = 0;
let persisted = 0;
let hydrated = 0;
const lifecycle = createApplicationLifecycle({
  initialize: () => { initialized += 1; },
  hydrate: () => { hydrated += 1; },
  persist: () => { persisted += 1; },
  dispose: () => { disposed += 1; },
});

assert.equal(await lifecycle.initialize(), true);
assert.equal(await lifecycle.initialize(), false);
assert.equal(initialized, 1);
assert.equal(hydrated, 1);
assert.equal(lifecycle.getStatus(), "running");
assert.equal(await lifecycle.suspend(), true);
assert.equal(lifecycle.getStatus(), "suspended");
assert.equal(persisted, 1);
assert.equal(await lifecycle.resume(), true);
assert.equal(lifecycle.getStatus(), "running");
assert.equal(lifecycle.dispose(), true);
assert.equal(lifecycle.dispose(), false);
assert.equal(disposed, 1);
assert.equal(await lifecycle.initialize(), true);

console.log("Feature lifecycle tests passed.");
