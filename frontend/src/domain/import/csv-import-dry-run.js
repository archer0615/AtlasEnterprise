import { normalizeAsset, validateAsset } from "../asset/asset-validation.js";
import { normalizeExpense, validateExpense } from "../expense/expense-validation.js";
import { normalizeGoal, validateGoal } from "../goal/goal-validation.js";
import { normalizeIncome, validateIncome } from "../income/income-validation.js";
import { normalizeInsurancePolicy, validateInsurancePolicy } from "../insurance/insurance-policy-contract.js";
import { normalizeLiability, validateLiability } from "../liability/liability-validation.js";
import { normalizePosition } from "../position/position-repository-contract.js";

const dangerousFormulaPrefixes = new Set(["=", "+", "-", "@"]);
const forbiddenPrototypeColumns = new Set(["__proto__", "constructor", "prototype"]);
const maxRowBytes = 4096;
const entityAdapters = {
  asset: { normalize: normalizeAsset, validate: validateAsset },
  expense: { normalize: normalizeExpense, validate: validateExpense },
  goal: { normalize: normalizeGoal, validate: validateGoal },
  income: { normalize: normalizeIncome, validate: validateIncome },
  insurance: { normalize: normalizeCsvInsurancePolicy, validate: validateInsurancePolicy },
  liability: { normalize: normalizeLiability, validate: validateLiability },
  position: { normalize: normalizeCsvPosition, validate: validateCsvPosition },
};

export function dryRunCsvImport(csvText, options = {}) {
  const ownerId = options.ownerId || "";
  const parsed = parseCsv(csvText);
  if (parsed.errors.length > 0) return buildReport([], parsed.errors);
  const [headers = [], ...rows] = parsed.rows;
  const headerErrors = validateHeaders(headers);
  const rowErrors = [];
  const acceptedRecords = [];
  const seen = new Set();
  for (const [rowOffset, row] of rows.entries()) {
    const rowNumber = rowOffset + 2;
    const rowText = row.join(",");
    if (new TextEncoder().encode(rowText).length > maxRowBytes) {
      rowErrors.push(error("OVERSIZED_ROW", rowNumber, "", "Row exceeds CSV import dry-run size limit."));
      continue;
    }
    const rawRecord = Object.fromEntries(headers.map((header, index) => [header, row[index] || ""]));
    const entityType = String(rawRecord.entityType || "").trim().toLowerCase();
    const adapter = entityAdapters[entityType];
    const primaryId = rawRecord.id || rawRecord.positionId || rawRecord.policyId;
    const recordKey = `${entityType}:${rawRecord.ownerId}:${primaryId}`;
    if (!adapter) rowErrors.push(error("UNKNOWN_ENTITY", rowNumber, "entityType", "CSV row entityType is not supported."));
    if (!primaryId) rowErrors.push(error("MISSING_REQUIRED_FIELD", rowNumber, "id", "CSV row id is required."));
    if (!rawRecord.ownerId) rowErrors.push(error("MISSING_REQUIRED_FIELD", rowNumber, "ownerId", "CSV row ownerId is required."));
    if (ownerId && rawRecord.ownerId && rawRecord.ownerId !== ownerId) rowErrors.push(error("CROSS_OWNER_ROW", rowNumber, "ownerId", "CSV row ownerId does not match current owner."));
    if (seen.has(recordKey)) rowErrors.push(error("DUPLICATE_ID", rowNumber, "id", "CSV row duplicates an entity id for the same owner."));
    seen.add(recordKey);
    rowErrors.push(...validateCellSecurity(rawRecord, rowNumber));
    if (adapter) {
      const normalized = adapter.normalize(rawRecord, options.context);
      const domainErrors = adapter.validate(normalized).map((item) => error(item.code, rowNumber, item.field, item.message));
      rowErrors.push(...domainErrors);
      acceptedRecords.push({ entityType, record: normalized });
    }
  }
  const errors = [...headerErrors, ...rowErrors];
  return buildReport(errors.length === 0 ? acceptedRecords : [], errors);
}

export function renderCsvImportErrorReport(errors = []) {
  return errors.map((item) => `<li>${escapeHtml(item.code)}:${escapeHtml(item.field || "")}:${escapeHtml(item.message || "")}</li>`).join("");
}

