import { normalizeScenario } from "../../domain/scenario/scenario-normalization.js";
import { transitionScenario } from "../../domain/scenario/scenario-status.js";
import { validateScenario } from "../../domain/scenario/scenario-validation.js";

export function createScenarioApplicationService({ repository, ownerProvider, auditRepository = null, now = () => new Date(), createId } = {}) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }

  async function audit(eventType, record, detail = {}) {
    await auditRepository?.save?.({ auditId: `${eventType}-${record.id}-${now().getTime()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Scenario", entityId: record.id, ownerId: record.ownerId, result: "ok", ...detail } });
  }

  async function loadOwned(id, owner) {
    const existing = await repository.getById?.(id) || (await repository.listByOwner?.(owner) || []).find((item) => item.id === id || item.scenarioId === id);
    if (!existing || existing.ownerId !== owner) return null;
    return existing;
  }

  return Object.freeze({
    async createScenario(input) {
      const record = normalizeScenario({ ...input, ownerId: await ownerId() }, { now, createId });
      const errors = validateScenario(record, { persisted: true });
      if (errors.length) return { ok: false, errors };
      await (repository.create?.(record) || repository.save(record));
      await audit("ScenarioCreated", record);
      return { ok: true, record };
    },
    async updateScenario(id, input) {
      const owner = await ownerId();
      const existing = await loadOwned(id, owner);
      if (!existing) return { ok: false, errors: [domainError("ATLAS_SCENARIO_BASE_INVALID", "id", "Scenario was not found for owner")] };
      const record = normalizeScenario({ ...existing, ...input, id: existing.id || existing.scenarioId, ownerId: owner }, { now, createId: () => existing.id || existing.scenarioId });
      const errors = validateScenario(record, { existing, operation: "update", persisted: true });
      if (errors.length) return { ok: false, errors };
      await (repository.update?.(record) || repository.save(record));
      await audit("ScenarioUpdated", record);
      return { ok: true, record };
    },
    async transitionScenario(id, targetStatus, trigger = "user-command") {
      const owner = await ownerId();
      const existing = await loadOwned(id, owner);
      if (!existing) return { ok: false, errors: [domainError("ATLAS_SCENARIO_BASE_INVALID", "id", "Scenario was not found for owner")] };
      const result = transitionScenario(existing, targetStatus, { now });
      if (!result.ok) return { ok: false, errors: [result.error] };
      await (repository.update?.(result.record) || repository.save(result.record));
      await audit("ScenarioStatusChanged", result.record, { previousStatus: existing.status, currentStatus: targetStatus, trigger });
      return { ok: true, record: result.record };
    },
    async archiveScenario(id) {
      return this.transitionScenario(id, "archived", "ArchiveScenario");
    },
    async restoreScenario(id) {
      return this.transitionScenario(id, "inactive", "RestoreScenario");
    },
    async activateScenario(id) {
      return this.transitionScenario(id, "active", "ActivateScenario");
    },
    async deactivateScenario(id) {
      return this.transitionScenario(id, "inactive", "DeactivateScenario");
    },
    async listScenarios(query = {}) {
      return repository.listByOwner?.(await ownerId(), query) || repository.list(query);
    },
  });
}

function domainError(code, field, message) {
  return { code, field, message, rule: "scenario-command", valueCategory: "user-input" };
}
