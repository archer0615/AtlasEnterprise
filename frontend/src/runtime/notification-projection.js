export function projectNotificationSummary(input = {}) {
  const notifications = Array.isArray(input.notifications) ? input.notifications : [];
  return Object.freeze({
    totalNotifications: notifications.filter((item) => item.status !== "archived").length,
    unreadNotifications: notifications.filter((item) => item.status !== "archived" && item.readState === "unread").length,
    automationAlerts: notifications.filter((item) => item.type === "automation" && item.status !== "archived").length,
  });
}
