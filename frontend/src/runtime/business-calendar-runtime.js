import { normalizeCalendarEntry } from "../domain/notification/notification-validation.js";

export function buildBusinessCalendar(input = {}, context = {}) {
  const entries = [
    ...mapRecords(input.goals, "goal-target", "Goal", "targetDate"),
    ...mapRecords(input.decisions, "decision-review", "Decision", "reviewDate"),
    ...mapRecords(input.executionPlans, "execution-target", "ExecutionPlan", "targetDate"),
    ...mapRecords(input.actionPlans, "action-target", "ActionPlan", "targetDate"),
    ...mapRecords(input.recommendations, "recommendation-review", "Recommendation", "expiresAt", "recommendationDate"),
  ];
  return Object.freeze(entries.map((entry) => normalizeCalendarEntry(entry, context)).sort((a, b) => a.dueDate.localeCompare(b.dueDate)));
}

function mapRecords(records = [], type, sourceType, primaryDateField, fallbackDateField = "") {
  return (Array.isArray(records) ? records : []).filter((record) => record.status !== "archived").map((record) => ({
    ownerId: record.ownerId,
    type,
    sourceType,
    sourceId: record.id || record.decisionId,
    title: record.title || record.name || `${sourceType} review`,
    dueDate: record[primaryDateField] || record[fallbackDateField],
    priority: record.priority || "medium",
    status: "scheduled",
  })).filter((entry) => entry.dueDate);
}
