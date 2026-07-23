export function projectSchedulerSummary(input = {}) {
  const schedulerState = input.schedulerState || {};
  return Object.freeze({
    dueItems: Number(schedulerState.dueCount || 0),
    generatedNotifications: Number(schedulerState.generatedNotificationCount || 0),
    reviewQueueCount: Number(schedulerState.reviewQueueCount || 0),
    evaluatedAt: schedulerState.evaluatedAt || "",
  });
}
