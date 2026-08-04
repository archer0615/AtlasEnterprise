import { dashboardStorage, fallbackDashboardSnapshot, normalizeDashboardCollection } from "./dashboard-model.js";
import { indexedDbAssetRepository, indexedDbAuditRepository, indexedDbBackupRepository, indexedDbExpenseRepository, indexedDbGoalRepository, indexedDbIncomeRepository, indexedDbInsurancePolicyRepository, indexedDbLiabilityRepository, indexedDbMigrationRepository, indexedDbRecommendationDecisionRepository, indexedDbScenarioRepository, indexedDbSettingsRepository } from "./indexeddb-runtime.js";
import { createCurrentOwnerProvider } from "./application/ownership/current-owner-provider.js";
import { createAssetApplicationService } from "./application/assets/asset-application-service.js";
import { sanitizeDownloadFilename } from "./security-boundary.js";
import { createLiabilityApplicationService } from "./application/liabilities/liability-application-service.js";
import { projectNetWorth } from "./runtime/net-worth-projection.js";
import { createIncomeApplicationService } from "./application/incomes/income-application-service.js";
import { createExpenseApplicationService } from "./application/expenses/expense-application-service.js";
import { projectCashFlow } from "./runtime/cashflow-projection.js";
import { createGoalApplicationService } from "./application/goals/goal-application-service.js";
import { createInsuranceApplicationService } from "./application/insurance/insurance-application-service.js";
import { projectGoalProgress } from "./runtime/goal-progress-projection.js";
import { projectFinancialHealth } from "./runtime/financial-health-projection.js";
import { createActionPlansFromExecutionPlan } from "./runtime/action-plan-runtime.js";
import { buildBusinessCalendar } from "./runtime/business-calendar-runtime.js";
import { createExecutionPlanFromRecommendation } from "./runtime/execution-plan-runtime.js";
import { evaluateScheduler } from "./runtime/scheduler-runtime.js";
import { dryRunCsvImport } from "./domain/import/csv-import-dry-run.js";
import { renderCsvImportDryRun } from "./features/import/csv-import-view.js";

const state = { documents: [], searchDocuments: new Map(), categories: [], selectedCategory: "all", selectedDocumentId: "", query: "" };
const storageKeys = { dashboardSnapshotId: dashboardStorage.snapshotIdKey };
const $ = (selector) => document.querySelector(selector);

const categoryNav = $("#categoryNav");
const documentList = $("#documentList");
const documentViewer = $("#documentViewer");
const searchInput = $("#searchInput");
const statusText = $("#statusText");
const pageTitle = $("#pageTitle");
const homeSummaryPanel = $("#homeSummaryPanel");
const assetLiabilitySummaryPanel = $("#assetLiabilitySummaryPanel");
const cashflowSummaryPanel = $("#cashflowSummaryPanel");
const goalSummaryPanel = $("#goalSummaryPanel");
const insuranceSummaryPanel = $("#insuranceSummaryPanel");
const resultCount = $("#resultCount");
const clearFiltersButton = $("#clearFiltersButton");
const dashboardDate = $("#dashboardDate");
const dashboardSwitcher = $("#dashboardSwitcher");
const metricGrid = $("#metricGrid");
const scenarioList = $("#scenarioList");
const actionList = $("#actionList");
const scenarioComparisonPanel = $("#scenarioComparisonPanel");
const scenarioComparisonSortInput = $("#scenarioComparisonSortInput");
const portfolioReportPanel = $("#portfolioReportPanel");
const exportPreviewPanel = $("#exportPreviewPanel");
const recommendationControlPanel = $("#recommendationControlPanel");
const recommendationHistoryPanel = $("#recommendationHistoryPanel");
const recommendationFilterInput = $("#recommendationFilterInput");
const exportRecommendationHistoryButton = $("#exportRecommendationHistoryButton");
const executionPlanPanel = $("#executionPlanPanel");
const actionPlanPanel = $("#actionPlanPanel");
const businessCalendarPanel = $("#businessCalendarPanel");
const schedulerStatusPanel = $("#schedulerStatusPanel");
const notificationListPanel = $("#notificationListPanel");
const loanScenarioPanel = $("#loanScenarioPanel");
const exportPortfolioReportButton = $("#exportPortfolioReportButton");
const recommendationDecisionLog = $("#recommendationDecisionLog");
const recommendationRationaleInput = $("#recommendationRationaleInput");
const rationaleTemplates = document.querySelector(".rationale-templates");
const acceptRecommendationButton = $("#acceptRecommendationButton");
const rejectRecommendationButton = $("#rejectRecommendationButton");
const deferRecommendationButton = $("#deferRecommendationButton");
const createActionFromRecommendationButton = $("#createActionFromRecommendationButton");
const loanBalanceInput = $("#loanBalanceInput");
const loanRateInput = $("#loanRateInput");
const loanMonthsInput = $("#loanMonthsInput");
const calculateLoanButton = $("#calculateLoanButton");
const resetLoanButton = $("#resetLoanButton");
const loanEditableOutput = $("#loanEditableOutput");
const saveScenarioButton = $("#saveScenarioButton");
const deleteScenarioButton = $("#deleteScenarioButton");
const resetScenariosButton = $("#resetScenariosButton");
const exportBackupButton = $("#exportBackupButton");
const exportEncryptedBackupButton = $("#exportEncryptedBackupButton");
const backupPassphraseInput = $("#backupPassphraseInput");
const backupConflictPolicySelect = $("#backupConflictPolicySelect");
const importBackupInput = $("#importBackupInput");
const restoreConfirmInput = $("#restoreConfirmInput");
const applyBackupButton = $("#applyBackupButton");
const backupPreview = $("#backupPreview");
const backupDryRunPanel = $("#backupDryRunPanel");
const scenarioNameInput = $("#scenarioNameInput");
const scenarioScoreInput = $("#scenarioScoreInput");
const runtimeFeedback = $("#runtimeFeedback");
const releaseDashboardPanel = $("#releaseDashboardPanel");
const sampleExportButton = $("#sampleExportButton");
const sampleBackupButton = $("#sampleBackupButton");
const releaseNoteButton = $("#releaseNoteButton");
const sampleLoaderPanel = $("#sampleLoaderPanel");
const releaseNotePanel = $("#releaseNotePanel");
const validationHistoryPanel = $("#validationHistoryPanel");
const cacheVersionText = $("#cacheVersionText");
const cacheVersionFooter = $("#cacheVersionFooter");
const reportVersionPanel = $("#reportVersionPanel");
const reportVersionHistoryPanel = $("#reportVersionHistoryPanel");
const exportValidationButton = $("#exportValidationButton");
const generateValidationSummaryButton = $("#generateValidationSummaryButton");
const validationExportPanel = $("#validationExportPanel");
const performanceBudgetTrendPanel = $("#performanceBudgetTrendPanel");
const releaseEvidenceArchivePanel = $("#releaseEvidenceArchivePanel");
const offlineRepairButton = $("#offlineRepairButton");
const offlineRepairPanel = $("#offlineRepairPanel");
const offlineRepairAuditPanel = $("#offlineRepairAuditPanel");
const restoreAuditPanel = $("#restoreAuditPanel");
const persistentAuditPanel = $("#persistentAuditPanel");
const reportDiffPanel = $("#reportDiffPanel");
const validationFailureDiagnosisPanel = $("#validationFailureDiagnosisPanel");
const profileIncomeInput = $("#profileIncomeInput");
const profileAssetsInput = $("#profileAssetsInput");
const profileDebtInput = $("#profileDebtInput");
const profileGoalSelect = $("#profileGoalSelect");
const saveProfileButton = $("#saveProfileButton");
const resetProfileButton = $("#resetProfileButton");
const profileSummaryPanel = $("#profileSummaryPanel");
const scenarioTemplateList = $("#scenarioTemplateList");
const scenarioTemplatePreview = $("#scenarioTemplatePreview");
const applyScenarioTemplateButton = $("#applyScenarioTemplateButton");
const saveScenarioTemplateButton = $("#saveScenarioTemplateButton");
const assetNameInput = $("#assetNameInput");
const assetTypeInput = $("#assetTypeInput");
const assetCurrencyInput = $("#assetCurrencyInput");
const assetValueInput = $("#assetValueInput");
const createAssetButton = $("#createAssetButton");
const assetListPanel = $("#assetListPanel");
const liabilityNameInput = $("#liabilityNameInput");
const liabilityTypeInput = $("#liabilityTypeInput");
const liabilityCurrencyInput = $("#liabilityCurrencyInput");
const liabilityBalanceInput = $("#liabilityBalanceInput");
const createLiabilityButton = $("#createLiabilityButton");
const liabilityListPanel = $("#liabilityListPanel");
const netWorthPanel = $("#netWorthPanel");
const incomeNameInput = $("#incomeNameInput");
const incomeTypeInput = $("#incomeTypeInput");
const incomeAmountInput = $("#incomeAmountInput");
const incomeFrequencyInput = $("#incomeFrequencyInput");
const createIncomeButton = $("#createIncomeButton");
const incomeListPanel = $("#incomeListPanel");
const expenseNameInput = $("#expenseNameInput");
const expenseTypeInput = $("#expenseTypeInput");
const expenseAmountInput = $("#expenseAmountInput");
const expenseFrequencyInput = $("#expenseFrequencyInput");
const createExpenseButton = $("#createExpenseButton");
const expenseListPanel = $("#expenseListPanel");
const cashFlowPanel = $("#cashFlowPanel");
const goalNameInput = $("#goalNameInput");
const goalTypeInput = $("#goalTypeInput");
const goalTargetAmountInput = $("#goalTargetAmountInput");
const goalCurrentAmountInput = $("#goalCurrentAmountInput");
const goalTargetDateInput = $("#goalTargetDateInput");
const createGoalButton = $("#createGoalButton");
const goalListPanel = $("#goalListPanel");
const goalProgressPanel = $("#goalProgressPanel");
const financialHealthPanel = $("#financialHealthPanel");
const csvImportInput = $("#csvImportInput");
const csvDryRunButton = $("#csvDryRunButton");
const csvClearPreviewButton = $("#csvClearPreviewButton");
const csvImportDryRunPanel = $("#csvImportDryRunPanel");
const localActionTitleInput = $("#localActionTitleInput");
const localActionDueInput = $("#localActionDueInput");
const localActionFilterInput = $("#localActionFilterInput");
const addLocalActionButton = $("#addLocalActionButton");
const exportLocalActionsButton = $("#exportLocalActionsButton");
const localActionReminderPanel = $("#localActionReminderPanel");
const localActionListPanel = $("#localActionListPanel");

const ownerProvider = createCurrentOwnerProvider(indexedDbSettingsRepository);
const assetService = createAssetApplicationService({ repository: indexedDbAssetRepository, ownerProvider, auditRepository: indexedDbAuditRepository });
const liabilityService = createLiabilityApplicationService({ repository: indexedDbLiabilityRepository, ownerProvider, auditRepository: indexedDbAuditRepository });
const incomeService = createIncomeApplicationService({ repository: indexedDbIncomeRepository, ownerProvider, auditRepository: indexedDbAuditRepository });
const expenseService = createExpenseApplicationService({ repository: indexedDbExpenseRepository, ownerProvider, auditRepository: indexedDbAuditRepository });
const goalService = createGoalApplicationService({ repository: indexedDbGoalRepository, ownerProvider, auditRepository: indexedDbAuditRepository });
const insuranceService = createInsuranceApplicationService({ repository: indexedDbInsurancePolicyRepository, ownerProvider, auditRepository: indexedDbAuditRepository });

let dashboardSnapshots = [fallbackDashboardSnapshot];
let runtimeSnapshots = [];
let simulatorResults = new Map();
let selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
let localScenarios = [];
let recommendationDecisions = [];
let pendingBackup = null;
let latestValidationRecord = null;
let validationHistoryRecords = [];
let currentCacheVersion = "";
let offlineRepairAudit = [];
let restoreAuditReports = [];
let persistentAuditEntries = [];
let userProfile = { income: "", assets: "", debt: "", goal: "balanced" };
let localActions = [];
let selectedScenarioTemplateId = "home";
const scenarioTemplates = [
  { id: "home", name: "買房準備", score: "72", detail: "檢查頭期款、交易成本與貸款壓力。" },
  { id: "retirement", name: "退休準備", score: "68", detail: "檢查退休提領、通膨與長期資產配置。" },
  { id: "investment", name: "投資回撤", score: "64", detail: "檢查投資組合回撤與風險承受度。" },
  { id: "debt", name: "降債優先", score: "80", detail: "檢查負債收入比與提前還款彈性。" },
];
const auditRetentionPolicy = {
  schema: "atlas-enterprise.audit-retention-policy.v1",
  maxEntries: 20,
  visibleEntries: 5,
  retainedActions: ["scenario-save", "scenario-delete", "scenario-reset", "backup-restore", "offline-repair", "recommendation-decision"],
};
const reportDiffFixtures = [
  { previousVersion: "export-report.v1", currentVersion: "export-report.v2", changedFields: ["cacheVersion", "validation", "localizedPayload"] },
];
const validationFailureFixtures = [
  { status: "missing", expectedReason: "validation-history.json 尚未產生" },
  { status: "failed", command: "npm run validate", scope: ["frontend"], expectedNextAction: "檢查 command、scope、commit 與最新輸出" },
];

