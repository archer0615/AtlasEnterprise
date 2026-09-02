import assert from "node:assert/strict";
import { createDebouncedRender, runButtonTask } from "../src/runtime/ui-interaction-runtime.js";

const scheduled = [];
const scheduler = {
  clearTimeout: (id) => { if (id) scheduled[id - 1] = null; },
  setTimeout: (callback) => { scheduled.push(callback); return scheduled.length; },
};
const calls = [];
const debounced = createDebouncedRender((value) => calls.push(value), 120, scheduler);
debounced("first");
debounced("last");
assert.equal(scheduled[0], null);
scheduled[1]();
assert.deepEqual(calls, ["last"]);
debounced("after");
scheduled[2]();
assert.deepEqual(calls, ["last", "after"]);

const button = { disabled: false, textContent: "儲存", attributes: new Set(), setAttribute(name) { this.attributes.add(name); }, removeAttribute(name) { this.attributes.delete(name); } };
await runButtonTask(button, async () => { assert.equal(button.disabled, true); assert.equal(button.attributes.has("aria-busy"), true); button.textContent = "處理中"; });
assert.equal(button.disabled, false);
assert.equal(button.textContent, "儲存");
assert.equal(button.attributes.has("aria-busy"), false);
console.log("UI interaction runtime tests passed");
