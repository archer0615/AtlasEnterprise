import { dashboardStorage, fallbackDashboardSnapshot, normalizeDashboardCollection } from "./dashboard-model.js";

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

let dashboardSnapshots = [fallbackDashboardSnapshot];
let selectedDashboardSnapshotId = fallbackDashboardSnapshot.snapshotId;

async function loadIndex() {
  const response = await fetch("/knowledge/index.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load knowledge index: ${response.status}`);
  }
  const index = await response.json();
  const searchResponse = await fetch("/knowledge/search-index.json", { cache: "no-cache" });
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
    const response = await fetch("/fixtures/dashboard-snapshots.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load dashboard fixtures: ${response.status}`);
    const collection = normalizeDashboardCollection(await response.json());
    dashboardSnapshots = collection.snapshots;
    selectedDashboardSnapshotId = readStoredDashboardSnapshotId() || collection.defaultSnapshotId;
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

  const response = await fetch(`/knowledge/documents/${doc.id}.json`);
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
  scenarioList.innerHTML = snapshot.scenarios.map((scenario) => `
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

function openDocumentFromHash() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const id = params.get("doc");
  if (id) {
    openDocument(id);
  }
}

function readStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return "";
  }
}

function readStoredDashboardSnapshotId() {
  const current = readStoredValue(storageKeys.dashboardSnapshotId);
  if (current) return current;

  for (const legacyKey of dashboardStorage.legacySnapshotIdKeys) {
    const legacy = readStoredValue(legacyKey);
    if (legacy) {
      writeStoredValue(storageKeys.dashboardSnapshotId, legacy);
      return legacy;
    }
  }

  return "";
}

function writeStoredValue(key, value) {
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

window.addEventListener("hashchange", openDocumentFromHash);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

loadDashboard();

loadIndex().catch((error) => {
  statusText.textContent = "Index missing";
  documentViewer.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
});
