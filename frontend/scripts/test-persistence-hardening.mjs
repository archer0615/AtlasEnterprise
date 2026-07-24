import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const runtimePath = path.join(root, "frontend", "src", "indexeddb-runtime.js");
const backupControllerPath = path.join(root, "frontend", "src", "features", "backup", "backup-controller.js");
const stateStorePath = path.join(root, "frontend", "src", "app", "state-store.js");
const runtimeText = await readFile(runtimePath, "utf8");
const backupControllerText = await readFile(backupControllerPath, "utf8");
const stateStoreText = await readFile(stateStorePath, "utf8");

assert.equal((runtimeText.match(/const databaseName =/g) || []).length, 1, "database name must have a single source");
assert.equal((runtimeText.match(/const databaseVersion =/g) || []).length, 1, "database version must have a single source");
assert.equal((runtimeText.match(/function openDatabase/g) || []).length, 1, "database connection manager must be unique");
assert(runtimeText.includes("request.onblocked"), "IndexedDB blocked upgrade handling is missing");
assert(runtimeText.includes("database.onversionchange"), "IndexedDB versionchange disposal is missing");
assert(runtimeText.includes("databasePromise = undefined"), "IndexedDB failed open must reset connection promise");
assert(runtimeText.includes("sanitizeBackupForRestore"), "Restore sanitization boundary is missing");
assert(runtimeText.includes("hasUnsafeObjectKey"), "Prototype pollution validation is missing");
assert(runtimeText.includes("transaction.onabort"), "Restore transaction abort handling is missing");
assert(!runtimeText.includes("deleteDatabase("), "deleteDatabase must not be used for normal migration");
assert(!backupControllerText.includes("indexeddb-runtime"), "Backup UI must not import IndexedDB infrastructure directly");
assert(!/indexedDB|localStorage|sessionStorage|caches/.test(stateStoreText), "Store must not directly access browser persistence APIs");

const module = await import("../src/indexeddb-runtime.js");
const inventory = module.getIndexedDbPersistenceInventory();
assert.equal(inventory.databaseName, "atlas-pwa-runtime");
assert.equal(inventory.databaseVersion, 6);
assert.deepEqual(Object.keys(inventory.stores), ["metadata", "scenarios", "recommendationDecisions", "settings", "auditEntries", "assets", "liabilities", "incomes", "expenses", "goals"]);
assert.equal(inventory.stores.metadata.backup, false);
assert.equal(inventory.stores.scenarios.keyPath, "scenarioId");
assert(inventory.stores.assets.indexes.includes("ownerId"));

const validBackup = {
  schema: "atlas-pwa-runtime-backup.v1",
  exportedAt: "2026-07-24T00:00:00.000Z",
  databaseVersion: 6,
  scenarios: [{ scenarioId: "scenario-1", name: "Valid Scenario", score: "10", status: "review", unexpectedRuntimeField: "should-be-sanitized" }],
  recommendationDecisions: [],
  settings: [],
  auditEntries: [],
  assets: [],
  liabilities: [],
  incomes: [],
  expenses: [],
  goals: [],
};

assert.equal(await module.indexedDbBackupRepository.validateBackup(validBackup), true, "valid backup fixture must pass validation");
assert.equal(await module.indexedDbBackupRepository.validateBackup({ ...validBackup, unknownStore: [] }), false, "unknown top-level backup fields must be rejected");
assert.equal(await module.indexedDbBackupRepository.validateBackup({ ...validBackup, databaseVersion: 999 }), false, "future database versions must be rejected");
const duplicateBackup = { ...validBackup, scenarios: [validBackup.scenarios[0], { ...validBackup.scenarios[0] }] };
assert.equal(await module.indexedDbBackupRepository.validateBackup(duplicateBackup), false, "duplicate primary keys must be rejected");
const pollutedBackup = JSON.parse(`{"schema":"atlas-pwa-runtime-backup.v1","databaseVersion":6,"scenarios":[],"__proto__":{"polluted":true}}`);
assert.equal(await module.indexedDbBackupRepository.validateBackup(pollutedBackup), false, "prototype pollution payload must be rejected");
await module.disposeIndexedDbRuntime();

console.log("Persistence hardening tests passed.");
