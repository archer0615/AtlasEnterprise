export const goalRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(goal)",
  update: "update(goal)",
  archive: "archive(id, metadata)",
  restore: "restore(id, metadata)",
  existsByOwnerAndName: "existsByOwnerAndName(ownerId, name, excludeId)",
  countByOwner: "countByOwner(ownerId)",
  listByStatus: "listByStatus(ownerId, status)",
  listByTargetDateRange: "listByTargetDateRange(ownerId, period)",
  listByParentGoal: "listByParentGoal(ownerId, parentGoalId)",
});
