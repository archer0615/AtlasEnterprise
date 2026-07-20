import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-candidate-readiness-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Candidate validation matrix",
  "Planning drift review",
  "Release readiness backlog",
  "Candidate scope gate",
  "Candidate risk gate",
  "Candidate validation gate",
  "Candidate visual gate",
  "Candidate offline gate",
  "Candidate cache gate",
  "Candidate backup gate",
  "Candidate audit gate",
  "Candidate report gate",
  "Candidate knowledge gate",
  "Candidate deployment gate",
  "Candidate preview gate",
  "Candidate simulator gate",
  "Candidate dashboard gate",
  "Candidate repository gate",
  "Candidate governance gate",
  "Candidate readiness checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Candidate readiness report missing item: ${item}`);
}

assert(packageJson.scripts["validate:candidate-readiness"], "Candidate readiness validation script is missing");
await assertValidationProfileIncludes(root, "validate:candidate-readiness", assert);
assert(requiredItems.length === 20, "Candidate readiness validation must cover exactly 20 items");

console.log("Candidate readiness validation passed with 20 items.");
