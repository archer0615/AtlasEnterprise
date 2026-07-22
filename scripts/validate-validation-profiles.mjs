import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readText(...segments) {
  return readFile(path.join(root, ...segments), "utf8");
}

const packageJson = JSON.parse(await readText("package.json"));
const runner = await readText("scripts", "run-validation-profile.mjs");
const manifest = await readText("scripts", "validation-profiles.json");
const profileDoc = await readText("docs", "status", "validation-profiles.md");
const workflow = await readText(".github", "workflows", "pages.yml");

for (const scriptName of ["validate:quick", "validate:feature", "validate:full", "validate:release"]) {
  assert(packageJson.scripts[scriptName], `Missing package script: ${scriptName}`);
}

assert(packageJson.scripts.validate === "npm run validate:quick", "`validate` must remain the convenient quick default");
assert(packageJson.scripts["validate:profiles"], "Missing package script: validate:profiles");
assert(packageJson.scripts["validate:profiles"].includes("validate-validation-profiles.mjs"), "Profile metadata validator is not wired");

for (const profileName of ["quick", "feature", "full", "release"]) {
  assert(manifest.includes(`"${profileName}"`), `Manifest missing profile: ${profileName}`);
  assert(profileDoc.includes(`validate:${profileName}`), `Profile doc missing validate:${profileName}`);
}

for (const requiredText of ["id", "durationMs", "exitCode", "logPath", ".tmp"]) {
  assert(runner.includes(requiredText), `Runner missing metadata: ${requiredText}`);
}

for (const releaseGate of ["validate:release-governance", "validate:archive-closure", "validate:retirement-evidence-review", "validate:release-closure-lock"]) {
  assert(manifest.includes(releaseGate), `Release profile missing gate: ${releaseGate}`);
}

assert(workflow.includes("npm run validate:feature"), "Pull request workflow must use the feature validation profile");
assert(workflow.includes("npm run validate:full"), "Main branch workflow must use the full validation profile");
assert(workflow.includes("npm run validate:release"), "Manual release workflow must use the release validation profile");
assert(workflow.includes("Build static PWA artifacts"), "GitHub Pages workflow must build static PWA artifacts");

console.log("Validation profile metadata validation passed.");
