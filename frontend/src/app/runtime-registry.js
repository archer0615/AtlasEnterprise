export function createRuntimeRegistry(kind) {
  const entries = new Map();
  return Object.freeze({
    kind,
    register(id, factory, metadata = {}) {
      if (!id || entries.has(id)) throw new Error(`Duplicate ${kind} registration: ${id}`);
      entries.set(id, Object.freeze({ id, factory, metadata: Object.freeze({ ...metadata }), instance: null }));
      return id;
    },
    resolve(id, context = {}) {
      const entry = entries.get(id);
      if (!entry) throw new Error(`Unknown ${kind} registration: ${id}`);
      if (!entry.instance) entries.set(id, Object.freeze({ ...entry, instance: entry.factory(context) }));
      return entries.get(id).instance;
    },
    list() {
      return Object.freeze([...entries.values()].map(({ id, metadata }) => Object.freeze({ id, metadata })));
    },
    hydrate(context = {}) {
      return Promise.all([...entries.keys()].map((id) => this.resolve(id, context)?.hydrate?.()));
    },
    persist() {
      return Promise.all([...entries.values()].map((entry) => entry.instance?.persist?.()).filter(Boolean));
    },
    restore(snapshot) {
      return Promise.all([...entries.values()].map((entry) => entry.instance?.restore?.(snapshot)).filter(Boolean));
    },
    dispose() {
      for (const entry of [...entries.values()].reverse()) entry.instance?.dispose?.();
      entries.clear();
    },
  });
}
