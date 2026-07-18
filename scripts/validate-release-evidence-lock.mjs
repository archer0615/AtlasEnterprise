import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-release-evidence-lock-twenty-items-report.md"), "utf8");
const freeze = await readFile(path.join(root, "docs", "reports", "pwa-evidence-freeze-review-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Release evidence lock",
  "Continuity audit review",
  "Candidate final checkpoint",
  "Lock scope gate",
  "Lock dependency gate",
  "Lock ownership gate",
  "Lock validation gate",
  "Lock visual evidence gate",
  "Lock offline evidence gate",
  "Lock cache evidence gate",
  "Lock backup evidence gate",
  "Lock audit evidence gate",
  "Lock report evidence gate",
  "Lock knowledge evidence gate",
  "Lock deployment evidence gate",
  "Lock preview evidence gate",
  "Lock simulator evidence gate",
  "Lock dashboard evidence gate",
  "Lock governance evidence gate",
  "Release evidence lock checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Release evidence lock report missing item: ${item}`);
}

assert(packageJson.scripts["validate:release-evidence-lock"], "Release evidence lock validation script is missing");
assert(packageJson.scripts.validate.includes("validate:release-evidence-lock"), "Full validation must include release evidence lock validation");
assert(requiredItems.length === 20, "Release evidence lock validation must cover exactly 20 items");
assert(freeze.includes("PWA Evidence Freeze Review Twenty Items Report"), "Evidence freeze review report is missing");

console.log("Release evidence lock validation passed with 20 items.");
