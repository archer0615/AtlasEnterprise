import { decisionStatuses } from "./decision-status.js";

const transitionRules = Object.freeze({
  draft: Object.freeze({ "under-review": Object.freeze(["rationale"]), cancelled: Object.freeze(["rationale"]), archived: Object.freeze([]) }),
  "under-review": Object.freeze({ committed: Object.freeze(["rationale", "selectedOption"]), cancelled: Object.freeze(["rationale"]), archived: Object.freeze([]) }),
  committed: Object.freeze({ completed: Object.freeze(["rationale"]), cancelled: Object.freeze(["rationale"]) }),
  completed: Object.freeze({ archived: Object.freeze([]) }),
  cancelled: Object.freeze({ archived: Object.freeze([]) }),
  archived: Object.freeze({}),
});

export function getAllowedDecisionTransitions(currentStatus) {
  return Object.freeze(Object.keys(transitionRules[currentStatus] || {}));
}

export function getRequiredTransitionEvidence(currentStatus, targetStatus) {
  return transitionRules[currentStatus]?.[targetStatus] || Object.freeze([]);
}

export function canTransitionDecision(currentStatus, targetStatus) {
  return decisionStatuses.includes(currentStatus) && getAllowedDecisionTransitions(currentStatus).includes(targetStatus);
}

export function transitionDecision({ currentStatus, targetStatus, trigger = "", decision = {}, context = {} } = {}) {
  const requiredEvidence = getRequiredTransitionEvidence(currentStatus, targetStatus);
  if (!canTransitionDecision(currentStatus, targetStatus)) {
    return Object.freeze({ allowed: false, nextStatus: currentStatus, requiredEvidence, rule: "decision-state-machine", error: error("ATLAS_DECISION_TRANSITION_INVALID", "status", "Decision status transition is not allowed") });
  }
  const missing = requiredEvidence.filter((field) => !String(context[field] ?? decision[field] ?? "").trim());
  if (missing.length) {
    return Object.freeze({ allowed: false, nextStatus: currentStatus, requiredEvidence, rule: "decision-required-evidence", error: error("ATLAS_DECISION_RATIONALE_REQUIRED", missing[0], "Required transition evidence is missing") });
  }
  return Object.freeze({ allowed: true, nextStatus: targetStatus, requiredEvidence, rule: `Decision ${currentStatus} -> ${targetStatus}`, trigger, error: null });
}

function error(code, field, message) {
  return { code, field, message, rule: "decision-transition", valueCategory: "user-input" };
}
