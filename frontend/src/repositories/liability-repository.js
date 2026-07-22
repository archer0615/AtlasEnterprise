export const liabilityRepositoryContract = Object.freeze({
  requiredOperations: ["getById", "listByOwner", "create", "update", "archive", "restore", "existsByOwnerAndName", "countByOwner"],
  input: "Liability records normalized by the liability application service.",
  output: "Immutable liability snapshots isolated by owner.",
  errors: "Atlas liability persistence errors without raw IndexedDB API leakage.",
});
