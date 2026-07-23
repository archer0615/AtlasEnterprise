import { normalizeRecommendation } from "../domain/recommendation/recommendation-validation.js";

export function generateRecommendations(input = {}, context = {}) {
  const ownerId = input.ownerId;
  const rules = [];
  const netCashFlow = Number(input.financialHealth?.cashFlow?.netCashFlow ?? input.cashFlow?.netCashFlow ?? 0);
  const savingsRate = Number(input.financialHealth?.metrics?.find?.((metric) => metric.id === "savingsRate")?.value ?? 0);
  const goalProgress = Number(input.goalProgress?.averageProgress ?? 0);
  const constraintResults = Array.isArray(input.constraintResults) ? input.constraintResults : [];

  if (netCashFlow < 0) {
    rules.push(buildRecommendation({
      ownerId,
      title: "Stabilize monthly cash flow",
      type: "cashflow",
      priority: "critical",
      ruleReferences: ["REC-CASHFLOW-NEGATIVE"],
      constraintReferences: matchedConstraints(constraintResults, "cashflow"),
      summary: "Net cash flow is negative and requires spending or income planning before execution.",
      supportingEvidence: { netCashFlow },
      warnings: ["CashFlow impact is below zero"],
      dataCompleteness: completeness(input),
    }, context));
  }

  if (savingsRate > 0 && savingsRate < 0.2) {
    rules.push(buildRecommendation({
      ownerId,
      title: "Increase goal funding capacity",
      type: "goal-acceleration",
      priority: "high",
      ruleReferences: ["REC-GOAL-SAVINGS-RATE"],
      constraintReferences: matchedConstraints(constraintResults, "goal"),
      summary: "Savings rate is below the canonical threshold for reliable goal progress.",
      supportingEvidence: { savingsRate, goalProgress },
      warnings: goalProgress < 50 ? ["Goal impact is lagging target progress"] : [],
      dataCompleteness: completeness(input),
    }, context));
  }

  if (Number(input.financialHealth?.netWorth?.netWorth ?? 0) < 0) {
    rules.push(buildRecommendation({
      ownerId,
      title: "Reduce balance sheet risk",
      type: "debt-reduction",
      priority: "high",
      ruleReferences: ["REC-NET-WORTH-NEGATIVE"],
      constraintReferences: matchedConstraints(constraintResults, "net-worth"),
      summary: "Net worth is negative and debt reduction should precede optional execution.",
      supportingEvidence: { netWorth: input.financialHealth.netWorth.netWorth },
      warnings: ["Net Worth impact is negative"],
      dataCompleteness: completeness(input),
    }, context));
  }

  return Object.freeze(rules);
}

export function explainRecommendation(recommendation = {}) {
  return Object.freeze({
    appliedRules: Object.freeze([...(recommendation.ruleReferences || [])]),
    matchedConstraints: Object.freeze([...(recommendation.constraintReferences || [])]),
    supportingMetrics: Object.freeze({ ...(recommendation.supportingEvidence || {}) }),
    goalImpact: recommendation.supportingEvidence?.goalProgress ?? null,
    cashFlowImpact: recommendation.supportingEvidence?.netCashFlow ?? null,
    netWorthImpact: recommendation.supportingEvidence?.netWorth ?? null,
  });
}

function buildRecommendation(input, context) {
  return normalizeRecommendation(input, context);
}

function matchedConstraints(results, category) {
  const matches = results.filter((result) => result.category === category || result.rule?.includes?.(category)).map((result) => result.rule || result.id);
  return matches.length ? matches : [`CONSTRAINT-${category.toUpperCase()}`];
}

function completeness(input) {
  const keys = ["financialHealth", "goalProgress", "constraintResults"];
  return keys.filter((key) => input[key] !== undefined && input[key] !== null).length / keys.length;
}
