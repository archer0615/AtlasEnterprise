import { normalizeLiability, validateLiability } from "../../domain/liability/liability-validation.js";

export function createLiabilityApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => `liability-${now().getTime()}` }) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }

  async function createLiability(input) {
    const record = normalizeLiability({ ...input, ownerId: await ownerId() }, { now, createId });
    const errors = validateLiability(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.name)) return { ok: false, errors: [{ code: "ATLAS_LIABILITY_ALREADY_EXISTS", field: "name", message: "Liability name already exists", rule: "unique-owner-name", valueCategory: "user-input" }] };
    await repository.create(record);
    await auditRepository?.save?.(audit("LiabilityCreated", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function listLiabilities(query = {}) {
    return repository.listByOwner(await ownerId(), query);
  }

  async function updateLiability(id, input) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_LIABILITY_NOT_FOUND", field: "id", message: "Liability not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = normalizeLiability({ ...existing, ...input, id, ownerId: existing.ownerId, createdAt: existing.createdAt, version: existing.version }, { now, createId });
    const errors = validateLiability(record, { existing, operation: "update" });
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await auditRepository?.save?.(audit("LiabilityUpdated", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function archiveLiability(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_LIABILITY_NOT_FOUND", field: "id", message: "Liability not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = { ...existing, status: "archived", archivedAt: now().toISOString(), updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.archive(id, record);
    await auditRepository?.save?.(audit("LiabilityArchived", record, now)).catch(() => {});
    return { ok: true, record };
  }

  async function restoreLiability(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return { ok: false, errors: [{ code: "ATLAS_LIABILITY_NOT_FOUND", field: "id", message: "Liability not found", rule: "owner-isolation", valueCategory: "identifier" }] };
    const record = { ...existing, status: "active", archivedAt: "", updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.restore(id, record);
    await auditRepository?.save?.(audit("LiabilityRestored", record, now)).catch(() => {});
    return { ok: true, record };
  }

  return { listLiabilities, getLiability: repository.getById, createLiability, updateLiability, archiveLiability, restoreLiability };
}

function audit(eventType, record, now) {
  return { auditId: `${eventType}-${record.id}-${now().getTime()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Liability", entityId: record.id, ownerId: record.ownerId, result: "ok" } };
}
