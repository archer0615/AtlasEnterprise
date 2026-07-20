import { parseMoney } from "./runtime-projection.js";

export const scenarioWorkbenchSchema = "atlas-enterprise.scenario-workbench.v1";
export const decisionExplanationSchema = "atlas-enterprise.decision-explanation.v1";

export function calculateGoalProgress(goal = {}, options = {}) {
  const targetAmount = parseMoney(goal.targetAmount);
  const currentAmount = parseMoney(goal.currentAmount);
  const monthlyContribution = parseMoney(goal.monthlyContribution);
  const gap = Math.max(0, targetAmount - currentAmount);
  const progress = targetAmount > 0 ? Math.min(1, currentAmount / targetAmount) : null;
  const monthsToComplete = monthlyContribution > 0 ? Math.ceil(gap / monthlyContribution) : null;
  const projectedCompletionDate = monthsToComplete == null ? null : addMonths(options.asOfDate || "2026-07-20", monthsToComplete);
  const atRisk = progress == null || (goal.dueDate && projectedCompletionDate && projectedCompletionDate > goal.dueDate);

  return {
    goalId: goal.goalId || "goal",
    status: goal.status || "active",
    targetAmount,
    currentAmount,
    gap,
    progress,
    monthlyContribution,
    projectedCompletionDate,
    evidenceState: goal.evidenceState || inferEvidenceState(goal),
    atRisk,
    explanation: progress == null
      ? "Insufficient Data"
      : `Goal is ${(progress * 100).toFixed(1)}% funded with ${gap} remaining.`,
  };
}

export function calculateFinancialHealth(projection = {}) {
  const components = [
    { id: "cash-flow", score: projection.cashFlowSummary?.monthlyCashFlow > 0 ? 85 : 40, freshness: "Actual", explanation: "Positive monthly cash flow improves resilience." },
    { id: "net-worth", score: projection.netWorth > 0 ? 80 : 35, freshness: "Projected", explanation: "Positive net worth supports long-term optionality." },
    { id: "goal-progress", score: projection.goalSummary?.fundingRatio >= 0.5 ? 75 : 45, freshness: projection.goalSummary?.count ? "Estimated" : "Insufficient Data", explanation: "Goal funding progress contributes to readiness." },
  ];
  const validScores = components.map((item) => item.score).filter((score) => Number.isFinite(score));
  const overallScore = validScores.length ? Math.round(validScores.reduce((total, score) => total + score, 0) / validScores.length) : null;

  return {
    schema: "atlas-enterprise.financial-health.v1",
    overallScore,
    components,
    missingEvidence: components.filter((item) => item.freshness === "Insufficient Data").map((item) => item.id),
    explanation: overallScore == null ? "Insufficient Data" : `Overall financial health score is ${overallScore}.`,
  };
}

export function createScenarioRun(scenario = {}, baseScenario = null, options = {}) {
  const timestamp = options.timestamp || "2026-07-20T00:00:00.000Z";
  const inputVersion = scenario.inputVersion || "input.v1";
  const formulaVersion = scenario.formulaVersion || "formula.v1";
  const assumptionVersion = scenario.assumptionVersion || "assumption.v1";
  const overrides = scenario.overrides || {};
  const baseOutput = baseScenario?.output || {};
  const output = { ...baseOutput, ...(scenario.output || {}) };
  const warnings = [];

  if (scenario.actualDataOverride) warnings.push("Scenario must not overwrite actual data.");
  if (scenario.lastRunVersion && scenario.lastRunVersion !== `${inputVersion}:${formulaVersion}:${assumptionVersion}`) warnings.push("Scenario result is stale.");

  return {
    schema: scenarioWorkbenchSchema,
    scenarioId: scenario.scenarioId || `scenario-${timestamp}`,
    baseScenarioId: baseScenario?.scenarioId || null,
    type: baseScenario ? "alternative" : "base",
    inputVersion,
    formulaVersion,
    assumptionVersion,
    timestamp,
    overrides,
    output,
    warnings,
    runVersion: `${inputVersion}:${formulaVersion}:${assumptionVersion}`,
  };
}

export function compareScenarioRuns(baseRun, alternativeRun) {
  const baseScore = Number(baseRun?.output?.score ?? 0);
  const alternativeScore = Number(alternativeRun?.output?.score ?? 0);
  const baseNetWorth = parseMoney(baseRun?.output?.netWorth);
  const alternativeNetWorth = parseMoney(alternativeRun?.output?.netWorth);

  return {
    schema: "atlas-enterprise.scenario-comparison.v1",
    baseScenarioId: baseRun?.scenarioId || null,
    alternativeScenarioId: alternativeRun?.scenarioId || null,
    scoreDelta: alternativeScore - baseScore,
    netWorthDelta: alternativeNetWorth - baseNetWorth,
    tradeOffs: buildTradeOffs(baseRun, alternativeRun),
  };
}

export function createDecisionExplanation(input = {}) {
  const score = Number(input.score ?? 0);
  const constraints = Array.isArray(input.constraints) ? input.constraints : [];
  const failedConstraints = constraints.filter((item) => item.status === "failed");
  const evidence = Array.isArray(input.evidence) ? input.evidence : [];
  const assumptions = Array.isArray(input.assumptions) ? input.assumptions : [];
  const alternatives = Array.isArray(input.alternatives) ? input.alternatives : [];
  const confidence = evidence.length ? Math.max(0, Math.min(1, score / 100)) : 0;

  return {
    schema: decisionExplanationSchema,
    recommendationId: input.recommendationId || "recommendation",
    summary: input.summary || "Recommendation requires review.",
    score,
    confidence,
    evidence,
    assumptions,
    constraints,
    tradeOffs: input.tradeOffs || [],
    alternatives,
    risks: input.risks || [],
    lifecycle: input.lifecycle || "draft",
    inputSnapshotId: input.inputSnapshotId || null,
    ruleVersion: input.ruleVersion || "rule.v1",
    scenarioVersion: input.scenarioVersion || null,
    createdAt: input.createdAt || "2026-07-20T00:00:00.000Z",
    why: failedConstraints.length
      ? `Blocked by ${failedConstraints.length} failed constraint(s).`
      : "Recommendation is based on available facts, assumptions, projections, and rule evaluation.",
    nextAction: failedConstraints.length ? "Resolve constraints before execution." : "Review impact and decide accept, defer, or reject.",
  };
}

function inferEvidenceState(goal) {
  if (!goal.targetAmount || !goal.currentAmount) return "Insufficient Data";
  if (goal.projected) return "Projected";
  if (goal.estimated) return "Estimated";
  return "Actual";
}

function addMonths(dateText, months) {
  const date = new Date(`${dateText}T00:00:00.000Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

function buildTradeOffs(baseRun, alternativeRun) {
  const scoreDelta = Number(alternativeRun?.output?.score ?? 0) - Number(baseRun?.output?.score ?? 0);
  if (scoreDelta > 0) return ["Alternative improves score but assumptions must be reviewed."];
  if (scoreDelta < 0) return ["Alternative reduces score and may increase risk."];
  return ["No score delta; compare cash flow, goal timing, and risk manually."];
}
