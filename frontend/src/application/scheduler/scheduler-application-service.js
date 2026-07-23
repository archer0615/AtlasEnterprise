import { validateSchedulerState } from "../../domain/notification/notification-validation.js";
import { evaluateScheduler } from "../../runtime/scheduler-runtime.js";

export function createSchedulerApplicationService({ repository, auditRepository, now = () => new Date(), createId } = {}) {
  return Object.freeze({
    async evaluate(input) {
      const result = evaluateScheduler(input, { now, createId });
      const errors = validateSchedulerState(result.schedulerState);
      if (errors.length) return { ok: false, errors };
      await repository.saveState(result.schedulerState);
      await auditRepository?.save?.({ eventType: "Scheduler Evaluated", ownerId: input.ownerId, entityType: "Scheduler", entityId: result.schedulerState.id, occurredAt: now().toISOString() });
      return { ok: true, ...result };
    },
  });
}
