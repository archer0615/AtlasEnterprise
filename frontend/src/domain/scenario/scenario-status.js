export const scenarioStatuses = Object.freeze(["draft", "active", "inactive", "archived"]);

const transitions = Object.freeze({
  draft: Object.freeze(["active", "archived"]),
  active: Object.freeze(["inactive", "archived"]),
  inactive: Object.freeze(["active", "archived"]),
  archived: Object.freeze(["inactive"]),
});

export function getAllowedScenarioTransitions(currentStatus) {
  return transitions[currentStatus] || Object.freeze([]);
}

export function canTransitionScenario(currentStatus, targetStatus) {
  return getAllowedScenarioTransitions(currentStatus).includes(targetStatus);
}

export function transitionScenario(scenario, targetStatus, context = {}) {
  if (!canTransitionScenario(scenario?.status, targetStatus)) {
    return Object.freeze({ ok: false, error: { code: "ATLAS_SCENARIO_TRANSITION_INVALID", field: "status", message: "Scenario status transition is not allowed", rule: "scenario-lifecycle", valueCategory: "user-input" } });
  }
  const timestamp = (context.now?.() || new Date()).toISOString();
  return Object.freeze({
    ok: true,
    record: Object.freeze({ ...scenario, status: targetStatus, updatedAt: timestamp, archivedAt: targetStatus === "archived" ? timestamp : "" }),
  });
}
