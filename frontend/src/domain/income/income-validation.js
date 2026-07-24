import { incomeFrequencies, incomeStatuses, incomeTypes, supportedIncomeCurrencies } from "./income-status.js";

export function normalizeIncome(input = {}, context = {}) {
  const now = context.now?.() || new Date();
  const timestamp = now.toISOString();
  return Object.freeze({
    id: input.id || context.createId?.() || `income-${now.getTime()}`,
    ownerId: input.ownerId,
    name: String(input.name || "").trim(),
    incomeType: input.incomeType || "other",
    amount: Number(input.amount ?? 0),
    currency: input.currency || "TWD",
    frequency: input.frequency || "one-time",
    startDate: input.startDate || input.occurrenceDate || timestamp.slice(0, 10),
    endDate: input.endDate || "",
    occurrenceDate: input.occurrenceDate || input.startDate || timestamp.slice(0, 10),
    status: input.status || "active",
    description: String(input.description || ""),
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateIncome(record = {}, options = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.name || "").trim()) errors.push(error("ATLAS_INCOME_NAME_REQUIRED", "name", "Income name is required", "name-required"));
  if (!incomeTypes.includes(record.incomeType)) errors.push(error("ATLAS_INCOME_TYPE_INVALID", "incomeType", "Income type is invalid", "type-enum"));
  if (!Number.isFinite(Number(record.amount)) || Number(record.amount) < 0) errors.push(error("ATLAS_INCOME_AMOUNT_INVALID", "amount", "Income amount must be finite and non-negative", "finite-non-negative"));
  if (!supportedIncomeCurrencies.includes(record.currency)) errors.push(error("ATLAS_INCOME_CURRENCY_INVALID", "currency", "Currency is invalid", "currency-enum"));
  if (!incomeFrequencies.includes(record.frequency)) errors.push(error("ATLAS_INCOME_FREQUENCY_INVALID", "frequency", "Frequency is invalid", "frequency-enum"));
  if (!isValidDate(record.startDate) || (record.frequency === "one-time" && !isValidDate(record.occurrenceDate))) errors.push(error("ATLAS_INCOME_DATE_INVALID", "startDate", "Income date is invalid", "valid-date"));
  if (record.endDate && (!isValidDate(record.endDate) || Date.parse(record.endDate) < Date.parse(record.startDate))) errors.push(error("ATLAS_INCOME_DATE_RANGE_INVALID", "endDate", "End date must be after start date", "date-range"));
  if (!incomeStatuses.includes(record.status)) errors.push(error("ATLAS_INCOME_STATUS_INVALID", "status", "Income status is invalid", "status-enum"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_INCOME_ARCHIVED_UPDATE_REJECTED", "status", "Archived income cannot be updated", "lifecycle"));
  return errors;
}

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
