import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
for (const file of [
  "frontend/src/domain/income/income-validation.js",
  "frontend/src/domain/expense/expense-validation.js",
  "frontend/src/runtime/cashflow-projection.js",
]) {
  const source = await readFile(path.join(root, file), "utf8");
  assert.equal(/\b(document|window|indexedDB|localStorage|HTMLElement)\b/.test(source), false, `${file} leaks browser globals`);
}

console.log("Income, expense, and cashflow runtime boundary tests passed.");
