import { normalizeIncome, validateIncome } from "../../domain/income/income-validation.js";

export function createIncomeApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => crypto.randomUUID() }) {
  async function ownerId() { return (await ownerProvider.getCurrentOwner()).ownerId; }
  async function listIncomes(query = {}) { return repository.listByOwner(await ownerId(), query); }
  async function createIncome(input) {
    const record = normalizeIncome({ ...input, ownerId: await ownerId() }, { now, createId });
    const errors = validateIncome(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.name)) return { ok: false, errors: [{ code: "ATLAS_INCOME_ALREADY_EXISTS", field: "name", message: "Income name already exists", rule: "unique-owner-name", valueCategory: "user-input" }] };
    await repository.create(record);
    await auditRepository?.save?.(audit("IncomeCreated", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function updateIncome(id, input) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = normalizeIncome({ ...existing, ...input, id, ownerId: existing.ownerId, createdAt: existing.createdAt, version: existing.version }, { now, createId });
    const errors = validateIncome(record, { existing, operation: "update" });
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await auditRepository?.save?.(audit("IncomeUpdated", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function archiveIncome(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = { ...existing, status: "archived", archivedAt: now().toISOString(), updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.archive(id, record);
    await auditRepository?.save?.(audit("IncomeArchived", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function restoreIncome(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = { ...existing, status: "active", archivedAt: "", updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.restore(id, record);
    await auditRepository?.save?.(audit("IncomeRestored", record, now)).catch(() => {});
    return { ok: true, record };
  }
  return { listIncomes, getIncome: repository.getById, createIncome, updateIncome, archiveIncome, restoreIncome };
}

function missing() { return { ok: false, errors: [{ code: "ATLAS_INCOME_NOT_FOUND", field: "id", message: "Income not found", rule: "owner-isolation", valueCategory: "identifier" }] }; }
function audit(eventType, record, now) {
  return { auditId: `${eventType}-${record.id}-${Date.now()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Income", entityId: record.id, ownerId: record.ownerId, result: "ok" } };
}