async function loadIndex() {
  const response = await fetch("knowledge/index.json", { cache: "no-cache" });
  if (!response.ok) throw new Error(`知識索引載入失敗：${response.status}`);
  const index = await response.json();
  const searchResponse = await fetch("knowledge/search-index.json", { cache: "no-cache" });
  const searchIndex = searchResponse.ok ? await searchResponse.json() : { documents: [] };
  state.documents = index.documents || [];
  state.searchDocuments = new Map((searchIndex.documents || []).map((doc) => [doc.id, doc]));
  state.categories = index.categories || [];
  statusText.textContent = `已載入 ${state.documents.length} 份知識文件`;
  renderCategories();
  renderList();
  openDocumentFromHash();
}

async function loadDashboard() {
  try {
    const response = await fetch("fixtures/dashboard-snapshots.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`儀表板資料載入失敗：${response.status}`);
    const collection = normalizeDashboardCollection(await response.json());
    dashboardSnapshots = collection.snapshots;
    await loadRuntimeContracts();
    selectedDashboardSnapshotId = await readStoredDashboardSnapshotId() || collection.defaultSnapshotId;
    await indexedDbMigrationRepository.markCurrent().catch(() => {});
    localScenarios = await indexedDbScenarioRepository.list().catch(() => []);
    recommendationDecisions = await indexedDbRecommendationDecisionRepository.list().catch(() => []);
    renderDashboardById(selectedDashboardSnapshotId);
  } catch (error) {
    dashboardSnapshots = [fallbackDashboardSnapshot];
    selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
    setRuntimeFeedback(error.message || "儀表板資料載入失敗。");
    renderDashboard(fallbackDashboardSnapshot);
  }
}

function renderCategories() {
  const counts = state.documents.reduce((acc, doc) => ({ ...acc, [doc.category]: (acc[doc.category] || 0) + 1 }), {});
  const categories = [{ id: "all", label: "全部", count: state.documents.length }, ...state.categories.map((category) => ({ id: category, label: category, count: counts[category] || 0 }))];
  categoryNav.innerHTML = categories.map((category) => `<button class="${category.id === state.selectedCategory ? "active" : ""}" data-category="${escapeAttribute(category.id)}" type="button"><span>${escapeHtml(translateCategory(category.label))}</span><span>${category.count}</span></button>`).join("");
}

function renderList() {
  const tokens = normalizeQuery(state.query);
  const docs = state.documents.map((doc) => ({ ...doc, score: scoreDocument(doc, tokens) }))
    .filter((doc) => (state.selectedCategory === "all" || doc.category === state.selectedCategory) && (!tokens.length || doc.score > 0))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
  pageTitle.textContent = "決策總覽";
  resultCount.textContent = `${docs.length} 筆結果`;
  documentList.innerHTML = docs.map((doc) => `<button class="document-card ${doc.id === state.selectedDocumentId ? "active" : ""}" type="button" data-id="${doc.id}"><span class="doc-title">${escapeHtml(translateKnowledgeText(doc.title))}</span><span class="doc-category">${escapeHtml(translateCategory(doc.category))}</span><span class="doc-path">${escapeHtml(doc.path)}</span>${tokens.length ? `<span class="doc-score">關聯分數 ${doc.score}</span>` : ""}</button>`).join("") || `<p class="empty-state">找不到符合條件的知識文件。</p>`;
}

function normalizeQuery(value) {
  return value.toLowerCase().replace(/[`*_#[\](){}|>~:;,.!?/\\-]+/g, " ").split(/\s+/).map((token) => token.trim()).filter(Boolean);
}

function scoreDocument(doc, tokens) {
  if (!tokens.length) return 0;
  const searchDoc = state.searchDocuments.get(doc.id);
  const values = [doc.title, doc.path, doc.category, doc.summary, searchDoc?.terms, ...(searchDoc?.headings || [])].join(" ").toLowerCase();
  return tokens.reduce((score, token) => score + (values.includes(token) ? 2 : 0) + (String(doc.title).toLowerCase().includes(token) ? 8 : 0), 0);
}

async function openDocument(id) {
  const doc = state.documents.find((item) => item.id === id);
  if (!doc) return;
  state.selectedDocumentId = id;
  window.history.replaceState(null, "", `#doc=${encodeURIComponent(id)}`);
  renderList();
  const response = await fetch(`knowledge/documents/${doc.id}.json`);
  if (!response.ok) {
    documentViewer.innerHTML = `<p class="empty-state">知識文件載入失敗。</p>`;
    return;
  }
  const payload = await response.json();
  documentViewer.innerHTML = `<div class="document-meta"><span>${escapeHtml(translateCategory(payload.category))}</span><span>${escapeHtml(payload.canonicalPath)}</span></div><h2>${escapeHtml(translateKnowledgeText(payload.title))}</h2>${renderHeadingLinks(translateKnowledgeHeadings(payload.headings || []))}<pre>${escapeHtml(translateKnowledgeMarkdown(payload.bodyMarkdown || ""))}</pre>`;
}

function renderHeadingLinks(headings) {
  const visibleHeadings = headings.filter((heading) => heading.level <= 3).slice(0, 12);
  return visibleHeadings.length ? `<div class="heading-strip">${visibleHeadings.map((heading) => `<span>H${heading.level} ${escapeHtml(heading.text)}</span>`).join("")}</div>` : "";
}

function renderDashboardById(snapshotId) {
  const snapshot = dashboardSnapshots.find((item) => item.snapshotId === snapshotId) || dashboardSnapshots[0];
  selectedDashboardSnapshotId = snapshot.snapshotId;
  writeStoredValue(storageKeys.dashboardSnapshotId, selectedDashboardSnapshotId);
  renderDashboard(snapshot);
}

function renderDashboard(snapshot) {
  dashboardDate.textContent = snapshot.asOfDate;
  dashboardSwitcher.innerHTML = dashboardSnapshots.map((item) => `<button class="${item.snapshotId === selectedDashboardSnapshotId ? "active" : ""}" type="button" data-snapshot-id="${escapeAttribute(item.snapshotId)}">${escapeHtml(item.label || item.snapshotId)}</button>`).join("");
  metricGrid.innerHTML = snapshot.metrics.map((metric) => `<div class="metric-card"><span>${escapeHtml(metric.label)}</span><strong>${escapeHtml(formatDisplayToken(metric.value))}</strong><small>${escapeHtml(metric.detail)}</small></div>`).join("");
  scenarioList.innerHTML = [...snapshot.scenarios, ...localScenarios].map((scenario) => `<div class="scenario-row"><span>${escapeHtml(scenario.name)}</span><strong>${escapeHtml(formatDisplayToken(scenario.score))}</strong><small>${escapeHtml(translateStatus(scenario.status))}</small></div>`).join("");
  actionList.innerHTML = snapshot.actions.map((action) => `<div class="action-row">${escapeHtml(action)}</div>`).join("");
  renderHomeSummary(snapshot);
  renderScenarioComparison(snapshot);
  renderPortfolioReport(snapshot);
  renderRecommendationControls(snapshot);
  renderSelectedBatchReadModels(snapshot);
  renderLoanScenarioPanel(snapshot);
  renderExportPreview(snapshot);
}

function renderHomeSummary(snapshot) {
  if (!homeSummaryPanel) return;
  const scoreMetric = snapshot.metrics.find((metric) => /分數|score/i.test(metric.label)) || snapshot.metrics[0];
  const pendingRecommendationCount = Math.max(0, (snapshot.actions || []).length - recommendationDecisions.length);
  const latestDecision = recommendationDecisions
    .sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")))[0];
  const items = [
    ["目前分數", formatDisplayToken(scoreMetric?.value ?? "N/A"), scoreMetric?.detail || "尚未載入分數"],
    ["本機情境", `${localScenarios.length}`, localScenarios.length ? "可進行情境比較" : "尚未建立自訂情境"],
    ["待處理建議", `${pendingRecommendationCount}`, latestDecision ? `最近：${translateDecision(latestDecision.decision)}` : "尚未記錄決策"],
  ];
  homeSummaryPanel.innerHTML = items.map(([label, value, detail]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></div>`).join("");
}

function updateNavigationState() {
  const activeHash = window.location.hash.split("?")[0] || "#today";
  const activeMap = {
    "#assets": "#data",
    "#cashflow": "#data",
    "#goals": "#data",
    "#insurance": "#data",
    "#csv-import": "#settings",
    "#loan": "#dashboard",
    "#portfolio": "#dashboard",
    "#execution": "#dashboard",
    "#calendar": "#dashboard",
    "#notifications": "#dashboard",
  };
  const navHash = activeMap[activeHash] || activeHash;
  if (activeHash === "#settings") document.querySelector("#settings")?.setAttribute("open", "");
  if (activeHash === "#help") document.querySelector("#help")?.setAttribute("open", "");
  if (["#csv-import", "#settings"].includes(activeHash)) document.querySelector("#settings")?.setAttribute("open", "");
  document.querySelectorAll(".workflow-nav a, .mobile-toolbar a").forEach((link) => {
    const isActive = link.getAttribute("href") === navHash;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderScenarioComparison(snapshot) {
  const baselineScore = Number(snapshot.metrics.find((metric) => /分數|score/i.test(metric.label))?.value ?? snapshot.scenarios?.[0]?.score ?? 0);
  if (!localScenarios.length) {
    scenarioComparisonPanel.innerHTML = `<div class="empty-runtime">尚無本機情境可比較。</div>`;
    return;
  }
  scenarioComparisonPanel.innerHTML = sortScenarioComparisonSource(localScenarios).map((scenario) => {
    const score = Number(String(scenario.score).replace(/[^\d.-]/g, ""));
    const delta = Number.isFinite(score) && Number.isFinite(baselineScore) ? score - baselineScore : null;
    const deltaText = delta === null ? "無法比較" : `${delta >= 0 ? "+" : ""}${delta}`;
    return `<div class="runtime-row"><span>${escapeHtml(scenario.name)}</span><strong>${escapeHtml(deltaText)}</strong></div>`;
  }).join("");
}

function sortScenarioComparisonSource(scenarios) {
  const mode = scenarioComparisonSortInput?.value || "delta-desc";
  const baselineSnapshot = dashboardSnapshots.find((item) => item.snapshotId === selectedDashboardSnapshotId) || dashboardSnapshots[0];
  const baselineScore = Number(baselineSnapshot?.metrics?.find((metric) => /score/i.test(metric.label))?.value ?? baselineSnapshot?.scenarios?.[0]?.score ?? 0);
  return [...scenarios].sort((left, right) => {
    if (mode === "name-asc") return String(left.name || "").localeCompare(String(right.name || ""));
    const leftDelta = Number(String(left.score).replace(/[^\d.-]/g, "")) - baselineScore;
    const rightDelta = Number(String(right.score).replace(/[^\d.-]/g, "")) - baselineScore;
    const safeLeft = Number.isFinite(leftDelta) ? leftDelta : Number.NEGATIVE_INFINITY;
    const safeRight = Number.isFinite(rightDelta) ? rightDelta : Number.NEGATIVE_INFINITY;
    return mode === "delta-asc" ? safeLeft - safeRight : safeRight - safeLeft;
  });
}

function getRuntimeSnapshot(snapshot) {
  return runtimeSnapshots.find((item) => item.snapshotId === snapshot.snapshotId) || runtimeSnapshots.find((item) => item.sourceFixture === snapshot.sourceFixture) || null;
}

function getRuntimeResult(runtimeSnapshot) {
  const fixtureId = runtimeSnapshot?.runtimeBinding?.sourceFixtureId || runtimeSnapshot?.sourceFixture?.split("/").pop()?.replace(/\.json$/, "");
  return simulatorResults.get(fixtureId) || null;
}

function renderPortfolioReport(snapshot) {
  const runtimeSnapshot = getRuntimeSnapshot(snapshot);
  const result = getRuntimeResult(runtimeSnapshot);
  const formulaIds = (runtimeSnapshot?.metrics || []).flatMap((metric) => metric.formulaIds || []);
  const isPortfolio = formulaIds.includes("FORM-PORTFOLIO-DRAWDOWN") || formulaIds.includes("FORM-DRAWDOWN-ATTRIBUTION");
  if (!isPortfolio || !result) {
    portfolioReportPanel.innerHTML = `<div class="empty-runtime">此情境沒有投資報表資料。<a href="#dashboard">切換其他情境</a></div>`;
    return;
  }
  const metrics = Object.entries(result.metrics).map(([key, value]) => [translateMetricName(key), formatMetricValue(value)]);
  portfolioReportPanel.innerHTML = metrics.slice(0, 5).map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function renderRecommendationControls(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) {
    recommendationControlPanel.innerHTML = `<div class="empty-runtime">此情境沒有可執行建議。<a href="#dashboard">先建立或切換情境</a></div>`;
    recommendationDecisionLog.textContent = "";
    renderRecommendationHistory();
    return;
  }
  recommendationControlPanel.innerHTML = `<div class="runtime-row"><span>狀態</span><strong>${escapeHtml(translateStatus(result.recommendation.status))}</strong></div><div class="runtime-row"><span>分數</span><strong>${escapeHtml(result.score)}</strong></div><div class="runtime-note">${escapeHtml(translateRecommendationText(result.recommendation.explanation))}</div>`;
  renderRecommendationDecisionLog(result.fixtureId);
  renderRecommendationHistory();
}

function renderRecommendationDecisionLog(fixtureId) {
  const latest = recommendationDecisions.filter((item) => item.fixtureId === fixtureId).sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")))[0];
  recommendationDecisionLog.textContent = latest ? `最新決策：${translateDecision(latest.decision)} / ${translateStatus(latest.status)} / ${latest.decidedAt}` : "尚未記錄決策。";
}

function renderRecommendationHistory() {
  const filter = recommendationFilterInput.value;
  const items = recommendationDecisions
    .filter((item) => filter === "all" || item.decision === filter)
    .sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")))
    .slice(0, 5);
  recommendationHistoryPanel.textContent = items.length
    ? items.map((item) => `${translateDecision(item.decision)} / ${item.fixtureId} / ${item.decidedAt}`).join("\n")
    : "尚無符合條件的建議歷史。";
}

function exportRecommendationHistory() {
  const filter = recommendationFilterInput.value;
  const items = recommendationDecisions
    .filter((item) => filter === "all" || item.decision === filter)
    .sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")));
  downloadJson({
    schema: "atlas-enterprise.recommendation-history.v1",
    exportedAt: new Date().toISOString(),
    filter,
    count: items.length,
    items: items.map((item) => ({
      decisionId: item.decisionId,
      decision: item.decision,
      fixtureId: item.fixtureId,
      snapshotId: item.snapshotId,
      status: item.status,
      score: item.score,
      decidedAt: item.decidedAt,
    })),
  }, `atlas-recommendation-history-${filter}.json`);
  setRuntimeFeedback(`Recommendation history exported: ${items.length}`);
}

function renderSelectedBatchReadModels(snapshot) {
  const executionPlan = buildReadOnlyExecutionPlan(snapshot);
  renderExecutionPlanPreview(executionPlan);
  const actionPlans = executionPlan ? createActionPlansFromExecutionPlan(executionPlan, readOnlyRuntimeContext()) : [];
  renderActionPlanPreview(actionPlans);
  const calendarEntries = buildBusinessCalendar({
    ownerId: "local-owner",
    recommendations: [buildReadOnlyRecommendation(snapshot)].filter(Boolean),
    executionPlans: executionPlan ? [executionPlan] : [],
    actionPlans,
  }, readOnlyRuntimeContext());
  const localCalendarEntries = buildLocalActionCalendarEntries();
  renderBusinessCalendarPreview([...calendarEntries, ...localCalendarEntries]);
  const scheduler = evaluateScheduler({
    ownerId: "local-owner",
    asOfDate: snapshot.asOfDate,
    calendarEntries: [...calendarEntries, ...localCalendarEntries],
    automationResults: [],
  }, readOnlyRuntimeContext());
  const localNotifications = buildLocalActionNotifications();
  renderSchedulerPreview({ ...scheduler, schedulerState: { ...scheduler.schedulerState, generatedNotificationCount: scheduler.schedulerState.generatedNotificationCount + localNotifications.length } });
  renderNotificationPreview([...scheduler.notifications, ...localNotifications]);
}

function buildReadOnlyExecutionPlan(snapshot) {
  const recommendation = buildReadOnlyRecommendation(snapshot);
  if (!recommendation) return null;
  const latest = recommendationDecisions
    .filter((item) => item.fixtureId === recommendation.sourceDecisionId || item.snapshotId === snapshot.snapshotId)
    .sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")))[0];
  if (latest?.decision !== "accepted") return null;
  const result = createExecutionPlanFromRecommendation(
    { ...recommendation, status: "accepted" },
    { status: "committed", decisionId: latest.decisionId },
    readOnlyRuntimeContext(),
  );
  return result.ok ? result.record : null;
}

function buildReadOnlyRecommendation(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) return null;
  return Object.freeze({
    id: `recommendation-${result.fixtureId}`,
    ownerId: "local-owner",
    title: snapshot.label || result.fixtureId,
    type: "cashflow",
    priority: result.score < 65 ? "high" : "medium",
    status: result.recommendation.status === "accept" ? "accepted" : "pending-review",
    sourceScenarioId: snapshot.snapshotId,
    sourceDecisionId: result.fixtureId,
    ruleReferences: Object.freeze([result.recommendation.source || "engine-derived-recommendation.v1"]),
    constraintReferences: Object.freeze(result.recommendation.warningReferences || []),
    recommendationDate: result.asOfDate || snapshot.asOfDate,
    expiresAt: result.asOfDate || snapshot.asOfDate,
    summary: result.recommendation.explanation || "",
    supportingEvidence: Object.freeze({ score: result.score }),
    warnings: Object.freeze(result.recommendation.warningReferences || []),
    dataCompleteness: 1,
  });
}

function renderExecutionPlanPreview(executionPlan) {
  if (!executionPlanPanel) return;
  if (!executionPlan) {
    executionPlanPanel.innerHTML = `<div class="empty-runtime">接受目前建議後，這裡會顯示本機唯讀執行計畫。</div>`;
    return;
  }
  executionPlanPanel.innerHTML = [
    `<div class="runtime-row"><span>建議</span><strong>${escapeHtml(executionPlan.recommendationId)}</strong></div>`,
    `<div class="runtime-row"><span>目標日期</span><strong>${escapeHtml(executionPlan.targetDate)}</strong></div>`,
    `<div class="runtime-row"><span>狀態</span><strong>${escapeHtml(executionPlan.status)}</strong></div>`,
    ...executionPlan.steps.map((step) => `<div class="runtime-row"><span>${escapeHtml(step.order)}. ${escapeHtml(step.title)}</span><strong>${escapeHtml(step.status)}</strong></div>`),
  ].join("");
}

function renderActionPlanPreview(actionPlans) {
  if (!actionPlanPanel) return;
  actionPlanPanel.innerHTML = actionPlans.length
    ? actionPlans.map((action) => `<div class="runtime-row"><span>${escapeHtml(action.title)}</span><strong>${escapeHtml(action.targetDate)} / ${escapeHtml(action.status)}</strong></div>`).join("")
    : `<div class="empty-runtime">尚無行動計畫預覽。</div>`;
}

function renderBusinessCalendarPreview(calendarEntries) {
  if (!businessCalendarPanel) return;
  businessCalendarPanel.innerHTML = calendarEntries.length
    ? calendarEntries.map((entry) => `<div class="runtime-row"><span>${escapeHtml(entry.title)}</span><strong>${escapeHtml(entry.dueDate)} / ${escapeHtml(entry.type)}</strong></div>`).join("")
    : `<div class="empty-runtime">尚無 upcoming review 或目標日期。</div>`;
}

function buildLocalActionCalendarEntries() {
  return localActions
    .filter((action) => action.status !== "done" && action.dueDate)
    .map((action) => ({
      title: action.title,
      dueDate: action.dueDate,
      type: action.sourceRecommendationId ? "recommendation-action" : "local-action",
    }));
}

function buildLocalActionNotifications() {
  const today = new Date().toISOString().slice(0, 10);
  return localActions
    .filter((action) => action.status !== "done" && action.dueDate && action.dueDate <= today)
    .map((action) => ({
      title: `行動到期：${action.title}`,
      priority: "medium",
      readState: "unread",
    }));
}

function renderSchedulerPreview(scheduler) {
  if (!schedulerStatusPanel) return;
  schedulerStatusPanel.textContent = [
    `Due items: ${scheduler.schedulerState.dueCount}`,
    `Generated notifications: ${scheduler.schedulerState.generatedNotificationCount}`,
    `Review queue: ${scheduler.schedulerState.reviewQueueCount}`,
  ].join("\n");
}

function renderNotificationPreview(notifications) {
  if (!notificationListPanel) return;
  notificationListPanel.innerHTML = notifications.length
    ? notifications.map((notification) => `<div class="runtime-row"><span>${escapeHtml(notification.title)}</span><strong>${escapeHtml(notification.priority)} / ${escapeHtml(notification.readState)}</strong></div>`).join("")
    : `<div class="empty-runtime">目前沒有到期通知。</div>`;
}

function readOnlyRuntimeContext() {
  return {
    now: () => new Date(`${currentSnapshot().asOfDate || "2026-07-23"}T00:00:00.000Z`),
    createId: () => `readonly-${selectedDashboardSnapshotId}`,
  };
}

function renderLoanScenarioPanel(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  const formulaIds = result?.formulaEvaluation?.formulaIds || [];
  const isLoan = formulaIds.some((formulaId) => ["FORM-PMT", "FORM-LOAN-AMORTIZATION", "FORM-REFI-BREAK-EVEN", "FORM-PREPAYMENT-IMPACT"].includes(formulaId));
  if (!isLoan || !result) {
    loanScenarioPanel.innerHTML = `<div class="empty-runtime">此情境沒有貸款試算資料。<a href="#loan">手動輸入貸款條件</a></div>`;
    return;
  }
  loanScenarioPanel.innerHTML = Object.entries(result.metrics).filter(([key]) => /payment|loan|refinance|interest|balance|prepayment|fee/i.test(key)).slice(0, 5).map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(translateMetricName(label))}</span><strong>${escapeHtml(formatMetricValue(value))}</strong></div>`).join("");
}

async function setRecommendationDecision(decision) {
  const snapshot = currentSnapshot();
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) {
    setRuntimeFeedback("目前沒有可決策的建議。");
    return;
  }
  const rationale = recommendationRationaleInput?.value?.trim() || "";
  if (!rationale) throw new Error("請先填寫決策理由。");
  await indexedDbRecommendationDecisionRepository.save({ decisionId: `decision-${Date.now()}`, decision, rationale, fixtureId: result.fixtureId, snapshotId: snapshot.snapshotId, status: result.recommendation.status, score: String(result.score), decidedAt: new Date().toISOString() });
  await persistAuditEntry("recommendation-decision", { decision, rationale, fixtureId: result.fixtureId, snapshotId: snapshot.snapshotId, status: result.recommendation.status });
  recommendationDecisions = await indexedDbRecommendationDecisionRepository.list();
  if (recommendationRationaleInput) recommendationRationaleInput.value = "";
  renderRecommendationDecisionLog(result.fixtureId);
  renderRecommendationHistory();
  renderHomeSummary(snapshot);
  setRuntimeFeedback(`建議已${translateDecision(decision)}：${result.fixtureId} / ${translateStatus(result.recommendation.status)}`);
}

function buildPortfolioReportPayload(snapshot) {
  const runtimeSnapshot = getRuntimeSnapshot(snapshot);
  const result = getRuntimeResult(runtimeSnapshot);
  if (!result?.metrics) return null;
  const formulaIds = (runtimeSnapshot?.metrics || []).flatMap((metric) => metric.formulaIds || []);
  return {
    匯出時間: new Date().toISOString(),
    情境代碼: snapshot.snapshotId,
    情境名稱: snapshot.label || snapshot.snapshotId,
    來源案例: result.fixtureId,
    公式代碼: formulaIds,
    指標: Object.fromEntries(Object.entries(result.metrics).map(([key, value]) => [translateMetricName(key), formatMetricValue(value)])),
    建議: result.recommendation ? { 狀態: translateStatus(result.recommendation.status), 說明: translateRecommendationText(result.recommendation.explanation) } : null,
  };
}

function renderExportPreview(snapshot) {
  const payload = buildPortfolioReportPayload(snapshot);
  exportPreviewPanel.textContent = payload ? JSON.stringify(wrapExportReport(snapshot, payload), null, 2) : "此情境沒有可預覽的投資報表。";
}

function exportPortfolioReport() {
  const snapshot = currentSnapshot();
  const payload = buildPortfolioReportPayload(snapshot);
  if (!payload) {
    setRuntimeFeedback("目前沒有可匯出的報表資料。");
    return;
  }
  downloadJson(wrapExportReport(snapshot, payload), `atlas-export-report-v2-${snapshot.snapshotId}.json`);
  setRuntimeFeedback(`已匯出中文化報表：${snapshot.snapshotId}`);
}

function wrapExportReport(snapshot, payload) {
  const reportHistory = buildReportVersionHistory();
  return {
    reportVersion: "export-report.v2",
    schema: "atlas-enterprise.export-report.localized.v2",
    generatedAt: new Date().toISOString(),
    snapshotId: snapshot.snapshotId,
    cacheVersion: currentCacheVersion || "N/A",
    reportHistory,
    validation: latestValidationRecord ? {
      status: latestValidationRecord.status,
      command: latestValidationRecord.command,
      recordedAt: latestValidationRecord.recordedAt,
    } : null,
    localizedPayload: payload,
  };
}

function buildReportVersionHistory() {
  return [
    { version: "export-report.v1", status: "retained", description: "中文化報表欄位" },
    { version: "export-report.v2", status: "current", description: "加入快取版本、驗證紀錄與版本歷史" },
  ];
}

function calculateEditableLoan() {
  clearLoanValidation();
  const principal = Number(loanBalanceInput.value.replaceAll(",", ""));
  const annualRate = Number(loanRateInput.value);
  const months = Number(loanMonthsInput.value);
  validateLoanInput(principal, annualRate, months);
  const monthlyPayment = calculateAmortizedPayment(principal, annualRate, months);
  loanEditableOutput.textContent = `月付款：${monthlyPayment.toLocaleString("zh-TW", { maximumFractionDigits: 2 })}，本金：${principal.toLocaleString("zh-TW")}，期數：${months} 個月`;
  setRuntimeFeedback("貸款試算完成。");
}

function resetLoanInputs() {
  loanBalanceInput.value = "";
  loanRateInput.value = "";
  loanMonthsInput.value = "";
  loanEditableOutput.textContent = "";
  clearLoanValidation();
  setRuntimeFeedback("貸款輸入已重設。");
}

function calculateAmortizedPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  return monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - (1 + monthlyRate) ** -months);
}

function validateLoanInput(principal, annualRate, months) {
  if (!Number.isFinite(principal) || principal <= 0) {
    markInvalid(loanBalanceInput);
    throw new Error("本金必須大於 0，請輸入正確金額。");
  }
  if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100) {
    markInvalid(loanRateInput);
    throw new Error("年利率必須介於 0 到 100 之間。");
  }
  if (!Number.isInteger(months) || months <= 0 || months > 600) {
    markInvalid(loanMonthsInput);
    throw new Error("期數必須是 1 到 600 之間的整數月份。");
  }
}

