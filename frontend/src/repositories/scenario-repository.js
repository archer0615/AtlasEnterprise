export const scenarioRepositoryContract = Object.freeze({
  requiredOperations: ["list", "listByOwner", "getById", "create", "update", "save", "delete", "clear", "replaceAll"],
  input: "Scenario aggregate record with id/scenarioId, ownerId, name, type, status, assumptions, projection horizon, lifecycle timestamps, and version.",
  output: "Repository-owned scenario snapshots.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
