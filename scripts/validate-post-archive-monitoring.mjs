import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-post-archive-monitoring-twenty-items-report.md"), "utf8");
const closureVerification = await readFile(path.join(root, "docs", "reports", "pwa-archive-closure-verification-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Post-archive monitoring",
  "Final operations review",
  "Continuity retirement checkpoint",
  "Post-archive scope gate",
  "Post-archive dependency gate",
  "Post-archive ownership gate",
  "Post-archive validation gate",
  "Post-archive visual evidence gate",
  "Post-archive offline evidence gate",
  "Post-archive cache evidence gate",
  "Post-archive backup evidence gate",
  "Post-archive audit evidence gate",
  "Post-archive report evidence gate",
  "Post-archive knowledge evidence gate",
  "Post-archive deployment evidence gate",
  "Post-archive preview evidence gate",
  "Post-archive simulator evidence gate",
  "Post-archive dashboard evidence gate",
  "Post-archive governance evidence gate",
  "Post-archive monitoring checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Post-archive monitoring report missing item: ${item}`);
}

assert(packageJson.scripts["validate:post-archive-monitoring"], "Post-archive monitoring validation script is missing");
await assertValidationProfileIncludes(root, "validate:post-archive-monitoring", assert);
assert(requiredItems.length === 20, "Post-archive monitoring validation must cover exactly 20 items");
assert(closureVerification.includes("PWA Archive Closure Verification Twenty Items Report"), "Archive closure verification report is missing");

console.log("Post-archive monitoring validation passed with 20 items.");
