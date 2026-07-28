export function renderPortfolioState(element, state) {
  if (element) element.dataset.portfolioState = state;
}

export function renderPositionPanel(element, state = {}) {
  if (!element) return;
  const positions = Array.isArray(state.positions) ? state.positions : [];
  const activePositions = positions.filter((position) => position.status !== "archived");
  const totalMarketValue = activePositions.reduce((total, position) => total + Number(position.marketValue || 0), 0);
  const currencies = [...new Set(activePositions.map((position) => position.currency || "TWD"))];
  element.dataset.positionState = state.status || "unknown";
  element.dataset.positionMode = state.mode || "reporting-readonly";
  element.setAttribute?.("role", "region");
  element.setAttribute?.("aria-label", "持倉資料唯讀報表");
  element.tabIndex = 0;
  element.textContent = [
    "持倉資料",
    `狀態：${state.status || "unknown"}`,
    `模式：${state.mode || "reporting-readonly"}`,
    `Store：${state.storeName || "positions"}`,
    `Backup：${state.backupSchema || "atlas-pwa-runtime-backup.v2"}`,
    `持倉數：${activePositions.length}`,
    `市值合計：${currencies.length === 1 ? currencies[0] : "MIXED"} ${totalMarketValue}`,
    `Portfolio：${state.portfolioId || "全部"}`,
    activePositions.length ? `持倉清單：${activePositions.map((position) => `${position.name || position.positionId}:${position.marketValue || 0}`).join("、")}` : "目前沒有持倉資料。",
    "唯讀：不支援買進、賣出、再平衡、券商同步或自動交易。",
  ].join("\n");
}
