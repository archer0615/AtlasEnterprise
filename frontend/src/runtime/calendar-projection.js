export function projectCalendarSummary(input = {}) {
  const calendarEntries = Array.isArray(input.calendarEntries) ? input.calendarEntries : [];
  const asOfDate = input.asOfDate || new Date().toISOString().slice(0, 10);
  return Object.freeze({
    calendarEntryCount: calendarEntries.length,
    upcomingReviews: calendarEntries.filter((entry) => entry.dueDate >= asOfDate && ["decision-review", "recommendation-review"].includes(entry.type)).length,
    upcomingGoals: calendarEntries.filter((entry) => entry.dueDate >= asOfDate && entry.type === "goal-target").length,
    upcomingDecisions: calendarEntries.filter((entry) => entry.dueDate >= asOfDate && entry.type === "decision-review").length,
  });
}
