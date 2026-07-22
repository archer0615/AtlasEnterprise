import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const main = await readFile(path.join(root, "frontend", "src", "main.js"), "utf8");
const bootstrap = await readFile(path.join(root, "frontend", "src", "app", "bootstrap.js"), "utf8");
const context = await readFile(path.join(root, "frontend", "src", "app", "application-context.js"), "utf8");

assert.match(main, /bootstrapApplication\(\)\.catch\(handleFatalApplicationError\)/);
assert.match(bootstrap, /buildApplicationContext/);
assert.match(bootstrap, /createApplicationLifecycle/);
assert.match(context, /createDashboardController/);
assert.match(context, /createPwaController/);

console.log("Application bootstrap tests passed.");
