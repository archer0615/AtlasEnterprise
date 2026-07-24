import { liabilityStatuses, liabilityTypes, supportedLiabilityCurrencies } from "./liability-status.js";

export function validateLiability(input = {}, options = {}) {
  const errors = [];
  const record = { ...input };
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.name || "").trim()) errors.push(error("ATLAS_LIABILITY_NAME_REQUIRED", "name", "Liability name is required", "name-required"));
  if (!liabilityTypes.includes(record.liabilityType)) errors.push(error("ATLAS_LIABILITY_TYPE_INVALID", "liabilityType", "Liability type is invalid", "type-enum"));
  if (!supportedLiabilityCurrencies.includes(record.currency)) errors.push(error("ATLAS_CURRENCY_INVALID", "currency", "Currency is invalid", "currency-enum"));
  const balance = Number(record.outstandingBalance);
  if (!Number.isFinite(balance) || balance < 0) errors.push(error("ATLAS_LIABILITY_BALANCE_INVALID", "outstandingBalance", "Balance must be finite and non-negative", "finite-non-negative"));
  if (!isValidDate(record.asOfDate)) errors.push(error("ATLAS_LIABILITY_AS_OF_DATE_INVALID", "asOfDate", "As-of date is invalid", "valid-date"));
  if (!liabilityStatuses.includes(record.status)) errors.push(error("ATLAS_LIABILITY_STATUS_INVALID", "status", "Liability status is invalid", "status-enum"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_LIABILITY_ARCHIVE_STATE_INVALID", "archivedAt", "Archived date requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_LIABILITY_ARCHIVED_UPDATE_REJECTED", "status", "Archived liability cannot be updated", "lifecycle"));
  return errors;
}

export function normalizeLiability(input = {}, context = {}) {
  const now = context.now?.() || new Date();
  const timestamp = now.toISOString();
  return Object.freeze({
    id: input.id || context.createId?.() || `liability-${now.getTime()}`,
    ownerId: input.ownerId,
    name: String(input.name || "").trim(),
    liabilityType: input.liabilityType || "other",
    currency: input.currency || "TWD",
    outstandingBalance: Number(input.outstandingBalance ?? 0),
    asOfDate: input.asOfDate || timestamp.slice(0, 10),
    status: input.status || "active",
    description: String(input.description || ""),
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
