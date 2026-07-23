import { normalizeSchedulerState } from "../domain/notification/notification-validation.js";
import { generateNotifications } from "./notification-runtime.js";

export function evaluateScheduler(input = {}, context = {}) {
  const asOfDate = input.asOfDate || (context.now?.() || new Date()).toISOString().slice(0, 10);
  const calendarEntries = Array.isArray(input.calendarEntries) ? input.calendarEntries : [];
  const automationResults = Array.isArray(input.automationResults) ? input.automationResults : [];
  const dueItems = calendarEntries.filter((entry) => entry.status !== "done" && entry.dueDate <= asOfDate);
  const notifications = generateNotifications({ dueItems, automationResults: automationResults.filter((result) => result.matched) }, context);
  return Object.freeze({
    dueItems: Object.freeze(dueItems),
    notifications,
    reviewQueue: Object.freeze([...dueItems, ...automationResults.filter((result) => result.matched)]),
    schedulerState: normalizeSchedulerState({
      ownerId: input.ownerId,
      type: "on-demand",
      dueCount: dueItems.length,
      generatedNotificationCount: notifications.length,
      reviewQueueCount: dueItems.length + automationResults.filter((result) => result.matched).length,
    }, context),
  });
}
