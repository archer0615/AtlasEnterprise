import { automationTypes, calendarEntryTypes, notificationPriorities, notificationStatuses, notificationTypes, schedulerTypes } from "./notification-status.js";

export function normalizeNotification(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `notification-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    type: input.type || "scheduler",
    title: String(input.title || "").trim(),
    summary: String(input.summary || ""),
    sourceType: input.sourceType || "",
    sourceId: input.sourceId || "",
    priority: input.priority || "medium",
    status: input.status || "new",
    readState: input.readState || "unread",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    archivedAt: input.archivedAt || "",
    version: Number(input.version || 0) + 1,
  });
}

export function validateNotification(record = {}, options = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_NOTIFICATION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!notificationTypes.includes(record.type)) errors.push(error("ATLAS_NOTIFICATION_TYPE_INVALID", "type", "Notification type is invalid", "type-enum"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_NOTIFICATION_TITLE_REQUIRED", "title", "Title is required", "title-required"));
  if (!notificationPriorities.includes(record.priority)) errors.push(error("ATLAS_NOTIFICATION_PRIORITY_INVALID", "priority", "Priority is invalid", "priority-enum"));
  if (!notificationStatuses.includes(record.status)) errors.push(error("ATLAS_NOTIFICATION_STATUS_INVALID", "status", "Status is invalid", "status-enum"));
  if (!["read", "unread"].includes(record.readState)) errors.push(error("ATLAS_NOTIFICATION_READ_STATE_INVALID", "readState", "Read state is invalid", "read-state"));
  if (!isValidDate(record.createdAt)) errors.push(error("ATLAS_NOTIFICATION_CREATED_AT_INVALID", "createdAt", "Created date is invalid", "valid-date"));
  if (record.archivedAt && record.status !== "archived") errors.push(error("ATLAS_NOTIFICATION_ARCHIVE_STATE_INVALID", "archivedAt", "Archived date requires archived status", "archive-state"));
  if (options.existing?.status === "archived" && options.operation === "update") errors.push(error("ATLAS_NOTIFICATION_ARCHIVED_UPDATE_REJECTED", "status", "Archived notification cannot be updated", "lifecycle"));
  return errors;
}

export function normalizeCalendarEntry(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `calendar-entry-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    type: input.type || "recommendation-review",
    sourceType: input.sourceType || "",
    sourceId: input.sourceId || "",
    title: String(input.title || "").trim(),
    dueDate: input.dueDate || timestamp.slice(0, 10),
    priority: input.priority || "medium",
    status: input.status || "scheduled",
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    version: Number(input.version || 0) + 1,
  });
}

export function validateCalendarEntry(record = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_CALENDAR_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!calendarEntryTypes.includes(record.type)) errors.push(error("ATLAS_CALENDAR_TYPE_INVALID", "type", "Calendar type is invalid", "type-enum"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_CALENDAR_TITLE_REQUIRED", "title", "Title is required", "title-required"));
  if (!isValidDate(record.dueDate)) errors.push(error("ATLAS_CALENDAR_DUE_DATE_INVALID", "dueDate", "Due date is invalid", "valid-date"));
  if (!notificationPriorities.includes(record.priority)) errors.push(error("ATLAS_CALENDAR_PRIORITY_INVALID", "priority", "Priority is invalid", "priority-enum"));
  return errors;
}

export function normalizeAutomationRule(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || context.createId?.() || `automation-rule-${new Date(timestamp).getTime()}`,
    ownerId: input.ownerId,
    type: input.type || "review-reminder",
    title: String(input.title || "").trim(),
    condition: Object.freeze({ ...(input.condition || {}) }),
    result: input.result || "notification",
    enabled: input.enabled !== false,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    version: Number(input.version || 0) + 1,
  });
}

export function validateAutomationRule(record = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_AUTOMATION_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!automationTypes.includes(record.type)) errors.push(error("ATLAS_AUTOMATION_TYPE_INVALID", "type", "Automation type is invalid", "type-enum"));
  if (!String(record.title || "").trim()) errors.push(error("ATLAS_AUTOMATION_TITLE_REQUIRED", "title", "Title is required", "title-required"));
  if (!["notification", "review-item"].includes(record.result)) errors.push(error("ATLAS_AUTOMATION_RESULT_INVALID", "result", "Automation result is invalid", "result-enum"));
  return errors;
}

export function normalizeSchedulerState(input = {}, context = {}) {
  const timestamp = nowIso(context);
  return Object.freeze({
    id: input.id || "scheduler-state",
    ownerId: input.ownerId,
    type: input.type || "on-demand",
    evaluatedAt: input.evaluatedAt || timestamp,
    dueCount: Number(input.dueCount || 0),
    generatedNotificationCount: Number(input.generatedNotificationCount || 0),
    reviewQueueCount: Number(input.reviewQueueCount || 0),
  });
}

export function validateSchedulerState(record = {}) {
  const errors = [];
  if (!String(record.ownerId || "").trim()) errors.push(error("ATLAS_SCHEDULER_OWNER_REQUIRED", "ownerId", "Owner is required", "owner-required"));
  if (!schedulerTypes.includes(record.type)) errors.push(error("ATLAS_SCHEDULER_TYPE_INVALID", "type", "Scheduler type is invalid", "type-enum"));
  if (!isValidDate(record.evaluatedAt)) errors.push(error("ATLAS_SCHEDULER_EVALUATED_AT_INVALID", "evaluatedAt", "Evaluated date is invalid", "valid-date"));
  return errors;
}

function nowIso(context) {
  return (context.now?.() || new Date()).toISOString();
}

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(Date.parse(value));
}

function error(code, field, message, rule) {
  return { code, field, message, rule, valueCategory: "user-input" };
}
