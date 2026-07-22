export const incomeRepositoryContract = Object.freeze({
  requiredOperations: ["getById", "listByOwner", "create", "update", "archive", "restore", "existsByOwnerAndName", "countByOwner", "listEffectiveWithin"],
  input: "Income records normalized by the income application service.",
  output: "Immutable income snapshots isolated by owner.",
  errors: "Atlas income persistence errors without raw IndexedDB API leakage.",
});
