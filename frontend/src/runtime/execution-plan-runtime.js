import { normalizeExecutionPlan } from "../domain/recommendation/recommendation-validation.js";

export function createExecutionPlanFromRecommendation(recommendation = {}, decision = {}, context = {}) {
  if (recommendation.status !== "accepted" && decision.status !== "committed") {
    return Object.freeze({ ok: false, errors: Object.freeze([{ code: "ATLAS_EXECUTION_SOURCE_NOT_COMMITTED", field: "recommendationId", rule: "accepted-recommendation" }]) });
  }
  const steps = [
    { id: "review-evidence", title: "Review recommendation evidence", order: 1, status: "planned" },
    { id: "confirm-constraints", title: "Confirm constraints and dependencies", order: 2, status: "planned" },
    { id: "prepare-actions", title: "Prepare local action plan", order: 3, status: "planned" },
  ];
  return Object.freeze({
    ok: true,
    record: normalizeExecutionPlan({
      ownerId: recommendation.ownerId,
      recommendationId: recommendation.id,
      decisionId: decision.decisionId || decision.id || recommendation.sourceDecisionId,
      steps,
      dependencies: recommendation.constraintReferences || [],
      estimatedOrder: priorityOrder(recommendation.priority),
      targetDate: recommendation.expiresAt || recommendation.recommendationDate,
      status: "planned",
    }, context),
  });
}

function priorityOrder(priority) {
  return { critical: 1, high: 2, medium: 3, low: 4 }[priority] || 3;
}
