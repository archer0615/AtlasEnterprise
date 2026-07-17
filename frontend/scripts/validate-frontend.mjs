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

const mojibakePattern = /[嚙�]|[?][\uE000-\uF8FF]/u;

function assertReadable(name, value) {
  assert(!mojibakePattern.test(value), `${name} contains unreadable text`);
}

for (const id of [
  "metricGrid", "scenarioList", "actionList", "dashboardSwitcher", "saveScenarioButton",
  "releaseDashboardPanel", "sampleExportButton", "sampleBackupButton", "sampleLoaderPanel",
  "validationHistoryPanel", "cacheVersionText",
  "reportVersionPanel", "offlineRepairButton", "offlineRepairPanel",
  "reportVersionHistoryPanel", "exportValidationButton", "validationExportPanel", "offlineRepairAuditPanel",
  "deleteScenarioButton", "resetScenariosButton", "runtimeFeedback", "scenarioNameInput",
  "scenarioScoreInput", "exportBackupButton", "importBackupInput", "restoreConfirmInput",
  "applyBackupButton", "backupPreview", "backupDryRunPanel", "scenarioComparisonPanel",
  "portfolioReportPanel", "exportPreviewPanel", "recommendationControlPanel",
  "recommendationHistoryPanel", "recommendationFilterInput", "loanScenarioPanel",
  "exportPortfolioReportButton", "recommendationDecisionLog", "acceptRecommendationButton",
  "rejectRecommendationButton", "loanBalanceInput", "loanRateInput", "loanMonthsInput",
  "calculateLoanButton", "resetLoanButton", "loanEditableOutput",
]) {
  assert(html.includes(`id="${id}"`), `${id} is missing`);
}

for (const text of [
  "搜尋知識文件", "請選擇知識文件查看內容。", "財務決策工作台", "當前財務情境",
  "情境比較", "匯出報表預覽", "備份已預覽", "建議歷史篩選", "重設",
  "行動版快捷工具列", "內部知識與規格文件",
]) {
  assert(html.includes(text) || main.includes(text), `missing readable UI text: ${text}`);
}

assertReadable("index.html", html);
assertReadable("main.js", main);
assertReadable("dashboard-model.js", dashboardModel);
assertReadable("indexeddb-runtime.js", indexedDbRuntime);

for (const token of [
  'from "./dashboard-model.js"', 'from "./indexeddb-runtime.js"', "indexedDbScenarioRepository",
  "indexedDbBackupRepository", "restoreConfirmInput", "previewBackup", "applyBackup",
  "validateScenarioInput", "formatBackupPreview", "formatBackupDryRun",
  "情境分數必須是 0 到 100", "incomingNames", "replacingNames", "renderPortfolioReport",
  "renderRecommendationControls", "renderRecommendationHistory", "renderScenarioComparison",
  "renderLoanScenarioPanel", "setRecommendationDecision", "exportPortfolioReport",
  "wrapExportReport", "repairOfflineData",
  "buildReportVersionHistory", "exportValidationResult", "renderOfflineRepairAudit",
  "buildPortfolioReportPayload", "renderExportPreview", "calculateEditableLoan",
  "resetLoanInputs", "validateLoanInput", "找不到符合條件的知識文件。", "知識文件載入失敗。",
  'fetch("fixtures/dashboard-snapshots.json"', 'fetch(`knowledge/documents/${doc.id}.json`)',
  'navigator.serviceWorker.register("sw.js")',
]) {
  assert(main.includes(token), `main.js missing ${token}`);
}

for (const token of ["legacySnapshotIdKeys", "atlas.dashboard.snapshotId"]) {
  assert(dashboardModel.includes(token), `dashboard model missing ${token}`);
}

for (const token of [
  '"atlas-pwa-runtime"', '"settings"', '"scenarios"', '"recommendationDecisions"',
  "indexedDbScenarioRepository", "indexedDbRecommendationDecisionRepository",
  "indexedDbBackupRepository", "async delete(scenarioId)", "async clear()",
  "backupSchemaVersion", "validateBackup", "scenarioIds.has",
  "indexedDbMigrationRepository", "databaseVersion",
]) {
  assert(indexedDbRuntime.includes(token), `IndexedDB runtime missing ${token}`);
}

assert(repositoryInterface.includes("Repository Interfaces remain technology-neutral"), "Repository Interface documentation is missing technology-neutral invariant");
assert(repositoryInterface.includes("IndexedDB scenario adapter"), "Repository Interface documentation is missing IndexedDB scenario adapter mapping");
new Function(dashboardModel.replaceAll("export const", "const").replaceAll("export function", "function"));

for (const token of [
  ".dashboard-prototype", ".dashboard-switcher", ".runtime-panels", ".user-summary",
  ".primary-actions", ".advanced-controls", ".internal-knowledge", ".mobile-toolbar",
  ".export-preview", ".invalid-input", ".scenario-comparison", "@media (max-width: 860px)",
]) {
  assert(styles.includes(token), `styles missing ${token}`);
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
  assertReadable(`${snapshot.snapshotId} label`, snapshot.label);
  for (const metric of snapshot.metrics) {
    assertReadable(`${snapshot.snapshotId} metric label`, metric.label);
    assertReadable(`${snapshot.snapshotId} metric detail`, metric.detail);
  }
  for (const scenario of snapshot.scenarios) {
    assertReadable(`${snapshot.snapshotId} scenario name`, scenario.name);
    assertReadable(`${snapshot.snapshotId} scenario status`, scenario.status);
  }
  for (const action of snapshot.actions) {
    assertReadable(`${snapshot.snapshotId} action`, action);
  }
}

console.log("Frontend validation passed.");
