import { normalizeExpense, validateExpense } from "../../domain/expense/expense-validation.js";

export function createExpenseApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => `expense-${now().getTime()}` }) {
  async function ownerId() { return (await ownerProvider.getCurrentOwner()).ownerId; }
  async function listExpenses(query = {}) { return repository.listByOwner(await ownerId(), query); }
  async function createExpense(input) {
    const record = normalizeExpense({ ...input, ownerId: await ownerId() }, { now, createId });
    const errors = validateExpense(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.name)) return { ok: false, errors: [{ code: "ATLAS_EXPENSE_ALREADY_EXISTS", field: "name", message: "Expense name already exists", rule: "unique-owner-name", valueCategory: "user-input" }] };
    await repository.create(record);
    await auditRepository?.save?.(audit("ExpenseCreated", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function updateExpense(id, input) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = normalizeExpense({ ...existing, ...input, id, ownerId: existing.ownerId, createdAt: existing.createdAt, version: existing.version }, { now, createId });
    const errors = validateExpense(record, { existing, operation: "update" });
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await auditRepository?.save?.(audit("ExpenseUpdated", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function archiveExpense(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = { ...existing, status: "archived", archivedAt: now().toISOString(), updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.archive(id, record);
    await auditRepository?.save?.(audit("ExpenseArchived", record, now)).catch(() => {});
    return { ok: true, record };
  }
  async function restoreExpense(id) {
    const existing = await repository.getById(id);
    if (!existing || existing.ownerId !== await ownerId()) return missing();
    const record = { ...existing, status: "active", archivedAt: "", updatedAt: now().toISOString(), version: Number(existing.version || 0) + 1 };
    await repository.restore(id, record);
    await auditRepository?.save?.(audit("ExpenseRestored", record, now)).catch(() => {});
    return { ok: true, record };
  }
  return { listExpenses, getExpense: repository.getById, createExpense, updateExpense, archiveExpense, restoreExpense };
}

function missing() { return { ok: false, errors: [{ code: "ATLAS_EXPENSE_NOT_FOUND", field: "id", message: "Expense not found", rule: "owner-isolation", valueCategory: "identifier" }] }; }
function audit(eventType, record, now) {
  return { auditId: `${eventType}-${record.id}-${now().getTime()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Expense", entityId: record.id, ownerId: record.ownerId, result: "ok" } };
}