function clearLoanValidation() {
  [loanBalanceInput, loanRateInput, loanMonthsInput].forEach((input) => input.classList.remove("invalid-input"));
}

function markInvalid(input) {
  input.classList.add("invalid-input");
}

function formatMetricValue(value, mode = "") {
  if (value === null || value === undefined) return "N/A";
  if (mode === "percent") return `${(Number(value) * 100).toFixed(2)}%`;
  if (mode === "currency") return Number(value).toLocaleString("zh-TW");
  return formatDisplayToken(value);
}

function formatDisplayToken(value) {
  return String(value).replace(/^(\d+(?:\.\d+)?)K$/, (_, amount) => `${Number(amount) * 1000}`).replace(/^(\d+(?:\.\d+)?)M$/, (_, amount) => `${Number(amount).toLocaleString("zh-TW")} 百萬`).replaceAll("TWD", "新台幣").replaceAll("break-even", "損益兩平");
}

function translateCategory(value) {
  const translations = { all: "全部", ai: "AI", api: "API", catalog: "目錄", engine: "引擎", entity: "實體", framework: "框架", governance: "治理", reporting: "報表", security: "安全", supporting: "支援", workflow: "流程" };
  return translations[value] || value;
}

function translateKnowledgeHeadings(headings) {
  return headings.map((heading) => ({ ...heading, text: translateKnowledgeText(heading.text) }));
}

