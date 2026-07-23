import { validateExecutionPlan } from "../../domain/recommendation/recommendation-validation.js";
import { createExecutionPlanFromRecommendation } from "../../runtime/execution-plan-runtime.js";

export function createExecutionPlanApplicationService({ repository, auditRepository, now = () => new Date(), createId } = {}) {
  return Object.freeze({
    async createFromRecommendation(recommendation, decision = {}) {
      const result = createExecutionPlanFromRecommendation(recommendation, decision, { now, createId });
      if (!result.ok) return result;
      const errors = validateExecutionPlan(result.record);
      if (errors.length) return { ok: false, errors };
      await repository.create(result.record);
      await auditRepository?.save?.({ eventType: "Execution Plan Created", ownerId: result.record.ownerId, entityType: "ExecutionPlan", entityId: result.record.id, occurredAt: now().toISOString() });
      return result;
    },
    async updateExecutionPlan(record) {
      const errors = validateExecutionPlan(record);
      if (errors.length) return { ok: false, errors };
      await repository.update(record);
      await auditRepository?.save?.({ eventType: "Execution Plan Updated", ownerId: record.ownerId, entityType: "ExecutionPlan", entityId: record.id, occurredAt: now().toISOString() });
      return { ok: true, record };
    },
  });
}
