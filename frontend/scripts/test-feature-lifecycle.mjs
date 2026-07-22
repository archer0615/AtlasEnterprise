import { strict as assert } from "node:assert";
import { createApplicationLifecycle } from "../src/app/application-lifecycle.js";

let initialized = 0;
let disposed = 0;
const lifecycle = createApplicationLifecycle({
  initialize: () => { initialized += 1; },
  dispose: () => { disposed += 1; },
});

assert.equal(await lifecycle.initialize(), true);
assert.equal(await lifecycle.initialize(), false);
assert.equal(initialized, 1);
assert.equal(lifecycle.dispose(), true);
assert.equal(lifecycle.dispose(), false);
assert.equal(disposed, 1);
assert.equal(await lifecycle.initialize(), true);

console.log("Feature lifecycle tests passed.");
