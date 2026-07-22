export function createApplicationLifecycle({ initialize, dispose }) {
  let initialized = false;

  return {
    async initialize() {
      if (initialized) return false;
      await initialize();
      initialized = true;
      return true;
    },
    dispose() {
      if (!initialized) return false;
      dispose?.();
      initialized = false;
      return true;
    },
    isInitialized() {
      return initialized;
    },
  };
}
