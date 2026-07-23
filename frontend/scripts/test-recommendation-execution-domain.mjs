import { strict as assert } from "node:assert";
import { normalizeActionPlan, normalizeExecutionPlan, normalizeRecommendation, validateActionPlan, validateExecutionPlan, validateRecommendation } from "../src/domain/recommendation/recommendation-validation.js";
import { explainRecommendation, generateRecommendations } from "../src/runtime/recommendation-runtime.js";
import { createActionPlansFromExecutionPlan } from "../src/runtime/action-plan-runtime.js";
import { createExecutionPlanFromRecommendation } from "../src/runtime/execution-plan-runtime.js";
import { projectExecutionPlanning } from "../src/runtime/execution-planning-projection.js";

const context = { now: () => new Date("2026-07-23T00:00:00.000Z"), createId: () => "id-1" };
const recommendation = normalizeRecommendation({
  ownerId: "owner-1",
  title: "Stabilize monthly cash flow",
  type: "cashflow",
  priority: "critical",
  ruleReferences: ["REC-CASHFLOW-NEGATIVE"],
  constraintReferences: ["CONSTRAINT-CASHFLOW"],
  recommendationDate: "2026-07-23",
  expiresAt: "2026-08-23",
}, context);

assert.equal(validateRecommendation(recommendation).length, 0);
assert.equal(validateRecommendation({ ...recommendation, ownerId: "" })[0].code, "ATLAS_RECOMMENDATION_OWNER_REQUIRED");
assert.equal(validateRecommendation({ ...recommendation, type: "ai-generated" })[0].code, "ATLAS_RECOMMENDATION_TYPE_INVALID");
assert.equal(validateRecommendation({ ...recommendation, ruleReferences: [] })[0].code, "ATLAS_RECOMMENDATION_RULE_REQUIRED");
assert.equal(validateRecommendation({ ...recommendation, expiresAt: "2026-01-01" })[0].code, "ATLAS_RECOMMENDATION_EXPIRATION_INVALID");

const generated = generateRecommendations({
  ownerId: "owner-1",
  financialHealth: { cashFlow: { netCashFlow: -1000 }, metrics: [{ id: "savingsRate", value: 0.1 }], netWorth: { netWorth: -5000 } },
  goalProgress: { averageProgress: 10 },
  constraintResults: [{ rule: "cashflow-minimum", category: "cashflow" }],
}, context);
assert.equal(generated.length, 3);
assert.deepEqual(explainRecommendation(generated[0]).appliedRules, ["REC-CASHFLOW-NEGATIVE"]);

const execution = createExecutionPlanFromRecommendation({ ...recommendation, status: "accepted" }, { status: "committed", decisionId: "decision-1" }, context);
assert.equal(execution.ok, true);
assert.equal(validateExecutionPlan(execution.record).length, 0);
assert.equal(createExecutionPlanFromRecommendation(recommendation, {}, context).ok, false);
assert.equal(validateExecutionPlan(normalizeExecutionPlan({ ownerId: "owner-1", recommendationId: "", steps: [], targetDate: "bad" }, context)).length, 3);

const actions = createActionPlansFromExecutionPlan(execution.record, context);
assert.equal(actions.length, 3);
assert.equal(validateActionPlan(actions[0]).length, 0);
assert.equal(validateActionPlan(normalizeActionPlan({ ownerId: "owner-1", executionPlanId: "", title: "" }, context)).length, 2);

const projection = projectExecutionPlanning({ recommendations: [{ ...recommendation, status: "accepted" }, recommendation], executionPlans: [execution.record], actionPlans: actions });
assert.equal(projection.recommendationCount, 2);
assert.equal(projection.acceptedRecommendationCount, 1);
assert.equal(projection.executionPlanCount, 1);
assert.equal(projection.actionPlanCount, 3);

console.log("Recommendation and execution domain tests passed.");
