import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-planning-baseline-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Planning evidence baseline",
  "Release candidate grooming",
  "Next validation expansion",
  "Scope evidence inventory",
  "Candidate evidence inventory",
  "Validation expansion inventory",
  "Visual expansion inventory",
  "Offline expansion inventory",
  "Cache expansion inventory",
  "Backup expansion inventory",
  "Audit expansion inventory",
  "Report expansion inventory",
  "Knowledge expansion inventory",
  "Deployment expansion inventory",
  "Preview expansion inventory",
  "Simulator expansion inventory",
  "Dashboard expansion inventory",
  "Repository expansion inventory",
  "Governance expansion inventory",
  "Planning baseline checkpoint readiness",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Planning baseline report missing item: ${item}`);
}

assert(packageJson.scripts["validate:planning-baseline"], "Planning baseline validation script is missing");
assert(packageJson.scripts.validate.includes("validate:planning-baseline"), "Full validation must include planning baseline validation");
assert(requiredItems.length === 20, "Planning baseline validation must cover exactly 20 items");

console.log("Planning baseline validation passed with 20 items.");
