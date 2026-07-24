export function createApplicationLifecycle({ initialize, hydrate, persist, restore, dispose }) {
  let status = "created";

  return {
    async initialize() {
      if (status !== "created" && status !== "disposed") return false;
      status = "initializing";
      await initialize();
      await hydrate?.();
      status = "running";
      return true;
    },
    async suspend() {
      if (status !== "running") return false;
      await persist?.();
      status = "suspended";
      return true;
    },
    async resume() {
      if (status !== "suspended") return false;
      await hydrate?.();
      status = "running";
      return true;
    },
    async restore(snapshot) {
      if (status === "disposed") return false;
      await restore?.(snapshot);
      status = "ready";
      return true;
    },
    async reload(snapshot) {
      await this.shutdown();
      status = "created";
      await restore?.(snapshot);
      return this.initialize();
    },
    async shutdown() {
      if (status === "disposed") return false;
      await persist?.();
      dispose?.();
      status = "disposed";
      return true;
    },
    dispose() {
      if (status === "disposed" || status === "created") return false;
      dispose?.();
      status = "disposed";
      return true;
    },
    isInitialized() {
      return status === "running" || status === "suspended" || status === "ready";
    },
    getStatus() {
      return status;
    },
  };
}
