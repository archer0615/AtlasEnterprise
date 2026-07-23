export const actionPlanRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(actionPlan)",
  update: "update(actionPlan)",
  archive: "archive(id, actionPlan)",
  restore: "restore(id, actionPlan)",
  listByExecutionPlan: "listByExecutionPlan(ownerId, executionPlanId)",
});
