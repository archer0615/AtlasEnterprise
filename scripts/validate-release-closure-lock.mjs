import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-closure-lock-twenty-items-report.md"), "utf8");
const finalReview = await readFile(path.join(root, "docs", "reports", "pwa-final-release-review-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Release closure lock",
  "Final evidence inventory",
  "Operational handoff checkpoint",
  "Closure scope gate",
  "Closure dependency gate",
  "Closure ownership gate",
  "Closure validation gate",
  "Closure visual evidence gate",
  "Closure offline evidence gate",
  "Closure cache evidence gate",
  "Closure backup evidence gate",
  "Closure audit evidence gate",
  "Closure report evidence gate",
  "Closure knowledge evidence gate",
  "Closure deployment evidence gate",
  "Closure preview evidence gate",
  "Closure simulator evidence gate",
  "Closure dashboard evidence gate",
  "Closure governance evidence gate",
  "Release closure checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release closure lock report missing item: ${item}`);
}

assert(packageJson.scripts["validate:release-closure-lock"], "Release closure lock validation script is missing");
await assertValidationProfileIncludes(root, "validate:release-closure-lock", assert);
assert(requiredItems.length === 20, "Release closure lock validation must cover exactly 20 items");
assert(finalReview.includes("PWA Final Release Review Twenty Items Report"), "Final release review report is missing");

console.log("Release closure lock validation passed with 20 items.");