function parseCsv(text) {
  const rows = [];
  const errors = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < String(text || "").length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted && char === "\"" && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(cell);
      cell = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  if (quoted) errors.push(error("MALFORMED_CSV", 0, "", "CSV quoting is malformed."));
  return { rows: rows.filter((item) => item.some((cellValue) => cellValue.length > 0)), errors };
}

function validateHeaders(headers) {
  const errors = [];
  for (const header of headers) {
    if (forbiddenPrototypeColumns.has(header)) errors.push(error("PROTOTYPE_POLLUTION_COLUMN", 1, header, "CSV header is not allowed."));
  }
  for (const required of ["entityType", "id", "ownerId", "name"]) {
    if (!headers.includes(required)) errors.push(error("MISSING_REQUIRED_COLUMN", 1, required, "CSV required column is missing."));
  }
  return errors;
}

function normalizeCsvPosition(input = {}, context = {}) {
  const timestamp = context.now?.().toISOString?.() || new Date(0).toISOString();
  return normalizePosition({
    ...input,
    positionId: input.positionId || input.id,
    householdId: input.householdId || context.householdId || "household-1",
    portfolioId: input.portfolioId || context.portfolioId || "",
    assetId: input.assetId || input.id,
    updatedAt: input.updatedAt || timestamp,
  });
}

function normalizeCsvInsurancePolicy(input = {}, context = {}) {
  const timestamp = context.now?.().toISOString?.() || new Date(0).toISOString();
  return normalizeInsurancePolicy({
    ...input,
    policyId: input.policyId || input.id,
    householdId: input.householdId || context.householdId || "household-1",
    providerName: input.providerName || input.provider || "",
    policyName: input.policyName || input.name || "",
    updatedAt: input.updatedAt || timestamp,
  }, context);
}

function validateCsvPosition(input = {}) {
  const errors = [];
  if (!input.positionId) errors.push(error("ATLAS_POSITION_ID_REQUIRED", "id", "Position id is required", "id-required"));
  if (!input.ownerId) errors.push(error("ATLAS_POSITION_OWNER_REQUIRED", "ownerId", "Position owner is required", "owner-required"));
  if (!input.householdId) errors.push(error("ATLAS_POSITION_HOUSEHOLD_REQUIRED", "householdId", "Position household is required", "household-required"));
  if (!input.portfolioId) errors.push(error("ATLAS_POSITION_PORTFOLIO_REQUIRED", "portfolioId", "Position portfolio is required", "portfolio-required"));
  if (!Number.isFinite(input.quantity) || input.quantity < 0) errors.push(error("ATLAS_POSITION_QUANTITY_INVALID", "quantity", "Position quantity must be non-negative", "quantity"));
  if (!Number.isFinite(input.marketValue)) errors.push(error("ATLAS_POSITION_MARKET_VALUE_INVALID", "marketValue", "Position market value must be finite", "market-value"));
  return errors;
}

function validateCellSecurity(record, rowNumber) {
  const errors = [];
  for (const [field, value] of Object.entries(record)) {
    const trimmed = String(value).trimStart();
    if (dangerousFormulaPrefixes.has(trimmed[0])) errors.push(error("FORMULA_INJECTION", rowNumber, field, "CSV cell begins with a spreadsheet formula prefix."));
    if (/<[a-z][\s\S]*>|on\w+=/i.test(trimmed)) errors.push(error("HTML_INJECTION", rowNumber, field, "CSV cell contains HTML or event-handler-like content."));
    if (trimmed.includes("../") || trimmed.includes("..\\")) errors.push(error("PATH_INJECTION", rowNumber, field, "CSV cell contains path traversal-like content."));
  }
  return errors;
}

function buildReport(records, errors, mode = "dry-run") {
  return Object.freeze({
    schema: mode === "commit" ? "atlas-enterprise.csv-import-commit.v1" : "atlas-enterprise.csv-import-dry-run.v1",
    accepted: errors.length === 0,
    mode,
    rowCount: records.length + errors.filter((item) => item.row > 1).length,
    acceptedCount: records.length,
    rejectedCount: errors.length,
    writeCount: 0,
    records: Object.freeze(records),
    errors: Object.freeze(errors),
    reportHtml: renderCsvImportErrorReport(errors),
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function error(code, row, field, message) {
  return { code, row, field, message, valueCategory: "user-input" };
}
