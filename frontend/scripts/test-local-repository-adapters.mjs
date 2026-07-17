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
assert(runtime.includes("indexedDbRecommendationDecisionRepository"), "Recommendation decision repository adapter is missing");
assert(runtime.includes("recommendationDecisions"), "Recommendation decision store is missing");
assert(runtime.includes("async save(decision)"), "Recommendation decision save is missing");
assert(runtime.includes("async clear()"), "Repository clear operation is missing");
assert(runtime.includes("validateBackup(backup)"), "Backup validation is missing");
assert(runtime.includes('"atlas-pwa-runtime-backup.v1"'), "Backup schema version is missing");
assert(runtime.includes("scenarioIds.has"), "Backup duplicate scenario ID validation is missing");
assert(runtime.includes("scenario.name.trim().length >= 2"), "Backup scenario name validation is missing");
assert(runtime.includes("indexedDbMigrationRepository"), "Migration repository adapter is missing");
assert(runtime.includes("async markCurrent()"), "Migration repository markCurrent is missing");
assert(main.includes("deleteLastScenario"), "Dashboard delete workflow is missing");
assert(main.includes("resetScenarios"), "Dashboard reset workflow is missing");
assert(main.includes("setRuntimeFeedback"), "Runtime feedback workflow is missing");
assert(main.includes("exportPortfolioReport"), "Portfolio report export workflow is missing");
assert(main.includes("calculateEditableLoan"), "Loan editable calculation workflow is missing");
assert(main.includes("validateLoanInput"), "Loan editable validation workflow is missing");
assert(main.includes("restoreConfirmInput"), "Restore confirmation workflow is missing");
assert(main.includes("previewBackup"), "Backup preview workflow is missing");
assert(main.includes("applyBackup"), "Backup apply workflow is missing");
assert(main.includes("validateScenarioInput"), "Scenario validation workflow is missing");
assert(main.includes("formatBackupPreview"), "Backup preview diff workflow is missing");
assert(main.includes("情境分數必須是 0 到 100"), "Scenario score range validation is missing");
assert(main.includes("incomingNames"), "Backup preview scenario name details are missing");

console.log("Local repository adapter tests passed.");
