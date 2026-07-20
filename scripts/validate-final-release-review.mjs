import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-final-release-review-twenty-items-report.md"), "utf8");
const lock = await readFile(path.join(root, "docs", "reports", "pwa-release-evidence-lock-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Final release review",
  "Locked evidence audit",
  "Continuity closure checkpoint",
  "Final scope gate",
  "Final dependency gate",
  "Final ownership gate",
  "Final validation gate",
  "Final visual evidence gate",
  "Final offline evidence gate",
  "Final cache evidence gate",
  "Final backup evidence gate",
  "Final audit evidence gate",
  "Final report evidence gate",
  "Final knowledge evidence gate",
  "Final deployment evidence gate",
  "Final preview evidence gate",
  "Final simulator evidence gate",
  "Final dashboard evidence gate",
  "Final governance evidence gate",
  "Final release checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Final release review report missing item: ${item}`);
}

assert(packageJson.scripts["validate:final-release-review"], "Final release review validation script is missing");
await assertValidationProfileIncludes(root, "validate:final-release-review", assert);
assert(requiredItems.length === 20, "Final release review validation must cover exactly 20 items");
assert(lock.includes("PWA Release Evidence Lock Twenty Items Report"), "Release evidence lock report is missing");

console.log("Final release review validation passed with 20 items.");
