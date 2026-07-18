import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-signoff-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Release signoff ledger",
  "Acceptance evidence drift check",
  "Final archive readiness",
  "Local commit chain review",
  "Release note signoff",
  "Validation history signoff",
  "Visual baseline signoff",
  "Knowledge index signoff",
  "Deployment preview signoff",
  "Offline recovery signoff",
  "Backup restore signoff",
  "Audit persistence signoff",
  "Report diff signoff",
  "Failure diagnosis signoff",
  "Retention policy signoff",
  "Rollback drill signoff",
  "Operations report signoff",
  "Acceptance matrix signoff",
  "Long task governance signoff",
  "Final archive signoff",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release signoff report missing item: ${item}`);
}

assert(packageJson.scripts["validate:release-signoff"], "Release signoff validation script is missing");
assert(packageJson.scripts.validate.includes("validate:release-signoff"), "Full validation must include release signoff validation");
assert(requiredItems.length === 20, "Release signoff validation must cover exactly 20 items");

console.log("Release signoff validation passed with 20 items.");
