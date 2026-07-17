import { dashboardStorage, fallbackDashboardSnapshot, normalizeDashboardCollection } from "./dashboard-model.js";
import { indexedDbBackupRepository, indexedDbMigrationRepository, indexedDbRecommendationDecisionRepository, indexedDbScenarioRepository, indexedDbSettingsRepository } from "./indexeddb-runtime.js";

const state = {
  documents: [],
  searchDocuments: new Map(),
  categories: [],
  selectedCategory: "all",
  selectedDocumentId: "",
  query: "",
};

const storageKeys = {
  dashboardSnapshotId: dashboardStorage.snapshotIdKey,
};

const categoryNav = document.querySelector("#categoryNav");
const documentList = document.querySelector("#documentList");
const documentViewer = document.querySelector("#documentViewer");
const searchInput = document.querySelector("#searchInput");
const statusText = document.querySelector("#statusText");
const pageTitle = document.querySelector("#pageTitle");
const resultCount = document.querySelector("#resultCount");
const clearFiltersButton = document.querySelector("#clearFiltersButton");
const dashboardDate = document.querySelector("#dashboardDate");
const dashboardSwitcher = document.querySelector("#dashboardSwitcher");
const metricGrid = document.querySelector("#metricGrid");
const scenarioList = document.querySelector("#scenarioList");
const actionList = document.querySelector("#actionList");
const portfolioReportPanel = document.querySelector("#portfolioReportPanel");
const recommendationControlPanel = document.querySelector("#recommendationControlPanel");
const loanScenarioPanel = document.querySelector("#loanScenarioPanel");
const exportPortfolioReportButton = document.querySelector("#exportPortfolioReportButton");
const recommendationDecisionLog = document.querySelector("#recommendationDecisionLog");
const acceptRecommendationButton = document.querySelector("#acceptRecommendationButton");
const rejectRecommendationButton = document.querySelector("#rejectRecommendationButton");
const loanBalanceInput = document.querySelector("#loanBalanceInput");
const loanRateInput = document.querySelector("#loanRateInput");
const loanMonthsInput = document.querySelector("#loanMonthsInput");
const calculateLoanButton = document.querySelector("#calculateLoanButton");
const loanEditableOutput = document.querySelector("#loanEditableOutput");
const saveScenarioButton = document.querySelector("#saveScenarioButton");
const deleteScenarioButton = document.querySelector("#deleteScenarioButton");
const resetScenariosButton = document.querySelector("#resetScenariosButton");
const exportBackupButton = document.querySelector("#exportBackupButton");
const importBackupInput = document.querySelector("#importBackupInput");
const restoreConfirmInput = document.querySelector("#restoreConfirmInput");
const applyBackupButton = document.querySelector("#applyBackupButton");
const backupPreview = document.querySelector("#backupPreview");
const scenarioNameInput = document.querySelector("#scenarioNameInput");
const scenarioScoreInput = document.querySelector("#scenarioScoreInput");
const runtimeFeedback = document.querySelector("#runtimeFeedback");

let dashboardSnapshots = [fallbackDashboardSnapshot];
let runtimeSnapshots = [];
let simulatorResults = new Map();
let selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
let localScenarios = [];
let recommendationDecisions = [];
let pendingBackup = null;

async function loadIndex() {
  const response = await fetch("knowledge/index.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load knowledge index: ${response.status}`);
  }
  const index = await response.json();
  const searchResponse = await fetch("knowledge/search-index.json", { cache: "no-cache" });
  const searchIndex = searchResponse.ok ? await searchResponse.json() : { documents: [] };
  state.documents = index.documents || [];
  state.searchDocuments = new Map((searchIndex.documents || []).map((doc) => [doc.id, doc]));
  state.categories = index.categories || [];
  statusText.textContent = `本機資料與 ${state.documents.length} 份內部文件已就緒`;
  renderCategories();
  renderList();
  openDocumentFromHash();
}

