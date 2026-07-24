export const recommendationDecisionContract = Object.freeze({
  schema: "atlas-enterprise.recommendation-decision-contract.v1",
  key: "decisionId",
  ownerField: "ownerId",
  evidenceRole: "RecommendationDecision",
  allowedDispositions: Object.freeze(["accepted", "rejected", "deferred"]),
  runtimeBoundary: Object.freeze(["pure", "immutable", "catalog-backed", "no-dom", "no-indexeddb", "no-fixture"]),
});

export function normalizeRecommendationDecision(input = {}, context = {}) {
  const timestamp = (context.now?.() || new Date()).toISOString();
  return Object.freeze({
    decisionId: input.decisionId || context.createId?.() || `recommendation-decision-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    recommendationId: input.recommendationId,
    scenarioId: input.scenarioId || "",
    disposition: input.disposition || input.decision || "deferred",
    rationale: String(input.rationale || ""),
    decidedAt: input.decidedAt || timestamp,
    status: input.status || "recorded",
  });
}
