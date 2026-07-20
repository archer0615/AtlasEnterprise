import assert from "node:assert/strict";
import { calculateFinancialHealth, calculateGoalProgress, compareScenarioRuns, createDecisionExplanation, createScenarioRun } from "../src/decision-workbench.js";

const goal = calculateGoalProgress({
  goalId: "home-upgrade",
  targetAmount: 1000000,
  currentAmount: 400000,
  monthlyContribution: 50000,
  dueDate: "2027-12-31",
});
assert.equal(goal.gap, 600000);
assert.equal(goal.progress, 0.4);
assert.equal(goal.projectedCompletionDate, "2027-07-20");
assert.equal(goal.atRisk, false);

const health = calculateFinancialHealth({
  netWorth: 750000,
  cashFlowSummary: { monthlyCashFlow: 45000 },
  goalSummary: { count: 1, fundingRatio: 0.6 },
});
assert.equal(health.overallScore, 80);
assert.equal(health.missingEvidence.length, 0);

const baseRun = createScenarioRun({ scenarioId: "base", output: { score: 70, netWorth: 1000000 } });
const alternativeRun = createScenarioRun({ scenarioId: "alt", output: { score: 76, netWorth: 1100000 }, overrides: { loanRate: 0.02 } }, baseRun);
const comparison = compareScenarioRuns(baseRun, alternativeRun);
assert.equal(comparison.scoreDelta, 6);
assert.equal(comparison.netWorthDelta, 100000);
assert.equal(alternativeRun.type, "alternative");

const explanation = createDecisionExplanation({
  recommendationId: "rec-1",
  summary: "Increase monthly goal funding.",
  score: 82,
  evidence: [{ type: "Fact", value: "Positive cash flow" }],
  assumptions: [{ type: "Assumption", value: "Contribution remains stable" }],
  constraints: [{ id: "liquidity", status: "passed" }],
  alternatives: [{ id: "defer", impact: "Lower progress" }],
  inputSnapshotId: "snapshot-1",
  scenarioVersion: alternativeRun.runVersion,
});
assert.equal(explanation.confidence, 0.82);
assert.equal(explanation.nextAction, "Review impact and decide accept, defer, or reject.");

const blocked = createDecisionExplanation({ score: 90, evidence: [{ type: "Fact" }], constraints: [{ id: "risk", status: "failed" }] });
assert.equal(blocked.nextAction, "Resolve constraints before execution.");

console.log("Decision workbench tests passed.");