async function loadDashboard() {
  try {
    const response = await fetch("fixtures/dashboard-snapshots.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load dashboard fixtures: ${response.status}`);
    const collection = normalizeDashboardCollection(await response.json());
    dashboardSnapshots = collection.snapshots;
    await loadRuntimeContracts();
    selectedDashboardSnapshotId = await readStoredDashboardSnapshotId() || collection.defaultSnapshotId;
    await indexedDbMigrationRepository.markCurrent().catch(() => {});
    localScenarios = await indexedDbScenarioRepository.list().catch(() => []);
    recommendationDecisions = await indexedDbRecommendationDecisionRepository.list().catch(() => []);
    renderDashboardById(selectedDashboardSnapshotId);
  } catch {
    dashboardSnapshots = [fallbackDashboardSnapshot];
    selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
    renderDashboard(fallbackDashboardSnapshot);
  }
}

function renderCategories() {
  const counts = state.documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});
  const categories = [{ id: "all", label: "全部", count: state.documents.length }, ...state.categories.map((category) => ({
    id: category,
    label: category,
    count: counts[category] || 0,
  }))];

  categoryNav.innerHTML = categories
    .map((category) => {
      const active = category.id === state.selectedCategory ? "active" : "";
      return `
        <button class="${active}" data-category="${escapeAttribute(category.id)}" type="button">
          <span>${escapeHtml(translateCategory(category.label))}</span>
          <span>${category.count}</span>
        </button>
      `;
    })
    .join("");
}

function renderList() {
  const tokens = normalizeQuery(state.query);
  const docs = state.documents.map((doc) => ({
    ...doc,
    score: scoreDocument(doc, tokens),
  })).filter((doc) => {
    const inCategory = state.selectedCategory === "all" || doc.category === state.selectedCategory;
    const matchesQuery = !tokens.length || doc.score > 0;
    return inCategory && matchesQuery;
  }).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

  pageTitle.textContent = "今日決策總覽";
  resultCount.textContent = `${docs.length} 筆結果`;
  documentList.innerHTML = docs.map((doc) => `
    <button class="document-card ${doc.id === state.selectedDocumentId ? "active" : ""}" type="button" data-id="${doc.id}">
      <span class="doc-title">${escapeHtml(translateKnowledgeText(doc.title))}</span>
      <span class="doc-category">${escapeHtml(translateCategory(doc.category))}</span>
      <span class="doc-path">${escapeHtml(doc.path)}</span>
      ${tokens.length ? `<span class="doc-score">符合度 ${doc.score}</span>` : ""}
    </button>
  `).join("") || `<p class="empty-state">找不到符合條件的知識文件。</p>`;
}

