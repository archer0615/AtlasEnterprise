import { renderNavigationState } from "./navigation-view.js";

export function createNavigationController({ dom }) {
  return {
    initialize() {
      renderNavigationState(dom.optional("nav"), "ready");
    },
    dispose() {},
  };
}
