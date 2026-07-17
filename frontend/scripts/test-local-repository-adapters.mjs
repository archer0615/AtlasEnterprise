import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const runtime = await readFile(path.join(root, "frontend", "src", "indexeddb-runtime.js"), "utf8");
const main = await readFile(path.join(root, "frontend", "src", "main.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(runtime.includes("indexedDbScenarioRepository"), "Scenario repository adapter is missing");
assert(runtime.includes("async list()"), "Scenario repository list is missing");
assert(runtime.includes("async save(scenario)"), "Scenario repository save is missing");
assert(runtime.includes("async delete(scenarioId)"), "Scenario repository delete is missing");
assert(runtime.includes("async clear()"), "Scenario repository clear is missing");
assert(runtime.includes("async replaceAll(scenarios)"), "Scenario repository replaceAll is missing");
assert(runtime.includes("indexedDbBackupRepository"), "Backup repository adapter is missing");
assert(runtime.includes("validateBackup(backup)"), "Backup validation is missing");
assert(runtime.includes('"atlas-pwa-runtime-backup.v1"'), "Backup schema version is missing");
assert(runtime.includes("indexedDbMigrationRepository"), "Migration repository adapter is missing");
assert(runtime.includes("async markCurrent()"), "Migration repository markCurrent is missing");
assert(main.includes("deleteLastScenario"), "Dashboard delete workflow is missing");
assert(main.includes("resetScenarios"), "Dashboard reset workflow is missing");
assert(main.includes("setRuntimeFeedback"), "Runtime feedback workflow is missing");
assert(main.includes("restoreConfirmInput"), "Restore confirmation workflow is missing");
assert(main.includes("previewBackup"), "Backup preview workflow is missing");
assert(main.includes("applyBackup"), "Backup apply workflow is missing");
assert(main.includes("validateScenarioInput"), "Scenario validation workflow is missing");
assert(main.includes("formatBackupPreview"), "Backup preview diff workflow is missing");

console.log("Local repository adapter tests passed.");
