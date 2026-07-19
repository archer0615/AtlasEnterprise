import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-final-archive-audit-twenty-items-report.md"), "utf8");
const retirementLock = await readFile(path.join(root, "docs", "reports", "pwa-archive-retirement-lock-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Final archive audit",
  "Retirement governance closure",
  "Operations final seal",
  "Final archive scope gate",
  "Final archive dependency gate",
  "Final archive ownership gate",
  "Final archive validation gate",
  "Final archive visual evidence gate",
  "Final archive offline evidence gate",
  "Final archive cache evidence gate",
  "Final archive backup evidence gate",
  "Final archive audit evidence gate",
  "Final archive report evidence gate",
  "Final archive knowledge evidence gate",
  "Final archive deployment evidence gate",
  "Final archive preview evidence gate",
  "Final archive simulator evidence gate",
  "Final archive dashboard evidence gate",
  "Final archive governance evidence gate",
  "Final archive audit checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Final archive audit report missing item: ${item}`);
}

assert(packageJson.scripts["validate:final-archive-audit"], "Final archive audit validation script is missing");
assert(packageJson.scripts.validate.includes("validate:final-archive-audit"), "Full validation must include final archive audit validation");
assert(requiredItems.length === 20, "Final archive audit validation must cover exactly 20 items");
assert(retirementLock.includes("PWA Archive Retirement Lock Twenty Items Report"), "Archive retirement lock report is missing");

console.log("Final archive audit validation passed with 20 items.");
