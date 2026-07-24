import { goalPriorities, goalStatuses, goalTypes, supportedGoalCurrencies } from "./goal-status.js";

export function normalizeGoal(input = {}, context = {}) {
  const now = context.now?.() || new Date();
  const timestamp = now.toISOString();
  return Object.freeze({
    id: input.id || context.createId?.() || `goal-${now.getTime()}`,
    ownerId: input.ownerId,
    name: String(input.name || "").trim(),
    goalType: input.goalType || "other",
    targetAmount: Number(input.targetAmount ?? 0),
    currentAmount: Number(input.currentAmount ?? 0),
    currency: input.currency || "TWD",
    priority: input.priority || "medium",
    startDate: input.startDate || input.createdAt?.slice?.(0, 10) || timestamp.slice(0, 10),
    targetDate: input.targetDate || timestamp.slice(0, 10),
    status: input.status || "draft",
    description: String(input.description || ""),
    parentGoalId: input.parentGoalId || "",
    scenarioId: input.scenarioId || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateGoal(record = {}, options = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_GOAL_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.name || "").trim()) errors.push(error("ATLAS_GOAL_NAME_REQUIRED", "name", "Goal name is required", "name-required"));
  if (String(record.name || "").length > 160) errors.push(error("ATLAS_GOAL_NAME_TOO_LONG", "name", "Goal name is too long", "name-length"));
  if (!goalTypes.includes(record.goalType)) errors.push(error("ATLAS_GOAL_TYPE_INVALID", "goalType", "Goal type is invalid", "type-enum"));
  if (!Number.isFinite(Number(record.targetAmount)) || Number(record.targetAmount) <= 0) errors.push(error("ATLAS_GOAL_TARGET_INVALID", "targetAmount", "Target amount must be finite and positive", "positive-number"));
  if (!Number.isFinite(Number(record.currentAmount)) || Number(record.currentAmount) < 0) errors.push(error("ATLAS_GOAL_CURRENT_AMOUNT_INVALID", "currentAmount", "Current amount must be finite and non-negative", "finite-non-negative"));
  if (!supportedGoalCurrencies.includes(record.currency)) errors.push(error("ATLAS_GOAL_CURRENCY_INVALID", "currency", "Currency is invalid", "currency-enum"));
  if (!goalPriorities.includes(record.priority)) errors.push(error("ATLAS_GOAL_PRIORITY_INVALID", "priority", "Priority is invalid", "priority-enum"));
  if (!isValidDate(record.startDate) || !isValidDate(record.targetDate)) errors.push(error("ATLAS_GOAL_TARGET_DATE_INVALID", "targetDate", "Goal dates must be valid", "valid-date"));
  if (isValidDate(record.startDate) && isValidDate(record.targetDate) && Date.parse(record.targetDate) < Date.parse(record.startDate)) errors.push(error("ATLAS_GOAL_DATE_RANGE_INVALID", "targetDate", "Target date must be on or after start date", "date-range"));
  if (!goalStatuses.includes(record.status)) errors.push(error("ATLAS_GOAL_STATUS_INVALID", "status", "Goal status is invalid", "status-enum"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_GOAL_ARCHIVE_STATE_INVALID", "archivedAt", "Archived date requires archived status", "archive-state"));
  if (record.parentGoalId && record.parentGoalId === record.id) errors.push(error("ATLAS_GOAL_PARENT_INVALID", "parentGoalId", "Goal cannot parent itself", "self-parent"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_GOAL_ARCHIVED_UPDATE_REJECTED", "status", "Archived goal cannot be updated", "lifecycle"));
  if (["completed", "cancelled"].includes(options.existing?.status) && options.operation === "update") errors.push(error("ATLAS_GOAL_COMPLETED_UPDATE_REJECTED", "status", "Closed goal cannot be updated", "lifecycle"));
  return errors;
}

export function validateGoalDependency(record = {}, parent = null, ancestors = []) {
  if (!record.parentGoalId) return [];
  if (!parent) return [error("ATLAS_GOAL_PARENT_INVALID", "parentGoalId", "Parent goal is missing", "parent-exists")];
  if (parent.ownerId !== record.ownerId) return [error("ATLAS_GOAL_PARENT_INVALID", "parentGoalId", "Parent goal owner differs", "parent-owner")];
  if (parent.status === "archived") return [error("ATLAS_GOAL_PARENT_INVALID", "parentGoalId", "Archived parent is not valid", "parent-active")];
  if (ancestors.includes(record.id)) return [error("ATLAS_GOAL_DEPENDENCY_CYCLE", "parentGoalId", "Goal dependency cycle detected", "cycle")];
  return [];
}

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
