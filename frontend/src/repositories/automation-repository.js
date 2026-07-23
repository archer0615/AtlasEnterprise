export const automationRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(automationRule)",
  update: "update(automationRule)",
  archive: "archive(id, automationRule)",
});
