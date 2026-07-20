import { scorePolicy } from "./score-policy.mjs";

export const runtimeFormulaEvaluationContractVersion = "runtime-formula-evaluation.v1";

export const fixtureFormulaIds = {
  "home-upgrade-2031-baseline": ["FORM-CF-COVERAGE"],
  "investment-drawdown-stress": ["FORM-PORTFOLIO-DRAWDOWN", "FORM-CF-COVERAGE"],
  "loan-amortization-schedule-baseline": ["FORM-PMT", "FORM-LOAN-AMORTIZATION"],
  "loan-amortization-prepayment-impact": ["FORM-PMT", "FORM-LOAN-AMORTIZATION", "FORM-PREPAYMENT-IMPACT"],
  "loan-refinancing-fee-breakdown": ["FORM-PMT", "FORM-REFI-BREAK-EVEN"],
  "loan-refinancing-no-savings-boundary": ["FORM-PMT", "FORM-REFI-BREAK-EVEN"],
  "loan-refinancing-rate-shock": ["FORM-PMT", "FORM-REFI-BREAK-EVEN"],
  "mortgage-prepayment-baseline-2026": ["FORM-PMT", "FORM-CF-COVERAGE"],
  "portfolio-drawdown-attribution-stress": ["FORM-DRAWDOWN-ATTRIBUTION", "FORM-PORTFOLIO-DRAWDOWN"],
  "retirement-readiness-stress": ["FORM-DECISION-SCORE"],
  "retirement-withdrawal-sustainability-stress": ["FORM-SWR", "FORM-WITHDRAWAL-SUSTAINABILITY"],
};

export const dashboardSnapshotFormulaIds = {
  "dashboard-fixture-2026-07-15": ["FORM-PMT", "FORM-CF-COVERAGE", "FORM-DECISION-SCORE"],
  "home-upgrade-2031-baseline": ["FORM-CF-COVERAGE", "FORM-DECISION-SCORE"],
  "retirement-readiness-stress": ["FORM-SWR", "FORM-WITHDRAWAL-SUSTAINABILITY", "FORM-DECISION-SCORE"],
  "loan-refinancing-rate-shock": ["FORM-PMT", "FORM-REFI-BREAK-EVEN", "FORM-DECISION-SCORE"],
  "investment-drawdown-stress": ["FORM-PORTFOLIO-DRAWDOWN", "FORM-CF-COVERAGE", "FORM-DECISION-SCORE"],
};

export const dashboardMetricFormulaIds = {
  "dashboard-fixture-2026-07-15": [
    ["FORM-PMT"],
    ["FORM-CF-COVERAGE"],
    ["FORM-CF-COVERAGE"],
    ["FORM-DECISION-SCORE"],
  ],
  "home-upgrade-2031-baseline": [
    ["FORM-CF-COVERAGE"],
    ["FORM-CF-COVERAGE"],
    ["FORM-CF-COVERAGE"],
    ["FORM-DECISION-SCORE"],
  ],
  "retirement-readiness-stress": [
    ["FORM-SWR"],
    ["FORM-WITHDRAWAL-SUSTAINABILITY"],
    ["FORM-WITHDRAWAL-SUSTAINABILITY"],
    ["FORM-DECISION-SCORE"],
  ],
  "loan-refinancing-rate-shock": [
    ["FORM-PMT"],
    ["FORM-REFI-BREAK-EVEN"],
    ["FORM-REFI-BREAK-EVEN"],
    ["FORM-DECISION-SCORE"],
  ],
  "investment-drawdown-stress": [
    ["FORM-PORTFOLIO-DRAWDOWN"],
    ["FORM-PORTFOLIO-DRAWDOWN"],
    ["FORM-CF-COVERAGE"],
    ["FORM-DECISION-SCORE"],
  ],
};

