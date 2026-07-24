export const decisionContract = Object.freeze({
  schema: "atlas-enterprise.decision-contract.v1",
  key: "id",
  repositoryKey: "decisionId",
  ownerField: "ownerId",
  aggregateRoot: "Decision",
  runtimeBoundary: Object.freeze(["pure", "immutable", "catalog-backed", "no-dom", "no-indexeddb", "no-fixture"]),
  fields: Object.freeze(["id", "decisionId", "ownerId", "title", "type", "status", "scenarioId", "goalId", "recommendationId", "selectedOption", "rationale", "decisionDate", "effectiveDate", "reviewDate", "createdAt", "updatedAt", "archivedAt", "version"]),
});
