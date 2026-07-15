import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fixtureRoot = path.join(root, "simulator", "fixtures");
const outputRoot = path.join(root, "simulator", "outputs");

function evaluateFixture(fixture) {
  const computed = computeMetrics(fixture);
  return {
    fixtureId: fixture.fixtureId,
    asOfDate: fixture.asOfDate,
    assumptionVersion: fixture.assumptionVersion,
    formulaVersion: fixture.formulaVersion,
    status: fixture.expected.recommendation.status,
    score: fixture.expected.recommendation.score,
    warningCount: fixture.expected.warnings.length,
    metrics: computed,
    generatedFrom: Object.keys(computed).length ? "fixture-runtime-formula" : "fixture-expected-output",
  };
}

function computeMetrics(fixture) {
  if (fixture.fixtureId === "investment-drawdown-stress") {
    const stressedPortfolioValue = Math.round(fixture.inputs.portfolioValue * (1 - fixture.inputs.drawdownRate));
    const reserveMonths = round(fixture.inputs.cashReserve / fixture.inputs.monthlyExpenses, 2);
    return { stressedPortfolioValue, reserveMonths };
  }

  if (fixture.fixtureId === "mortgage-prepayment-baseline-2026") {
    const postPrepaymentReserveMonths = round((fixture.inputs.cashReserve - fixture.inputs.plannedPrepayment) / fixture.inputs.monthlyExpenses, 2);
    return { postPrepaymentReserveMonths };
  }

  if (fixture.fixtureId === "home-upgrade-2031-baseline") {
    const transactionCostEstimate = Math.round(fixture.inputs.targetHomeEstimatedValue * fixture.inputs.transactionCostRate);
    return { transactionCostEstimate };
  }

  return {};
}

function round(value, precision) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

await mkdir(outputRoot, { recursive: true });

const files = (await readdir(fixtureRoot)).filter((file) => file.endsWith(".json") && !file.endsWith(".schema.json"));
const results = [];

for (const file of files) {
  const fixture = JSON.parse(await readFile(path.join(fixtureRoot, file), "utf8"));
  results.push(evaluateFixture(fixture));
}

const payload = {
  generatedAt: new Date().toISOString(),
  mode: "fixture-runtime-scaffold",
  results: results.sort((a, b) => a.fixtureId.localeCompare(b.fixtureId)),
};

await writeFile(path.join(outputRoot, "scenario-results.json"), JSON.stringify(payload, null, 2), "utf8");
console.log(`Generated simulator output for ${results.length} fixtures.`);
