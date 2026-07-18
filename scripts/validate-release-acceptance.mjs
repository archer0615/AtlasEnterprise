import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-acceptance-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Release acceptance matrix",
  "Operations evidence dashboard",
  "Checkpoint recovery rehearsal",
  "Rollback evidence verification",
  "Audit trace completeness",
  "Validation trend threshold",
  "Generated report freshness",
  "Visual drift acceptance",
  "Offline shell acceptance",
  "Knowledge asset acceptance",
  "Deployment artifact acceptance",
  "Preview smoke acceptance",
  "Simulator output acceptance",
  "Dashboard API acceptance",
  "Repository adapter acceptance",
  "Backup restore acceptance",
  "Failure diagnosis acceptance",
  "Retention policy acceptance",
  "Long task completion acceptance",
  "Final release checkpoint acceptance",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release acceptance report missing item: ${item}`);
}

assert(packageJson.scripts["validate:release-acceptance"], "Release acceptance validation script is missing");
assert(packageJson.scripts.validate.includes("validate:release-acceptance"), "Full validation must include release acceptance validation");
assert(requiredItems.length === 20, "Release acceptance validation must cover exactly 20 items");

console.log("Release acceptance validation passed with 20 items.");
