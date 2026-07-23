export const notificationContract = Object.freeze({
  schema: "atlas-enterprise.notification-contract.v1",
  key: "id",
  ownerField: "ownerId",
  aggregateBoundaries: Object.freeze(["Notification", "Automation", "BusinessCalendar", "Scheduler"]),
  stores: Object.freeze(["notifications", "calendarEntries", "automationRules", "schedulerState"]),
  runtimeBoundary: Object.freeze(["local-first", "offline-first", "static-first", "immutable", "pure", "no-email", "no-push-service", "no-cloud"]),
});
