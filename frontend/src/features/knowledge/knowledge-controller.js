import { renderKnowledgeState } from "./knowledge-view.js";

export function createKnowledgeController({ dom }) {
  return {
    initialize() {
      renderKnowledgeState(dom.optional("#documentViewer"), "ready");
    },
    dispose() {},
  };
}
