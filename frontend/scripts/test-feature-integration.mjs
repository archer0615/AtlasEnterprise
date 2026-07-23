import { strict as assert } from "node:assert";
import { buildApplicationContext } from "../src/app/application-context.js";

const documentRef = { querySelector: () => null };
const context = buildApplicationContext(documentRef);

assert.ok(context.controllers.dashboard);
assert.ok(context.controllers.scenario);
assert.ok(context.controllers.decision);
assert.ok(context.controllers.knowledge);
assert.ok(context.controllers.loan);
assert.ok(context.controllers.portfolio);
assert.ok(context.controllers.backup);
assert.ok(context.controllers.profile);
assert.ok(context.controllers.navigation);
assert.ok(context.controllers.pwa);
context.dispose();

console.log("Feature integration tests passed.");
process.exit(0);
