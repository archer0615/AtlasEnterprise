export const recommendationDecisionRepositoryContract = Object.freeze({
  requiredOperations: ["list", "save", "clear"],
  input: "Decision snapshot with decisionId, fixtureId, status, score, and decidedAt.",
  output: "Immutable decision audit snapshots.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