function normalizeQuery(value) {
  return value
    .toLowerCase()
    .replace(/[`*_#[\](){}|>~:;,.!?/\\-]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function scoreDocument(doc, tokens) {
  if (!tokens.length) return 0;

  const searchDoc = state.searchDocuments.get(doc.id);
  const title = doc.title.toLowerCase();
  const path = doc.path.toLowerCase();
  const category = doc.category.toLowerCase();
  const terms = searchDoc?.terms || `${doc.title} ${doc.path} ${doc.summary || ""}`.toLowerCase();
  const headings = (searchDoc?.headings || []).join(" ").toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (title === token) score += 40;
    if (title.includes(token)) score += 10;
    if (category === token) score += 8;
    if (path.includes(token)) score += 6;
    if (headings.includes(token)) score += 4;
    if (terms.includes(token)) score += 2;
  }

  return score;
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
  const translatedHeadings = translateKnowledgeHeadings(payload.headings || []);
  const translatedBody = translateKnowledgeMarkdown(payload.bodyMarkdown || "");
  documentViewer.innerHTML = `
    <div class="document-meta">
      <span>${escapeHtml(translateCategory(payload.category))}</span>
      <span>${escapeHtml(payload.canonicalPath)}</span>
    </div>
    <h2>${escapeHtml(translateKnowledgeText(payload.title))}</h2>
    ${renderHeadingLinks(translatedHeadings)}
    <pre>${escapeHtml(translatedBody)}</pre>
  `;
}

function renderHeadingLinks(headings) {
  const visibleHeadings = headings.filter((heading) => heading.level <= 3).slice(0, 12);
  if (!visibleHeadings.length) return "";

  return `
    <div class="heading-strip">
      ${visibleHeadings.map((heading) => `<span>H${heading.level} ${escapeHtml(heading.text)}</span>`).join("")}
    </div>
  `;
}

function renderDashboardById(snapshotId) {
  const snapshot = dashboardSnapshots.find((item) => item.snapshotId === snapshotId) || dashboardSnapshots[0];
  selectedDashboardSnapshotId = snapshot.snapshotId;
  writeStoredValue(storageKeys.dashboardSnapshotId, selectedDashboardSnapshotId);
  renderDashboard(snapshot);
}

function renderDashboard(snapshot) {
  dashboardDate.textContent = snapshot.asOfDate;
  dashboardSwitcher.innerHTML = dashboardSnapshots.map((item) => `
    <button class="${item.snapshotId === selectedDashboardSnapshotId ? "active" : ""}" type="button" data-snapshot-id="${escapeAttribute(item.snapshotId)}">
      ${escapeHtml(item.label || item.snapshotId)}
    </button>
  `).join("");
  metricGrid.innerHTML = snapshot.metrics.map((metric) => `
    <div class="metric-card">
      <span>${escapeHtml(metric.label)}</span>
      <strong>${escapeHtml(formatDisplayToken(metric.value))}</strong>
      <small>${escapeHtml(metric.detail)}</small>
    </div>
  `).join("");
  const mergedScenarios = [...snapshot.scenarios, ...localScenarios];
  scenarioList.innerHTML = mergedScenarios.map((scenario) => `
    <div class="scenario-row">
      <span>${escapeHtml(scenario.name)}</span>
      <strong>${escapeHtml(formatDisplayToken(scenario.score))}</strong>
      <small>${escapeHtml(translateStatus(scenario.status))}</small>
    </div>
  `).join("");
  actionList.innerHTML = snapshot.actions.map((action) => `
    <div class="action-row">${escapeHtml(action)}</div>
  `).join("");
  renderPortfolioReport(snapshot);
  renderRecommendationControls(snapshot);
  renderLoanScenarioPanel(snapshot);
}

function getRuntimeSnapshot(snapshot) {
  return runtimeSnapshots.find((item) => item.snapshotId === snapshot.snapshotId)
    || runtimeSnapshots.find((item) => item.sourceFixture === snapshot.sourceFixture)
    || null;
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
    portfolioReportPanel.innerHTML = `<div class="empty-runtime">目前情境沒有投資組合報表合約。</div>`;
    return;
  }
  const metrics = [
    ["回撤率", formatMetricValue(result.metrics.drawdownRate, "percent")],
    ["回撤金額", formatMetricValue(result.metrics.totalDrawdownAmount, "currency")],
    ["壓力後資產", formatMetricValue(result.metrics.stressedPortfolioValue, "currency")],
    ["股票損失", formatMetricValue(result.metrics.equityLoss, "currency")],
  ];
  portfolioReportPanel.innerHTML = metrics.map(([label, value]) => `
    <div class="runtime-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>
  `).join("");
}

function renderRecommendationControls(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) {
    recommendationControlPanel.innerHTML = `<div class="empty-runtime">目前情境沒有建議執行紀錄。</div>`;
    recommendationDecisionLog.textContent = "";
    return;
  }
  recommendationControlPanel.innerHTML = `
    <div class="runtime-row"><span>狀態</span><strong>${escapeHtml(translateStatus(result.recommendation.status))}</strong></div>
    <div class="runtime-row"><span>分數</span><strong>${escapeHtml(result.score)}</strong></div>
    <div class="runtime-note">${escapeHtml(translateRecommendationText(result.recommendation.explanation))}</div>
  `;
  renderRecommendationDecisionLog(result.fixtureId);
}

function renderRecommendationDecisionLog(fixtureId) {
  const latest = recommendationDecisions
    .filter((item) => item.fixtureId === fixtureId)
    .sort((a, b) => String(b.decidedAt || "").localeCompare(String(a.decidedAt || "")))[0];
  recommendationDecisionLog.textContent = latest
    ? `最近決策：${translateDecision(latest.decision)} / ${translateStatus(latest.status)} / ${latest.decidedAt}`
    : "最近決策：尚未紀錄";
}

function renderLoanScenarioPanel(snapshot) {
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  const formulaIds = result?.formulaEvaluation?.formulaIds || [];
  const isLoan = formulaIds.some((formulaId) => ["FORM-PMT", "FORM-LOAN-AMORTIZATION", "FORM-REFI-BREAK-EVEN", "FORM-PREPAYMENT-IMPACT"].includes(formulaId));
  if (!isLoan || !result) {
    loanScenarioPanel.innerHTML = `<div class="empty-runtime">目前情境沒有貸款執行指標。</div>`;
    return;
  }
  const loanMetrics = Object.entries(result.metrics)
    .filter(([key]) => /payment|loan|refinance|interest|balance|prepayment|fee/i.test(key))
    .slice(0, 5);
  loanScenarioPanel.innerHTML = loanMetrics.map(([label, value]) => `
    <div class="runtime-row"><span>${escapeHtml(translateMetricName(label))}</span><strong>${escapeHtml(formatMetricValue(value))}</strong></div>
  `).join("");
}

async function setRecommendationDecision(decision) {
  const snapshot = dashboardSnapshots.find((item) => item.snapshotId === selectedDashboardSnapshotId) || dashboardSnapshots[0];
  const result = getRuntimeResult(getRuntimeSnapshot(snapshot));
  if (!result?.recommendation) {
    setRuntimeFeedback("目前情境沒有可執行的建議。");
    return;
  }
  const record = {
    decisionId: `decision-${Date.now()}`,
    decision,
    fixtureId: result.fixtureId,
    snapshotId: snapshot.snapshotId,
    status: result.recommendation.status,
    score: String(result.score),
    decidedAt: new Date().toISOString(),
  };
  await indexedDbRecommendationDecisionRepository.save(record);
  recommendationDecisions = await indexedDbRecommendationDecisionRepository.list();
  renderRecommendationDecisionLog(result.fixtureId);
  setRuntimeFeedback(`建議已${translateDecision(decision)}：${result.fixtureId} / ${translateStatus(result.recommendation.status)}`);
}

function exportPortfolioReport() {
  const snapshot = dashboardSnapshots.find((item) => item.snapshotId === selectedDashboardSnapshotId) || dashboardSnapshots[0];
  const runtimeSnapshot = getRuntimeSnapshot(snapshot);
  const result = getRuntimeResult(runtimeSnapshot);
  if (!result?.metrics) {
    setRuntimeFeedback("目前情境沒有可匯出的投資組合報表。");
    return;
  }
  const formulaIds = (runtimeSnapshot?.metrics || []).flatMap((metric) => metric.formulaIds || []);
  const payload = {
    exportedAt: new Date().toISOString(),
    snapshotId: snapshot.snapshotId,
    fixtureId: result.fixtureId,
    formulaIds,
    metrics: result.metrics,
    recommendation: result.recommendation || null,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `atlas-portfolio-report-${snapshot.snapshotId}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setRuntimeFeedback(`投資組合報表已匯出：${snapshot.snapshotId}`);
}

function calculateEditableLoan() {
  const principal = Number(loanBalanceInput.value.replaceAll(",", ""));
  const annualRate = Number(loanRateInput.value);
  const months = Number(loanMonthsInput.value);
  validateLoanInput(principal, annualRate, months);
  const monthlyPayment = calculateAmortizedPayment(principal, annualRate, months);
  loanEditableOutput.textContent = `月付：${monthlyPayment.toLocaleString("zh-TW", { maximumFractionDigits: 2 })}，本金：${principal.toLocaleString("zh-TW")}，期數：${months}`;
  setRuntimeFeedback("貸款可編輯情境已完成試算。");
}

function calculateAmortizedPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * monthlyRate / (1 - (1 + monthlyRate) ** -months);
}

function validateLoanInput(principal, annualRate, months) {
  if (!Number.isFinite(principal) || principal <= 0) {
    throw new Error("貸款本金必須大於 0。");
  }
  if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100) {
    throw new Error("貸款年利率必須介於 0 到 100。");
  }
  if (!Number.isInteger(months) || months <= 0 || months > 600) {
    throw new Error("貸款期數必須是 1 到 600 的整數。");
  }
}

