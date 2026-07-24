const storeLifecycle = Object.freeze(["created", "initialized", "hydrated", "ready", "updated", "persisted", "restored", "reset", "disposed", "shutdown"]);

export function createStateStore({ id, classification, initialState = {}, version = 1, persistence = "memory", ttlMs = 0, eventBus = null, validate = defaultValidate } = {}) {
  if (!id || !classification) throw new Error("Store id and classification are required");
  let state = freezeState({ ...initialState, version });
  let status = "created";
  let expiresAt = ttlMs ? Date.now() + ttlMs : 0;
  const subscribers = new Set();
  const snapshots = [];

  function publish(eventType, payload = {}) {
    eventBus?.publish?.(eventType, { storeId: id, classification, status, ...payload });
  }

  function setState(nextState, eventType = "StateChanged") {
    state = freezeState({ ...nextState, version });
    snapshots.push(state);
    status = "updated";
    subscribers.forEach((handler) => handler(state));
    publish(eventType, { version });
    return state;
  }

  return Object.freeze({
    id,
    classification,
    persistence,
    version,
    initialize() {
      status = "initialized";
      publish("StoreInitialized");
      return true;
    },
    hydrate(snapshot = null) {
      if (snapshot) state = freezeState({ ...snapshot, version });
      status = "hydrated";
      publish("HydrateCompleted");
      return state;
    },
    ready() {
      status = "ready";
      publish("StoreReady");
      return true;
    },
    update(reducer, action = {}) {
      if (typeof reducer !== "function") throw new Error(`Store ${id} update requires reducer`);
      const nextState = reducer(state, Object.freeze({ ...action }));
      const errors = validate(nextState);
      if (errors.length) throw new Error(`Invalid state for ${id}: ${errors.map((item) => item.code).join(",")}`);
      expiresAt = ttlMs ? Date.now() + ttlMs : 0;
      return setState(nextState);
    },
    select(selector = (value) => value) {
      if (expiresAt && Date.now() > expiresAt) publish("CacheExpired", { expiresAt });
      return selector(state);
    },
    subscribe(handler) {
      subscribers.add(handler);
      return () => subscribers.delete(handler);
    },
    persist() {
      status = "persisted";
      publish("PersistCompleted", { persistence });
      return this.snapshot();
    },
    backup() {
      const backup = Object.freeze({ id, classification, version, state: this.snapshot(), backedUpAt: new Date().toISOString() });
      publish("BackupCompleted", { version });
      return backup;
    },
    restore(backup) {
      const incoming = backup?.state || backup;
      const incomingVersion = Number(incoming?.version || backup?.version || version);
      if (incomingVersion > version) throw new Error(`Unsupported store version for ${id}`);
      const nextState = freezeState({ ...(incoming || initialState), version });
      const errors = validate(nextState);
      if (errors.length) throw new Error(`Invalid restored state for ${id}: ${errors.map((item) => item.code).join(",")}`);
      state = nextState;
      status = "restored";
      publish("RestoreCompleted", { version });
      return state;
    },
    reset() {
      state = freezeState({ ...initialState, version });
      status = "reset";
      publish("ResetCompleted");
      return state;
    },
    validate() {
      return validate(state);
    },
    invalidateCache() {
      expiresAt = 0;
      publish("CacheInvalidated");
    },
    snapshot() {
      return freezeState({ ...state });
    },
    lifecycleStatus() {
      return status;
    },
    lifecycle() {
      return storeLifecycle;
    },
    dispose() {
      subscribers.clear();
      status = "disposed";
      publish("DisposeCompleted");
    },
    shutdown() {
      this.dispose();
      status = "shutdown";
      publish("ShutdownCompleted");
    },
  });
}

export function createStateTree({ stores, eventBus }) {
  return Object.freeze({
    initialize() {
      stores.list().forEach(({ id }) => {
        const store = stores.resolve(id);
        store.initialize();
        store.hydrate();
        store.ready();
      });
      eventBus?.publish?.("StateTreeReady", { storeCount: stores.list().length });
      return true;
    },
    snapshot() {
      return Object.freeze(Object.fromEntries(stores.list().map(({ id }) => [id, stores.resolve(id).snapshot()])));
    },
    backup() {
      const backup = Object.freeze({ schema: "atlas-enterprise.frontend-state-backup.v1", stores: Object.freeze(Object.fromEntries(stores.list().map(({ id }) => [id, stores.resolve(id).backup()]))) });
      eventBus?.publish?.("StateTreeBackupCompleted", { storeCount: stores.list().length });
      return backup;
    },
    restore(backup = {}) {
      for (const { id } of stores.list()) stores.resolve(id).restore(backup.stores?.[id]);
      eventBus?.publish?.("StateTreeRestoreCompleted", { storeCount: stores.list().length });
      return this.snapshot();
    },
    reset() {
      stores.list().forEach(({ id }) => stores.resolve(id).reset());
      eventBus?.publish?.("StateTreeResetCompleted", { storeCount: stores.list().length });
      return this.snapshot();
    },
    validate() {
      return stores.list().flatMap(({ id }) => stores.resolve(id).validate().map((error) => ({ storeId: id, ...error })));
    },
    dispose() {
      stores.list().forEach(({ id }) => stores.resolve(id).dispose());
      eventBus?.publish?.("StateTreeDisposeCompleted", { storeCount: stores.list().length });
    },
  });
}

function defaultValidate(state) {
  if (!state || typeof state !== "object") return [{ code: "ATLAS_STORE_STATE_INVALID", field: "state", message: "Store state must be an object", rule: "state-integrity", valueCategory: "runtime-state" }];
  if (!Number.isFinite(Number(state.version))) return [{ code: "ATLAS_STORE_VERSION_INVALID", field: "version", message: "Store state version is required", rule: "state-version", valueCategory: "runtime-state" }];
  return [];
}

function freezeState(value) {
  return Object.freeze({ ...value });
}
