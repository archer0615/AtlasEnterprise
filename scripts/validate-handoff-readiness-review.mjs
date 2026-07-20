import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-handoff-readiness-review-twenty-items-report.md"), "utf8");
const closure = await readFile(path.join(root, "docs", "reports", "pwa-release-closure-lock-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Handoff readiness review",
  "Closure evidence audit",
  "Release archive checkpoint",
  "Handoff scope gate",
  "Handoff dependency gate",
  "Handoff ownership gate",
  "Handoff validation gate",
  "Handoff visual evidence gate",
  "Handoff offline evidence gate",
  "Handoff cache evidence gate",
  "Handoff backup evidence gate",
  "Handoff audit evidence gate",
  "Handoff report evidence gate",
  "Handoff knowledge evidence gate",
  "Handoff deployment evidence gate",
  "Handoff preview evidence gate",
  "Handoff simulator evidence gate",
  "Handoff dashboard evidence gate",
  "Handoff governance evidence gate",
  "Handoff readiness checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Handoff readiness review report missing item: ${item}`);
}

assert(packageJson.scripts["validate:handoff-readiness-review"], "Handoff readiness review validation script is missing");
await assertValidationProfileIncludes(root, "validate:handoff-readiness-review", assert);
assert(requiredItems.length === 20, "Handoff readiness review validation must cover exactly 20 items");
assert(closure.includes("PWA Release Closure Lock Twenty Items Report"), "Release closure lock report is missing");

console.log("Handoff readiness review validation passed with 20 items.");
