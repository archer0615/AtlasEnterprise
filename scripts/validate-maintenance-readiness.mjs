import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-maintenance-readiness-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const nextRelease = await readFile(path.join(root, "docs", "reports", "pwa-next-release-planning-twenty-items-report.md"), "utf8");

const requiredItems = [
  "Maintenance evidence review",
  "Recurrence validation checkpoint",
  "Next release planning gate",
  "Maintenance scope ledger",
  "Validation cadence gate",
  "Visual cadence gate",
  "Offline cadence gate",
  "Cache cadence gate",
  "Backup cadence gate",
  "Audit cadence gate",
  "Report cadence gate",
  "Knowledge cadence gate",
  "Deployment cadence gate",
  "Preview cadence gate",
  "Simulator cadence gate",
  "Dashboard cadence gate",
  "Repository cadence gate",
  "Governance cadence gate",
  "Archive cadence gate",
  "Next release readiness gate",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Maintenance readiness report missing item: ${item}`);
}

assert(packageJson.scripts["validate:maintenance-readiness"], "Maintenance readiness validation script is missing");
assert(packageJson.scripts["validate:next-release-planning"], "Next release planning validation script is missing");
await assertValidationProfileIncludes(root, "validate:maintenance-readiness", assert);
await assertValidationProfileIncludes(root, "validate:next-release-planning", assert);
assert(requiredItems.length === 20, "Maintenance readiness validation must cover exactly 20 items");
assert(nextRelease.includes("PWA Next Release Planning Twenty Items Report"), "Next release planning report is missing");

console.log("Maintenance readiness validation passed with 20 items.");
