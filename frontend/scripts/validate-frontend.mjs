import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = await readFile(path.join(frontendRoot, "index.html"), "utf8");
const main = await readFile(path.join(frontendRoot, "src", "main.js"), "utf8");
const indexedDbRuntime = await readFile(path.join(frontendRoot, "src", "indexeddb-runtime.js"), "utf8");
const repositoryInterface = await readFile(path.join(root, "docs", "architecture", "pwa-repository-interface.md"), "utf8");
const dashboardModel = await readFile(path.join(frontendRoot, "src", "dashboard-model.js"), "utf8");
const styles = await readFile(path.join(frontendRoot, "src", "styles.css"), "utf8");
const dashboard = JSON.parse(await readFile(path.join(frontendRoot, "fixtures", "dashboard-snapshot.json"), "utf8"));
const dashboards = JSON.parse(await readFile(path.join(frontendRoot, "fixtures", "dashboard-snapshots.json"), "utf8"));

for (const id of [
  "metricGrid", "scenarioList", "actionList", "dashboardSwitcher", "saveScenarioButton",
  "releaseDashboardPanel", "sampleExportButton", "sampleBackupButton", "sampleLoaderPanel",
  "validationHistoryPanel", "cacheVersionText", "reportVersionPanel", "offlineRepairButton",
  "offlineRepairPanel", "reportVersionHistoryPanel", "exportValidationButton", "validationExportPanel",
  "offlineRepairAuditPanel", "restoreAuditPanel", "persistentAuditPanel", "reportDiffPanel", "validationFailureDiagnosisPanel",
  "deleteScenarioButton", "resetScenariosButton", "runtimeFeedback", "scenarioNameInput",
  "scenarioScoreInput", "exportBackupButton", "importBackupInput", "restoreConfirmInput",
  "exportEncryptedBackupButton", "backupPassphraseInput", "backupConflictPolicySelect",
  "applyBackupButton", "backupPreview", "backupDryRunPanel", "scenarioComparisonPanel",
  "portfolioReportPanel", "exportPreviewPanel", "recommendationControlPanel",
  "recommendationHistoryPanel", "recommendationFilterInput", "loanScenarioPanel",
  "exportPortfolioReportButton", "recommendationDecisionLog", "acceptRecommendationButton",
  "rejectRecommendationButton", "loanBalanceInput", "loanRateInput", "loanMonthsInput",
  "calculateLoanButton", "resetLoanButton", "loanEditableOutput",
  "profileIncomeInput", "profileAssetsInput", "profileDebtInput", "profileGoalSelect",
  "saveProfileButton", "resetProfileButton", "profileSummaryPanel",
  "scenarioTemplateList", "scenarioTemplatePreview", "applyScenarioTemplateButton", "saveScenarioTemplateButton",
  "help",
]) {
  assert(html.includes(`id="${id}"`), `${id} is missing`);
}

for (const removedId of ["searchInput", "categoryNav", "documentList", "documentViewer", "resultCount", "clearFiltersButton"]) {
  assert(!html.includes(`id="${removedId}"`), `${removedId} should not be visible in the user UI`);
}
assert(!html.includes("internal-knowledge"), "internal knowledge section should not be visible in the user UI");

for (const token of [
  'from "./dashboard-model.js"', 'from "./indexeddb-runtime.js"', "indexedDbScenarioRepository",
  "indexedDbBackupRepository", "restoreConfirmInput", "previewBackup", "applyBackup",
  "exportEncryptedBackup", "decryptBackupForPreview", "atlas-pwa-runtime-encrypted-backup.json",
  "backupConflictPolicySelect", "conflictPolicy", "translateMigrationStatus", "遷移狀態",
  "validateScenarioInput", "formatBackupPreview", "formatBackupDryRun", "renderBackupDryRun", "renderPortfolioReport",
  "translateStoreName",
  "renderRecommendationControls", "renderRecommendationHistory", "renderScenarioComparison",
  "renderLoanScenarioPanel", "setRecommendationDecision", "exportPortfolioReport",
  "wrapExportReport", "repairOfflineData", "buildReportVersionHistory", "exportValidationResult",
  "renderOfflineRepairAudit", "persistAuditEntry", "renderPersistentAudit", "buildReportDiff",
  "buildRestoreAuditReport", "renderRestoreAudit", "restoreAuditReports", "translateConflictPolicy",
  "renderReportDiff", "diagnoseValidationRecord", "renderValidationFailureDiagnosis",
  "auditRetentionPolicy", "reportDiffFixtures", "validationFailureFixtures",
  "buildPortfolioReportPayload", "renderExportPreview", "calculateEditableLoan", "resetLoanInputs",
  "validateLoanInput", 'fetch("fixtures/dashboard-snapshots.json"', 'navigator.serviceWorker.register("sw.js")',
  "loadUserProfile", "saveUserProfile", "resetUserProfile", "profile-save",
  "scenarioTemplates", "renderScenarioTemplates", "applyScenarioTemplate", "saveScenarioFromTemplate",
]) {
  assert(main.includes(token), `main.js missing ${token}`);
}