function translateKnowledgeMarkdown(markdown) {
  return String(markdown).split("\n").map((line) => translateKnowledgeText(line)).join("\n");
}

function translateKnowledgeText(value) {
  return String(value || "").replaceAll("Document", "文件").replaceAll("Status", "狀態").replaceAll("Dashboard", "儀表板").replaceAll("Scenario", "情境").replaceAll("Portfolio", "投資組合").replaceAll("Loan", "貸款");
}

function translateStatus(value) {
  const translations = { accepted: "已接受", "at-risk": "有風險", conditional: "有條件", defer: "延後", done: "完成", evaluated: "已評估", IndexedDB: "本機儲存", monitor: "監控", "pending-review": "待處理", proceed: "可執行", reject: "拒絕", rejected: "已拒絕" };
  return translations[value] || value;
}

function translateDecision(value) {
  return { accepted: "接受", rejected: "拒絕", deferred: "延後" }[value] || value;
}

function translateMetricName(value) {
  const translations = { drawdownRate: "最大回撤率", totalDrawdownAmount: "總回撤金額", stressedPortfolioValue: "壓力後投資組合價值", equityLoss: "股票損失", reserveMonths: "預備金月數", currentMonthlyPayment: "目前月付款", refinanceMonthlyPayment: "再融資月付款", refinanceFeeRecoveryMonths: "費用回收月數", monthlyMortgagePayment: "每月房貸付款", withdrawalRate: "提領率", transactionCostEstimate: "交易成本估計" };
  return translations[value] || value;
}

function translateRecommendationText(value) {
  const translations = {
    "Equity exposure explains most drawdown risk and should drive mitigation planning.": "股票曝險是主要回撤來源，應優先規劃風險緩解。",
    "Liquidity survives the drawdown, but goal funding margin should remain under review.": "流動性可承受回撤，但目標資金餘裕仍需持續檢視。",
    "Delay commitment until down payment and transaction cost assumptions are covered.": "在頭期款與交易成本假設完整覆蓋前，應延後承諾。",
    "Keep retirement plan under monitoring because stress returns reduce readiness margin.": "壓力情境會降低退休準備餘裕，建議持續監控。",
    "Proceed only if emergency reserve remains above target after prepayment.": "僅在提前還款後緊急預備金仍高於目標時執行。",
    "Refinance does not create monthly savings and fee recovery is not available.": "再融資未產生月付節省，且費用無法回收。",
    "Refinance only if fee recovery remains acceptable under the reset-rate scenario.": "只有在重設利率情境下費用回收仍可接受時才再融資。",
  };
  return translations[value] || value;
}

async function saveCurrentScenario() {
  const snapshot = currentSnapshot();
  const name = scenarioNameInput.value.trim() || `${snapshot.label || snapshot.snapshotId} 自訂情境`;
  const score = scenarioScoreInput.value.trim() || snapshot.metrics?.[0]?.value || "N/A";
  validateScenarioInput(name, score);
  await indexedDbScenarioRepository.save({ scenarioId: `local-${Date.now()}`, name, score, status: "IndexedDB", sourceSnapshotId: snapshot.snapshotId, savedAt: new Date().toISOString() });
  await persistAuditEntry("scenario-save", { snapshotId: snapshot.snapshotId, name, score });
  scenarioNameInput.value = "";
  scenarioScoreInput.value = "";
  localScenarios = await indexedDbScenarioRepository.list();
  setRuntimeFeedback("自訂情境已儲存。");
  renderDashboard(snapshot);
}

async function deleteLastScenario() {
  const latest = [...localScenarios].sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")))[0];
  if (!latest) {
    setRuntimeFeedback("目前沒有可刪除的自訂情境。");
    return;
  }
  if (!window.confirm("刪除最新情境前，建議先匯出備份。確定要刪除？")) return;
  await indexedDbScenarioRepository.delete(latest.scenarioId);
  await persistAuditEntry("scenario-delete", { scenarioId: latest.scenarioId, sourceSnapshotId: latest.sourceSnapshotId });
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("最新自訂情境已刪除。");
}

async function resetScenarios() {
  if (!window.confirm("重設會清空所有自訂情境。請確認你已匯出備份。")) return;
  await indexedDbScenarioRepository.clear();
  await persistAuditEntry("scenario-reset", { count: localScenarios.length });
  localScenarios = [];
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("自訂情境已清空。");
}

async function exportBackup() {
  const backup = await indexedDbBackupRepository.exportBackup();
  downloadJson(backup, "atlas-pwa-runtime-backup.json");
  setRuntimeFeedback("備份已匯出，包含本機行動追蹤設定。");
}

async function exportEncryptedBackup() {
  const passphrase = backupPassphraseInput.value;
  if (passphrase.length < 8) throw new Error("加密密碼至少需要 8 個字元。");
  const backup = await indexedDbBackupRepository.exportEncryptedBackup(passphrase);
  downloadJson(backup, "atlas-pwa-runtime-encrypted-backup.json");
  backupPassphraseInput.value = "";
  setRuntimeFeedback("加密備份已匯出，包含本機行動追蹤設定。");
}

async function previewBackup(file) {
  const payload = JSON.parse(await file.text());
  const backup = payload.backupFormatVersion
    ? await decryptBackupForPreview(payload)
    : payload;
  if (!await indexedDbBackupRepository.validateBackup(backup)) throw new Error("備份格式不支援。");
  pendingBackup = backup;
  const dryRun = await indexedDbBackupRepository.dryRunImport(backup);
  backupPreview.textContent = formatBackupPreview(backup);
  backupDryRunPanel.innerHTML = renderBackupDryRun(dryRun);
  setRuntimeFeedback("備份已預覽，套用時會取得本機資料鎖定。");
}

async function decryptBackupForPreview(payload) {
  const passphrase = backupPassphraseInput.value;
  if (passphrase.length < 8) throw new Error("請先輸入加密備份密碼，至少 8 個字元。");
  const backup = await indexedDbBackupRepository.decryptEncryptedBackup(payload, passphrase);
  backupPassphraseInput.value = "";
  return backup;
}

async function applyBackup() {
  if (!restoreConfirmInput.checked) throw new Error("請先勾選確認覆蓋本機情境。");
  if (!pendingBackup) throw new Error("請先匯入並預覽備份。");
  const conflictPolicy = backupConflictPolicySelect.value;
  const dryRun = await indexedDbBackupRepository.dryRunImport(pendingBackup);
  const stagingResult = await indexedDbBackupRepository.importBackup(pendingBackup, { conflictPolicy });
  const restoreAuditReport = buildRestoreAuditReport(pendingBackup, conflictPolicy, stagingResult, dryRun);
  restoreAuditReports = [restoreAuditReport, ...restoreAuditReports].slice(0, 5);
  await persistAuditEntry("backup-restore", restoreAuditReport);
  pendingBackup = null;
  backupPreview.textContent = "";
  backupDryRunPanel.textContent = "";
  restoreConfirmInput.checked = false;
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  renderRestoreAudit();
  setRuntimeFeedback("備份已套用。");
}

function setRuntimeFeedback(message) {
  const safeMessage = String(message || "");
  runtimeFeedback.textContent = safeMessage;
  if (statusText) statusText.textContent = safeMessage;
}

function profileStorageKey() {
  return "atlas.user.profile.v1";
}

function localActionStorageKey() {
  return "atlas.local.actions.v1";
}

async function loadLocalActions() {
  const stored = await readStoredValue(localActionStorageKey());
  localActions = stored ? JSON.parse(stored) : [];
  renderLocalActions();
  renderDashboardById(selectedDashboardSnapshotId);
}

function persistLocalActions() {
  writeStoredValue(localActionStorageKey(), JSON.stringify(localActions));
}

