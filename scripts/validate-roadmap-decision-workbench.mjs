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
const moduleText = await readText("frontend", "src", "decision-workbench.js");
const testText = await readText("frontend", "scripts", "test-decision-workbench.mjs");
const healthDoc = await readText("docs", "architecture", "financial-health-goal.md");
const scenarioDoc = await readText("docs", "architecture", "scenario-workbench.md");
const explainDoc = await readText("docs", "architecture", "decision-recommendation-explainability.md");
const runner = await readText("scripts", "run-validation-profile.mjs");
const validationProfiles = await readText("scripts", "validation-profiles.json");

for (const exportName of ["calculateGoalProgress", "calculateFinancialHealth", "createScenarioRun", "compareScenarioRuns", "createDecisionExplanation"]) {
  assert(moduleText.includes(`export function ${exportName}`), `Decision workbench missing export: ${exportName}`);
}

for (const requiredText of ["overallScore", "freshness", "missingEvidence", "targetAmount", "currentAmount", "gap", "progress", "projectedCompletionDate", "atRisk"]) {
  assert(healthDoc.includes(requiredText), `Financial health doc missing: ${requiredText}`);
}

for (const requiredText of ["Create", "Update", "Clone", "Run", "Compare", "Archive", "Restore", "inputVersion", "formulaVersion", "assumptionVersion", "timestamp", "warnings", "runVersion"]) {
  assert(scenarioDoc.includes(requiredText), `Scenario workbench doc missing: ${requiredText}`);
}

for (const requiredText of ["Fact", "Assumption", "Projection", "Rule Evaluation", "Recommendation", "summary", "confidence", "evidence", "constraints", "tradeOffs", "alternatives", "risks", "lifecycle", "Next Action"]) {
  assert(explainDoc.includes(requiredText), `Decision explainability doc missing: ${requiredText}`);
}

for (const testCoverage of ["projectedCompletionDate", "overallScore", "scoreDelta", "confidence", "Resolve constraints"]) {
  assert(testText.includes(testCoverage), `Decision workbench tests missing: ${testCoverage}`);
}

for (const reportName of [
  "financial-health-goal-execution-report.md",
  "scenario-workbench-execution-report.md",
  "decision-recommendation-explainability-execution-report.md",
]) {
  const report = await readText("docs", "roadmap", reportName);
  for (const section of ["## Summary", "## Changed Files", "## Validation", "## Remaining Risks", "## Recommended Next Prompt"]) {
    assert(report.includes(section), `${reportName} missing section: ${section}`);
  }
}

assert(packageJson.scripts["test:decision-workbench"], "Missing test:decision-workbench script");
assert(packageJson.scripts["validate:roadmap-decision-workbench"], "Missing validate:roadmap-decision-workbench script");
assert(runner.includes('"validate:roadmap-decision-workbench"') || validationProfiles.includes('"command": "npm run validate:roadmap-decision-workbench"'), "Validation profiles must include decision workbench validation");

console.log("Roadmap decision workbench validation passed.");
