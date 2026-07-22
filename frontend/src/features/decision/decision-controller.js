import { renderDecisionState } from "./decision-view.js";

export function createDecisionController({ dom }) {
  return {
    initialize() {
      renderDecisionState(dom.optional("#recommendationControlPanel"), "ready");
    },
    dispose() {},
  };
}
