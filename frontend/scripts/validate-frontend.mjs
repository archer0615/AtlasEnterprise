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

const mojibakePattern = /[�]|[?][\uE000-\uF8FF]|[銝瘥蝣撱閮][^\n]{0,8}[?]/u;

function assertReadable(name, value) {
  assert(!mojibakePattern.test(value), `${name} contains unreadable text`);
}

assert(html.includes('id="metricGrid"'), "dashboard metric grid is missing");
assert(html.includes('id="scenarioList"'), "dashboard scenario list is missing");
assert(html.includes('id="actionList"'), "dashboard action list is missing");
assert(html.includes('id="dashboardSwitcher"'), "dashboard switcher is missing");
assert(html.includes('id="saveScenarioButton"'), "save scenario button is missing");
assert(html.includes('id="deleteScenarioButton"'), "delete scenario button is missing");
assert(html.includes('id="resetScenariosButton"'), "reset scenarios button is missing");
assert(html.includes('id="runtimeFeedback"'), "runtime feedback is missing");
assert(html.includes('id="scenarioNameInput"'), "scenario name input is missing");
assert(html.includes('id="scenarioScoreInput"'), "scenario score input is missing");
assert(html.includes('id="exportBackupButton"'), "export backup button is missing");
assert(html.includes('id="importBackupInput"'), "import backup input is missing");
assert(html.includes('id="restoreConfirmInput"'), "restore confirmation input is missing");
assert(html.includes('id="applyBackupButton"'), "apply backup button is missing");
assert(html.includes('id="backupPreview"'), "backup preview is missing");
assert(html.includes('id="portfolioReportPanel"'), "portfolio report panel is missing");
assert(html.includes('id="recommendationControlPanel"'), "recommendation control panel is missing");
assert(html.includes('id="loanScenarioPanel"'), "loan scenario panel is missing");
assert(html.includes('id="exportPortfolioReportButton"'), "portfolio report export button is missing");
assert(html.includes('id="recommendationDecisionLog"'), "recommendation decision log is missing");
assert(html.includes('id="acceptRecommendationButton"'), "accept recommendation button is missing");
assert(html.includes('id="rejectRecommendationButton"'), "reject recommendation button is missing");
assert(html.includes('id="loanBalanceInput"'), "loan balance input is missing");
assert(html.includes('id="loanRateInput"'), "loan rate input is missing");
assert(html.includes('id="loanMonthsInput"'), "loan months input is missing");
assert(html.includes('id="calculateLoanButton"'), "loan calculation button is missing");
assert(html.includes('id="loanEditableOutput"'), "loan editable output is missing");
assert(html.includes("搜尋內部知識文件"), "search placeholder must be readable Traditional Chinese and internal-facing");
assert(html.includes("選取知識文件以檢視"), "empty document state must be readable Traditional Chinese");
assert(html.includes("生活決策工作台"), "workspace title must be user-facing");
assert(html.includes("內部知識庫與規格文件"), "internal knowledge area must be explicitly separated");
assert(html.includes("供管理者查閱"), "internal knowledge area must explain its audience");
assertReadable("index.html", html);
assertReadable("main.js", main);
assertReadable("dashboard-model.js", dashboardModel);
assertReadable("indexeddb-runtime.js", indexedDbRuntime);

