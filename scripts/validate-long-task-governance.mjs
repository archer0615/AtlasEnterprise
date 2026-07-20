import { readFile } from "node:fs/promises";
import { assertValidationProfileIncludes } from "./validation-profile-assertions.mjs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const runner = await readFile(path.join(root, "scripts", "run-long-task.mjs"), "utf8");
const archive = await readFile(path.join(root, "docs", "reports", "pwa-release-evidence-archive.md"), "utf8").catch(() => "");
const recovery = await readFile(path.join(root, "docs", "reports", "pwa-recovery-readiness-review.md"), "utf8").catch(() => "");
const retention = await readFile(path.join(root, "docs", "reports", "pwa-evidence-retention-policy.md"), "utf8").catch(() => "");
const fixtures = await readFile(path.join(root, "docs", "reports", "pwa-recovery-scenario-fixtures.md"), "utf8").catch(() => "");
const diagnostics = await readFile(path.join(root, "docs", "reports", "pwa-long-task-failure-diagnostics.md"), "utf8").catch(() => "");
const operations = await readFile(path.join(root, "docs", "reports", "pwa-release-operations-twenty-items-report.md"), "utf8").catch(() => "");

const stepsBlock = runner.match(/const steps = \[([\s\S]*?)\];/);
assert(stepsBlock, "Long task steps array is missing");

const steps = [...stepsBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const uniqueSteps = new Set(steps);

assert(packageJson.scripts["validate:long-task-governance"], "Long task governance validation script is missing");
assert(packageJson.scripts["validate:release-operations"], "Release operations validation script is missing");
await assertValidationProfileIncludes(root, "validate:long-task-governance", assert);
await assertValidationProfileIncludes(root, "validate:release-operations", assert);
assert(steps.length === 20, `Long task must contain exactly 20 steps, found ${steps.length}`);
assert(uniqueSteps.size === steps.length, "Long task contains duplicate steps");
assert(steps[0] === "validate", "Long task must start with full validation");
assert(steps.includes("report:release"), "Long task must generate release notes");
assert(steps.includes("report:validation-history"), "Long task must record validation history");
assert(steps.at(-1) === "validate:release-governance", "Long task must finish with release governance validation");
assert(runner.includes("[long-task]"), "Long task runner must emit diagnostic markers");
assert(runner.includes("failed at step"), "Long task runner must identify failed step");
assert(runner.includes("completed ${steps.length} steps"), "Long task runner must confirm completed step count");

for (const token of [
  "Release Evidence Archive",
  "Local Git Evidence",
  "Validation Evidence",
  "Generated Artifact Evidence",
  "Recovery Evidence",
]) {
  assert(archive.includes(token), `Release evidence archive missing ${token}`);
}

for (const token of [
  "Recovery Readiness Review",
  "Backup Restore",
  "Migration Recovery",
  "Offline Cache Recovery",
  "Rollback Boundary",
]) {
  assert(recovery.includes(token), `Recovery readiness review missing ${token}`);
}

for (const token of [
  "Evidence Retention Policy",
  "Retention Scope",
  "Retention Rules",
  "Rotation Rules",
  "Disposal Rules",
]) {
  assert(retention.includes(token), `Evidence retention policy missing ${token}`);
}

for (const token of [
  "Recovery Scenario Fixtures",
  "Valid Backup Restore",
  "Duplicate Scenario Guard",
  "Migration Failure Recovery",
  "Offline Cache Repair",
]) {
  assert(fixtures.includes(token), `Recovery scenario fixtures missing ${token}`);
}

for (const token of [
  "Long Task Failure Diagnostics",
  "Failure Marker",
  "Failed Step",
  "Elapsed Time",
  "Retry Boundary",
]) {
  assert(diagnostics.includes(token), `Long task failure diagnostics missing ${token}`);
}

assert(operations.includes("PWA Release Operations Twenty Items Report"), "Release operations report is missing");

console.log("Long task governance validation passed.");
