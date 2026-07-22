import { renderScenarioState } from "./scenario-view.js";

export function createScenarioController({ dom }) {
  const callbacks = new Set();
  return {
    initialize() {
      renderScenarioState(dom.optional("#scenarioList"), "ready");
    },
    onScenarioChanged(callback) {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },
    notifyScenarioChanged() {
      callbacks.forEach((callback) => callback());
    },
    dispose() {
      callbacks.clear();
    },
  };
}
