export const expenseRepositoryContract = Object.freeze({
  requiredOperations: ["getById", "listByOwner", "create", "update", "archive", "restore", "existsByOwnerAndName", "countByOwner", "listEffectiveWithin"],
  input: "Expense records normalized by the expense application service.",
  output: "Immutable expense snapshots isolated by owner.",
  errors: "Atlas expense persistence errors without raw IndexedDB API leakage.",
});
