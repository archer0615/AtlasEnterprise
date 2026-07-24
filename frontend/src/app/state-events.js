export function createStateEventBus() {
  const subscribers = new Map();
  const history = [];
  return Object.freeze({
    subscribe(eventType, handler) {
      if (!subscribers.has(eventType)) subscribers.set(eventType, new Set());
      subscribers.get(eventType).add(handler);
      return () => subscribers.get(eventType)?.delete(handler);
    },
    publish(eventType, payload = {}) {
      const event = Object.freeze({ eventType, payload: Object.freeze({ ...payload }), occurredAt: new Date().toISOString() });
      history.push(event);
      subscribers.get(eventType)?.forEach((handler) => handler(event));
      subscribers.get("*")?.forEach((handler) => handler(event));
      return event;
    },
    history() {
      return Object.freeze([...history]);
    },
    dispose() {
      subscribers.clear();
      history.length = 0;
    },
  });
}
