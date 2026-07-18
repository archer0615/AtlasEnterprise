import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-maintenance-readiness-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

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
assert(packageJson.scripts.validate.includes("validate:maintenance-readiness"), "Full validation must include maintenance readiness validation");
assert(requiredItems.length === 20, "Maintenance readiness validation must cover exactly 20 items");

console.log("Maintenance readiness validation passed with 20 items.");
