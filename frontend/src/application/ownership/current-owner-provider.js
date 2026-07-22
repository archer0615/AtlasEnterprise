export function createCurrentOwnerProvider(settingsRepository = null) {
  return {
    async getCurrentOwner() {
      const stored = await settingsRepository?.get?.("atlas.currentOwnerId").catch(() => "");
      return { ownerId: stored || "default-user", source: stored ? "settings" : "default-profile" };
    },
  };
}
