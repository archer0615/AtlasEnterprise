import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-backlog-acceptance-twenty-items-report.md"), "utf8");
const candidate = await readFile(path.join(root, "docs", "reports", "pwa-candidate-readiness-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Release backlog acceptance",
  "Candidate evidence stabilization",
  "Planning closure checkpoint",
  "Backlog priority gate",
  "Backlog dependency gate",
  "Backlog ownership gate",
  "Backlog validation gate",
  "Backlog visual evidence gate",
  "Backlog offline evidence gate",
  "Backlog cache evidence gate",
  "Backlog backup evidence gate",
  "Backlog audit evidence gate",
  "Backlog report evidence gate",
  "Backlog knowledge evidence gate",
  "Backlog deployment evidence gate",
  "Backlog preview evidence gate",
  "Backlog simulator evidence gate",
  "Backlog dashboard evidence gate",
  "Backlog governance evidence gate",
  "Release backlog checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release backlog acceptance report missing item: ${item}`);
}

assert(packageJson.scripts["validate:release-backlog-acceptance"], "Release backlog acceptance validation script is missing");
assert(packageJson.scripts.validate.includes("validate:release-backlog-acceptance"), "Full validation must include release backlog acceptance validation");
assert(requiredItems.length === 20, "Release backlog acceptance validation must cover exactly 20 items");
assert(candidate.includes("PWA Candidate Readiness Twenty Items Report"), "Candidate readiness report is missing");

console.log("Release backlog acceptance validation passed with 20 items.");
