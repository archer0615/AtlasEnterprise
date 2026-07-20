import assert from "node:assert/strict";
import { createDashboardDataSourceState, createRuntimeProjection, formatMoney, formatPercentage, parseMoney, runtimeProjectionSchema } from "../src/runtime-projection.js";

const projection = createRuntimeProjection({
  assets: [{ value: "1,000,000" }],
  liabilities: [{ balance: 250000 }],
  income: [{ monthlyAmount: 90000 }],
  expenses: [{ monthlyAmount: 45000 }],
  goals: [{ targetAmount: 500000, currentAmount: 300000 }],
  portfolio: [{ marketValue: 400000 }],
  scenarios: [{ status: "active" }, { status: "archived" }],
  decisions: [{ decision: "accepted" }, { decision: "deferred" }, { decision: "rejected" }],
});

assert.equal(projection.schema, runtimeProjectionSchema);
assert.equal(projection.netWorth, 750000);
assert.equal(projection.cashFlowSummary.monthlyCashFlow, 45000);
assert.equal(projection.goalSummary.fundingRatio, 0.6);
assert.equal(projection.scenarioSummary.active, 1);
assert.equal(projection.decisionRecommendationSummary.accepted, 1);
assert.equal(parseMoney("bad", 7), 7);
assert.equal(formatMoney(1000), "$1,000");
assert.equal(formatPercentage(0.123), "12.3%");

const userState = createDashboardDataSourceState({ userProjection: projection });
assert.equal(userState.mode, "user");
assert.equal(userState.indicator, "User Data");

const emptyProjection = createRuntimeProjection();
const demoState = createDashboardDataSourceState({ userProjection: emptyProjection, demoSnapshot: { snapshotId: "demo" } });
assert.equal(demoState.mode, "demo");

const errorState = createDashboardDataSourceState({ error: new Error("projection failed"), demoSnapshot: { snapshotId: "demo" } });
assert.equal(errorState.mode, "error");
assert.equal(errorState.snapshot.snapshotId, "demo");

console.log("Runtime projection tests passed.");
