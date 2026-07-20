import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-next-release-planning-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const planningBaseline = await readFile(path.join(root, "docs", "reports", "pwa-planning-baseline-twenty-items-report.md"), "utf8");

const requiredItems = [
  "Next release scope draft",
  "Maintenance backlog grooming",
  "Governance cadence review",
  "Release theme selection",
  "Risk backlog triage",
  "Validation backlog triage",
  "Visual backlog triage",
  "Offline backlog triage",
  "Cache backlog triage",
  "Backup backlog triage",
  "Audit backlog triage",
  "Report backlog triage",
  "Knowledge backlog triage",
  "Deployment backlog triage",
  "Preview backlog triage",
  "Simulator backlog triage",
  "Dashboard backlog triage",
  "Repository backlog triage",
  "Governance backlog triage",
  "Next planning checkpoint readiness",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Next release planning report missing item: ${item}`);
}

assert(packageJson.scripts["validate:next-release-planning"], "Next release planning validation script is missing");
assert(packageJson.scripts["validate:planning-baseline"], "Planning baseline validation script is missing");
await assertValidationProfileIncludes(root, "validate:next-release-planning", assert);
await assertValidationProfileIncludes(root, "validate:planning-baseline", assert);
assert(requiredItems.length === 20, "Next release planning validation must cover exactly 20 items");
assert(planningBaseline.includes("PWA Planning Baseline Twenty Items Report"), "Planning baseline report is missing");

console.log("Next release planning validation passed with 20 items.");