function formatMetricValue(value, mode = "") {
  if (value === null || value === undefined) return "N/A";
  if (mode === "percent") return `${(Number(value) * 100).toFixed(2)}%`;
  if (mode === "currency") return Number(value).toLocaleString("zh-TW");
  return formatDisplayToken(value);
}

function formatDisplayToken(value) {
  return String(value)
    .replace(/^(\d+(?:\.\d+)?)K$/, (_, amount) => `${Number(amount) * 1000}`)
    .replace(/^(\d+(?:\.\d+)?)M$/, (_, amount) => `${Number(amount).toLocaleString("zh-TW")} 百萬`)
    .replaceAll("TWD", "新台幣")
    .replaceAll("break-even", "損益兩平");
}

function translateCategory(value) {
  const translations = {
    ai: "AI",
    api: "API",
    catalog: "目錄",
    engine: "引擎",
    entity: "實體",
    framework: "框架",
    governance: "治理",
    Finance: "財務",
    Governance: "治理",
    Insurance: "保險",
    Investment: "投資",
    product: "產品",
    reporting: "報表",
    Operations: "營運",
    Planning: "規劃",
    Retirement: "退休",
    security: "安全",
    supporting: "支援",
    workflow: "工作流程",
  };
  return translations[value] || value;
}

function translateKnowledgeHeadings(headings) {
  return headings.map((heading) => ({
    ...heading,
    text: translateKnowledgeText(heading.text),
  }));
}

