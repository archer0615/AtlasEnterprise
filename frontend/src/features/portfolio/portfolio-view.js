export function renderPortfolioState(element, state) {
  if (element) element.dataset.portfolioState = state;
}

export function renderPositionPanel(element, state = {}) {
  if (!element) return;
  element.dataset.positionState = state.status || "unknown";
  element.dataset.positionMode = state.mode || "reporting-readonly";
  element.textContent = [
    "持倉資料",
    `狀態：${state.status || "unknown"}`,
    `模式：${state.mode || "reporting-readonly"}`,
    `Store：${state.storeName || "positions"}`,
    `Backup：${state.backupSchema || "atlas-pwa-runtime-backup.v2"}`,
  ].join("\n");
}
