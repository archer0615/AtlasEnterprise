import { normalizeDecision } from "../../domain/decision/decision-normalization.js";
import { transitionDecision } from "../../domain/decision/decision-state-machine.js";
import { validateDecision } from "../../domain/decision/decision-validation.js";
import { normalizeRecommendationDecision } from "../../domain/decision/recommendation-decision-contract.js";

export function createDecisionApplicationService({ repository, recommendationDecisionRepository = null, ownerProvider, auditRepository = null, now = () => new Date(), createId } = {}) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }
  async function audit(eventType, record, detail = {}) {
    await auditRepository?.save?.({ auditId: `${eventType}-${record.id || record.decisionId}-${now().getTime()}`, action: eventType, recordedAt: now().toISOString(), schema: "atlas-enterprise.audit-entry.v1", detail: { entityType: "Decision", entityId: record.id || record.decisionId, ownerId: record.ownerId, result: "ok", ...detail } });
  }
  async function loadOwned(id, owner) {
    const existing = await repository.getById?.(id) || (await repository.listByOwner?.(owner) || []).find((item) => item.id === id || item.decisionId === id);
    if (!existing || existing.ownerId !== owner) return null;
    return existing;
  }

  return Object.freeze({
    async createDecision(input) {
      const record = normalizeDecision({ ...input, ownerId: await ownerId() }, { now, createId });
      const errors = validateDecision(record, { persisted: true });
      if (errors.length) return { ok: false, errors };
      await (repository.create?.(record) || repository.save(record));
      await audit("DecisionCreated", record);
      return { ok: true, record };
    },
    async updateDecision(id, input) {
      const owner = await ownerId();
      const existing = await loadOwned(id, owner);
      if (!existing) return { ok: false, errors: [domainError("ATLAS_DECISION_SCENARIO_REQUIRED", "id", "Decision was not found for owner")] };
      const record = normalizeDecision({ ...existing, ...input, id: existing.id || existing.decisionId, ownerId: owner }, { now, createId: () => existing.id || existing.decisionId });
      const errors = validateDecision(record, { existing, operation: "update", persisted: true });
      if (errors.length) return { ok: false, errors };
      await (repository.update?.(record) || repository.save(record));
      await audit("DecisionUpdated", record);
      return { ok: true, record };
    },
    async transitionDecision(id, targetStatus, evidence = {}) {
      const owner = await ownerId();
      const existing = await loadOwned(id, owner);
      if (!existing) return { ok: false, errors: [domainError("ATLAS_DECISION_SCENARIO_REQUIRED", "id", "Decision was not found for owner")] };
      const transition = transitionDecision({ currentStatus: existing.status, targetStatus, trigger: evidence.trigger || "user-command", decision: existing, context: evidence });
      await audit(transition.allowed ? "DecisionTransitionSucceeded" : "DecisionTransitionFailed", existing, { previousStatus: existing.status, currentStatus: targetStatus, rule: transition.rule });
      if (!transition.allowed) return { ok: false, errors: [transition.error] };
      const record = normalizeDecision({ ...existing, ...evidence, status: transition.nextStatus, id: existing.id || existing.decisionId, ownerId: owner, archivedAt: targetStatus === "archived" ? now().toISOString() : existing.archivedAt }, { now, createId: () => existing.id || existing.decisionId });
      await (repository.update?.(record) || repository.save(record));
      return { ok: true, record, transition };
    },
    async recordRecommendationDecision(input) {
      const record = normalizeRecommendationDecision({ ...input, ownerId: await ownerId() }, { now, createId });
      await recommendationDecisionRepository?.save?.(record);
      await audit("RecommendationDecisionRecorded", record);
      return { ok: true, record };
    },
    async archiveDecision(id) {
      return this.transitionDecision(id, "archived", { trigger: "ArchiveDecision" });
    },
    async listDecisions(query = {}) {
      return repository.listByOwner?.(await ownerId(), query) || repository.list(query);
    },
  });
}

function domainError(code, field, message) {
  return { code, field, message, rule: "decision-command", valueCategory: "user-input" };
}
