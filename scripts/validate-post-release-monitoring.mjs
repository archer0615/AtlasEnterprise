import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-post-release-monitoring-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const maintenance = await readFile(path.join(root, "docs", "reports", "pwa-maintenance-readiness-twenty-items-report.md"), "utf8");

const requiredItems = [
  "Post-release evidence review",
  "Monitoring drift threshold",
  "Maintenance readiness checkpoint",
  "Validation recurrence watch",
  "Visual recurrence watch",
  "Offline recurrence watch",
  "Cache recurrence watch",
  "Backup recurrence watch",
  "Audit recurrence watch",
  "Report recurrence watch",
  "Knowledge recurrence watch",
  "Deployment recurrence watch",
  "Preview recurrence watch",
  "Simulator recurrence watch",
  "Dashboard recurrence watch",
  "Repository recurrence watch",
  "Acceptance recurrence watch",
  "Signoff recurrence watch",
  "Archive recurrence watch",
  "Maintenance checkpoint readiness",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Post-release monitoring report missing item: ${item}`);
}

assert(packageJson.scripts["validate:post-release-monitoring"], "Post-release monitoring validation script is missing");
assert(packageJson.scripts["validate:maintenance-readiness"], "Maintenance readiness validation script is missing");
await assertValidationProfileIncludes(root, "validate:post-release-monitoring", assert);
await assertValidationProfileIncludes(root, "validate:maintenance-readiness", assert);
assert(requiredItems.length === 20, "Post-release monitoring validation must cover exactly 20 items");
assert(maintenance.includes("PWA Maintenance Readiness Twenty Items Report"), "Maintenance readiness report is missing");

console.log("Post-release monitoring validation passed with 20 items.");
