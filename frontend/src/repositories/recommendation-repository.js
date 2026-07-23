export const recommendationRepositoryContract = Object.freeze({
  getById: "getById(id)",
  listByOwner: "listByOwner(ownerId, query)",
  create: "create(recommendation)",
  update: "update(recommendation)",
  archive: "archive(id, recommendation)",
  restore: "restore(id, recommendation)",
  search: "search(ownerId, query)",
  filter: "filter(ownerId, criteria)",
  sort: "sort(ownerId, sort)",
});
