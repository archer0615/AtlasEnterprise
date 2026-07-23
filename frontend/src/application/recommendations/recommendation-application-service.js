import { normalizeRecommendation, validateRecommendation } from "../../domain/recommendation/recommendation-validation.js";

export function createRecommendationApplicationService({ repository, ownerProvider, auditRepository, now = () => new Date(), createId } = {}) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }

  async function audit(eventType, record) {
    await auditRepository?.save?.({ eventType, ownerId: record.ownerId, entityType: "Recommendation", entityId: record.id, occurredAt: now().toISOString() });
  }

  return Object.freeze({
    async createRecommendation(input) {
      const record = normalizeRecommendation({ ...input, ownerId: await ownerId() }, { now, createId });
      const errors = validateRecommendation(record);
      if (errors.length) return { ok: false, errors };
      await repository.create(record);
      await audit("Recommendation Created", record);
      return { ok: true, record };
    },
    async reviewRecommendation(id, status) {
      const existing = await repository.getById(id);
      const record = normalizeRecommendation({ ...existing, status }, { now, createId: () => id });
      const errors = validateRecommendation(record, { existing, operation: "update" });
      if (errors.length) return { ok: false, errors };
      await repository.update(record);
      await audit("Recommendation Reviewed", record);
      return { ok: true, record };
    },
    async archiveRecommendation(id) {
      const existing = await repository.getById(id);
      const record = normalizeRecommendation({ ...existing, status: "archived", archivedAt: now().toISOString() }, { now, createId: () => id });
      await repository.archive(id, record);
      await audit("Recommendation Archived", record);
      return { ok: true, record };
    },
    async restoreRecommendation(id) {
      const existing = await repository.getById(id);
      const record = normalizeRecommendation({ ...existing, status: "pending-review", archivedAt: "" }, { now, createId: () => id });
      await repository.restore(id, record);
      return { ok: true, record };
    },
    async listRecommendations(query = {}) {
      return repository.listByOwner(await ownerId(), query);
    },
  });
}