function renderLocalActions() {
  if (!localActionListPanel) return;
  const filter = localActionFilterInput?.value || "open";
  const source = localActions.filter((action) => {
    if (filter === "all") return true;
    if (filter === "open") return action.status !== "done";
    return action.status === filter;
  });
  const sorted = [...source].sort((a, b) => String(a.dueDate || "").localeCompare(String(b.dueDate || "")));
  localActionListPanel.innerHTML = sorted.length
    ? sorted.map((action) => `<div class="runtime-row local-action-row ${action.status === "done" ? "done" : ""}"><span>${escapeHtml(action.title)}<small>${escapeHtml(action.dueDate || "未設定期限")} / ${escapeHtml(translateStatus(action.status))} / ${action.sourceRecommendationId ? "建議轉入" : "手動新增"}</small></span><strong>${escapeHtml(action.createdFrom || "本機")}</strong><button type="button" data-local-action="done" data-action-id="${escapeAttribute(action.id)}">完成</button><button type="button" data-local-action="defer" data-action-id="${escapeAttribute(action.id)}">延後</button><button type="button" data-local-action="delete" data-action-id="${escapeAttribute(action.id)}">刪除</button></div>`).join("")
    : `<div class="empty-runtime">尚無本機行動。<a href="#execution">新增下一步行動</a></div>`;
  renderLocalActionReminder();
}

function renderLocalActionReminder() {
  if (!localActionReminderPanel) return;
  const today = new Date().toISOString().slice(0, 10);
  const due = localActions.filter((action) => action.status !== "done" && action.dueDate && action.dueDate <= today);
  const upcoming = localActions.filter((action) => action.status !== "done" && action.dueDate && action.dueDate > today);
  localActionReminderPanel.textContent = due.length
    ? `到期提醒：${due.length} 個行動需要處理`
    : `近期行動：${upcoming.length} 個`;
}

async function addLocalAction() {
  const title = localActionTitleInput?.value?.trim() || "";
  if (title.length < 2) throw new Error("行動名稱至少需要 2 個字。");
  localActions = [{
    id: `local-action-${Date.now()}`,
    title,
    dueDate: localActionDueInput?.value || "",
    status: "pending-review",
    createdFrom: selectedDashboardSnapshotId,
    createdAt: new Date().toISOString(),
  }, ...localActions].slice(0, 50);
  persistLocalActions();
  if (localActionTitleInput) localActionTitleInput.value = "";
  if (localActionDueInput) localActionDueInput.value = "";
  await persistAuditEntry("local-action-create", { title, snapshotId: selectedDashboardSnapshotId });
  renderLocalActions();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("本機行動已新增。");
}

async function createActionFromRecommendation() {
  const snapshot = currentSnapshot();
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) throw new Error("目前情境沒有可轉成行動的建議。");
  const sourceRecommendationId = result.fixtureId;
  if (localActions.some((action) => action.sourceRecommendationId === sourceRecommendationId && action.status !== "done")) {
    throw new Error("此建議已存在未完成行動。");
  }
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  localActions = [{
    id: `local-action-${Date.now()}`,
    title: translateRecommendationText(result.recommendation.explanation || snapshot.label || "處理建議"),
    dueDate: dueDate.toISOString().slice(0, 10),
    status: "pending-review",
    createdFrom: snapshot.snapshotId,
    sourceRecommendationId,
    createdAt: new Date().toISOString(),
  }, ...localActions].slice(0, 50);
  persistLocalActions();
  await persistAuditEntry("recommendation-to-action", { fixtureId: sourceRecommendationId, snapshotId: snapshot.snapshotId });
  renderLocalActions();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("建議已轉成本機行動。");
}

async function updateLocalAction(actionId, action) {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 7);
  localActions = action === "delete"
    ? localActions.filter((item) => item.id !== actionId)
    : localActions.map((item) => {
      if (item.id !== actionId) return item;
      if (action === "done") return { ...item, status: "done", completedAt: new Date().toISOString() };
      if (action === "defer") return { ...item, status: "defer", dueDate: nextDate.toISOString().slice(0, 10) };
      return item;
    });
  persistLocalActions();
  await persistAuditEntry("local-action-update", { actionId, action });
  renderLocalActions();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("本機行動已更新。");
}

function exportLocalActions() {
  downloadJson({
    schema: "atlas-enterprise.local-actions.v1",
    exportedAt: new Date().toISOString(),
    count: localActions.length,
    actions: localActions,
  }, "atlas-local-actions.json");
  setRuntimeFeedback("本機行動已匯出。");
}

function parseProfileNumber(value) {
  const normalized = String(value || "").replace(/,/g, "").trim();
  if (!normalized) return 0;
  const number = Number(normalized);
  if (!Number.isFinite(number) || number < 0) throw new Error("使用者資料金額必須為 0 以上。");
  return number;
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 }).format(value);
}

