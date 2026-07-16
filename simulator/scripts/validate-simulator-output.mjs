import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fixtureRoot = path.join(root, "simulator", "fixtures");
const output = JSON.parse(await readFile(path.join(root, "simulator", "outputs", "scenario-results.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const fixtureFiles = (await readdir(fixtureRoot)).filter((file) => file.endsWith(".json") && !file.endsWith(".schema.json"));
const fixtures = new Map();

for (const file of fixtureFiles) {
  const fixture = JSON.parse(await readFile(path.join(fixtureRoot, file), "utf8"));
  fixtures.set(fixture.fixtureId, fixture);
}

assert(Array.isArray(output.results), "simulator output missing results");
assert(output.results.length === fixtures.size, "simulator output count must match fixture count");

for (const result of output.results) {
  const fixture = fixtures.get(result.fixtureId);
  assert(fixture, `simulator output references unknown fixture: ${result.fixtureId}`);
  assert(result.assumptionVersion === fixture.assumptionVersion, `${result.fixtureId} assumptionVersion mismatch`);
  assert(result.formulaVersion === fixture.formulaVersion, `${result.fixtureId} formulaVersion mismatch`);
  assert(result.status === fixture.expected.recommendation.status, `${result.fixtureId} status mismatch`);
  assert(Math.abs(result.score - fixture.expected.recommendation.score) <= fixture.tolerances.ratio + fixture.tolerances.currency, `${result.fixtureId} score outside tolerance`);
  if (result.metrics?.postPrepaymentReserveMonths !== undefined) {
    assert(Math.abs(result.metrics.postPrepaymentReserveMonths - fixture.expected.metrics.postPrepaymentReserveMonths) <= 0.01, `${result.fixtureId} postPrepaymentReserveMonths outside tolerance`);
  }
  for (const metric of ["monthlyMortgagePayment", "currentMonthlyPayment", "resetMonthlyPayment", "refinanceMonthlyPayment", "monthlyPaymentSavingsAfterReset", "refinanceFeeRecoveryMonths"]) {
    if (result.metrics?.[metric] !== undefined && fixture.expected.metrics?.[metric] !== undefined) {
      assert(Math.abs(result.metrics[metric] - fixture.expected.metrics[metric]) <= fixture.tolerances.currency, `${result.fixtureId} ${metric} outside tolerance`);
    }
  }
  if (result.metrics?.transactionCostEstimate !== undefined) {
    assert(Math.abs(result.metrics.transactionCostEstimate - fixture.expected.metrics.transactionCostEstimate) <= fixture.tolerances.currency, `${result.fixtureId} transactionCostEstimate outside tolerance`);
  }
  if (result.metrics?.stressedPortfolioValue !== undefined) {
    assert(Math.abs(result.metrics.stressedPortfolioValue - fixture.expected.metrics.stressedPortfolioValue) <= fixture.tolerances.currency, `${result.fixtureId} stressedPortfolioValue outside tolerance`);
  }
  if (result.metrics?.reserveMonths !== undefined) {
    assert(Math.abs(result.metrics.reserveMonths - fixture.expected.metrics.reserveMonths) <= 0.01, `${result.fixtureId} reserveMonths outside tolerance`);
  }
}

console.log(`Simulator output validation passed with ${output.results.length} results.`);
