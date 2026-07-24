export function createProviderTree(providers = {}) {
  const providerIds = Object.keys(providers);
  if (new Set(providerIds).size !== providerIds.length) throw new Error("Duplicate provider registration");
  return Object.freeze({
    providers: Object.freeze({ ...providers }),
    resolve(id) {
      if (!Object.prototype.hasOwnProperty.call(providers, id)) throw new Error(`Unknown provider: ${id}`);
      return providers[id];
    },
    dispose() {
      Object.values(providers).forEach((provider) => provider?.dispose?.());
    },
  });
}
