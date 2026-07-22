import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
for (const file of [
  "frontend/src/domain/goal/goal-validation.js",
  "frontend/src/domain/goal/goal-lifecycle.js",
  "frontend/src/runtime/goal-progress-projection.js",
  "frontend/src/runtime/financial-health-projection.js",
]) {
  const source = await readFile(path.join(root, file), "utf8");
  assert.equal(/\b(document|window|indexedDB|localStorage|HTMLElement)\b/.test(source), false, `${file} leaks browser globals`);
}

console.log("Goal and financial health runtime boundary tests passed.");
