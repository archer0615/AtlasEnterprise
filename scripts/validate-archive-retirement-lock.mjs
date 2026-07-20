import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const report = await readFile(path.join(root, "docs", "reports", "pwa-archive-retirement-lock-twenty-items-report.md"), "utf8");
const closure = await readFile(path.join(root, "docs", "reports", "pwa-retirement-closure-verification-twenty-items-report.md"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredItems = [
  "Archive retirement lock",
  "Final governance review",
  "Operations retirement seal",
  "Archive retirement scope gate",
  "Archive retirement dependency gate",
  "Archive retirement ownership gate",
  "Archive retirement validation gate",
  "Archive retirement visual evidence gate",
  "Archive retirement offline evidence gate",
  "Archive retirement cache evidence gate",
  "Archive retirement backup evidence gate",
  "Archive retirement audit evidence gate",
  "Archive retirement report evidence gate",
  "Archive retirement knowledge evidence gate",
  "Archive retirement deployment evidence gate",
  "Archive retirement preview evidence gate",
  "Archive retirement simulator evidence gate",
  "Archive retirement dashboard evidence gate",
  "Archive retirement governance evidence gate",
  "Archive retirement checkpoint",
];

for (const item of requiredItems) {
  assert(report.includes(item), `Archive retirement lock report missing item: ${item}`);
}

assert(packageJson.scripts["validate:archive-retirement-lock"], "Archive retirement lock validation script is missing");
await assertValidationProfileIncludes(root, "validate:archive-retirement-lock", assert);
assert(requiredItems.length === 20, "Archive retirement lock validation must cover exactly 20 items");
assert(closure.includes("PWA Retirement Closure Verification Twenty Items Report"), "Retirement closure verification report is missing");

console.log("Archive retirement lock validation passed with 20 items.");
