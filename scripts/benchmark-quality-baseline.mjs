import { mkdir, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import path from "node:path";
import { projectCashFlow } from "../frontend/src/runtime/cashflow-projection.js";
import { projectNetWorth } from "../frontend/src/runtime/net-worth-projection.js";

const root = process.cwd();
const reportDir = path.join(root, "docs", "reports");
const reportPath = path.join(reportDir, "testing-performance-baseline.json");

const scenarios = [
  {
    name: "net-worth-projection-large-dataset",
    datasetSize: "5000 assets, 5000 liabilities",
    iterations: 50,
    thresholdMs: 25,
    run: () => projectNetWorth(createNetWorthDataset(5000)),
    assert: (result) => result.assetCount === 5000 && result.liabilityCount === 5000 && result.netWorth === 10000000,
  },
  {
    name: "cashflow-projection-annual-window",
    datasetSize: "500 monthly incomes, 500 monthly expenses",
    iterations: 20,
    thresholdMs: 120,
    run: () => projectCashFlow(createCashflowDataset(500)),
    assert: (result) => result.incomeCount === 500 && result.expenseCount === 500 && result.incomeOccurrences.length === 6000,
  },
];

const results = [];

for (const scenario of scenarios) {
  scenario.run();
  const samples = [];
  for (let index = 0; index < scenario.iterations; index += 1) {
    const started = performance.now();
    const result = scenario.run();
    samples.push(performance.now() - started);
    if (!scenario.assert(result)) throw new Error(`${scenario.name} produced invalid benchmark result`);
  }
  const sorted = [...samples].sort((left, right) => left - right);
  const averageMs = samples.reduce((total, value) => total + value, 0) / samples.length;
  const p95Ms = sorted[Math.floor(sorted.length * 0.95) - 1] || sorted.at(-1);
  const passed = p95Ms <= scenario.thresholdMs;
  results.push({
    scenario: scenario.name,
    datasetSize: scenario.datasetSize,
    warmUp: 1,
    iterations: scenario.iterations,
    averageMs: Number(averageMs.toFixed(3)),
    p95Ms: Number(p95Ms.toFixed(3)),
    regressionThresholdMs: scenario.thresholdMs,
    memoryObservation: "process heap observed only; no leak assertion configured",
    mainThreadObservation: "single Node.js process benchmark",
    result: passed ? "PASS" : "FAIL",
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  tool: "node:perf_hooks",
  results,
};

await mkdir(reportDir, { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Atlas Performance Baseline");
for (const result of results) {
  console.log(`${result.scenario}: p95 ${result.p95Ms}ms / threshold ${result.regressionThresholdMs}ms - ${result.result}`);
}
console.log(`Report: ${path.relative(root, reportPath)}`);

if (results.some((result) => result.result !== "PASS")) process.exit(1);

function createNetWorthDataset(size) {
  return {
    assets: Array.from({ length: size }, (_, index) => ({
      id: `asset-${index}`,
      status: "active",
      currency: "TWD",
      currentValue: 3000,
    })),
    liabilities: Array.from({ length: size }, (_, index) => ({
      id: `liability-${index}`,
      status: "active",
      currency: "TWD",
      outstandingBalance: 1000,
    })),
  };
}

function createCashflowDataset(size) {
  const base = {
    periodStart: "2026-01-01",
    periodEnd: "2026-12-31",
  };
  return {
    ...base,
    incomes: Array.from({ length: size }, (_, index) => ({
      id: `income-${index}`,
      name: `Income ${index}`,
      status: "active",
      currency: "TWD",
      amount: 1000,
      frequency: "monthly",
      startDate: "2026-01-01",
    })),
    expenses: Array.from({ length: size }, (_, index) => ({
      id: `expense-${index}`,
      name: `Expense ${index}`,
      status: "active",
      currency: "TWD",
      amount: 600,
      frequency: "monthly",
      startDate: "2026-01-01",
    })),
  };
}
