import { renderPortfolioState, renderPositionPanel } from "./portfolio-view.js";

export function createPortfolioController({ dom }) {
  return {
    initialize() {
      renderPortfolioState(dom.optional("#portfolioReportPanel"), "ready");
      renderPositionPanel(dom.optional("#positionPanel"), {
        status: "ready",
        storeName: "positions",
        backupSchema: "atlas-pwa-runtime-backup.v2",
      });
    },
    dispose() {},
  };
}
