export const indexedDbTransactionBoundary = Object.freeze({
  rawApiScope: "frontend/src/infrastructure/indexeddb/** and frontend/src/indexeddb-runtime.js compatibility facade",
  leakedTypes: ["IDBRequest", "IDBTransaction", "IDBObjectStore", "IDBDatabase"],
});
