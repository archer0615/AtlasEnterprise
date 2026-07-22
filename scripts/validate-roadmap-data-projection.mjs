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
const workflows = await readText("docs", "architecture", "core-financial-data-workflows.md");
const projectionDoc = await readText("docs", "architecture", "projection-read-model.md");
const dashboardMigration = await readText("docs", "architecture", "dashboard-real-data-migration.md");
const projectionModule = await readText("frontend", "src", "runtime-projection.js");
const projectionTest = await readText("frontend", "scripts", "test-runtime-projection.mjs");
const runner = await readText("scripts", "run-validation-profile.mjs");
const validationProfiles = await readText("scripts", "validation-profiles.json");

for (const domain of ["User", "Household", "Asset", "Liability", "Loan/Mortgage", "Income", "Expense", "CashFlow", "Goal", "Portfolio", "Position"]) {
  assert(workflows.includes(domain), `Workflow doc missing domain: ${domain}`);
}

for (const requiredText of ["List", "Summary", "Detail", "create", "update", "Archive/restore", "Money parser", "Currency formatter", "Percentage formatter"]) {
  assert(workflows.includes(requiredText), `Workflow doc missing contract: ${requiredText}`);
}

for (const section of ["netWorth", "assetSummary", "liabilitySummary", "cashFlowSummary", "debtLoanSummary", "portfolioSummary", "goalSummary", "financialHealth", "scenarioSummary", "decisionRecommendationSummary"]) {
  assert(projectionDoc.includes(section), `Projection doc missing section: ${section}`);
  assert(projectionModule.includes(section), `Projection module missing section: ${section}`);
}

for (const requiredText of ["atlas-enterprise.runtime-projection.v1", "Asia/Taipei", "TWD", "parseMoney", "formatMoney", "formatPercentage", "createDashboardDataSourceState"]) {
  assert(projectionModule.includes(requiredText), `Projection module missing: ${requiredText}`);
}

for (const mode of ["User Data", "Demo Data", "Test Fixture", "Empty State", "Error"]) {
  assert(dashboardMigration.includes(mode), `Dashboard migration missing mode: ${mode}`);
}

for (const testText of ["netWorth", "monthlyCashFlow", "fundingRatio", "User Data", "projection failed"]) {
  assert(projectionTest.includes(testText), `Projection test missing coverage: ${testText}`);
}

for (const reportName of [
  "core-financial-data-workflows-execution-report.md",
  "projection-read-model-execution-report.md",
  "dashboard-real-data-migration-execution-report.md",
]) {
  const report = await readText("docs", "roadmap", reportName);
  for (const section of ["## Summary", "## Changed Files", "## Validation", "## Remaining Risks", "## Recommended Next Prompt"]) {
    assert(report.includes(section), `${reportName} missing section: ${section}`);
  }
}

assert(packageJson.scripts["test:runtime-projection"], "Missing test:runtime-projection script");
assert(packageJson.scripts["validate:roadmap-data-projection"], "Missing validate:roadmap-data-projection script");
assert(runner.includes('"validate:roadmap-data-projection"') || validationProfiles.includes('"command": "npm run validate:roadmap-data-projection"'), "Validation profiles must include roadmap data projection validation");

console.log("Roadmap data projection validation passed.");
