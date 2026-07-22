import { strict as assert } from "node:assert";
import { createEventListenerRegistry } from "../src/shared/event-listener-registry.js";

const target = {
  listeners: new Map(),
  addEventListener(name, handler) {
    this.listeners.set(name, handler);
  },
  removeEventListener(name) {
    this.listeners.delete(name);
  },
};

const registry = createEventListenerRegistry();
registry.add(target, "click", () => {});
assert.equal(registry.size(), 1);
assert.equal(target.listeners.has("click"), true);
registry.dispose();
assert.equal(registry.size(), 0);
assert.equal(target.listeners.has("click"), false);

console.log("Event listener registry tests passed.");
