export const recommendationDecisionRepositoryContract = Object.freeze({
  requiredOperations: ["list", "save", "clear"],
  input: "RecommendationDecision evidence with decisionId, ownerId, recommendationId, scenarioId, disposition, rationale, and decidedAt.",
  output: "Immutable recommendation disposition evidence snapshots.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
