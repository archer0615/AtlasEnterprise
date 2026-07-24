import { decisionStatuses } from "./decision-status.js";
import { decisionTypes } from "./decision-type.js";

export function validateDecision(record = {}, options = {}) {
  const errors = [];
  if (options.persisted && !String(record.id || record.decisionId || "").trim()) errors.push(error("ATLAS_DECISION_ID_REQUIRED", "id", "Decision id is required", "id-required"));
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_DECISION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_DECISION_TITLE_REQUIRED", "title", "Decision title is required", "title-required"));
  if (!decisionTypes.includes(record.type)) errors.push(error("ATLAS_DECISION_TYPE_INVALID", "type", "Decision type is invalid", "decision-type"));
  if (!decisionStatuses.includes(record.status)) errors.push(error("ATLAS_DECISION_STATUS_INVALID", "status", "Decision status is invalid", "decision-status"));
  if (record.type === "scenario-selection" && !String(record.scenarioId || "").trim()) errors.push(error("ATLAS_DECISION_SCENARIO_REQUIRED", "scenarioId", "Scenario reference is required", "scenario-reference"));
  if (record.type === "recommendation-disposition" && !String(record.recommendationId || "").trim()) errors.push(error("ATLAS_DECISION_RECOMMENDATION_INVALID", "recommendationId", "Recommendation reference is required", "recommendation-reference"));
  if (String(record.rationale || "").length > 2000) errors.push(error("ATLAS_DECISION_RATIONALE_TOO_LONG", "rationale", "Decision rationale is too long", "rationale-length"));
  if (!isDate(record.decisionDate) || (record.effectiveDate && !isDate(record.effectiveDate)) || (record.reviewDate && (!isDate(record.reviewDate) || Date.parse(record.reviewDate) < Date.parse(record.decisionDate)))) errors.push(error("ATLAS_DECISION_DATE_INVALID", "decisionDate", "Decision dates are invalid", "decision-dates"));
  if (!isDateTime(record.createdAt) || !isDateTime(record.updatedAt) || Date.parse(record.updatedAt) < Date.parse(record.createdAt)) errors.push(error("ATLAS_DECISION_DATE_INVALID", "updatedAt", "Decision timestamps are invalid", "timestamp-order"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_DECISION_STATUS_INVALID", "archivedAt", "Archived timestamp requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_DECISION_STATUS_INVALID", "status", "Archived decision cannot be updated", "lifecycle"));
  return errors;
}

function isDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function isDateTime(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
