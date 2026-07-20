import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-evidence-freeze-review-twenty-items-report.md"), "utf8");
const backlog = await readFile(path.join(root, "docs", "reports", "pwa-release-backlog-acceptance-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Evidence freeze review",
  "Candidate closure validation",
  "Release continuity checkpoint",
  "Freeze scope gate",
  "Freeze dependency gate",
  "Freeze ownership gate",
  "Freeze validation gate",
  "Freeze visual evidence gate",
  "Freeze offline evidence gate",
  "Freeze cache evidence gate",
  "Freeze backup evidence gate",
  "Freeze audit evidence gate",
  "Freeze report evidence gate",
  "Freeze knowledge evidence gate",
  "Freeze deployment evidence gate",
  "Freeze preview evidence gate",
  "Freeze simulator evidence gate",
  "Freeze dashboard evidence gate",
  "Freeze governance evidence gate",
  "Evidence freeze checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Evidence freeze review report missing item: ${item}`);
}

assert(packageJson.scripts["validate:evidence-freeze-review"], "Evidence freeze review validation script is missing");
await assertValidationProfileIncludes(root, "validate:evidence-freeze-review", assert);
assert(requiredItems.length === 20, "Evidence freeze review validation must cover exactly 20 items");
assert(backlog.includes("PWA Release Backlog Acceptance Twenty Items Report"), "Release backlog acceptance report is missing");

console.log("Evidence freeze review validation passed with 20 items.");
