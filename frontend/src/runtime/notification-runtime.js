import { normalizeNotification } from "../domain/notification/notification-validation.js";

export function generateNotifications(input = {}, context = {}) {
  const dueItems = Array.isArray(input.dueItems) ? input.dueItems : [];
  const automationResults = Array.isArray(input.automationResults) ? input.automationResults : [];
  return Object.freeze([
    ...dueItems.map((item) => normalizeNotification({
      ownerId: item.ownerId,
      type: item.notificationType || item.sourceType || "calendar",
      title: item.title,
      summary: item.summary || `Review ${item.title}`,
      sourceType: item.sourceType,
      sourceId: item.sourceId,
      priority: item.priority || "medium",
      status: "new",
      readState: "unread",
    }, context)),
    ...automationResults.filter((result) => result.matched).map((result) => normalizeNotification({
      ownerId: result.ownerId,
      type: "automation",
      title: result.title,
      summary: result.summary || "Automation rule generated a local review notification.",
      sourceType: "Automation",
      sourceId: result.ruleId,
      priority: result.priority || "medium",
      status: "new",
      readState: "unread",
    }, context)),
  ]);
}

export function markNotificationRead(notification = {}, context = {}) {
  return normalizeNotification({ ...notification, status: "read", readState: "read" }, { ...context, createId: () => notification.id });
}

export function markNotificationUnread(notification = {}, context = {}) {
  return normalizeNotification({ ...notification, status: "unread", readState: "unread" }, { ...context, createId: () => notification.id });
}
