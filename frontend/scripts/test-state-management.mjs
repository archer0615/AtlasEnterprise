import { strict as assert } from "node:assert";
import { createFrontendCompositionRoot } from "../src/app/composition-root.js";
import { createStateEventBus } from "../src/app/state-events.js";
import { createStateStore, createStateTree } from "../src/app/state-store.js";
import { createRuntimeRegistry } from "../src/app/runtime-registry.js";

const documentRef = { querySelector() { return null; } };
const root = createFrontendCompositionRoot({ documentRef, loadRuntime: async () => ({}) });

const expectedStores = ["runtime", "session", "user", "dashboard", "navigation", "notification", "dialog", "theme", "preference", "cache", "feature"];
assert.deepEqual(root.stores.list().map((store) => store.id), expectedStores);
assert.equal(root.providers.resolve("stateTree"), root.stateTree);
assert.equal(root.providers.resolve("stateEvents"), root.stateEvents);

await root.initialize();
assert.equal(root.stateTree.validate().length, 0);

const dashboardStore = root.stores.resolve("dashboard");
dashboardStore.update((state, action) => ({ ...state, selectedScenarioId: action.scenarioId, refreshCount: state.refreshCount + 1 }), { scenarioId: "scenario-1" });
assert.equal(dashboardStore.select((state) => state.selectedScenarioId), "scenario-1");
assert.equal(dashboardStore.select((state) => state.refreshCount), 1);

const backup = root.backup();
assert.equal(backup.schema, "atlas-enterprise.frontend-state-backup.v1");
dashboardStore.reset();
assert.equal(dashboardStore.select((state) => state.selectedScenarioId), "");
root.stateTree.restore(backup);
assert.equal(dashboardStore.select((state) => state.selectedScenarioId), "scenario-1");

const snapshot = root.stateTree.snapshot();
assert.equal(snapshot.dashboard.selectedScenarioId, "scenario-1");
assert.throws(() => root.stores.register("dashboard", () => ({})), /Duplicate store registration/);

const cacheStore = root.stores.resolve("cache");
cacheStore.invalidateCache();
assert(root.stateEvents.history().some((event) => event.eventType === "CacheInvalidated"));
root.resetState();
assert.equal(dashboardStore.select((state) => state.refreshCount), 0);
root.dispose();
assert.equal(root.stateEvents.history().length, 0);

const eventBus = createStateEventBus();
let changed = 0;
eventBus.subscribe("StateChanged", () => { changed += 1; });
const standalone = createStateStore({ id: "standalone", classification: "Runtime Store", initialState: { count: 0 }, eventBus });
standalone.initialize();
standalone.hydrate();
standalone.ready();
standalone.update((state) => ({ ...state, count: state.count + 1 }));
assert.equal(changed, 1);
assert.equal(standalone.backup().state.count, 1);
standalone.restore({ state: { count: 2, version: 1 } });
assert.equal(standalone.select((state) => state.count), 2);
standalone.shutdown();
assert.equal(standalone.lifecycleStatus(), "shutdown");

const registry = createRuntimeRegistry("store");
const stateTree = createStateTree({ stores: registry, eventBus });
registry.register("one", () => createStateStore({ id: "one", classification: "Session Store", initialState: { value: "a" }, eventBus }));
stateTree.initialize();
assert.equal(stateTree.validate().length, 0);
assert.equal(stateTree.backup().stores.one.state.value, "a");
stateTree.dispose();

console.log("State management tests passed.");
