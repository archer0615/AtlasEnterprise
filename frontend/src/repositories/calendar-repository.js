export const calendarRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(calendarEntry)",
  update: "update(calendarEntry)",
  archive: "archive(id, calendarEntry)",
});