function renderUserProfile() {
  if (!profileSummaryPanel) return;
  const income = parseProfileNumber(userProfile.income);
  const assets = parseProfileNumber(userProfile.assets);
  const debt = parseProfileNumber(userProfile.debt);
  const netWorth = assets - debt;
  const debtIncomeRatio = income > 0 ? `${((debt / income) * 100).toFixed(1)}%` : "N/A";
  const goalLabels = { balanced: "平衡", growth: "成長", stability: "穩健", debt: "降債" };
  profileSummaryPanel.innerHTML = [
    ["淨值", formatMoney(netWorth)],
    ["負債收入比", debtIncomeRatio],
    ["目標偏好", goalLabels[userProfile.goal] || "平衡"],
  ].map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

async function loadUserProfile() {
  const stored = await readStoredValue(profileStorageKey());
  if (stored) {
    userProfile = { ...userProfile, ...JSON.parse(stored) };
  }
  if (profileIncomeInput) profileIncomeInput.value = userProfile.income;
  if (profileAssetsInput) profileAssetsInput.value = userProfile.assets;
  if (profileDebtInput) profileDebtInput.value = userProfile.debt;
  if (profileGoalSelect) profileGoalSelect.value = userProfile.goal;
  renderUserProfile();
}

async function saveUserProfile() {
  userProfile = {
    income: profileIncomeInput.value.trim(),
    assets: profileAssetsInput.value.trim(),
    debt: profileDebtInput.value.trim(),
    goal: profileGoalSelect.value,
  };
  parseProfileNumber(userProfile.income);
  parseProfileNumber(userProfile.assets);
  parseProfileNumber(userProfile.debt);
  writeStoredValue(profileStorageKey(), JSON.stringify(userProfile));
  await persistAuditEntry("profile-save", { goal: userProfile.goal });
  renderUserProfile();
  setRuntimeFeedback("使用者資料已儲存。");
}

async function resetUserProfile() {
  if (!window.confirm("重設會清空基本財務設定。請確認你已備份重要資料。")) return;
  userProfile = { income: "", assets: "", debt: "", goal: "balanced" };
  writeStoredValue(profileStorageKey(), JSON.stringify(userProfile));
  await persistAuditEntry("profile-reset", {});
  await loadUserProfile();
  setRuntimeFeedback("使用者資料已重設。");
}

function currentScenarioTemplate() {
  return scenarioTemplates.find((template) => template.id === selectedScenarioTemplateId) || scenarioTemplates[0];
}

function renderScenarioTemplates() {
  if (!scenarioTemplateList) return;
  scenarioTemplateList.innerHTML = scenarioTemplates.map((template) => `<button class="${template.id === selectedScenarioTemplateId ? "active" : ""}" type="button" data-template-id="${escapeAttribute(template.id)}"><span>${escapeHtml(template.name)}</span><small>${escapeHtml(template.detail)}</small><strong>${escapeHtml(template.score)}</strong></button>`).join("");
  renderScenarioTemplatePreview();
}

function renderScenarioTemplatePreview() {
  if (!scenarioTemplatePreview) return;
  const template = currentScenarioTemplate();
  scenarioTemplatePreview.textContent = `${template.name}\n預設分數 ${template.score}\n${template.detail}`;
}

function applyScenarioTemplate() {
  const template = currentScenarioTemplate();
  scenarioNameInput.value = template.name;
  scenarioScoreInput.value = template.score;
  setRuntimeFeedback(`已套用情境範本：${template.name}`);
}

async function saveScenarioFromTemplate() {
  applyScenarioTemplate();
  await saveCurrentScenario();
  await persistAuditEntry("scenario-template-save", { templateId: selectedScenarioTemplateId });
}

function validateScenarioInput(name, score) {
  if (name.length < 2) throw new Error("情境名稱至少需要 2 個字。");
  if (name.length > 80) throw new Error("情境名稱不可超過 80 個字。");
  if (!/^(N\/A|\d{1,3})$/.test(score) || (/^\d{1,3}$/.test(score) && (Number(score) < 0 || Number(score) > 100))) throw new Error("情境分數必須是 0 到 100，或 N/A。");
  if (score.length > 24) throw new Error("分數顯示文字不可超過 24 個字。");
}

async function loadRuntimeContracts() {
  const [runtimeResponse, simulatorResponse] = await Promise.all([fetch("fixtures/dashboard-runtime-snapshots.json", { cache: "no-cache" }), fetch("fixtures/scenario-results.json", { cache: "no-cache" })]);
  runtimeSnapshots = runtimeResponse.ok ? (await runtimeResponse.json()).snapshots || [] : [];
  const simulatorPayload = simulatorResponse.ok ? await simulatorResponse.json() : { results: [] };
  simulatorResults = new Map((simulatorPayload.results || []).map((result) => [result.fixtureId, result]));
}

function formatBackupPreview(backup) {
  const incomingIds = new Set(backup.scenarios.map((scenario) => scenario.scenarioId));
  const replacingCount = localScenarios.filter((scenario) => incomingIds.has(scenario.scenarioId)).length;
  const incomingNames = backup.scenarios.slice(0, 5).map((scenario) => scenario.name).filter(Boolean).join("、") || "N/A";
  const replacingNames = localScenarios.filter((scenario) => incomingIds.has(scenario.scenarioId)).slice(0, 5).map((scenario) => scenario.name).filter(Boolean).join("、") || "無";
  return [`備份情境：${backup.scenarios.length} 筆`, `本機情境：${localScenarios.length} 筆`, `新增：${backup.scenarios.length - replacingCount} 筆`, `覆蓋：${replacingCount} 筆`, `情境：${incomingNames}`, `將被覆蓋：${replacingNames}`, `匯出時間：${backup.exportedAt || "N/A"}`].join("\n");
}

function formatBackupDryRun(dryRun) {
  return [
    `預演結果：將新增 ${dryRun.creates} 筆、覆蓋 ${dryRun.updates} 筆、略過 ${dryRun.skips} 筆、拒絕 ${dryRun.rejects} 筆`,
    `版本：${dryRun.sourceBackupFormatVersion} / DB ${dryRun.sourceDatabaseSchemaVersion} -> ${dryRun.targetDatabaseSchemaVersion}`,
    `遷移：${dryRun.migrationSteps.length ? dryRun.migrationSteps.join("、") : "不需要"}`,
    `Checksum：${dryRun.checksum}`,
    "套用前需勾選確認覆蓋。",
  ].join("\n");
}

function renderBackupDryRun(dryRun) {
  const stats = [
    ["新增", dryRun.creates],
    ["覆蓋", dryRun.updates],
    ["略過", dryRun.skips],
    ["拒絕", dryRun.rejects],
    ["衝突", dryRun.conflicts],
  ];
  const migration = dryRun.migrationSteps.length ? dryRun.migrationSteps.join("、") : "不需要";
  const migrationPlan = dryRun.migrationPlan || { status: "current-version", supported: true, message: "備份版本與目前資料庫一致。" };
  const storePlan = (dryRun.storePlan || []).map((item) => `<div class="dry-run-detail"><span>${escapeHtml(translateStoreName(item.storeName))}</span><strong>${escapeHtml(item.current)} -> ${escapeHtml(item.incoming)} / 衝突 ${escapeHtml(item.conflicts)}${item.conflictKeys?.length ? ` / ${escapeHtml(item.conflictKeys.join("、"))}` : ""}</strong></div>`).join("");
  return [
    `<div class="dry-run-grid">${stats.map(([label, value]) => `<div class="dry-run-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>`,
    storePlan,
    `<div class="dry-run-detail"><span>版本</span><strong>${escapeHtml(dryRun.sourceBackupFormatVersion)} / DB ${escapeHtml(dryRun.sourceDatabaseSchemaVersion)} -> ${escapeHtml(dryRun.targetDatabaseSchemaVersion)}</strong></div>`,
    `<div class="dry-run-detail"><span>遷移狀態</span><strong>${escapeHtml(translateMigrationStatus(migrationPlan.status))}</strong></div>`,
    `<div class="dry-run-detail"><span>遷移</span><strong>${escapeHtml(migration)}</strong></div>`,
    `<div class="${migrationPlan.supported ? "dry-run-note" : "dry-run-warning"}">${escapeHtml(migrationPlan.message)}</div>`,
    `<div class="dry-run-detail"><span>Checksum</span><strong>${escapeHtml(dryRun.checksum)}</strong></div>`,
    `<div class="dry-run-warning">套用前需勾選確認覆蓋。</div>`,
  ].join("");
}

function buildRestoreAuditReport(backup, conflictPolicy, stagingResult, dryRun) {
  const conflictDetails = (dryRun?.storePlan || [])
    .filter((item) => item.conflicts > 0)
    .map((item) => ({
      storeName: item.storeName,
      conflicts: item.conflicts,
      conflictKeys: item.conflictKeys || [],
    }));
  const restoredRecords = stagingResult?.restoredRecords || {};
  return {
    schema: "atlas-enterprise.restore-audit-report.v1",
    restoredAt: new Date().toISOString(),
    exportedAt: backup.exportedAt || "N/A",
    sourceBackupFormatVersion: backup.schema,
    sourceDatabaseSchemaVersion: backup.databaseVersion || 0,
    conflictPolicy,
    scenarioCount: backup.scenarios.length,
    restoredRecords,
    conflictDetails,
    replacedStoreCount: stagingResult?.replacedStoreCount || 0,
    stagingResult,
  };
}

function renderRestoreAudit() {
  if (!restoreAuditPanel) return;
  restoreAuditPanel.textContent = restoreAuditReports.length
    ? restoreAuditReports.map((report) => [
      `${report.restoredAt} / ${report.schema}`,
      `策略：${translateConflictPolicy(report.conflictPolicy)} / Store：${report.replacedStoreCount}`,
      `還原：${Object.entries(report.restoredRecords).map(([storeName, count]) => `${translateStoreName(storeName)} ${count}`).join("、") || "N/A"}`,
      `Conflicts: ${formatRestoreConflictDetails(report.conflictDetails)}`,
    ].join("\n")).join("\n\n")
    : "尚無多Store還原稽核。";
}

function formatRestoreConflictDetails(conflictDetails = []) {
  if (!conflictDetails.length) return "none";
  return conflictDetails
    .map((item) => `${translateStoreName(item.storeName)} ${item.conflicts}${item.conflictKeys?.length ? ` (${item.conflictKeys.join(", ")})` : ""}`)
    .join("; ");
}

function translateConflictPolicy(policy) {
  const labels = {
    "replace-all": "覆蓋本機",
    "skip-existing": "保留本機",
  };
  return labels[policy] || policy;
}

function translateMigrationStatus(status) {
  const labels = {
    "current-version": "目前版本",
    "migration-required": "需要遷移",
    "unsupported-version": "不支援版本",
  };
  return labels[status] || status;
}

function translateStoreName(storeName) {
  const labels = {
    scenarios: "情境",
    recommendationDecisions: "建議決策",
    settings: "設定",
    auditEntries: "稽核紀錄",
    insurancePolicies: "保險保單",
  };
  return labels[storeName] || storeName;
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = sanitizeDownloadFilename(filename);
  link.click();
  URL.revokeObjectURL(url);
}

function currentSnapshot() {
  return dashboardSnapshots.find((item) => item.snapshotId === selectedDashboardSnapshotId) || dashboardSnapshots[0];
}

async function loadJsonOrNull(path) {
  const response = await fetch(path, { cache: "no-cache" });
  return response.ok ? response.json() : null;
}

async function renderReleaseDashboard() {
  const [history, swVersion] = await Promise.all([
    loadJsonOrNull("reports/validation-history.json").catch(() => null),
    fetch("sw-version.js", { cache: "no-cache" }).then((response) => response.ok ? response.text() : "").catch(() => ""),
  ]);
  validationHistoryRecords = Array.isArray(history) ? history : [];
  persistentAuditEntries = await indexedDbAuditRepository.list().catch(() => []);
  const latest = validationHistoryRecords.at(-1) || null;
  latestValidationRecord = latest;
  releaseDashboardPanel.innerHTML = [
    ["狀態", latest?.status === "passed" ? "通過" : "等待驗證"],
    ["提交", latest?.commit || "N/A"],
    ["驗證", latest?.command || "npm run validate"],
  ].map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
  renderValidationHistoryPanel(validationHistoryRecords);
  const cacheName = swVersion.match(/atlas-knowledge-[a-z0-9]+/)?.[0] || "快取版本未載入";
  currentCacheVersion = cacheName;
  cacheVersionText.textContent = `快取版本：${cacheName}`;
  cacheVersionFooter.textContent = `快取版本：${cacheName}`;
  reportVersionPanel.textContent = [
    "匯出報表版本：export-report.v2",
    "中文化結構：localizedPayload",
    `驗證狀態：${latest?.status || "N/A"}`,
  ].join("\n");
  reportVersionHistoryPanel.textContent = buildReportVersionHistory()
    .map((item) => `${item.version} / ${item.status} / ${item.description}`)
    .join("\n");
  renderPersistentAudit();
  renderRestoreAudit();
  renderReportDiff(latest);
  renderValidationFailureDiagnosis(latest);
  renderPerformanceBudgetTrend();
  renderReleaseEvidenceArchive();
}

async function renderPerformanceBudgetTrend() {
  const report = await loadJsonOrNull("reports/performance-baseline.json").catch(() => null);
  if (!performanceBudgetTrendPanel || !report?.results) return;
  performanceBudgetTrendPanel.textContent = [
    "Performance Budget Trend",
    ...report.results.map((item) => `${item.scenario}: p95 ${item.p95Ms}ms / budget ${item.regressionThresholdMs}ms / ${item.result}`),
  ].join("\n");
}

async function renderReleaseEvidenceArchive() {
  if (!releaseEvidenceArchivePanel) return;
  const evidence = [
    "release-note.md",
    "validation-history.json",
    "backup-sample.json",
    "export-report-sample.json",
  ];
  releaseEvidenceArchivePanel.textContent = [
    "Release Evidence Archive",
    ...evidence.map((item) => `frontend/reports/${item}`),
    "docs/roadmap/visual-artifacts/visual-baselines.json",
  ].join("\n");
}

function renderValidationHistoryPanel(records) {
  const items = records.slice(-5).reverse();
  if (!items.length) {
    validationHistoryPanel.innerHTML = `<div class="empty-runtime">No validation history.</div>`;
    return;
  }
  validationHistoryPanel.innerHTML = items.map((item) => {
    const scope = Array.isArray(item.scope) ? item.scope.join(", ") : "N/A";
    return `<div class="validation-history-row"><span>${escapeHtml(item.recordedAt || "N/A")}</span><strong>${escapeHtml(item.status || "N/A")}</strong><small>${escapeHtml(item.command || "N/A")} / ${escapeHtml(scope)}</small></div>`;
  }).join("");
}

async function repairOfflineData() {
  const snapshot = currentSnapshot();
  let repaired = 0;
  const auditEntry = { checkedAt: new Date().toISOString(), actions: [] };
  const validSnapshotIds = new Set(dashboardSnapshots.map((item) => item.snapshotId));
  if (!validSnapshotIds.has(selectedDashboardSnapshotId)) {
    selectedDashboardSnapshotId = snapshot.snapshotId;
    writeStoredValue(storageKeys.dashboardSnapshotId, selectedDashboardSnapshotId);
    repaired += 1;
    auditEntry.actions.push("修復儀表板快照索引");
  }
  await indexedDbMigrationRepository.markCurrent().catch(() => {
    repaired += 1;
    auditEntry.actions.push("重新標記 IndexedDB 遷移狀態");
  });
  localScenarios = (await indexedDbScenarioRepository.list().catch(() => [])).filter((scenario) => scenario?.scenarioId && scenario?.name);
  recommendationDecisions = await indexedDbRecommendationDecisionRepository.list().catch(() => []);
  renderDashboardById(selectedDashboardSnapshotId);
  const message = repaired ? `離線資料已修復：${repaired} 項` : "離線資料檢查通過，無需修復。";
  offlineRepairPanel.textContent = [
    message,
    `本機情境：${localScenarios.length} 筆`,
    `決策紀錄：${recommendationDecisions.length} 筆`,
  ].join("\n");
  auditEntry.result = message;
  auditEntry.localScenarios = localScenarios.length;
  auditEntry.recommendationDecisions = recommendationDecisions.length;
  if (!auditEntry.actions.length) auditEntry.actions.push("僅檢查，未變更資料");
  offlineRepairAudit = [auditEntry, ...offlineRepairAudit].slice(0, 5);
  await persistAuditEntry("offline-repair", { result: message, actions: auditEntry.actions, localScenarios: auditEntry.localScenarios, recommendationDecisions: auditEntry.recommendationDecisions });
  renderOfflineRepairAudit();
  setRuntimeFeedback(message);
}

function renderOfflineRepairAudit() {
  offlineRepairAuditPanel.textContent = offlineRepairAudit.length
    ? offlineRepairAudit.map((item) => `${item.checkedAt}\n${item.result}\n${item.actions.join("、")}`).join("\n\n")
    : "尚無離線修復稽核。";
}

function exportValidationResult() {
  const payload = {
    exportedAt: new Date().toISOString(),
    schema: "atlas-enterprise.validation-result.v1",
    cacheVersion: currentCacheVersion || "N/A",
    latest: latestValidationRecord,
    history: validationHistoryRecords,
    reportVersions: buildReportVersionHistory(),
    offlineRepairAudit,
    restoreAuditReports,
    persistentAuditEntries,
    reportDiff: buildReportDiff(latestValidationRecord),
    validationFailureDiagnosis: diagnoseValidationRecord(latestValidationRecord),
  };
  downloadJson(payload, "atlas-validation-result-v1.json");
  validationExportPanel.textContent = [
    "驗證結果已匯出：atlas-validation-result-v1.json",
    `驗證紀錄：${validationHistoryRecords.length} 筆`,
    `修復稽核：${offlineRepairAudit.length} 筆`,
  ].join("\n");
  setRuntimeFeedback("已匯出驗證結果。");
}

function generateValidationSummary() {
  const latest = latestValidationRecord || {};
  const passed = validationHistoryRecords.filter((item) => item.status === "passed").length;
  const failed = validationHistoryRecords.filter((item) => item.status && item.status !== "passed").length;
  validationExportPanel.textContent = [
    "Validation Summary",
    `Latest: ${latest.status || "N/A"} / ${latest.command || "N/A"}`,
    `Recorded: ${latest.recordedAt || "N/A"}`,
    `History: ${validationHistoryRecords.length} total / ${passed} passed / ${failed} other`,
    `Cache: ${currentCacheVersion || "N/A"}`,
    `Restore audits: ${restoreAuditReports.length}`,
  ].join("\n");
  setRuntimeFeedback("Validation summary generated.");
}

async function persistAuditEntry(action, detail = {}) {
  const entry = {
    auditId: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    action,
    detail,
    recordedAt: new Date().toISOString(),
    schema: "atlas-enterprise.audit-entry.v1",
  };
  await indexedDbAuditRepository.save(entry).catch(() => {});
  persistentAuditEntries = [entry, ...persistentAuditEntries].slice(0, auditRetentionPolicy.maxEntries);
  renderPersistentAudit();
}

function renderPersistentAudit() {
  if (!persistentAuditPanel) return;
  const entries = [...persistentAuditEntries].sort((a, b) => String(b.recordedAt || "").localeCompare(String(a.recordedAt || ""))).slice(0, auditRetentionPolicy.visibleEntries);
  persistentAuditPanel.textContent = entries.length
    ? entries.map((entry) => `${entry.recordedAt} / ${entry.action} / ${entry.schema}`).join("\n")
    : "尚無持久化稽核紀錄";
}

function buildReportDiff(latest) {
  const versions = buildReportVersionHistory();
  const previous = versions.find((item) => item.version === "export-report.v1");
  const current = versions.find((item) => item.version === "export-report.v2");
  return {
    previousVersion: previous?.version || "N/A",
    currentVersion: current?.version || "N/A",
    changedFields: ["cacheVersion", "validation", "localizedPayload"],
    validationStatus: latest?.status || "N/A",
  };
}

function renderReportDiff(latest) {
  if (!reportDiffPanel) return;
  const diff = buildReportDiff(latest);
  reportDiffPanel.textContent = [
    `報表差異：${diff.previousVersion} -> ${diff.currentVersion}`,
    `新增欄位：${diff.changedFields.join(", ")}`,
    `驗證狀態：${diff.validationStatus}`,
  ].join("\n");
}

function diagnoseValidationRecord(record) {
  if (!record) return { status: "missing", reason: "validation-history.json 尚未產生", nextAction: "執行 npm run report:validation-history" };
  if (record.status === "passed") return { status: "passed", reason: "最近一次驗證通過", nextAction: "維持現有驗證鏈" };
  const scope = Array.isArray(record.scope) ? record.scope.join(", ") : "unknown";
  return { status: record.status || "failed", reason: `${record.command || "unknown command"} 在 ${scope} 失敗`, nextAction: "檢查 command、scope、commit 與最新輸出" };
}

function renderValidationFailureDiagnosis(record) {
  if (!validationFailureDiagnosisPanel) return;
  const diagnosis = diagnoseValidationRecord(record);
  validationFailureDiagnosisPanel.textContent = [
    `驗證診斷：${diagnosis.status}`,
    `原因：${diagnosis.reason}`,
    `建議：${diagnosis.nextAction}`,
  ].join("\n");
}

async function loadSample(path, target) {
  const sample = await loadJsonOrNull(path);
  if (!sample) {
    sampleLoaderPanel.textContent = "範例檔載入失敗。";
    return;
  }
  target.textContent = JSON.stringify(sample, null, 2);
  sampleLoaderPanel.textContent = `已載入範例：${path}`;
}

async function loadSampleBackup() {
  const sample = await loadJsonOrNull("reports/backup-sample.json");
  if (!sample) {
    sampleLoaderPanel.textContent = "Backup sample unavailable.";
    return;
  }
  if (!await indexedDbBackupRepository.validateBackup(sample)) throw new Error("Backup sample is invalid");
  pendingBackup = sample;
  const dryRun = await indexedDbBackupRepository.dryRunImport(sample);
  backupPreview.textContent = formatBackupPreview(sample);
  backupDryRunPanel.innerHTML = renderBackupDryRun(dryRun);
  sampleLoaderPanel.textContent = "Backup sample loaded into restore preview.";
}

async function loadReleaseNote() {
  const response = await fetch("reports/release-note.md", { cache: "no-cache" });
  if (!response.ok) {
    releaseNotePanel.textContent = "Release note unavailable.";
    return;
  }
  releaseNotePanel.textContent = await response.text();
}

function openDocumentFromHash() {
  const id = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("doc");
  if (id) openDocument(id);
}

async function readStoredValue(key) {
  try {
    const indexedDbValue = await indexedDbSettingsRepository.get(key);
    if (indexedDbValue) return indexedDbValue;
  } catch {}
  try {
    return localStorage.getItem(key);
  } catch {
    return "";
  }
}

async function readStoredDashboardSnapshotId() {
  const current = await readStoredValue(storageKeys.dashboardSnapshotId);
  if (current) return current;
  for (const legacyKey of dashboardStorage.legacySnapshotIdKeys) {
    const legacy = await readStoredValue(legacyKey);
    if (legacy) {
      writeStoredValue(storageKeys.dashboardSnapshotId, legacy);
      return legacy;
    }
  }
  return "";
}

function writeStoredValue(key, value) {
  indexedDbSettingsRepository.set(key, value).catch(() => {});
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

async function refreshLocalFinancialData() {
  const [assets, liabilities] = await Promise.all([
    assetService.listAssets({ includeArchived: true }),
    liabilityService.listLiabilities({ includeArchived: true }),
  ]);
  renderAssetList(assets);
  renderLiabilityList(liabilities);
  renderNetWorthProjection(assets, liabilities);
  renderAssetLiabilitySummary(assets, liabilities);
}

async function refreshLocalCashFlowData() {
  const [incomes, expenses] = await Promise.all([
    incomeService.listIncomes({ includeArchived: true }),
    expenseService.listExpenses({ includeArchived: true }),
  ]);
  renderIncomeList(incomes);
  renderExpenseList(expenses);
  renderCashFlowProjection(incomes, expenses);
  renderCashflowSummary(incomes, expenses);
}

async function refreshLocalGoalHealthData() {
  const [goals, assets, liabilities, incomes, expenses] = await Promise.all([
    goalService.listGoals({ includeArchived: true }),
    assetService.listAssets({ includeArchived: true }),
    liabilityService.listLiabilities({ includeArchived: true }),
    incomeService.listIncomes({ includeArchived: true }),
    expenseService.listExpenses({ includeArchived: true }),
  ]);
  renderGoalList(goals);
  renderGoalProgress(goals, assets, liabilities, incomes, expenses);
  renderFinancialHealth(goals, assets, liabilities, incomes, expenses);
  renderGoalSummary(goals);
}

function sumBy(items, key) {
  return items.reduce((total, item) => total + Number(String(item[key] ?? 0).replace(/,/g, "")), 0);
}

function renderSummaryCard(element, title, value, detail, href) {
  if (!element) return;
  element.innerHTML = `<a class="summary-card" href="${escapeAttribute(href)}"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></a>`;
}

function renderAssetLiabilitySummary(assets, liabilities) {
  const assetTotal = sumBy(assets.filter((item) => item.status !== "archived"), "currentValue");
  const liabilityTotal = sumBy(liabilities.filter((item) => item.status !== "archived"), "outstandingBalance");
  renderSummaryCard(assetLiabilitySummaryPanel, "淨值", formatMoney(assetTotal - liabilityTotal), `資產 ${assets.length} / 負債 ${liabilities.length}`, "#assets");
}

function renderCashflowSummary(incomes, expenses) {
  const incomeTotal = sumBy(incomes.filter((item) => item.status !== "archived"), "amount");
  const expenseTotal = sumBy(expenses.filter((item) => item.status !== "archived"), "amount");
  renderSummaryCard(cashflowSummaryPanel, "月現金流", formatMoney(incomeTotal - expenseTotal), `收入 ${formatMoney(incomeTotal)} / 支出 ${formatMoney(expenseTotal)}`, "#cashflow");
}

function renderGoalSummary(goals) {
  const activeGoals = goals.filter((item) => item.status !== "archived");
  const average = activeGoals.length
    ? activeGoals.reduce((total, goal) => total + Math.min(100, Math.round((Number(goal.currentAmount || 0) / Math.max(1, Number(goal.targetAmount || 1))) * 100)), 0) / activeGoals.length
    : 0;
  renderSummaryCard(goalSummaryPanel, "目標進度", `${Math.round(average)}%`, `目標 ${activeGoals.length} 個`, "#goals");
}

async function renderInsuranceSummary() {
  const policies = await insuranceService.listPolicies({ includeArchived: true }).catch(() => []);
  const activePolicies = policies.filter((policy) => policy.status !== "cancelled");
  const coverage = activePolicies.reduce((total, policy) => total + Number(policy.coverageAmount || 0), 0);
  const premium = activePolicies.reduce((total, policy) => total + Number(policy.premiumAmount || 0), 0);
  renderSummaryCard(insuranceSummaryPanel, "保險保單", `${activePolicies.length} 張`, `保障 ${formatMoney(coverage)} / 保費 ${formatMoney(premium)}`, "#insurance");
}

async function previewCsvImport() {
  const file = csvImportInput?.files?.[0];
  if (!file) throw new Error("請先選擇 CSV 檔案。");
  const text = await file.text();
  const result = dryRunCsvImport(text, { ownerId: "owner-1" });
  renderCsvImportDryRun(csvImportDryRunPanel, result);
  setRuntimeFeedback("CSV 匯入預演完成。");
}

function clearCsvImportPreview() {
  if (csvImportInput) csvImportInput.value = "";
  renderCsvImportDryRun(csvImportDryRunPanel, null);
  setRuntimeFeedback("CSV 預覽已清除。");
}

function renderAssetList(assets) {
  if (!assetListPanel) return;
  assetListPanel.innerHTML = assets.length
    ? assets.map((asset) => `<div class="runtime-row"><span>${escapeHtml(asset.name)} / ${escapeHtml(asset.assetType)} / ${escapeHtml(asset.currency)}</span><strong>${escapeHtml(formatDisplayToken(asset.currentValue))}</strong><button type="button" data-asset-archive="${escapeAttribute(asset.id)}">${asset.status === "archived" ? "還原" : "封存"}</button></div>`).join("")
    : `<div class="empty-runtime">尚未建立資產。<a href="#assets">新增第一筆資產</a></div>`;
}

function renderLiabilityList(liabilities) {
  if (!liabilityListPanel) return;
  liabilityListPanel.innerHTML = liabilities.length
    ? liabilities.map((liability) => `<div class="runtime-row"><span>${escapeHtml(liability.name)} / ${escapeHtml(liability.liabilityType)} / ${escapeHtml(liability.currency)}</span><strong>${escapeHtml(formatDisplayToken(liability.outstandingBalance))}</strong><button type="button" data-liability-archive="${escapeAttribute(liability.id)}">${liability.status === "archived" ? "還原" : "封存"}</button></div>`).join("")
    : `<div class="empty-runtime">尚未建立負債。<a href="#assets">新增第一筆負債</a></div>`;
}

function renderIncomeList(incomes) {
  if (!incomeListPanel) return;
  incomeListPanel.innerHTML = incomes.length
    ? incomes.map((income) => `<div class="runtime-row"><span>${escapeHtml(income.name)} / ${escapeHtml(income.incomeType)} / ${escapeHtml(income.frequency)}</span><strong>${escapeHtml(formatDisplayToken(income.amount))}</strong><button type="button" data-income-archive="${escapeAttribute(income.id)}">${income.status === "archived" ? "還原" : "封存"}</button></div>`).join("")
    : `<div class="empty-runtime">尚未建立收入資料。<a href="#cashflow">新增第一筆收入</a></div>`;
}

function renderExpenseList(expenses) {
  if (!expenseListPanel) return;
  expenseListPanel.innerHTML = expenses.length
    ? expenses.map((expense) => `<div class="runtime-row"><span>${escapeHtml(expense.name)} / ${escapeHtml(expense.expenseType)} / ${escapeHtml(expense.frequency)}</span><strong>${escapeHtml(formatDisplayToken(expense.amount))}</strong><button type="button" data-expense-archive="${escapeAttribute(expense.id)}">${expense.status === "archived" ? "還原" : "封存"}</button></div>`).join("")
    : `<div class="empty-runtime">尚未建立支出資料。<a href="#cashflow">新增第一筆支出</a></div>`;
}

function renderCashFlowProjection(incomes, expenses) {
  if (!cashFlowPanel) return;
  const now = new Date();
  const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10);
  const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
  const projection = projectCashFlow({ incomes, expenses, periodStart, periodEnd });
  cashFlowPanel.textContent = [
    `期間：${projection.periodStart} 至 ${projection.periodEnd}`,
    `收入合計：${formatDisplayToken(projection.totalIncome)}`,
    `支出合計：${formatDisplayToken(projection.totalExpense)}`,
    `淨現金流：${formatDisplayToken(projection.netCashFlow)}`,
    projection.warnings.length ? `提醒：${projection.warnings.join(", ")}` : `幣別：${projection.currency}`,
  ].join("\n");
}

function renderGoalList(goals) {
  if (!goalListPanel) return;
  goalListPanel.innerHTML = goals.length
    ? goals.map((goal) => `<div class="runtime-row"><span>${escapeHtml(goal.name)} / ${escapeHtml(goal.goalType)} / ${escapeHtml(goal.status)}</span><strong>${escapeHtml(formatDisplayToken(goal.currentAmount))} / ${escapeHtml(formatDisplayToken(goal.targetAmount))}</strong><button type="button" data-goal-action="activate" data-goal-id="${escapeAttribute(goal.id)}">啟用</button><button type="button" data-goal-action="deactivate" data-goal-id="${escapeAttribute(goal.id)}">停用</button><button type="button" data-goal-action="complete" data-goal-id="${escapeAttribute(goal.id)}">完成</button><button type="button" data-goal-action="archive" data-goal-id="${escapeAttribute(goal.id)}">${goal.status === "archived" ? "還原" : "封存"}</button></div>`).join("")
    : `<div class="empty-runtime">尚未建立目標資料。<a href="#goals">新增第一個目標</a></div>`;
}

function renderGoalProgress(goals, assets, liabilities, incomes, expenses) {
  if (!goalProgressPanel) return;
  const projection = projectGoalProgress({ goals, assets, liabilities, incomes, expenses });
  goalProgressPanel.textContent = [
    `目標數：${projection.goalCount}`,
    `完成數：${projection.completedCount}`,
    `平均進度：${projection.averageProgress}%`,
    projection.warnings.length ? `提醒：${projection.warnings.join(", ")}` : `幣別：${projection.currency}`,
  ].join("\n");
}

function renderFinancialHealth(goals, assets, liabilities, incomes, expenses) {
  if (!financialHealthPanel) return;
  const now = new Date();
  const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10);
  const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
  const projection = projectFinancialHealth({ goals, assets, liabilities, incomes, expenses, periodStart, periodEnd });
  financialHealthPanel.textContent = [
    `健康分數：${projection.score}`,
    `分類：${projection.classification}`,
    ...projection.metrics.map((metric) => `${metric.id}：${metric.value ?? "N/A"}`),
    projection.warnings.length ? `提醒：${projection.warnings.join(", ")}` : "資料完整",
  ].join("\n");
}

