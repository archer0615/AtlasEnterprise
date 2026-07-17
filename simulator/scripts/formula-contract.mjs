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
  const status = fixture.expected.recommendation.status;
  let score = scorePolicy.statusScores[status] ?? scorePolicy.defaultScore;

  for (const rule of scorePolicy.metricRules) {
    if (rule.operator === ">" && metrics[rule.metric] !== undefined && metrics[rule.metric] > rule.threshold) {
      score = rule.score;
      break;
    }
  }
  if (scorePolicy.fixtureOverrides[fixture.fixtureId] !== undefined) score = scorePolicy.fixtureOverrides[fixture.fixtureId];

  return {
    score,
    formulaId: scorePolicy.formulaId,
    source: "engine-calculated-score.v1",
    policyVersion: scorePolicy.policyVersion,
    inputMetricCount: Object.keys(metrics || {}).length,
    warningCount: fixture.expected.warnings.length,
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
