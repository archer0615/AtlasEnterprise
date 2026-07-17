import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const runtimeSnapshots = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));
const scenarioResults = JSON.parse(await readFile(path.join(root, "simulator", "outputs", "scenario-results.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const resultByFixture = new Map(scenarioResults.results.map((result) => [result.fixtureId, result]));
const portfolioSnapshots = runtimeSnapshots.snapshots.filter((snapshot) => {
  const metricFormulaIds = snapshot.metrics.flatMap((metric) => metric.formulaIds || []);
  return metricFormulaIds.includes("FORM-PORTFOLIO-DRAWDOWN") || metricFormulaIds.includes("FORM-DRAWDOWN-ATTRIBUTION");
});

assert(portfolioSnapshots.length >= 1, "portfolio reporting snapshots are missing");

for (const snapshot of portfolioSnapshots) {
  const sourceFixtureId = path.basename(snapshot.sourceFixture, ".json");
  const result = resultByFixture.get(sourceFixtureId);
  const formulaIds = snapshot.metrics.flatMap((metric) => metric.formulaIds || []);
  assert(result, `${snapshot.snapshotId} missing simulator result`);
  assert(snapshot.metrics.length === 4, `${snapshot.snapshotId} must expose four reporting metrics`);
  assert(formulaIds.includes("FORM-PORTFOLIO-DRAWDOWN") || formulaIds.includes("FORM-DRAWDOWN-ATTRIBUTION"), `${snapshot.snapshotId} missing portfolio formula trace`);
  assert(snapshot.runtimeBinding?.sourceFixtureId === sourceFixtureId, `${snapshot.snapshotId} missing runtime source fixture trace`);
  assert(snapshot.runtimeBinding?.formulaIds?.length >= 1, `${snapshot.snapshotId} missing runtime formula trace`);
  assert(snapshot.actions.length >= 1, `${snapshot.snapshotId} missing reporting actions`);
  assert(snapshot.runtimeBinding?.status === result.recommendation.status, `${snapshot.snapshotId} recommendation status is not represented`);
}

console.log(`Portfolio reporting contract validation passed with ${portfolioSnapshots.length} snapshots.`);
