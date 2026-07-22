import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
for (const file of [
  "frontend/src/domain/asset/asset-validation.js",
  "frontend/src/domain/liability/liability-validation.js",
  "frontend/src/runtime/net-worth-projection.js",
]) {
  const source = await readFile(path.join(root, file), "utf8");
  assert.equal(/\b(document|window|indexedDB|localStorage|HTMLElement)\b/.test(source), false, `${file} leaks browser globals`);
}

console.log("Asset and liability runtime boundary tests passed.");
