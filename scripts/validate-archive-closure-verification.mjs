import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-archive-closure-verification-twenty-items-report.md"), "utf8");
const archiveLock = await readFile(path.join(root, "docs", "reports", "pwa-archive-readiness-lock-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Archive closure verification",
  "Operational evidence lock",
  "Final continuity seal",
  "Closure verification scope gate",
  "Closure verification dependency gate",
  "Closure verification ownership gate",
  "Closure verification validation gate",
  "Closure verification visual evidence gate",
  "Closure verification offline evidence gate",
  "Closure verification cache evidence gate",
  "Closure verification backup evidence gate",
  "Closure verification audit evidence gate",
  "Closure verification report evidence gate",
  "Closure verification knowledge evidence gate",
  "Closure verification deployment evidence gate",
  "Closure verification preview evidence gate",
  "Closure verification simulator evidence gate",
  "Closure verification dashboard evidence gate",
  "Closure verification governance evidence gate",
  "Archive closure verification checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Archive closure verification report missing item: ${item}`);
}

assert(packageJson.scripts["validate:archive-closure-verification"], "Archive closure verification validation script is missing");
await assertValidationProfileIncludes(root, "validate:archive-closure-verification", assert);
assert(requiredItems.length === 20, "Archive closure verification validation must cover exactly 20 items");
assert(archiveLock.includes("PWA Archive Readiness Lock Twenty Items Report"), "Archive readiness lock report is missing");

console.log("Archive closure verification validation passed with 20 items.");