assert(main.includes('from "./dashboard-model.js"'), "dashboard model import is missing");
assert(main.includes('from "./indexeddb-runtime.js"'), "IndexedDB runtime import is missing");
assert(main.includes("indexedDbScenarioRepository"), "Scenario IndexedDB repository usage is missing");
assert(main.includes("indexedDbBackupRepository"), "Backup IndexedDB repository usage is missing");
assert(dashboardModel.includes("legacySnapshotIdKeys"), "dashboard persistence migration keys are missing");
assert(indexedDbRuntime.includes('"atlas-pwa-runtime"'), "IndexedDB runtime database is missing");
assert(indexedDbRuntime.includes('"settings"'), "IndexedDB settings object store is missing");
assert(indexedDbRuntime.includes('"scenarios"'), "IndexedDB scenarios object store is missing");
assert(indexedDbRuntime.includes('"recommendationDecisions"'), "IndexedDB recommendation decisions object store is missing");
assert(indexedDbRuntime.includes("indexedDbScenarioRepository"), "Scenario repository adapter is missing");
assert(indexedDbRuntime.includes("indexedDbRecommendationDecisionRepository"), "Recommendation decision repository adapter is missing");
assert(indexedDbRuntime.includes("indexedDbBackupRepository"), "Backup repository adapter is missing");
assert(indexedDbRuntime.includes("async delete(scenarioId)"), "Scenario delete adapter is missing");
assert(indexedDbRuntime.includes("async clear()"), "Scenario clear adapter is missing");
assert(indexedDbRuntime.includes("backupSchemaVersion"), "Backup schema version is missing");
assert(indexedDbRuntime.includes("validateBackup"), "Backup schema validation is missing");
assert(indexedDbRuntime.includes("scenarioIds.has"), "Backup duplicate scenario ID validation is missing");
assert(indexedDbRuntime.includes("indexedDbMigrationRepository"), "IndexedDB migration repository is missing");
assert(indexedDbRuntime.includes("databaseVersion"), "IndexedDB database version is missing");
assert(main.includes("restoreConfirmInput"), "Backup restore confirmation workflow is missing");
assert(main.includes("previewBackup"), "Backup preview workflow is missing");
assert(main.includes("applyBackup"), "Backup apply workflow is missing");
assert(main.includes("validateScenarioInput"), "Scenario validation rules are missing");
assert(main.includes("formatBackupPreview"), "Backup preview diff details are missing");
assert(main.includes("情境分數必須是 0 到 100"), "Scenario score range validation is missing");
assert(main.includes("incomingNames"), "Backup preview scenario names are missing");
assert(main.includes("replacingNames"), "Backup preview replacement names are missing");
assert(main.includes("renderPortfolioReport"), "Portfolio report renderer is missing");
assert(main.includes("renderRecommendationControls"), "Recommendation execution controls are missing");
assert(main.includes("renderLoanScenarioPanel"), "Loan scenario renderer is missing");
assert(main.includes("setRecommendationDecision"), "Recommendation decision handler is missing");
assert(main.includes("exportPortfolioReport"), "Portfolio report export workflow is missing");
assert(main.includes("calculateEditableLoan"), "Loan editable calculation workflow is missing");
assert(main.includes("validateLoanInput"), "Loan input validation is missing");
assert(repositoryInterface.includes("Repository Interfaces remain technology-neutral"), "Repository Interface documentation is missing technology-neutral invariant");
assert(repositoryInterface.includes("IndexedDB scenario adapter"), "Repository Interface documentation is missing IndexedDB scenario adapter mapping");
assert(main.includes("找不到符合條件的知識文件。"), "empty search result text is missing");
assert(main.includes("知識文件載入失敗。"), "document load failure text is missing");
assert(main.includes('fetch("fixtures/dashboard-snapshots.json"'), "dashboard fixture collection fetch is missing");
assert(main.includes('fetch(`knowledge/documents/${doc.id}.json`)'), "document fetch must use GitHub Pages compatible relative path");
assert(main.includes('navigator.serviceWorker.register("sw.js")'), "service worker registration must use GitHub Pages compatible relative path");
assert(dashboardModel.includes("atlas.dashboard.snapshotId"), "dashboard local persistence key is missing");
new Function(dashboardModel.replaceAll("export const", "const").replaceAll("export function", "function"));

assert(styles.includes(".dashboard-prototype"), "dashboard prototype styles are missing");
assert(styles.includes(".dashboard-switcher"), "dashboard switcher styles are missing");
assert(styles.includes(".runtime-panels"), "runtime panel styles are missing");
assert(styles.includes(".user-summary"), "user workflow summary styles are missing");
assert(styles.includes(".internal-knowledge"), "internal knowledge separation styles are missing");
assert(styles.includes("@media (max-width: 860px)"), "responsive media query is missing");
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
