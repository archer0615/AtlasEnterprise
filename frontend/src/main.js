import { dashboardStorage, fallbackDashboardSnapshot, normalizeDashboardCollection } from "./dashboard-model.js";
import { indexedDbBackupRepository, indexedDbMigrationRepository, indexedDbRecommendationDecisionRepository, indexedDbScenarioRepository, indexedDbSettingsRepository } from "./indexeddb-runtime.js";

const state = { documents: [], searchDocuments: new Map(), categories: [], selectedCategory: "all", selectedDocumentId: "", query: "" };
const storageKeys = { dashboardSnapshotId: dashboardStorage.snapshotIdKey };
const $ = (selector) => document.querySelector(selector);

const categoryNav = $("#categoryNav");
const documentList = $("#documentList");
const documentViewer = $("#documentViewer");
const searchInput = $("#searchInput");
const statusText = $("#statusText");
const pageTitle = $("#pageTitle");
const resultCount = $("#resultCount");
const clearFiltersButton = $("#clearFiltersButton");
const dashboardDate = $("#dashboardDate");
const dashboardSwitcher = $("#dashboardSwitcher");
const metricGrid = $("#metricGrid");
const scenarioList = $("#scenarioList");
const actionList = $("#actionList");
const scenarioComparisonPanel = $("#scenarioComparisonPanel");
const portfolioReportPanel = $("#portfolioReportPanel");
const exportPreviewPanel = $("#exportPreviewPanel");
const recommendationControlPanel = $("#recommendationControlPanel");
const recommendationHistoryPanel = $("#recommendationHistoryPanel");
const recommendationFilterInput = $("#recommendationFilterInput");
const loanScenarioPanel = $("#loanScenarioPanel");
const exportPortfolioReportButton = $("#exportPortfolioReportButton");
const recommendationDecisionLog = $("#recommendationDecisionLog");
const acceptRecommendationButton = $("#acceptRecommendationButton");
const rejectRecommendationButton = $("#rejectRecommendationButton");
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
const sampleLoaderPanel = $("#sampleLoaderPanel");
const validationHistoryPanel = $("#validationHistoryPanel");
const cacheVersionText = $("#cacheVersionText");

let dashboardSnapshots = [fallbackDashboardSnapshot];
let runtimeSnapshots = [];
let simulatorResults = new Map();
let selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
let localScenarios = [];
let recommendationDecisions = [];
let pendingBackup = null;

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
  window.history.replaceState(null, "", `#doc=${id}`);
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
  renderScenarioComparison(snapshot);
  renderPortfolioReport(snapshot);
  renderRecommendationControls(snapshot);
  renderLoanScenarioPanel(snapshot);
  renderExportPreview(snapshot);
}

