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
const moduleText = await readText("frontend", "src", "readiness-policy.js");
const testText = await readText("frontend", "scripts", "test-readiness-policy.mjs");
const accessibilityDoc = await readText("docs", "architecture", "accessibility-responsive-performance.md");
const releaseDoc = await readText("docs", "architecture", "release-candidate-hardening.md");
const masterReport = await readText("docs", "roadmap", "master-codex-execution-report.md");
const runner = await readText("scripts", "run-validation-profile.mjs");
const validationProfiles = await readText("scripts", "validation-profiles.json");

for (const exportName of ["accessibilityChecklist", "responsiveViewports", "performanceBudgets", "evaluatePerformanceBudget", "createReleaseAcceptanceMatrix", "createReleaseHardeningChecklist", "createMasterExecutionStatus"]) {
  assert(moduleText.includes(exportName), `Readiness policy missing: ${exportName}`);
}

for (const requiredText of ["Semantic HTML", "Landmark", "Heading", "Label", "Visible focus", "Keyboard", "Dialog", "Contrast", "Reduced motion", "320px mobile", "Tablet", "Desktop", "Large desktop", "Startup", "Knowledge load", "Search", "IndexedDB query", "Projection", "Scenario run", "Render"]) {
  assert(accessibilityDoc.includes(requiredText), `Accessibility/performance doc missing: ${requiredText}`);
}

for (const requiredText of ["P0", "P1", "Functional", "Data Integrity", "Offline", "Upgrade", "Backup", "Accessibility", "Performance", "Security", "Dead code", "Unused generated artifacts", "Debug logs", "Broken links", "Archive policy", "Release notes", "Known limitations", "Upgrade notes", "Recovery guide", "Backup guide", "GitHub Pages production path", "Server, Database, or Cloud"]) {
  assert(releaseDoc.includes(requiredText), `Release hardening doc missing: ${requiredText}`);
}

for (const testCoverage of ["semantic-html", "keyboard-operation", "startupMs", "searchMs", "Functional", "Accessibility", "archive-policy-lock"]) {
  assert(testText.includes(testCoverage), `Readiness tests missing: ${testCoverage}`);
}

for (const reportName of [
  "accessibility-responsive-performance-execution-report.md",
  "release-hardening-execution-report.md",
  "master-codex-execution-report.md",
]) {
  const report = await readText("docs", "roadmap", reportName);
  for (const section of ["## Summary", "## Changed Files", "## Validation", "## Remaining Risks", "## Recommended Next Prompt"]) {
    assert(report.includes(section), `${reportName} missing section: ${section}`);
  }
}

for (const promptId of ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]) {
  assert(masterReport.includes(promptId), `Master execution report missing prompt: ${promptId}`);
}

assert(packageJson.scripts["test:readiness-policy"], "Missing test:readiness-policy script");
assert(packageJson.scripts["validate:roadmap-final-readiness"], "Missing validate:roadmap-final-readiness script");
assert(runner.includes('"validate:roadmap-final-readiness"') || validationProfiles.includes('"command": "npm run validate:roadmap-final-readiness"'), "Validation profiles must include final readiness validation");

console.log("Roadmap final readiness validation passed.");