for (const token of ["legacySnapshotIdKeys", "atlas.dashboard.snapshotId"]) {
  assert(dashboardModel.includes(token), `dashboard model missing ${token}`);
}

for (const token of [
  '"atlas-pwa-runtime"', '"settings"', '"scenarios"', '"recommendationDecisions"',
  "indexedDbScenarioRepository", "indexedDbRecommendationDecisionRepository", "indexedDbBackupRepository",
  "async delete(scenarioId)", "async clear()", "backupSchemaVersion", "validateBackup",
  "dryRunImport", "sha256Hex", "stableStringify", "checksum",
  "BroadcastChannel", "acquireLock", "releaseLock", "migrationLockKey", "publishCoordinationMessage",
  "saveWithVersionCheck", "aggregateVersion", "Scenario version conflict", "scenario-saved",
  "replaceAllStaged", "Scenario staging validation failed", "stagingResult",
  "replaceAllBackupStoresStaged", "Backup staging validation failed", "recommendationDecisions: await", "settings: await", "auditEntries: await", "storePlan",
  "createStoreImportPlan", "mergeWithoutReplacing", "skip-existing", "conflictKeys",
  "createBackupMigrationPlan", "migrateBackupToCurrent", "migrationHistory", "supportedBackupDatabaseVersions", "migrationPlan", "unsupported-version",
  "exportEncryptedBackup", "decryptEncryptedBackup", "deriveBackupKey", "PBKDF2", "AES-GCM", "encryptedBackupFormatVersion",
  "minimizeBackupData", "backupRecordFieldAllowlist", "maskBackupSensitiveFields", "validateBackupRetentionPolicy",
  "scenarioIds.has", "indexedDbMigrationRepository", "databaseVersion", "indexedDbAuditRepository", '"auditEntries"',
]) {
  assert(indexedDbRuntime.includes(token), `IndexedDB runtime missing ${token}`);
}

assert(repositoryInterface.includes("Repository Interfaces remain technology-neutral"), "Repository Interface documentation is missing technology-neutral invariant");
assert(repositoryInterface.includes("IndexedDB scenario adapter"), "Repository Interface documentation is missing IndexedDB scenario adapter mapping");
new Function(dashboardModel.replaceAll("export const", "const").replaceAll("export function", "function"));

for (const token of [
  ".dashboard-prototype", ".dashboard-switcher", ".runtime-panels", ".user-summary",
  ".primary-actions", ".advanced-controls", ".mobile-toolbar", ".export-preview",
  ".invalid-input", ".scenario-comparison", ".profile-settings", ".profile-grid", ".scenario-templates", ".template-list",
  ".help-screen", ".help-flow", ".help-checklist",
  ".dry-run-grid", ".dry-run-card", ".dry-run-detail", ".dry-run-note", ".dry-run-warning", "@media (max-width: 860px)",
]) {
  assert(styles.includes(token), `styles missing ${token}`);
}

for (const token of [
  "完整操作流程", "設定使用者資料", "切換財務情境", "新增或套用情境",
  "處理建議決策", "匯出報表與驗證", "備份、還原與修復",
]) {
  assert(html.includes(token), `help screen missing ${token}`);
}

assert(dashboard.metrics.length === 4, "dashboard fixture must expose four metrics");
assert(dashboard.label, "dashboard fixture must expose a label");
assert(dashboard.scenarios.length >= 3, "dashboard fixture must expose at least three scenarios");
assert(dashboard.actions.length >= 3, "dashboard fixture must expose at least three actions");
assert(dashboards.snapshots.length >= 3, "dashboard fixture collection must expose at least three snapshots");
for (const snapshot of dashboards.snapshots) {
  assert(snapshot.snapshotId, "dashboard snapshot missing snapshotId");
  assert(snapshot.label, `${snapshot.snapshotId} missing label`);
  assert(snapshot.sourceFixture, `${snapshot.snapshotId} missing sourceFixture`);
  assert(snapshot.metrics.length === 4, `${snapshot.snapshotId} must expose four metrics`);
}

console.log("Frontend validation passed.");
