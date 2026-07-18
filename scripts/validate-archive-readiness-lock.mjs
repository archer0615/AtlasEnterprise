import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-archive-readiness-lock-twenty-items-report.md"), "utf8");
const handoff = await readFile(path.join(root, "docs", "reports", "pwa-handoff-readiness-review-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Archive readiness lock",
  "Handoff evidence inventory",
  "Operations continuity checkpoint",
  "Archive scope gate",
  "Archive dependency gate",
  "Archive ownership gate",
  "Archive validation gate",
  "Archive visual evidence gate",
  "Archive offline evidence gate",
  "Archive cache evidence gate",
  "Archive backup evidence gate",
  "Archive audit evidence gate",
  "Archive report evidence gate",
  "Archive knowledge evidence gate",
  "Archive deployment evidence gate",
  "Archive preview evidence gate",
  "Archive simulator evidence gate",
  "Archive dashboard evidence gate",
  "Archive governance evidence gate",
  "Archive readiness checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Archive readiness lock report missing item: ${item}`);
}

assert(packageJson.scripts["validate:archive-readiness-lock"], "Archive readiness lock validation script is missing");
assert(packageJson.scripts.validate.includes("validate:archive-readiness-lock"), "Full validation must include archive readiness lock validation");
assert(requiredItems.length === 20, "Archive readiness lock validation must cover exactly 20 items");
assert(handoff.includes("PWA Handoff Readiness Review Twenty Items Report"), "Handoff readiness review report is missing");

console.log("Archive readiness lock validation passed with 20 items.");
