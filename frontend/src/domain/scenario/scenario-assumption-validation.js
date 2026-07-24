export const scenarioAssumptionRules = Object.freeze({
  cashflow: Object.freeze({
    incomeChangePercent: Object.freeze({ type: "number", unit: "percent", nullable: true, minimum: -100, maximum: 100, rule: "cashflow-assumption-percent" }),
    expenseChangePercent: Object.freeze({ type: "number", unit: "percent", nullable: true, minimum: -100, maximum: 100, rule: "cashflow-assumption-percent" }),
  }),
  "goal-impact": Object.freeze({
    monthlyContributionChange: Object.freeze({ type: "money", unit: "owner-currency", nullable: true, minimum: 0, maximum: 100000000, rule: "goal-impact-contribution" }),
  }),
  risk: Object.freeze({
    liquidityReserveMonths: Object.freeze({ type: "number", unit: "month", nullable: true, minimum: 0, maximum: 120, rule: "liquidity-reserve-months" }),
  }),
  baseline: Object.freeze({}),
});

export function validateScenarioAssumptions(type, assumptions = {}) {
  const rules = scenarioAssumptionRules[type];
  if (!rules) return [error("ATLAS_SCENARIO_TYPE_INVALID", "type", "Scenario type is invalid", "scenario-type")];
  const errors = [];
  for (const key of Object.keys(assumptions || {})) {
    if (!rules[key]) errors.push(error("ATLAS_SCENARIO_ASSUMPTION_INVALID", `assumptions.${key}`, "Unknown scenario assumption", "known-assumption"));
  }
  for (const [key, rule] of Object.entries(rules)) {
    const value = assumptions?.[key];
    if ((value === undefined || value === null || value === "") && rule.nullable) continue;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) errors.push(error("ATLAS_SCENARIO_ASSUMPTION_INVALID", `assumptions.${key}`, "Scenario assumption value is invalid", rule.rule));
    if (Number.isFinite(numeric) && (numeric < rule.minimum || numeric > rule.maximum)) errors.push(error("ATLAS_SCENARIO_ASSUMPTION_OUT_OF_RANGE", `assumptions.${key}`, "Scenario assumption is out of range", rule.rule));
  }
  return errors;
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
