import { renderLoanState } from "./loan-view.js";

export function createLoanController({ dom }) {
  return {
    initialize() {
      renderLoanState(dom.optional("#loanScenarioPanel"), "ready");
    },
    dispose() {},
  };
}
