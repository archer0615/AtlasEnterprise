import { transitionGoal } from "../../domain/goal/goal-lifecycle.js";
import { normalizeGoal, validateGoal, validateGoalDependency } from "../../domain/goal/goal-validation.js";

export function createGoalApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId = () => `goal-${now().getTime()}` }) {
  async function ownerId() { return (await ownerProvider.getCurrentOwner()).ownerId; }
  async function listGoals(query = {}) { return repository.listByOwner(await ownerId(), query); }
  async function getGoal(id) {
    const record = await repository.getById(id);
    return record?.ownerId === await ownerId() ? record : null;
  }
  async function createGoal(input) {
    const record = normalizeGoal({ ...input, ownerId: await ownerId() }, { now, createId });
    const errors = await collectErrors(record);
    if (errors.length) return { ok: false, errors };
    if (await repository.existsByOwnerAndName(record.ownerId, record.name)) return { ok: false, errors: [error("ATLAS_GOAL_ALREADY_EXISTS", "name", "Goal name already exists", "unique-owner-name")] };
    await repository.create(record);
    await writeAudit("GoalCreated", record);
    return { ok: true, record };
  }
  async function updateGoal(id, input) {
    const existing = await getGoal(id);
    if (!existing) return missing();
    const record = normalizeGoal({ ...existing, ...input, id, ownerId: existing.ownerId, createdAt: existing.createdAt, version: existing.version }, { now, createId });
    const errors = await collectErrors(record, { existing, operation: "update" });
    if (errors.length) return { ok: false, errors };
    await repository.update(record);
    await writeAudit("GoalUpdated", record, existing);
    return { ok: true, record };
  }
  async function changeStatus(id, targetStatus, eventType) {
    const existing = await getGoal(id);
    if (!existing) return missing();
    const transition = transitionGoal(existing, targetStatus, { now });
    if (!transition.ok) return transition;
    await repository.update(transition.record);
    await writeAudit(eventType, transition.record, existing);
    return { ok: true, record: transition.record };
  }
  async function archiveGoal(id) { return changeStatus(id, "archived", "GoalArchived"); }
  async function restoreGoal(id) {
    const existing = await getGoal(id);
    if (!existing) return missing();
    const target = existing.status === "archived" ? "active" : existing.status;
    return changeStatus(id, target, "GoalRestored");
  }
  async function activateGoal(id) { return changeStatus(id, "active", "GoalActivated"); }
  async function deactivateGoal(id) { return changeStatus(id, "inactive", "GoalDeactivated"); }
  async function completeGoal(id) { return changeStatus(id, "completed", "GoalCompleted"); }
  async function cancelGoal(id) { return changeStatus(id, "cancelled", "GoalCancelled"); }

  async function collectErrors(record, options = {}) {
    const parent = record.parentGoalId ? await repository.getById(record.parentGoalId) : null;
    const ancestors = await collectAncestors(parent);
    return [...validateGoal(record, options), ...validateGoalDependency(record, parent, ancestors)];
  }
  async function collectAncestors(parent) {
    const ids = [];
    let cursor = parent;
    while (cursor?.parentGoalId && ids.length < 100) {
      ids.push(cursor.id);
      cursor = await repository.getById(cursor.parentGoalId);
    }
    return ids;
  }
  async function writeAudit(eventType, record, previous = null) {
    await auditRepository?.save?.({
      auditId: `${eventType}-${record.id}-${now().getTime()}`,
      action: eventType,
      recordedAt: now().toISOString(),
      schema: "atlas-enterprise.audit-entry.v1",
      detail: {
        eventId: `${eventType}-${record.id}`,
        eventType,
        aggregateId: record.id,
        ownerId: record.ownerId,
        version: record.version,
        previousStatus: previous?.status || "",
        currentStatus: record.status,
      },
    }).catch(() => {});
  }
  return { listGoals, getGoal, createGoal, updateGoal, archiveGoal, restoreGoal, activateGoal, deactivateGoal, completeGoal, cancelGoal };
}

function missing() { return { ok: false, errors: [error("ATLAS_GOAL_NOT_FOUND", "id", "Goal not found", "owner-isolation")] }; }
function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