function renderScenarioComparison(snapshot) {
  const baselineScore = Number(snapshot.metrics.find((metric) => /分數|score/i.test(metric.label))?.value ?? snapshot.scenarios?.[0]?.score ?? 0);
  if (!localScenarios.length) {
    scenarioComparisonPanel.innerHTML = `<div class="empty-runtime">尚無本機情境可比較。</div>`;
    return;
  }
  scenarioComparisonPanel.innerHTML = localScenarios.map((scenario) => {
    const score = Number(String(scenario.score).replace(/[^\d.-]/g, ""));
    const delta = Number.isFinite(score) && Number.isFinite(baselineScore) ? score - baselineScore : null;
    const deltaText = delta === null ? "無法比較" : `${delta >= 0 ? "+" : ""}${delta}`;
    return `<div class="runtime-row"><span>${escapeHtml(scenario.name)}</span><strong>${escapeHtml(deltaText)}</strong></div>`;
  }).join("");
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
    portfolioReportPanel.innerHTML = `<div class="empty-runtime">此情境沒有投資報表資料。</div>`;
    return;
  }
  const metrics = Object.entries(result.metrics).map(([key, value]) => [translateMetricName(key), formatMetricValue(value)]);
  portfolioReportPanel.innerHTML = metrics.slice(0, 5).map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function renderRecommendationControls(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) {
    recommendationControlPanel.innerHTML = `<div class="empty-runtime">此情境沒有可執行建議。</div>`;
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

function renderLoanScenarioPanel(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  const formulaIds = result?.formulaEvaluation?.formulaIds || [];
  const isLoan = formulaIds.some((formulaId) => ["FORM-PMT", "FORM-LOAN-AMORTIZATION", "FORM-REFI-BREAK-EVEN", "FORM-PREPAYMENT-IMPACT"].includes(formulaId));
  if (!isLoan || !result) {
    loanScenarioPanel.innerHTML = `<div class="empty-runtime">此情境沒有貸款試算資料。</div>`;
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
  await indexedDbRecommendationDecisionRepository.save({ decisionId: `decision-${Date.now()}`, decision, fixtureId: result.fixtureId, snapshotId: snapshot.snapshotId, status: result.recommendation.status, score: String(result.score), decidedAt: new Date().toISOString() });
  recommendationDecisions = await indexedDbRecommendationDecisionRepository.list();
  renderRecommendationDecisionLog(result.fixtureId);
  renderRecommendationHistory();
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
  exportPreviewPanel.textContent = payload ? JSON.stringify(payload, null, 2) : "此情境沒有可預覽的投資報表。";
}

function exportPortfolioReport() {
  const snapshot = currentSnapshot();
  const payload = buildPortfolioReportPayload(snapshot);
  if (!payload) {
    setRuntimeFeedback("目前沒有可匯出的報表資料。");
    return;
  }
  downloadJson(payload, `atlas-投資報表-${snapshot.snapshotId}.json`);
  setRuntimeFeedback(`已匯出中文化報表：${snapshot.snapshotId}`);
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
  const translations = { accepted: "已接受", "at-risk": "有風險", conditional: "有條件", defer: "延後", evaluated: "已評估", IndexedDB: "本機儲存", monitor: "監控", proceed: "可執行", reject: "拒絕", rejected: "已拒絕" };
  return translations[value] || value;
}

function translateDecision(value) {
  return { accepted: "接受", rejected: "拒絕" }[value] || value;
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
  await indexedDbScenarioRepository.delete(latest.scenarioId);
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("最新自訂情境已刪除。");
}

async function resetScenarios() {
  await indexedDbScenarioRepository.clear();
  localScenarios = [];
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("自訂情境已清空。");
}

async function exportBackup() {
  const backup = await indexedDbBackupRepository.exportBackup();
  downloadJson(backup, "atlas-pwa-runtime-backup.json");
  setRuntimeFeedback("備份已匯出。");
}

async function previewBackup(file) {
  const backup = JSON.parse(await file.text());
  if (!indexedDbBackupRepository.validateBackup(backup)) throw new Error("備份格式不支援。");
  pendingBackup = backup;
  backupPreview.textContent = formatBackupPreview(backup);
  backupDryRunPanel.textContent = formatBackupDryRun(backup);
  setRuntimeFeedback("備份已預覽，確認後可套用。");
}

async function applyBackup() {
  if (!restoreConfirmInput.checked) throw new Error("請先勾選確認覆蓋本機情境。");
  if (!pendingBackup) throw new Error("請先匯入並預覽備份。");
  await indexedDbBackupRepository.importBackup(pendingBackup);
  pendingBackup = null;
  backupPreview.textContent = "";
  backupDryRunPanel.textContent = "";
  restoreConfirmInput.checked = false;
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("備份已套用。");
}

function setRuntimeFeedback(message) {
  runtimeFeedback.textContent = message;
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

function formatBackupDryRun(backup) {
  const existingIds = new Set(localScenarios.map((scenario) => scenario.scenarioId));
  const overwrite = backup.scenarios.filter((scenario) => existingIds.has(scenario.scenarioId)).length;
  const add = backup.scenarios.length - overwrite;
  return `預演結果：將新增 ${add} 筆、覆蓋 ${overwrite} 筆；套用前需勾選確認覆蓋。`;
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
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
  const latest = Array.isArray(history) ? history.at(-1) : null;
  releaseDashboardPanel.innerHTML = [
    ["狀態", latest?.status === "passed" ? "通過" : "等待驗證"],
    ["提交", latest?.commit || "N/A"],
    ["驗證", latest?.command || "npm run validate"],
  ].map(([label, value]) => `<div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
  validationHistoryPanel.textContent = latest ? `${latest.recordedAt}\n${latest.scope.join("、")}` : "尚無驗證歷史。";
  const cacheName = swVersion.match(/atlas-knowledge-[a-z0-9]+/)?.[0] || "快取版本未載入";
  cacheVersionText.textContent = `快取版本：${cacheName}`;
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

categoryNav.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.selectedCategory = button.dataset.category;
  renderCategories();
  renderList();
});
documentList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (button) openDocument(button.dataset.id);
});
dashboardSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-snapshot-id]");
  if (button) renderDashboardById(button.dataset.snapshotId);
});
searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});
clearFiltersButton.addEventListener("click", () => {
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
recommendationFilterInput.addEventListener("change", renderRecommendationHistory);
sampleExportButton.addEventListener("click", () => loadSample("reports/export-report-sample.json", exportPreviewPanel).catch((error) => setRuntimeFeedback(error.message)));
sampleBackupButton.addEventListener("click", () => loadSample("reports/backup-sample.json", sampleLoaderPanel).catch((error) => setRuntimeFeedback(error.message)));
calculateLoanButton.addEventListener("click", () => {
  try {
    calculateEditableLoan();
  } catch (error) {
    setRuntimeFeedback(error.message);
  }
});
resetLoanButton.addEventListener("click", resetLoanInputs);

window.addEventListener("hashchange", openDocumentFromHash);
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

loadDashboard();
renderReleaseDashboard().catch(() => {});
loadIndex().catch((error) => {
  statusText.textContent = "知識索引載入失敗";
  documentViewer.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
});
