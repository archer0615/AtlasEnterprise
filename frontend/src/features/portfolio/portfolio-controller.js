import { renderPortfolioState } from "./portfolio-view.js";

export function createPortfolioController({ dom }) {
  return {
    initialize() {
      renderPortfolioState(dom.optional("#portfolioReportPanel"), "ready");
    },
    dispose() {},
  };
}
