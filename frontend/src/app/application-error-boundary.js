export function createApplicationErrorBoundary({ logger = console } = {}) {
  const errors = [];
  return Object.freeze({
    capture(error, boundary = "Application") {
      const entry = Object.freeze({ boundary, message: error?.message || String(error), occurredAt: new Date().toISOString() });
      errors.push(entry);
      logger.error?.(`[${boundary}]`, error);
      return entry;
    },
    list() {
      return Object.freeze([...errors]);
    },
    dispose() {
      errors.length = 0;
    },
  });
}
