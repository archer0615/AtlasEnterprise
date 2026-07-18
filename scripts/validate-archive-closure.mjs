import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-archive-closure-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

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
assert(packageJson.scripts.validate.includes("validate:archive-closure"), "Full validation must include archive closure validation");
assert(requiredItems.length === 20, "Archive closure validation must cover exactly 20 items");

console.log("Archive closure validation passed with 20 items.");
