import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const main = [
  await readFile(path.join(root, "frontend", "src", "main.js"), "utf8"),
  await readFile(path.join(root, "frontend", "src", "legacy-main.js"), "utf8"),
].join("\n");
const html = await readFile(path.join(root, "frontend", "index.html"), "utf8");
const runtime = await readFile(path.join(root, "frontend", "src", "indexeddb-runtime.js"), "utf8");
const releaseNote = await readFile(path.join(root, "docs", "reports", "pwa-generated-release-note.md"), "utf8").catch(() => "");
const validationHistory = JSON.parse(await readFile(path.join(root, "docs", "reports", "validation-history.json"), "utf8").catch(() => "[]"));

assert(packageJson.scripts["task:long"], "Long task command consolidation is missing");
assert(packageJson.scripts["validate:release-governance"], "Release governance validation script is missing");
await assertValidationProfileIncludes(root, "validate:release-governance", assert);

for (const token of [
  "auditRetentionPolicy",
  "atlas-enterprise.audit-retention-policy.v1",
  "retainedActions",
  "reportDiffFixtures",
  "validationFailureFixtures",
  "buildReportDiff",
  "diagnoseValidationRecord",
  "persistentAuditEntries",
  "validationFailureDiagnosis",
  "reportDiff",
]) {
  assert(main.includes(token), `main.js missing governance token: ${token}`);
}

for (const id of ["persistentAuditPanel", "reportDiffPanel", "validationFailureDiagnosisPanel"]) {
  assert(html.includes(`id="${id}"`), `${id} is missing from release dashboard`);
}

for (const token of ["indexedDbAuditRepository", "auditEntries", "databaseVersion = 4"]) {
  assert(runtime.includes(token), `IndexedDB runtime missing ${token}`);
}

assert(releaseNote.includes("Validation Status Summary"), "Release note summary is missing");
assert(Array.isArray(validationHistory), "Validation history must be an array");

console.log("Release governance validation passed.");
