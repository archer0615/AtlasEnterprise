import { validateActionPlan } from "../../domain/recommendation/recommendation-validation.js";
import { createActionPlansFromExecutionPlan } from "../../runtime/action-plan-runtime.js";

export function createActionPlanApplicationService({ repository, auditRepository, now = () => new Date(), createId } = {}) {
  return Object.freeze({
    async createFromExecutionPlan(executionPlan) {
      const records = createActionPlansFromExecutionPlan(executionPlan, { now, createId });
      const errors = records.flatMap((record) => validateActionPlan(record));
      if (errors.length) return { ok: false, errors };
      for (const record of records) {
        await repository.create(record);
        await auditRepository?.save?.({ eventType: "Action Plan Created", ownerId: record.ownerId, entityType: "ActionPlan", entityId: record.id, occurredAt: now().toISOString() });
      }
      return { ok: true, records };
    },
  });
}
