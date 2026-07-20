import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-signoff-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const archiveClosure = await readFile(path.join(root, "docs", "reports", "pwa-archive-closure-twenty-items-report.md"), "utf8");

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
assert(packageJson.scripts["validate:archive-closure"], "Archive closure validation script is missing");
await assertValidationProfileIncludes(root, "validate:release-signoff", assert);
await assertValidationProfileIncludes(root, "validate:archive-closure", assert);
assert(requiredItems.length === 20, "Release signoff validation must cover exactly 20 items");
assert(archiveClosure.includes("PWA Archive Closure Twenty Items Report"), "Archive closure report is missing");

console.log("Release signoff validation passed with 20 items.");