function translateKnowledgeMarkdown(markdown) {
  return String(markdown)
    .split("\n")
    .map((line) => translateKnowledgeLine(line))
    .join("\n");
}

function translateKnowledgeLine(line) {
  const heading = line.match(/^(#{1,6})\s+(.+)$/);
  if (heading) return `${heading[1]} ${translateKnowledgeText(heading[2])}`;

  const field = line.match(/^([A-Za-z][A-Za-z ]+):\s*(.*)$/);
  if (field) {
    return `${translateKnowledgeText(field[1])}: ${translateKnowledgeText(field[2])}`;
  }

  return translateKnowledgeText(line);
}

function translateKnowledgeText(value) {
  let text = String(value || "");
  const phraseTranslations = [
    ["Document Control", "文件管制"],
    ["Document Name", "文件名稱"],
    ["Document Path", "文件路徑"],
    ["Document Type", "文件類型"],
    ["Parent Specification", "上層規格"],
    ["Source of Truth", "事實來源"],
    ["Version History", "版本歷程"],
    ["Related Specifications", "相關規格"],
    ["Status", "狀態"],
    ["Canonical Specification", "正式規格"],
    ["Owner", "負責單位"],
    ["Last Updated", "最後更新"],
    ["Service Name", "服務名稱"],
    ["Display Name", "顯示名稱"],
    ["Category", "分類"],
    ["Domain Service", "領域服務"],
    ["Application Service", "應用服務"],
    ["Layer", "層級"],
    ["Domain Layer", "領域層"],
    ["Application Layer", "應用層"],
    ["Domain", "領域"],
    ["Bounded Context", "限界上下文"],
    ["Module", "模組"],
    ["Purpose", "用途"],
    ["Business Meaning", "業務意義"],
    ["Responsibilities", "職責"],
    ["Non Responsibilities", "非職責"],
    ["Dependencies", "相依項目"],
    ["Consumers", "使用者"],
    ["Interfaces", "介面"],
    ["Public Operations", "公開操作"],
    ["Input DTO", "輸入 DTO"],
    ["Output DTO", "輸出 DTO"],
    ["Repository Dependencies", "Repository 相依項目"],
    ["Aggregate Dependencies", "Aggregate 相依項目"],
    ["Command Dependencies", "Command 相依項目"],
    ["Domain Event Dependencies", "領域事件相依項目"],
    ["External Dependencies", "外部相依項目"],
    ["Workflow Dependencies", "工作流程相依項目"],
    ["Authorization", "授權"],
    ["Transaction Boundary", "交易邊界"],
    ["Consistency Boundary", "一致性邊界"],
    ["Concurrency", "並行控制"],
    ["Idempotency", "冪等性"],
    ["Retry", "重試"],
    ["Compensation", "補償"],
    ["Caching", "快取"],
    ["Logging", "記錄"],
    ["Metrics", "指標"],
    ["Audit", "稽核"],
    ["Security", "安全"],
    ["Performance Target", "效能目標"],
    ["Failure Strategy", "失敗策略"],
    ["Version", "版本"],
    ["Date", "日期"],
    ["Change", "變更"],
    ["Reason", "原因"],
    ["Description", "說明"],
    ["Required", "必填"],
    ["Field", "欄位"],
    ["Endpoint", "端點"],
    ["Method", "方法"],
    ["Permission", "權限"],
    ["Expected Result", "預期結果"],
    ["Rule ID", "規則 ID"],
    ["Rule", "規則"],
    ["Failure", "失敗"],
    ["Actor", "執行者"],
    ["Output", "輸出"],
    ["Capability Matrix", "能力矩陣"],
    ["Capability", "能力"],
    ["Implemented", "已實作"],
    ["Fixture-backed", "Fixture 支援"],
    ["Documented", "已文件化"],
    ["Canonical Knowledge", "正式知識"],
    ["Known Gap", "已知缺口"],
    ["Status Legend", "狀態說明"],
    ["Formula Definition Contract", "公式定義合約"],
    ["Formula Identifier Catalog", "公式識別碼目錄"],
    ["Formula Governance Commands", "公式治理命令"],
    ["Validation Rules", "驗證規則"],
    ["API Contract", "API 合約"],
    ["Testing Matrix", "測試矩陣"],
    ["Example", "範例"],
    ["Service Control", "服務控制"],
    ["Entity Control", "實體控制"],
    ["Framework Control", "框架控制"],
    ["Workflow Control", "工作流程控制"],
    ["Decision Control", "決策控制"],
    ["Governance", "治理"],
    ["Testing", "測試"],
    ["Architecture", "架構"],
    ["Specification", "規格"],
    ["Service", "服務"],
    ["Entity", "實體"],
    ["Framework", "框架"],
    ["Workflow", "工作流程"],
    ["Knowledge", "知識"],
    ["Product", "產品"],
    ["Formula", "公式"],
    ["Scenario", "情境"],
    ["Dashboard", "儀表板"],
    ["Simulator", "模擬器"],
    ["Runtime", "執行階段"],
    ["Backup", "備份"],
    ["Cache", "快取"],
    ["Database", "資料庫"],
    ["Financial", "財務"],
    ["Capability", "能力"],
    ["Loan", "貸款"],
    ["Mortgage", "房貸"],
    ["Portfolio", "投資組合"],
    ["Goal", "目標"],
    ["Decision", "決策"],
    ["Liability", "負債"],
    ["Asset", "資產"],
    ["Household", "家庭"],
    ["Notification", "通知"],
    ["Execution Plan", "執行計畫"],
    ["Action Plan", "行動計畫"],
    ["Calculation Engine", "計算引擎"],
    ["Optimization Engine", "最佳化引擎"],
    ["Projection Engine", "預測引擎"],
    ["Calculation", "計算"],
    ["Optimization", "最佳化"],
    ["Projection", "預測"],
    ["Repository", "Repository"],
    ["Aggregate", "Aggregate"],
    ["Command", "Command"],
    ["Domain Event", "領域事件"],
    ["External", "外部"],
    ["Internal", "內部"],
    ["Yes", "是"],
    ["No", "否"],
    ["Partial", "部分"],
    ["Draft", "草稿"],
    ["Active", "啟用"],
    ["Deprecated", "已棄用"],
    ["Retired", "已退役"],
    ["Gap", "缺口"],
    ["N/A", "不適用"],
    ["Read", "讀取"],
    ["Evaluate", "評估"],
    ["Admin", "管理"],
    ["Reject publish", "拒絕發布"],
    ["Reject update", "拒絕更新"],
    ["Reject evaluation", "拒絕評估"],
    ["Reject retirement", "拒絕退役"],
    ["Only dependencies cataloged through Integration Framework or Service Catalog.", "只能使用整合框架或服務目錄已登錄的相依項目。"],
    ["Caller authorization context is required before sensitive operation.", "敏感操作前必須具備呼叫者授權上下文。"],
    ["Retry only transient failures with known state and safe idempotency.", "只在狀態已知且具備安全冪等性時重試暫時性失敗。"],
    ["Cache only read-only deterministic outputs with scoped keys.", "只快取具範圍鍵值的唯讀 deterministic 輸出。"],
    ["Tenant isolation, Household isolation, permission, and data classification are respected.", "必須遵守租戶隔離、家庭隔離、權限與資料分級。"],
  ];

  for (const [source, target] of phraseTranslations) {
    text = text.replaceAll(source, target);
  }
  return text;
}

function translateStatus(value) {
  const translations = {
    accepted: "接受",
    "at-risk": "高風險",
    conditional: "有條件",
    evaluated: "已評估",
    IndexedDB: "本機儲存",
    monitor: "監控",
    reject: "拒絕",
    rejected: "拒絕",
  };
  return translations[value] || value;
}

function translateDecision(value) {
  const translations = {
    accepted: "接受",
    rejected: "拒絕",
  };
  return translations[value] || value;
}

function translateMetricName(value) {
  const translations = {
    annualWithdrawalGap: "年度提領缺口",
    annualWithdrawalNeed: "年度提領需求",
    bondLoss: "債券損失",
    cashLoss: "現金損失",
    currentMonthlyPayment: "目前月付金",
    drawdownRate: "回撤率",
    equityLoss: "股票損失",
    monthlyMortgagePayment: "每月房貸付款",
    monthlyPaymentSavingsAfterReset: "重設後每月節省金額",
    postPrepaymentReserveMonths: "提前還款後預備金月數",
    refinanceFeeRecoveryMonths: "轉貸費用回收月數",
    refinanceMonthlyPayment: "轉貸月付金",
    resetMonthlyPayment: "重設後月付金",
    stressedPortfolioValue: "壓力後投資組合價值",
    stressedWithdrawalRate: "壓力後提領率",
    sustainableAnnualWithdrawal: "可持續年度提領額",
    totalDrawdownAmount: "總回撤金額",
    withdrawalRate: "提領率",
  };
  return translations[value] || value;
}

function translateRecommendationText(value) {
  const translations = {
    "Equity exposure explains most drawdown risk and should drive mitigation planning.": "股票曝險是多數回撤風險來源，應作為風險緩解規劃的主要依據。",
    "Keep retirement plan under monitoring because stress returns reduce readiness margin.": "壓力報酬會降低退休準備緩衝，退休計畫應持續監控。",
    "Proceed only if emergency reserve remains above target after prepayment.": "只有在提前還款後緊急預備金仍高於目標時才執行。",
    "Refinance does not create monthly savings and fee recovery is not available.": "轉貸未產生每月節省金額，且無法回收相關費用。",
    "Refinance only if fee recovery remains acceptable under the reset-rate scenario.": "只有在利率重設情境下費用回收期仍可接受時才轉貸。",
    "Withdrawal need materially exceeds the safe withdrawal threshold under baseline and stress views.": "基準與壓力情境下的提領需求都明顯超過安全提領門檻。",
  };
  return translations[value] || value;
}

async function saveCurrentScenario() {
  const snapshot = dashboardSnapshots.find((item) => item.snapshotId === selectedDashboardSnapshotId) || dashboardSnapshots[0];
  const name = scenarioNameInput.value.trim() || `${snapshot.label || snapshot.snapshotId} 本地情境`;
  const score = scenarioScoreInput.value.trim() || snapshot.metrics?.[0]?.value || "N/A";
  validateScenarioInput(name, score);
  const scenario = {
    scenarioId: `local-${Date.now()}`,
    name,
    score,
    status: "IndexedDB",
    sourceSnapshotId: snapshot.snapshotId,
    savedAt: new Date().toISOString(),
  };
  await indexedDbScenarioRepository.save(scenario);
  scenarioNameInput.value = "";
  scenarioScoreInput.value = "";
  localScenarios = await indexedDbScenarioRepository.list();
  setRuntimeFeedback("本地情境已儲存。");
  renderDashboard(snapshot);
}

async function deleteLastScenario() {
  const latest = [...localScenarios].sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")))[0];
  if (!latest) {
    setRuntimeFeedback("沒有可刪除的本地情境。");
    return;
  }
  await indexedDbScenarioRepository.delete(latest.scenarioId);
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("最後一筆本地情境已刪除。");
}

async function resetScenarios() {
  await indexedDbScenarioRepository.clear();
  localScenarios = [];
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("本地情境已重置。");
}

async function exportBackup() {
  const backup = await indexedDbBackupRepository.exportBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "atlas-pwa-runtime-backup.json";
  link.click();
  URL.revokeObjectURL(url);
  setRuntimeFeedback("備份已匯出。");
}

async function previewBackup(file) {
  const backup = JSON.parse(await file.text());
  if (!indexedDbBackupRepository.validateBackup(backup)) {
    throw new Error("Unsupported backup schema");
  }
  pendingBackup = backup;
  backupPreview.textContent = formatBackupPreview(backup);
  setRuntimeFeedback("備份已載入預覽，確認後可套用。");
}

async function applyBackup() {
  if (!restoreConfirmInput.checked) {
    throw new Error("請先確認覆蓋本地情境。");
  }
  if (!pendingBackup) {
    throw new Error("請先選擇有效備份。");
  }
  await indexedDbBackupRepository.importBackup(pendingBackup);
  pendingBackup = null;
  backupPreview.textContent = "";
  restoreConfirmInput.checked = false;
  localScenarios = await indexedDbScenarioRepository.list();
  renderDashboardById(selectedDashboardSnapshotId);
  setRuntimeFeedback("備份已匯入。");
}

function setRuntimeFeedback(message) {
  runtimeFeedback.textContent = message;
}

function validateScenarioInput(name, score) {
  if (name.length < 2) {
    throw new Error("情境名稱至少需要 2 個字。");
  }
  if (name.length > 80) {
    throw new Error("情境名稱不可超過 80 個字。");
  }
  if (!/^(N\/A|\d{1,3})$/.test(score)) {
    throw new Error("情境分數必須是 0 到 100，或 N/A。");
  }
  if (/^\d{1,3}$/.test(score) && (Number(score) < 0 || Number(score) > 100)) {
    throw new Error("情境分數必須是 0 到 100，或 N/A。");
  }
  if (score.length > 24) {
    throw new Error("分數或狀態不可超過 24 個字。");
  }
}

async function loadRuntimeContracts() {
  const [runtimeResponse, simulatorResponse] = await Promise.all([
    fetch("fixtures/dashboard-runtime-snapshots.json", { cache: "no-cache" }),
    fetch("fixtures/scenario-results.json", { cache: "no-cache" }),
  ]);
  runtimeSnapshots = runtimeResponse.ok ? (await runtimeResponse.json()).snapshots || [] : [];
  const simulatorPayload = simulatorResponse.ok ? await simulatorResponse.json() : { results: [] };
  simulatorResults = new Map((simulatorPayload.results || []).map((result) => [result.fixtureId, result]));
}

function formatBackupPreview(backup) {
  const incomingIds = new Set(backup.scenarios.map((scenario) => scenario.scenarioId));
  const replacingCount = localScenarios.filter((scenario) => incomingIds.has(scenario.scenarioId)).length;
  const newCount = backup.scenarios.length - replacingCount;
  const incomingNames = backup.scenarios
    .slice(0, 5)
    .map((scenario) => scenario.name)
    .filter(Boolean)
    .join("、") || "N/A";
  const replacingNames = localScenarios
    .filter((scenario) => incomingIds.has(scenario.scenarioId))
    .slice(0, 5)
    .map((scenario) => scenario.name)
    .filter(Boolean)
    .join("、") || "無";
  return [
    `備份預覽：${backup.scenarios.length} 筆情境`,
    `目前本地：${localScenarios.length} 筆`,
    `新增：${newCount} 筆`,
    `覆蓋：${replacingCount} 筆`,
    `情境：${incomingNames}`,
    `將覆蓋：${replacingNames}`,
    `匯出時間：${backup.exportedAt || "N/A"}`,
  ].join("，");
}

function openDocumentFromHash() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const id = params.get("doc");
  if (id) {
    openDocument(id);
  }
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
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
  if (!button) return;
  openDocument(button.dataset.id);
});

dashboardSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-snapshot-id]");
  if (!button) return;
  renderDashboardById(button.dataset.snapshotId);
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

saveScenarioButton.addEventListener("click", () => {
  saveCurrentScenario().catch((error) => setRuntimeFeedback(error.message));
});

deleteScenarioButton.addEventListener("click", () => {
  deleteLastScenario().catch((error) => setRuntimeFeedback(error.message));
});

resetScenariosButton.addEventListener("click", () => {
  resetScenarios().catch((error) => setRuntimeFeedback(error.message));
});

exportBackupButton.addEventListener("click", () => {
  exportBackup().catch((error) => setRuntimeFeedback(error.message));
});

exportPortfolioReportButton.addEventListener("click", () => {
  exportPortfolioReport();
});

importBackupInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  previewBackup(file).catch((error) => setRuntimeFeedback(error.message));
  event.target.value = "";
});

applyBackupButton.addEventListener("click", () => {
  applyBackup().catch((error) => setRuntimeFeedback(error.message));
});

acceptRecommendationButton.addEventListener("click", () => {
  setRecommendationDecision("accepted").catch((error) => setRuntimeFeedback(error.message));
});

rejectRecommendationButton.addEventListener("click", () => {
  setRecommendationDecision("rejected").catch((error) => setRuntimeFeedback(error.message));
});

calculateLoanButton.addEventListener("click", () => {
  try {
    calculateEditableLoan();
  } catch (error) {
    setRuntimeFeedback(error.message);
  }
});

window.addEventListener("hashchange", openDocumentFromHash);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

loadDashboard();

loadIndex().catch((error) => {
  statusText.textContent = "Index missing";
  documentViewer.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
});
