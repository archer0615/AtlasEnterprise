import { validateCalendarEntry } from "../../domain/notification/notification-validation.js";
import { buildBusinessCalendar } from "../../runtime/business-calendar-runtime.js";

export function createCalendarApplicationService({ repository, auditRepository, now = () => new Date(), createId } = {}) {
  return Object.freeze({
    async rebuildCalendar(input) {
      const records = buildBusinessCalendar(input, { now, createId });
      const errors = records.flatMap((record) => validateCalendarEntry(record));
      if (errors.length) return { ok: false, errors };
      for (const record of records) await repository.create(record);
      await auditRepository?.save?.({ eventType: "Calendar Updated", ownerId: input.ownerId, entityType: "BusinessCalendar", entityId: "calendar", occurredAt: now().toISOString() });
      return { ok: true, records };
    },
  });
}
