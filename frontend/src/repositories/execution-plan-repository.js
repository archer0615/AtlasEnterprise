export const executionPlanRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(executionPlan)",
  update: "update(executionPlan)",
  archive: "archive(id, executionPlan)",
  restore: "restore(id, executionPlan)",
  listByRecommendation: "listByRecommendation(ownerId, recommendationId)",
});
