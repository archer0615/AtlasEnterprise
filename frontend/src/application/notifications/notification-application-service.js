import { normalizeNotification, validateNotification } from "../../domain/notification/notification-validation.js";
import { markNotificationRead, markNotificationUnread } from "../../runtime/notification-runtime.js";

export function createNotificationApplicationService({ repository, ownerProvider, auditRepository, now = () => new Date(), createId } = {}) {
  async function ownerId() {
    return (await ownerProvider.getCurrentOwner()).ownerId;
  }
  async function audit(eventType, record) {
    await auditRepository?.save?.({ eventType, ownerId: record.ownerId, entityType: "Notification", entityId: record.id, occurredAt: now().toISOString() });
  }
  return Object.freeze({
    async createNotification(input) {
      const record = normalizeNotification({ ...input, ownerId: await ownerId() }, { now, createId });
      const errors = validateNotification(record);
      if (errors.length) return { ok: false, errors };
      await repository.create(record);
      await audit("Notification Created", record);
      return { ok: true, record };
    },
    async markRead(id) {
      const existing = await repository.getById(id);
      const record = markNotificationRead(existing, { now });
      await repository.markRead(id, record);
      await audit("Notification Read", record);
      return { ok: true, record };
    },
    async markUnread(id) {
      const existing = await repository.getById(id);
      const record = markNotificationUnread(existing, { now });
      await repository.markUnread(id, record);
      return { ok: true, record };
    },
    async archiveNotification(id) {
      const existing = await repository.getById(id);
      const record = normalizeNotification({ ...existing, status: "archived", archivedAt: now().toISOString() }, { now, createId: () => id });
      await repository.archive(id, record);
      await audit("Notification Archived", record);
      return { ok: true, record };
    },
    async listNotifications(query = {}) {
      return repository.listByOwner(await ownerId(), query);
    },
  });
}
