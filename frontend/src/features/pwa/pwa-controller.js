import { renderPwaState } from "./pwa-view.js";

export function createPwaController({ dom }) {
  return {
    initialize() {
      renderPwaState(dom.optional("#offlineRepairPanel"), "ready");
    },
    dispose() {},
  };
}
