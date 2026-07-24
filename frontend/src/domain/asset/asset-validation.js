import { assetStatuses, assetTypes, supportedAssetCurrencies } from "./asset-status.js";

export function validateAsset(input = {}, options = {}) {
  const errors = [];
  const record = { ...input };
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!String(record.name || "").trim()) errors.push(error("ATLAS_ASSET_NAME_REQUIRED", "name", "Asset name is required", "name-required"));
  if (!assetTypes.includes(record.assetType)) errors.push(error("ATLAS_ASSET_TYPE_INVALID", "assetType", "Asset type is invalid", "type-enum"));
  if (!supportedAssetCurrencies.includes(record.currency)) errors.push(error("ATLAS_CURRENCY_INVALID", "currency", "Currency is invalid", "currency-enum"));
  const currentValue = Number(record.currentValue);
  if (!Number.isFinite(currentValue)) errors.push(error("ATLAS_ASSET_CURRENT_VALUE_INVALID", "currentValue", "Current value must be finite", "finite-number"));
  if (!isValidDate(record.valuationDate)) errors.push(error("ATLAS_ASSET_VALUATION_DATE_INVALID", "valuationDate", "Valuation date is invalid", "valid-date"));
  if (!assetStatuses.includes(record.status)) errors.push(error("ATLAS_ASSET_STATUS_INVALID", "status", "Asset status is invalid", "status-enum"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_ASSET_ARCHIVE_STATE_INVALID", "archivedAt", "Archived date requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_ASSET_ARCHIVED_UPDATE_REJECTED", "status", "Archived asset cannot be updated", "lifecycle"));
  return errors;
}

export function normalizeAsset(input = {}, context = {}) {
  const now = context.now?.() || new Date();
  const timestamp = now.toISOString();
  return Object.freeze({
    id: input.id || context.createId?.() || `asset-${now.getTime()}`,
    ownerId: input.ownerId,
    name: String(input.name || "").trim(),
    assetType: input.assetType || "other",
    currency: input.currency || "TWD",
    currentValue: Number(input.currentValue ?? 0),
    valuationDate: input.valuationDate || timestamp.slice(0, 10),
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
