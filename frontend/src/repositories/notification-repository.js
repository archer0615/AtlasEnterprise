export const notificationRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(notification)",
  update: "update(notification)",
  archive: "archive(id, notification)",
  restore: "restore(id, notification)",
  search: "search(ownerId, query)",
  filter: "filter(ownerId, criteria)",
  sort: "sort(ownerId, sort)",
  markRead: "markRead(id, notification)",
  markUnread: "markUnread(id, notification)",
});
