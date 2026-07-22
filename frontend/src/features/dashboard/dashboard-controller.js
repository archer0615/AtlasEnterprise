import { renderDashboardState } from "./dashboard-view.js";

export function createDashboardController({ dom }) {
  return {
    initialize() {
      renderDashboardState(dom.optional("#metricGrid"), "ready");
    },
    refresh() {
      renderDashboardState(dom.optional("#metricGrid"), "ready");
    },
    dispose() {},
  };
}