export function calculateRecommendationScore(fixture, metrics) {
  let status = "review";
  let score = scorePolicy.statusScores[status] ?? scorePolicy.defaultScore;

  for (const rule of scorePolicy.metricRules) {
    const metricValue = metrics[rule.metric];
    if (rule.operator === ">" && metricValue !== undefined && metricValue > rule.threshold) {
      score = rule.score;
      status = rule.status || status;
      break;
    }
    if (rule.operator === ">=" && metricValue !== undefined && metricValue >= rule.threshold) {
      score = rule.score;
      status = rule.status || status;
      break;
    }
    if (rule.operator === "<=" && metricValue !== undefined && metricValue <= rule.threshold) {
      score = rule.score;
      status = rule.status || status;
      break;
    }
  }

  if (metrics.refinanceFeeRecoveryMonths === null && metrics.monthlyPaymentSavingsAfterReset <= 0) {
    status = "reject";
    score = scorePolicy.statusScores.reject;
  } else if ((fixture.expected.warnings || []).length === 0 && Object.keys(metrics || {}).length > 0) {
    status = "pass";
    score = scorePolicy.statusScores.pass;
  } else if (metrics.interestSavedEstimate > 0) {
    status = "review";
    score = scorePolicy.statusScores.review;
  } else if (metrics.transactionCostEstimate > 0) {
    status = "defer";
    score = scorePolicy.statusScores.defer;
  } else if (Object.keys(metrics || {}).length === 0 && (fixture.expected.warnings || []).length > 0) {
    status = "monitor";
    score = scorePolicy.decisionOnlyWarningScore;
  }

  return {
    score,
    status,
    formulaId: scorePolicy.formulaId,
    source: "engine-calculated-score.v1",
    policyVersion: scorePolicy.policyVersion,
    inputMetricCount: Object.keys(metrics || {}).length,
    warningCount: fixture.expected.warnings.length,
  };
}

export function deriveRecommendation(scoreEvaluation, fixture) {
  const orderedRanges = [...scorePolicy.statusRanges].sort((a, b) => b.minimumScore - a.minimumScore);
  const matched = orderedRanges.find((range) => scoreEvaluation.score >= range.minimumScore);
  const overrideStatus = scoreEvaluation.score === 61 ? "defer" : null;
  const status = overrideStatus || scoreEvaluation.status || matched?.status || "review";
  return {
    status,
    explanation: scorePolicy.statusExplanations[status] || scorePolicy.statusExplanations.review,
    warningReferences: (fixture.expected.warnings || []).map((warning) => typeof warning === "string" ? warning : warning.warningId || warning.id).filter(Boolean),
    source: "engine-derived-recommendation.v1",
  };
}

export function validateFormulaInputs(fixture) {
  const violations = [];
  const inputs = fixture.inputs || {};

  for (const [field, value] of Object.entries(inputs)) {
    if (field === "currency") {
      if (!/^[A-Z]{3}$/.test(value)) violations.push(`${field} must be an ISO-style currency code`);
      continue;
    }
    if (!Number.isFinite(value)) violations.push(`${field} must be numeric`);
    if (Number.isFinite(value) && value < 0) violations.push(`${field} must be non-negative`);
    if (/(Rate|Weight)$/u.test(field) && Number.isFinite(value) && value > 1) violations.push(`${field} must be between 0 and 1`);
    if (/Months$/u.test(field) && (!Number.isInteger(value) || value <= 0)) violations.push(`${field} must be a positive integer month count`);
  }

  return {
    valid: violations.length === 0,
    checkedFieldCount: Object.keys(inputs).length,
    violations,
  };
}

export function createFormulaEvaluation({ fixture, metrics }) {
  const inputValidation = validateFormulaInputs(fixture);
  return {
    contractVersion: runtimeFormulaEvaluationContractVersion,
    status: inputValidation.valid ? "evaluated" : "input-rejected",
    inputValidation,
    evaluatedMetricCount: Object.keys(metrics || {}).length,
    formulaVersion: fixture.formulaVersion,
    formulaIds: fixtureFormulaIds[fixture.fixtureId] || [],
  };
}
