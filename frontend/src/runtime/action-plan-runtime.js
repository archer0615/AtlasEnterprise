import { normalizeActionPlan } from "../domain/recommendation/recommendation-validation.js";

export function createActionPlansFromExecutionPlan(executionPlan = {}, context = {}) {
  const steps = Array.isArray(executionPlan.steps) ? executionPlan.steps : [];
  return Object.freeze(steps.map((step) => normalizeActionPlan({
    ownerId: executionPlan.ownerId,
    executionPlanId: executionPlan.id,
    actionType: "planning-task",
    title: step.title,
    targetDate: executionPlan.targetDate,
    status: step.status === "blocked" ? "blocked" : "planned",
  }, context)));
}
