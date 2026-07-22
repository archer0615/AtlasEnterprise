import { normalizeAsset, validateAsset } from "../../domain/asset/asset-validation.js";

export function createAssetApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => crypto.randomUUID() }) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }

  async function createAsset(input) {
    const record = normalizeAsset({ ...input, ownerId: await ownerId() }, { now, createId });
    const errors = validateAsset(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.name)) return { ok: false, errors: [{ code: "ATLAS_ASSET_ALREADY_EXISTS", field: "name", message: "Asset name already exists", rule: "unique-owner-name", valueCategory: "user-input" }] };
    await repository.create(record);
    await auditRepository?.save?.(audit("AssetCreated", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function listAssets(query = {}) {
    return repository.listByOwner(await ownerId(), query);
  }

  async function updateAsset(id, input) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_ASSET_NOT_FOUND", field: "id", message: "Asset not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = normalizeAsset({ ...existing, ...input, id, ownerId: existing.ownerId, createdAt: existing.createdAt, version: existing.version }, { now, createId });
    const errors = validateAsset(record, { existing, operation: "update" });
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await auditRepository?.save?.(audit("AssetUpdated", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function archiveAsset(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_ASSET_NOT_FOUND", field: "id", message: "Asset not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = { ...existing, status: "archived", archivedAt: now().toISOString(), updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.archive(id, record);
    await auditRepository?.save?.(audit("AssetArchived", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function restoreAsset(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_ASSET_NOT_FOUND", field: "id", message: "Asset not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = { ...existing, status: "active", archivedAt: "", updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.restore(id, record);
    await auditRepository?.save?.(audit("AssetRestored", record, now)).catch(() => {});
    return { ok: true, record };
  }

  return { listAssets, getAsset: repository.getById, createAsset, updateAsset, archiveAsset, restoreAsset };
}

function audit(eventType, record, now) {
  return { auditId: `${eventType}-${record.id}-${Date.now()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Asset", entityId: record.id, ownerId: record.ownerId, result: "ok" } };
}
