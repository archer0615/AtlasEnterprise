import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const runner = await readFile(path.join(root, "scripts", "run-long-task.mjs"), "utf8");
const archive = await readFile(path.join(root, "docs", "reports", "pwa-release-evidence-archive.md"), "utf8").catch(() => "");
const recovery = await readFile(path.join(root, "docs", "reports", "pwa-recovery-readiness-review.md"), "utf8").catch(() => "");

const stepsBlock = runner.match(/const steps = \[([\s\S]*?)\];/);
assert(stepsBlock, "Long task steps array is missing");

const steps = [...stepsBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const uniqueSteps = new Set(steps);

assert(packageJson.scripts["validate:long-task-governance"], "Long task governance validation script is missing");
assert(packageJson.scripts.validate.includes("validate:long-task-governance"), "Full validation must include long task governance");
assert(steps.length === 20, `Long task must contain exactly 20 steps, found ${steps.length}`);
assert(uniqueSteps.size === steps.length, "Long task contains duplicate steps");
assert(steps[0] === "validate", "Long task must start with full validation");
assert(steps.includes("report:release"), "Long task must generate release notes");
assert(steps.includes("report:validation-history"), "Long task must record validation history");
assert(steps.at(-1) === "validate:release-governance", "Long task must finish with release governance validation");

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

console.log("Long task governance validation passed.");
