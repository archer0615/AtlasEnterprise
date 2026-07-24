import { actionPlanStatuses, executionPlanStatuses, recommendationPriorities, recommendationStatuses, recommendationTypes } from "./recommendation-status.js";

export function normalizeRecommendation(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `recommendation-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    title: String(input.title || "").trim(),
    type: input.type || "cashflow",
    priority: input.priority || "medium",
    status: input.status || "pending-review",
    sourceScenarioId: input.sourceScenarioId || "",
    sourceDecisionId: input.sourceDecisionId || "",
    ruleReferences: freezeList(input.ruleReferences),
    constraintReferences: freezeList(input.constraintReferences),
    recommendationDate: input.recommendationDate || timestamp.slice(0, 10),
    expiresAt: input.expiresAt || "",
    summary: String(input.summary || ""),
    supportingEvidence: Object.freeze({ ...(input.supportingEvidence || {}) }),
    warnings: freezeList(input.warnings),
    dataCompleteness: Number(input.dataCompleteness ?? 1),
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateRecommendation(record = {}, options = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_RECOMMENDATION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_RECOMMENDATION_TITLE_REQUIRED", "title", "Title is required", "title-required"));
  if (!recommendationTypes.includes(record.type)) errors.push(error("ATLAS_RECOMMENDATION_TYPE_INVALID", "type", "Recommendation type is invalid", "type-enum"));
  if (!recommendationPriorities.includes(record.priority)) errors.push(error("ATLAS_RECOMMENDATION_PRIORITY_INVALID", "priority", "Priority is invalid", "priority-enum"));
  if (!recommendationStatuses.includes(record.status)) errors.push(error("ATLAS_RECOMMENDATION_STATUS_INVALID", "status", "Status is invalid", "status-enum"));
  if (!Array.isArray(record.ruleReferences) || record.ruleReferences.length === 0) errors.push(error("ATLAS_RECOMMENDATION_RULE_REQUIRED", "ruleReferences", "At least one canonical rule reference is required", "rule-reference"));
  if (!Array.isArray(record.constraintReferences)) errors.push(error("ATLAS_RECOMMENDATION_CONSTRAINT_REQUIRED", "constraintReferences", "At least one constraint reference is required", "constraint-reference"));
  if (!isValidDate(record.recommendationDate)) errors.push(error("ATLAS_RECOMMENDATION_DATE_INVALID", "recommendationDate", "Recommendation date is invalid", "valid-date"));
  if (record.expiresAt && (!isValidDate(record.expiresAt) || Date.parse(record.expiresAt) < Date.parse(record.recommendationDate))) errors.push(error("ATLAS_RECOMMENDATION_EXPIRATION_INVALID", "expiresAt", "Expiration must be on or after recommendation date", "expiration"));
  if (!Number.isFinite(Number(record.dataCompleteness)) || Number(record.dataCompleteness) < 0 || Number(record.dataCompleteness) > 1) errors.push(error("ATLAS_RECOMMENDATION_COMPLETENESS_INVALID", "dataCompleteness", "Data completeness must be between 0 and 1", "ratio"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_RECOMMENDATION_ARCHIVE_STATE_INVALID", "archivedAt", "Archived date requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_RECOMMENDATION_ARCHIVED_UPDATE_REJECTED", "status", "Archived recommendation cannot be updated", "lifecycle"));
  return errors;
}

export function normalizeExecutionPlan(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `execution-plan-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    recommendationId: input.recommendationId,
    decisionId: input.decisionId || "",
    steps: freezeSteps(input.steps),
    dependencies: freezeList(input.dependencies),
    estimatedOrder: Number(input.estimatedOrder ?? 1),
    targetDate: input.targetDate || timestamp.slice(0, 10),
    status: input.status || "planned",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateExecutionPlan(record = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_EXECUTION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.recommendationId || "").trim()) errors.push(error("ATLAS_EXECUTION_RECOMMENDATION_REQUIRED", "recommendationId", "Accepted recommendation is required", "recommendation-required"));
  if (!Array.isArray(record.steps) || record.steps.length === 0) errors.push(error("ATLAS_EXECUTION_STEPS_REQUIRED", "steps", "Execution steps are required", "steps-required"));
  if (!Number.isInteger(Number(record.estimatedOrder)) || Number(record.estimatedOrder) < 1) errors.push(error("ATLAS_EXECUTION_ORDER_INVALID", "estimatedOrder", "Estimated order must be positive", "positive-integer"));
  if (!isValidDate(record.targetDate)) errors.push(error("ATLAS_EXECUTION_TARGET_DATE_INVALID", "targetDate", "Target date is invalid", "valid-date"));
  if (!executionPlanStatuses.includes(record.status)) errors.push(error("ATLAS_EXECUTION_STATUS_INVALID", "status", "Status is invalid", "status-enum"));
  return errors;
}

export function normalizeActionPlan(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `action-plan-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    executionPlanId: input.executionPlanId,
    actionType: input.actionType || "planning-task",
    title: String(input.title || "").trim(),
    targetDate: input.targetDate || timestamp.slice(0, 10),
    status: input.status || "planned",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateActionPlan(record = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_ACTION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.executionPlanId || "").trim()) errors.push(error("ATLAS_ACTION_EXECUTION_REQUIRED", "executionPlanId", "Execution plan is required", "execution-required"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_ACTION_TITLE_REQUIRED", "title", "Action title is required", "title-required"));
  if (!isValidDate(record.targetDate)) errors.push(error("ATLAS_ACTION_TARGET_DATE_INVALID", "targetDate", "Target date is invalid", "valid-date"));
  if (!actionPlanStatuses.includes(record.status)) errors.push(error("ATLAS_ACTION_STATUS_INVALID", "status", "Status is invalid", "status-enum"));
  return errors;
}

function freezeList(values = []) {
  return Object.freeze([...values].map((value) => String(value)));
}

function freezeSteps(values = []) {
  return Object.freeze([...values].map((step, index) => Object.freeze({
    id: step.id || `step-${index + 1}`,
    title: String(step.title || "").trim(),
    order: Number(step.order ?? index + 1),
    status: step.status || "planned",
  })));
}

function nowIso(context) {
  return (context.now?.() || new Date()).toISOString();
}

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
