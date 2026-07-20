import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-retirement-closure-verification-twenty-items-report.md"), "utf8");
const retirement = await readFile(path.join(root, "docs", "reports", "pwa-retirement-evidence-review-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Retirement closure verification",
  "Archive governance seal",
  "Final operations checkpoint",
  "Retirement closure scope gate",
  "Retirement closure dependency gate",
  "Retirement closure ownership gate",
  "Retirement closure validation gate",
  "Retirement closure visual evidence gate",
  "Retirement closure offline evidence gate",
  "Retirement closure cache evidence gate",
  "Retirement closure backup evidence gate",
  "Retirement closure audit evidence gate",
  "Retirement closure report evidence gate",
  "Retirement closure knowledge evidence gate",
  "Retirement closure deployment evidence gate",
  "Retirement closure preview evidence gate",
  "Retirement closure simulator evidence gate",
  "Retirement closure dashboard evidence gate",
  "Retirement closure governance evidence gate",
  "Retirement closure verification checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Retirement closure verification report missing item: ${item}`);
}

assert(packageJson.scripts["validate:retirement-closure-verification"], "Retirement closure verification validation script is missing");
await assertValidationProfileIncludes(root, "validate:retirement-closure-verification", assert);
assert(requiredItems.length === 20, "Retirement closure verification validation must cover exactly 20 items");
assert(retirement.includes("PWA Retirement Evidence Review Twenty Items Report"), "Retirement evidence review report is missing");

console.log("Retirement closure verification validation passed with 20 items.");
