import { validateScenarioAssumptions } from "./scenario-assumption-validation.js";
import { scenarioStatuses } from "./scenario-status.js";
import { scenarioTypes } from "./scenario-type.js";

export function validateScenario(record = {}, options = {}) {
  const errors = [];
  if (options.persisted && !String(record.id || record.scenarioId || "").trim()) errors.push(error("ATLAS_SCENARIO_ID_REQUIRED", "id", "Scenario id is required", "id-required"));
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_SCENARIO_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.name || "").trim()) errors.push(error("ATLAS_SCENARIO_NAME_REQUIRED", "name", "Scenario name is required", "name-required"));
  if (String(record.name || "").length > 120) errors.push(error("ATLAS_SCENARIO_NAME_TOO_LONG", "name", "Scenario name is too long", "name-length"));
  if (!scenarioTypes.includes(record.type)) errors.push(error("ATLAS_SCENARIO_TYPE_INVALID", "type", "Scenario type is invalid", "scenario-type"));
  if (!scenarioStatuses.includes(record.status)) errors.push(error("ATLAS_SCENARIO_STATUS_INVALID", "status", "Scenario status is invalid", "scenario-status"));
  errors.push(...validateScenarioAssumptions(record.type, record.assumptions));
  validatePeriod(record.projectionHorizon, errors);
  if (record.baseScenarioId && record.baseScenarioId === (record.id || record.scenarioId)) errors.push(error("ATLAS_SCENARIO_BASE_INVALID", "baseScenarioId", "Scenario cannot reference itself as base", "base-reference"));
  if (!isDateTime(record.createdAt) || !isDateTime(record.updatedAt) || Date.parse(record.updatedAt) < Date.parse(record.createdAt)) errors.push(error("ATLAS_SCENARIO_PERIOD_INVALID", "updatedAt", "Scenario timestamps are invalid", "timestamp-order"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_SCENARIO_STATUS_INVALID", "archivedAt", "Archived timestamp requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_SCENARIO_STATUS_INVALID", "status", "Archived scenario cannot be updated", "lifecycle"));
  return errors;
}

function validatePeriod(period = {}, errors) {
  if (!period?.start && !period?.end) return;
  if (!isDate(period.start) || !isDate(period.end) || Date.parse(period.end) < Date.parse(period.start)) errors.push(error("ATLAS_SCENARIO_PERIOD_INVALID", "projectionHorizon", "Projection period is invalid", "projection-period"));
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
