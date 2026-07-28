import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "docs/roadmap/v1.2.2-candidate-inventory.md",
  "docs/roadmap/v1.2.2-runtime-planning.md",
  "docs/roadmap/v1.2.2-release-follow-up-report.md",
  "docs/roadmap/v1.2.2-insurance-runtime-validation-plan.md",
  "docs/roadmap/v1.2.2-position-reporting-ui-plan.md",
  "docs/roadmap/v1.2.2-csv-write-path-expansion.md",
  "docs/roadmap/v1.2.2-backup-restore-ux-plan.md",
  "docs/roadmap/v1.2.2-live-deployment-monitoring.md",
];

for (const file of requiredFiles) {
  const content = await readFile(path.join(root, file), "utf8");
  assert(content.includes("v1.2.2") || content.includes("Position") || content.includes("CSV") || content.includes("Backup"), `${file} missing planning content`);
}

const inventory = await readFile(path.join(root, "docs/roadmap/v1.2.2-candidate-inventory.md"), "utf8");
for (const candidate of ["CAND-201", "CAND-202", "CAND-203", "CAND-204", "CAND-205", "CAND-206", "CAND-207"]) {
  assert(inventory.includes(candidate), `v1.2.2 inventory missing ${candidate}`);
}

console.log("v1.2.2 planning validation passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
