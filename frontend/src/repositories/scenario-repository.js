export const scenarioRepositoryContract = Object.freeze({
  requiredOperations: ["list", "save", "delete", "clear", "replaceAll"],
  input: "Scenario record with scenarioId, name, score, status, and aggregateVersion when persisted.",
  output: "Repository-owned scenario snapshots.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
