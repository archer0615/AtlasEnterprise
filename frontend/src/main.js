import { dashboardStorage, fallbackDashboardSnapshot, normalizeDashboardCollection } from "./dashboard-model.js";
import { indexedDbBackupRepository, indexedDbMigrationRepository, indexedDbScenarioRepository, indexedDbSettingsRepository } from "./indexeddb-runtime.js";

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
let selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;
let localScenarios = [];
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
  statusText.textContent = `${state.documents.length} documents`;
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
    selectedDashboardSnapshotId = await readStoredDashboardSnapshotId() || collection.defaultSnapshotId;
    await indexedDbMigrationRepository.markCurrent().catch(() => {});
    localScenarios = await indexedDbScenarioRepository.list().catch(() => []);
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
  const categories = [{ id: "all", label: "All", count: state.documents.length }, ...state.categories.map((category) => ({
    id: category,
    label: category,
    count: counts[category] || 0,
  }))];

  categoryNav.innerHTML = categories
    .map((category) => {
      const active = category.id === state.selectedCategory ? "active" : "";
      return `
        <button class="${active}" data-category="${escapeAttribute(category.id)}" type="button">
          <span>${escapeHtml(category.label)}</span>
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

  pageTitle.textContent = state.selectedCategory === "all" ? "LifeOS Knowledge Base" : state.selectedCategory;
  resultCount.textContent = `${docs.length} results`;
  documentList.innerHTML = docs.map((doc) => `
    <button class="document-card ${doc.id === state.selectedDocumentId ? "active" : ""}" type="button" data-id="${doc.id}">
      <span class="doc-title">${escapeHtml(doc.title)}</span>
      <span class="doc-category">${escapeHtml(doc.category)}</span>
      <span class="doc-path">${escapeHtml(doc.path)}</span>
      ${tokens.length ? `<span class="doc-score">match ${doc.score}</span>` : ""}
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
  documentViewer.innerHTML = `
    <div class="document-meta">
      <span>${escapeHtml(payload.category)}</span>
      <span>${escapeHtml(payload.canonicalPath)}</span>
    </div>
    <h2>${escapeHtml(payload.title)}</h2>
    ${renderHeadingLinks(payload.headings || [])}
    <pre>${escapeHtml(payload.bodyMarkdown)}</pre>
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
      <strong>${escapeHtml(metric.value)}</strong>
      <small>${escapeHtml(metric.detail)}</small>
    </div>
  `).join("");
  const mergedScenarios = [...snapshot.scenarios, ...localScenarios];
  scenarioList.innerHTML = mergedScenarios.map((scenario) => `
    <div class="scenario-row">
      <span>${escapeHtml(scenario.name)}</span>
      <strong>${scenario.score}</strong>
      <small>${escapeHtml(scenario.status)}</small>
    </div>
  `).join("");
  actionList.innerHTML = snapshot.actions.map((action) => `
    <div class="action-row">${escapeHtml(action)}</div>
  `).join("");
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

importBackupInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  previewBackup(file).catch((error) => setRuntimeFeedback(error.message));
  event.target.value = "";
});

applyBackupButton.addEventListener("click", () => {
  applyBackup().catch((error) => setRuntimeFeedback(error.message));
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
