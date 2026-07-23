export const recommendationContract = Object.freeze({
  schema: "atlas-enterprise.recommendation-contract.v1",
  key: "id",
  ownerField: "ownerId",
  aggregateBoundaries: Object.freeze(["Recommendation", "ExecutionPlan", "ActionPlan", "RecommendationDecision"]),
  stores: Object.freeze(["recommendations", "executionPlans", "actionPlans"]),
  runtimeBoundary: Object.freeze(["pure", "immutable", "catalog-backed", "no-dom", "no-indexeddb", "no-fixture"]),
});
