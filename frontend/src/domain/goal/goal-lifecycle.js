const transitions = Object.freeze({
  draft: new Set(["active", "archived", "cancelled"]),
  active: new Set(["inactive", "completed", "cancelled", "archived"]),
  inactive: new Set(["active", "cancelled", "archived"]),
  completed: new Set(["archived"]),
  cancelled: new Set(["archived"]),
  archived: new Set(["draft", "active", "inactive"]),
});

export function getAllowedGoalTransitions(currentStatus) {
  return Object.freeze([...(transitions[currentStatus] || [])]);
}

export function canTransitionGoal({ currentStatus, targetStatus } = {}) {
  const allowed = currentStatus !== targetStatus && transitions[currentStatus]?.has(targetStatus) === true;
  return Object.freeze({
    allowed,
    nextStatus: allowed ? targetStatus : currentStatus,
    rule: allowed ? `${currentStatus}-to-${targetStatus}` : "transition-denied",
    error: allowed ? null : { code: "ATLAS_GOAL_TRANSITION_INVALID", field: "status", message: "Goal transition is not allowed", rule: "lifecycle", valueCategory: "user-input" },
  });
}

export function transitionGoal(record, targetStatus, context = {}) {
  const result = canTransitionGoal({ currentStatus: record?.status, targetStatus });
  if (!result.allowed) return { ok: false, errors: [result.error] };
  const now = context.now?.() || new Date();
  const timestamp = now.toISOString();
  return {
    ok: true,
    record: Object.freeze({
      ...record,
      status: targetStatus,
      archivedAt: targetStatus === "archived" ? timestamp : "",
      updatedAt: timestamp,
      version: Number(record.version || 0) + 1,
    }),
  };
}
