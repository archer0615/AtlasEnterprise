export const scenarioContract = Object.freeze({
  schema: "atlas-enterprise.scenario-contract.v1",
  key: "id",
  repositoryKey: "scenarioId",
  ownerField: "ownerId",
  aggregateRoot: "Scenario",
  projection: "derived-runtime-result",
  runtimeBoundary: Object.freeze(["pure", "immutable", "catalog-backed", "no-dom", "no-indexeddb", "no-fixture"]),
  fields: Object.freeze(["id", "scenarioId", "ownerId", "name", "type", "status", "description", "baseScenarioId", "goalId", "assumptions", "projectionHorizon", "createdAt", "updatedAt", "archivedAt", "version"]),
});
