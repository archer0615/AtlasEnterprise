import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-archive-closure-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const monitoring = await readFile(path.join(root, "docs", "reports", "pwa-post-release-monitoring-twenty-items-report.md"), "utf8");

const requiredItems = [
  "Archive manifest validation",
  "Release closure report",
  "Post-release monitoring checklist",
  "Release artifact manifest",
  "Validation artifact manifest",
  "Knowledge artifact manifest",
  "Visual artifact manifest",
  "Recovery artifact manifest",
  "Audit artifact manifest",
  "Operations artifact manifest",
  "Acceptance artifact manifest",
  "Signoff artifact manifest",
  "Local checkpoint manifest",
  "Clean working tree gate",
  "Post-release cache watch",
  "Post-release validation watch",
  "Post-release backup watch",
  "Post-release audit watch",
  "Post-release drift watch",
  "Closure checkpoint readiness",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Archive closure report missing item: ${item}`);
}

assert(packageJson.scripts["validate:archive-closure"], "Archive closure validation script is missing");
assert(packageJson.scripts["validate:post-release-monitoring"], "Post-release monitoring validation script is missing");
await assertValidationProfileIncludes(root, "validate:archive-closure", assert);
await assertValidationProfileIncludes(root, "validate:post-release-monitoring", assert);
assert(requiredItems.length === 20, "Archive closure validation must cover exactly 20 items");
assert(monitoring.includes("PWA Post-release Monitoring Twenty Items Report"), "Post-release monitoring report is missing");

console.log("Archive closure validation passed with 20 items.");
