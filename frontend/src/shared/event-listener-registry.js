export function createEventListenerRegistry() {
  const listeners = new Set();

  return {
    add(target, eventName, handler, options) {
      if (!target?.addEventListener) return () => {};
      target.addEventListener(eventName, handler, options);
      const dispose = () => {
        target.removeEventListener(eventName, handler, options);
        listeners.delete(dispose);
      };
      listeners.add(dispose);
      return dispose;
    },
    dispose() {
      [...listeners].forEach((dispose) => dispose());
      listeners.clear();
    },
    size() {
      return listeners.size;
    },
  };
}
