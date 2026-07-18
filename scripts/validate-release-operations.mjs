import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-operations-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const acceptance = await readFile(path.join(root, "docs", "reports", "pwa-release-acceptance-twenty-items-report.md"), "utf8");

const requiredItems = [
  "Release rollback drill",
  "Audit evidence index",
  "Validation trend summary",
  "Backup restore checkpoint",
  "Preview readiness gate",
  "Offline recovery check",
  "PWA cache integrity review",
  "Visual baseline confirmation",
  "Knowledge index synchronization",
  "Local repository persistence check",
  "Report diff evidence review",
  "Validation failure diagnosis review",
  "Audit retention verification",
  "Deployment manifest review",
  "Release note freshness check",
  "Validation history append check",
  "Simulator fixture consistency check",
  "Dashboard projection contract check",
  "Long task diagnostics check",
  "Final local checkpoint readiness",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release operations report missing item: ${item}`);
}

assert(packageJson.scripts.validate.includes("validate:release-operations"), "Full validation must include release operations validation");
assert(packageJson.scripts.validate.includes("validate:release-acceptance"), "Full validation must include release acceptance validation");
assert(requiredItems.length === 20, "Release operations validation must cover exactly 20 items");
assert(acceptance.includes("PWA Release Acceptance Twenty Items Report"), "Release acceptance report is missing");

console.log("Release operations validation passed with 20 items.");
