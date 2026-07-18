import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-retirement-evidence-review-twenty-items-report.md"), "utf8");
const monitoring = await readFile(path.join(root, "docs", "reports", "pwa-post-archive-monitoring-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Retirement evidence review",
  "Operations closure lock",
  "Archive final checkpoint",
  "Retirement scope gate",
  "Retirement dependency gate",
  "Retirement ownership gate",
  "Retirement validation gate",
  "Retirement visual evidence gate",
  "Retirement offline evidence gate",
  "Retirement cache evidence gate",
  "Retirement backup evidence gate",
  "Retirement audit evidence gate",
  "Retirement report evidence gate",
  "Retirement knowledge evidence gate",
  "Retirement deployment evidence gate",
  "Retirement preview evidence gate",
  "Retirement simulator evidence gate",
  "Retirement dashboard evidence gate",
  "Retirement governance evidence gate",
  "Retirement evidence checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Retirement evidence review report missing item: ${item}`);
}

assert(packageJson.scripts["validate:retirement-evidence-review"], "Retirement evidence review validation script is missing");
assert(packageJson.scripts.validate.includes("validate:retirement-evidence-review"), "Full validation must include retirement evidence review validation");
assert(requiredItems.length === 20, "Retirement evidence review validation must cover exactly 20 items");
assert(monitoring.includes("PWA Post-Archive Monitoring Twenty Items Report"), "Post-archive monitoring report is missing");

console.log("Retirement evidence review validation passed with 20 items.");
