import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { bootstrapApplication } from "../src/app/bootstrap.js";
import { createFrontendCompositionRoot } from "../src/app/composition-root.js";
import { createRuntimeRegistry } from "../src/app/runtime-registry.js";

const root = process.cwd();
const main = await readFile(path.join(root, "frontend", "src", "main.js"), "utf8");
const bootstrap = await readFile(path.join(root, "frontend", "src", "app", "bootstrap.js"), "utf8");
const context = await readFile(path.join(root, "frontend", "src", "app", "application-context.js"), "utf8");
const compositionRoot = await readFile(path.join(root, "frontend", "src", "app", "composition-root.js"), "utf8");

assert.match(main, /bootstrapApplication\(\)\.catch\(handleFatalApplicationError\)/);
assert.match(bootstrap, /createFrontendCompositionRoot/);
assert.match(bootstrap, /createApplicationLifecycle/);
assert.match(context, /createFrontendCompositionRoot/);
assert.match(compositionRoot, /registerInfrastructure/);
assert.match(compositionRoot, /registerStores/);
assert.match(compositionRoot, /registerRoutes/);
assert.match(compositionRoot, /registerDashboard/);
assert.match(compositionRoot, /registerFeatures/);

const documentRef = { querySelector() { return null; } };
const rootInstance = createFrontendCompositionRoot({ documentRef, loadRuntime: async () => ({}) });
assert.equal(rootInstance.runtimeContext.runtimeMetadata.runtimeId, "atlas-frontend-runtime");
assert.deepEqual(rootInstance.routes.list().map((route) => route.id), ["dashboard", "knowledge", "scenarios"]);
assert.deepEqual(rootInstance.dashboards.list().map((dashboard) => dashboard.id), ["dashboard-overview"]);
assert.ok(rootInstance.providers.resolve("runtime"));
rootInstance.dispose();

const registry = createRuntimeRegistry("test");
registry.register("only-once", () => ({ value: 1 }));
assert.throws(() => registry.register("only-once", () => ({ value: 2 })), /Duplicate test registration/);

const app = await bootstrapApplication({ documentRef, loadRuntime: async () => ({}) });
assert.equal(app.getStatus(), "running");
assert.equal(await app.suspend(), true);
assert.equal(app.getStatus(), "suspended");
assert.equal(await app.resume(), true);
assert.equal(app.dispose(), true);

console.log("Application bootstrap tests passed.");
