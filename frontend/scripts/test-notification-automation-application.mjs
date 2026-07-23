import { strict as assert } from "node:assert";
import { createAutomationApplicationService } from "../src/application/automation/automation-application-service.js";
import { createCalendarApplicationService } from "../src/application/calendar/calendar-application-service.js";
import { createNotificationApplicationService } from "../src/application/notifications/notification-application-service.js";
import { createSchedulerApplicationService } from "../src/application/scheduler/scheduler-application-service.js";
import { normalizeAutomationRule } from "../src/domain/notification/notification-validation.js";

function memoryRepository(seed = []) {
  const records = new Map(seed.map((record) => [record.id, record]));
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId, query = {}) { return [...records.values()].filter((record) => record.ownerId === ownerId && (query.includeArchived || record.status !== "archived")); },
    async create(record) { records.set(record.id, record); },
    async update(record) { records.set(record.id, record); },
    async archive(id, record) { records.set(id, record); },
    async markRead(id, record) { records.set(id, record); },
    async markUnread(id, record) { records.set(id, record); },
    async saveState(record) { records.set(record.id, record); },
  };
}

const auditEntries = [];
const auditRepository = { save: async (entry) => auditEntries.push(entry) };
const ownerProvider = { getCurrentOwner: async () => ({ ownerId: "owner-1" }) };
const clock = { now: () => new Date("2026-07-23T00:00:00.000Z") };
let id = 0;
const ids = { createId: () => `local-id-${id += 1}` };

const notificationRepository = memoryRepository();
const notificationService = createNotificationApplicationService({ repository: notificationRepository, ownerProvider, auditRepository, ...clock, ...ids });
const created = await notificationService.createNotification({ type: "goal", title: "Review goal", sourceType: "Goal", sourceId: "goal-1", priority: "high" });
assert.equal(created.ok, true);
assert.equal((await notificationService.markRead(created.record.id)).ok, true);
assert.equal((await notificationService.markUnread(created.record.id)).ok, true);
assert.equal((await notificationService.archiveNotification(created.record.id)).ok, true);

const calendarRepository = memoryRepository();
const calendarService = createCalendarApplicationService({ repository: calendarRepository, auditRepository, ...clock, ...ids });
const calendar = await calendarService.rebuildCalendar({ ownerId: "owner-1", goals: [{ id: "goal-1", ownerId: "owner-1", name: "Goal", targetDate: "2026-07-23", status: "active" }] });
assert.equal(calendar.ok, true);
assert.equal(calendar.records.length, 1);

const rule = normalizeAutomationRule({ id: "rule-1", ownerId: "owner-1", title: "Cashflow alert", type: "threshold-alert", condition: { fact: "netCashFlow", operator: "lt", value: 0 } }, clock);
const automationService = createAutomationApplicationService({ repository: memoryRepository([rule]), auditRepository, ...clock });
const automation = await automationService.evaluate("owner-1", { netCashFlow: -1 });
assert.equal(automation.ok, true);
assert.equal(automation.results[0].matched, true);

const schedulerService = createSchedulerApplicationService({ repository: memoryRepository(), auditRepository, ...clock, ...ids });
const scheduler = await schedulerService.evaluate({ ownerId: "owner-1", asOfDate: "2026-07-23", calendarEntries: calendar.records, automationResults: automation.results });
assert.equal(scheduler.ok, true);
assert.equal(scheduler.notifications.length, 2);
assert.equal(auditEntries.length, 6);

console.log("Notification automation application tests passed.");
