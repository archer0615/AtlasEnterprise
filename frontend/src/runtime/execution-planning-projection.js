export function projectExecutionPlanning(input = {}) {
  const recommendations = Array.isArray(input.recommendations) ? input.recommendations : [];
  const executionPlans = Array.isArray(input.executionPlans) ? input.executionPlans : [];
  const actionPlans = Array.isArray(input.actionPlans) ? input.actionPlans : [];
  return Object.freeze({
    recommendationCount: recommendations.filter((item) => item.status !== "archived").length,
    acceptedRecommendationCount: recommendations.filter((item) => item.status === "accepted").length,
    pendingRecommendationCount: recommendations.filter((item) => item.status === "pending-review").length,
    executionPlanCount: executionPlans.filter((item) => item.status !== "archived").length,
    actionPlanCount: actionPlans.filter((item) => item.status !== "archived").length,
    blockedActionPlanCount: actionPlans.filter((item) => item.status === "blocked").length,
  });
}
