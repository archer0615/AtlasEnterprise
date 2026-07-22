export const indexedDbErrorCodes = Object.freeze({
  open: "ATLAS_PERSISTENCE_OPEN_ERROR",
  read: "ATLAS_PERSISTENCE_READ_ERROR",
  write: "ATLAS_PERSISTENCE_WRITE_ERROR",
  delete: "ATLAS_PERSISTENCE_DELETE_ERROR",
  transaction: "ATLAS_PERSISTENCE_TRANSACTION_ERROR",
  migration: "ATLAS_PERSISTENCE_MIGRATION_ERROR",
});

export function mapIndexedDbError(operation, error) {
  return {
    code: indexedDbErrorCodes[operation] || indexedDbErrorCodes.transaction,
    message: error?.message || "IndexedDB operation failed",
    operation,
    recoverable: operation !== "migration",
    causeCategory: error?.name || "IndexedDBError",
  };
}
