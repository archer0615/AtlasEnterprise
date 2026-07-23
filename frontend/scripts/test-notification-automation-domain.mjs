import { strict as assert } from "node:assert";
import { normalizeAutomationRule, normalizeCalendarEntry, normalizeNotification, normalizeSchedulerState, validateAutomationRule, validateCalendarEntry, validateNotification, validateSchedulerState } from "../src/domain/notification/notification-validation.js";
import { evaluateAutomationRules } from "../src/runtime/automation-runtime.js";
import { buildBusinessCalendar } from "../src/runtime/business-calendar-runtime.js";
import { evaluateScheduler } from "../src/runtime/scheduler-runtime.js";
import { projectAutomationSummary } from "../src/runtime/automation-projection.js";
import { projectCalendarSummary } from "../src/runtime/calendar-projection.js";
import { projectNotificationSummary } from "../src/runtime/notification-projection.js";
import { projectSchedulerSummary } from "../src/runtime/scheduler-projection.js";

const context = { now: () => new Date("2026-07-23T00:00:00.000Z"), createId: () => "id-1" };
const notification = normalizeNotification({ ownerId: "owner-1", type: "goal", title: "Review emergency fund", sourceType: "Goal", sourceId: "goal-1", priority: "high" }, context);
assert.equal(validateNotification(notification).length, 0);
assert.equal(validateNotification({ ...notification, ownerId: "" })[0].code, "ATLAS_NOTIFICATION_OWNER_REQUIRED");
assert.equal(validateNotification({ ...notification, type: "email" })[0].code, "ATLAS_NOTIFICATION_TYPE_INVALID");
assert.equal(validateNotification({ ...notification, readState: "seen" })[0].code, "ATLAS_NOTIFICATION_READ_STATE_INVALID");

const calendar = buildBusinessCalendar({
  goals: [{ id: "goal-1", ownerId: "owner-1", name: "Emergency Fund", targetDate: "2026-07-23", priority: "high", status: "active" }],
  decisions: [{ id: "decision-1", ownerId: "owner-1", title: "Review allocation", reviewDate: "2026-07-24", priority: "medium" }],
  executionPlans: [{ id: "execution-1", ownerId: "owner-1", targetDate: "2026-07-25", status: "planned" }],
}, context);
assert.equal(calendar.length, 3);
assert.equal(validateCalendarEntry(calendar[0]).length, 0);
assert.equal(validateCalendarEntry(normalizeCalendarEntry({ ownerId: "owner-1", title: "", dueDate: "bad" }, context)).length, 2);

const rule = normalizeAutomationRule({ ownerId: "owner-1", title: "Negative cashflow alert", type: "threshold-alert", condition: { fact: "netCashFlow", operator: "lt", value: 0, priority: "critical" } }, context);
assert.equal(validateAutomationRule(rule).length, 0);
assert.equal(validateAutomationRule({ ...rule, type: "auto-decision" })[0].code, "ATLAS_AUTOMATION_TYPE_INVALID");
const automationResults = evaluateAutomationRules({ rules: [rule], facts: { netCashFlow: -1000 } });
assert.equal(automationResults[0].matched, true);

const scheduled = evaluateScheduler({ ownerId: "owner-1", asOfDate: "2026-07-23", calendarEntries: calendar, automationResults }, context);
assert.equal(scheduled.dueItems.length, 1);
assert.equal(scheduled.notifications.length, 2);
assert.equal(validateSchedulerState(scheduled.schedulerState).length, 0);
assert.equal(validateSchedulerState(normalizeSchedulerState({ ownerId: "", evaluatedAt: "bad" }, context)).length, 2);

assert.equal(projectNotificationSummary({ notifications: scheduled.notifications }).unreadNotifications, 2);
assert.equal(projectCalendarSummary({ calendarEntries: calendar, asOfDate: "2026-07-23" }).upcomingGoals, 1);
assert.equal(projectSchedulerSummary({ schedulerState: scheduled.schedulerState }).generatedNotifications, 2);
assert.equal(projectAutomationSummary({ rules: [rule], results: automationResults }).automationAlerts, 1);

console.log("Notification automation domain tests passed.");
