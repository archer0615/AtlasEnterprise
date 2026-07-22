export const assetContract = Object.freeze({
  entity: "Asset",
  fields: ["id", "ownerId", "name", "assetType", "currency", "currentValue", "valuationDate", "status", "description", "createdAt", "updatedAt", "archivedAt", "version"],
  commands: ["CreateAsset", "UpdateAsset", "ArchiveAsset", "RestoreAsset", "ActivateAsset", "DeactivateAsset"],
  events: ["AssetCreated", "AssetUpdated", "AssetArchived", "AssetRestored", "AssetStatusChanged"],
});