function renderNetWorthProjection(assets, liabilities) {
  if (!netWorthPanel) return;
  const projection = projectNetWorth({ assets, liabilities });
  netWorthPanel.textContent = [
    `資產合計：${formatDisplayToken(projection.totalAssets)}`,
    `負債合計：${formatDisplayToken(projection.totalLiabilities)}`,
    `淨值：${formatDisplayToken(projection.netWorth)}`,
    projection.multiCurrency ? "多幣別資料尚未換匯，請分別檢視。" : `幣別：${projection.currency}`,
  ].join("\n");
}

async function createAssetFromInput() {
  const result = await assetService.createAsset({
    name: assetNameInput.value,
    assetType: assetTypeInput.value,
    currency: assetCurrencyInput.value,
    currentValue: assetValueInput.value,
    valuationDate: new Date().toISOString().slice(0, 10),
    status: "active",
  });
  if (!result.ok) throw new Error(result.errors.map((item) => item.code).join(", "));
  assetNameInput.value = "";
  assetValueInput.value = "";
  await refreshLocalFinancialData();
}

async function createLiabilityFromInput() {
  const result = await liabilityService.createLiability({
    name: liabilityNameInput.value,
    liabilityType: liabilityTypeInput.value,
    currency: liabilityCurrencyInput.value,
    outstandingBalance: liabilityBalanceInput.value,
    asOfDate: new Date().toISOString().slice(0, 10),
    status: "active",
  });
  if (!result.ok) throw new Error(result.errors.map((item) => item.code).join(", "));
  liabilityNameInput.value = "";
  liabilityBalanceInput.value = "";
  await refreshLocalFinancialData();
}

