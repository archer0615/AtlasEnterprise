export const liabilityContract = Object.freeze({
  entity: "Liability",
  fields: ["id", "ownerId", "name", "liabilityType", "currency", "outstandingBalance", "asOfDate", "status", "description", "createdAt", "updatedAt", "archivedAt", "version"],
  commands: ["CreateLiability", "UpdateLiability", "ArchiveLiability", "RestoreLiability", "ActivateLiability", "DeactivateLiability"],
  events: ["LiabilityCreated", "LiabilityUpdated", "LiabilityArchived", "LiabilityRestored", "LiabilityStatusChanged"],
});
