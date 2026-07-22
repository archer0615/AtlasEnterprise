export const assetRepositoryContract = Object.freeze({
  requiredOperations: ["getById", "listByOwner", "create", "update", "archive", "restore", "existsByOwnerAndName", "countByOwner"],
  input: "Asset records normalized by the asset application service.",
  output: "Immutable asset snapshots isolated by owner.",
  errors: "Atlas asset persistence errors without raw IndexedDB API leakage.",
});