async function createIncomeFromInput() {
  const result = await incomeService.createIncome({
    name: incomeNameInput.value,
    incomeType: incomeTypeInput.value,
    amount: incomeAmountInput.value,
    currency: "TWD",
    frequency: incomeFrequencyInput.value,
    startDate: new Date().toISOString().slice(0, 10),
    status: "active",
  });
  if (!result.ok) throw new Error(result.errors.map((item) => item.code).join(", "));
  incomeNameInput.value = "";
  incomeAmountInput.value = "";
  await refreshLocalCashFlowData();
}

async function createExpenseFromInput() {
  const result = await expenseService.createExpense({
    name: expenseNameInput.value,
    expenseType: expenseTypeInput.value,
    amount: expenseAmountInput.value,
    currency: "TWD",
    frequency: expenseFrequencyInput.value,
    startDate: new Date().toISOString().slice(0, 10),
    status: "active",
  });
  if (!result.ok) throw new Error(result.errors.map((item) => item.code).join(", "));
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  await refreshLocalCashFlowData();
}

async function createGoalFromInput() {
  const result = await goalService.createGoal({
    name: goalNameInput.value,
    goalType: goalTypeInput.value,
    targetAmount: goalTargetAmountInput.value,
    currentAmount: goalCurrentAmountInput.value,
    currency: "TWD",
    priority: "medium",
    startDate: new Date().toISOString().slice(0, 10),
    targetDate: goalTargetDateInput.value || new Date().toISOString().slice(0, 10),
    status: "draft",
  });
  if (!result.ok) throw new Error(result.errors.map((item) => item.code).join(", "));
  goalNameInput.value = "";
  goalTargetAmountInput.value = "";
  goalCurrentAmountInput.value = "";
  await refreshLocalGoalHealthData();
}

categoryNav?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.selectedCategory = button.dataset.category;
  renderCategories();
  renderList();
});
documentList?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (button) openDocument(button.dataset.id);
});
dashboardSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-snapshot-id]");
  if (button) renderDashboardById(button.dataset.snapshotId);
});
scenarioComparisonSortInput.addEventListener("change", () => renderDashboardById(selectedDashboardSnapshotId));
searchInput?.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});
clearFiltersButton?.addEventListener("click", () => {
  state.query = "";
  state.selectedCategory = "all";
  searchInput.value = "";
  renderCategories();
  renderList();
});
saveScenarioButton.addEventListener("click", () => saveCurrentScenario().catch((error) => setRuntimeFeedback(error.message)));
deleteScenarioButton.addEventListener("click", () => deleteLastScenario().catch((error) => setRuntimeFeedback(error.message)));
resetScenariosButton.addEventListener("click", () => resetScenarios().catch((error) => setRuntimeFeedback(error.message)));
exportBackupButton.addEventListener("click", () => exportBackup().catch((error) => setRuntimeFeedback(error.message)));
exportEncryptedBackupButton?.addEventListener("click", () => exportEncryptedBackup().catch((error) => setRuntimeFeedback(error.message)));
exportPortfolioReportButton.addEventListener("click", () => exportPortfolioReport());
importBackupInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  previewBackup(file).catch((error) => setRuntimeFeedback(error.message));
  event.target.value = "";
});
applyBackupButton.addEventListener("click", () => applyBackup().catch((error) => setRuntimeFeedback(error.message)));
acceptRecommendationButton.addEventListener("click", () => setRecommendationDecision("accepted").catch((error) => setRuntimeFeedback(error.message)));
rejectRecommendationButton.addEventListener("click", () => setRecommendationDecision("rejected").catch((error) => setRuntimeFeedback(error.message)));
deferRecommendationButton?.addEventListener("click", () => setRecommendationDecision("deferred").catch((error) => setRuntimeFeedback(error.message)));
createActionFromRecommendationButton?.addEventListener("click", () => createActionFromRecommendation().catch((error) => setRuntimeFeedback(error.message)));
recommendationFilterInput.addEventListener("change", renderRecommendationHistory);
exportRecommendationHistoryButton.addEventListener("click", exportRecommendationHistory);
rationaleTemplates?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-rationale-template]");
  if (!button || !recommendationRationaleInput) return;
  recommendationRationaleInput.value = button.dataset.rationaleTemplate || "";
});
sampleExportButton.addEventListener("click", () => loadSample("reports/export-report-sample.json", exportPreviewPanel).catch((error) => setRuntimeFeedback(error.message)));
sampleBackupButton.addEventListener("click", () => loadSampleBackup().catch((error) => setRuntimeFeedback(error.message)));
releaseNoteButton.addEventListener("click", () => loadReleaseNote().catch((error) => setRuntimeFeedback(error.message)));
exportValidationButton.addEventListener("click", exportValidationResult);
generateValidationSummaryButton.addEventListener("click", generateValidationSummary);
offlineRepairButton.addEventListener("click", () => repairOfflineData().catch((error) => setRuntimeFeedback(error.message)));
calculateLoanButton.addEventListener("click", () => {
  try {
    calculateEditableLoan();
  } catch (error) {
    setRuntimeFeedback(error.message);
  }
});
resetLoanButton.addEventListener("click", resetLoanInputs);
saveProfileButton?.addEventListener("click", () => saveUserProfile().catch((error) => setRuntimeFeedback(error.message)));
resetProfileButton?.addEventListener("click", () => resetUserProfile().catch((error) => setRuntimeFeedback(error.message)));
createAssetButton?.addEventListener("click", () => createAssetFromInput().catch((error) => setRuntimeFeedback(error.message)));
createLiabilityButton?.addEventListener("click", () => createLiabilityFromInput().catch((error) => setRuntimeFeedback(error.message)));
createIncomeButton?.addEventListener("click", () => createIncomeFromInput().catch((error) => setRuntimeFeedback(error.message)));
createExpenseButton?.addEventListener("click", () => createExpenseFromInput().catch((error) => setRuntimeFeedback(error.message)));
createGoalButton?.addEventListener("click", () => createGoalFromInput().catch((error) => setRuntimeFeedback(error.message)));
assetListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-asset-archive]");
  if (!button) return;
  assetService.getAsset(button.dataset.assetArchive).then((asset) => (
    asset?.status === "archived" ? assetService.restoreAsset(asset.id) : assetService.archiveAsset(asset.id)
  )).then(refreshLocalFinancialData).catch((error) => setRuntimeFeedback(error.message));
});
liabilityListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-liability-archive]");
  if (!button) return;
  liabilityService.getLiability(button.dataset.liabilityArchive).then((liability) => (
    liability?.status === "archived" ? liabilityService.restoreLiability(liability.id) : liabilityService.archiveLiability(liability.id)
  )).then(refreshLocalFinancialData).catch((error) => setRuntimeFeedback(error.message));
});
incomeListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-income-archive]");
  if (!button) return;
  incomeService.getIncome(button.dataset.incomeArchive).then((income) => (
    income?.status === "archived" ? incomeService.restoreIncome(income.id) : incomeService.archiveIncome(income.id)
  )).then(refreshLocalCashFlowData).catch((error) => setRuntimeFeedback(error.message));
});
expenseListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-expense-archive]");
  if (!button) return;
  expenseService.getExpense(button.dataset.expenseArchive).then((expense) => (
    expense?.status === "archived" ? expenseService.restoreExpense(expense.id) : expenseService.archiveExpense(expense.id)
  )).then(refreshLocalCashFlowData).catch((error) => setRuntimeFeedback(error.message));
});
goalListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-goal-id]");
  if (!button) return;
  const actions = {
    activate: goalService.activateGoal,
    deactivate: goalService.deactivateGoal,
    complete: goalService.completeGoal,
    archive: async (id) => {
      const goal = await goalService.getGoal(id);
      return goal?.status === "archived" ? goalService.restoreGoal(id) : goalService.archiveGoal(id);
    },
  };
  actions[button.dataset.goalAction]?.(button.dataset.goalId).then(refreshLocalGoalHealthData).catch((error) => setRuntimeFeedback(error.message));
});
scenarioTemplateList?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-template-id]");
  if (!button) return;
  selectedScenarioTemplateId = button.dataset.templateId;
  renderScenarioTemplates();
});
applyScenarioTemplateButton?.addEventListener("click", applyScenarioTemplate);
saveScenarioTemplateButton?.addEventListener("click", () => saveScenarioFromTemplate().catch((error) => setRuntimeFeedback(error.message)));
csvDryRunButton?.addEventListener("click", () => previewCsvImport().catch((error) => setRuntimeFeedback(error.message)));
csvClearPreviewButton?.addEventListener("click", clearCsvImportPreview);
addLocalActionButton?.addEventListener("click", () => addLocalAction().catch((error) => setRuntimeFeedback(error.message)));
exportLocalActionsButton?.addEventListener("click", exportLocalActions);
localActionFilterInput?.addEventListener("change", renderLocalActions);
localActionListPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-local-action]");
  if (!button) return;
  updateLocalAction(button.dataset.actionId, button.dataset.localAction).catch((error) => setRuntimeFeedback(error.message));
});

Object.defineProperty(window, "__atlasDebugState", {
  configurable: true,
  get: () => ({
    restoreAuditReports,
    offlineRepairAudit,
    persistentAuditEntries,
  }),
});

window.addEventListener("hashchange", () => {
  updateNavigationState();
  openDocumentFromHash();
});
updateNavigationState();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

loadDashboard();
renderReleaseDashboard().catch(() => {});
loadUserProfile().catch(() => {});
refreshLocalFinancialData().catch(() => {});
refreshLocalCashFlowData().catch(() => {});
refreshLocalGoalHealthData().catch(() => {});
renderInsuranceSummary().catch(() => {});
loadLocalActions().catch(() => {});
renderScenarioTemplates();
