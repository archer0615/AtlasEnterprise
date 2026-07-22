import { strict as assert } from "node:assert";
import { createDomRegistry } from "../src/app/dom-registry.js";

const nodes = new Map([["#present", { id: "present" }]]);
const documentRef = { querySelector: (selector) => nodes.get(selector) || null };
const registry = createDomRegistry(documentRef);

assert.equal(registry.required({ feature: "test", id: "present" }).id, "present");
assert.equal(registry.optional("#missing"), null);
assert.throws(() => registry.required({ feature: "test", id: "missing" }), /test missing missing/);

console.log("DOM registry tests passed.");
