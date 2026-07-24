import { createUserFacingError, redactSensitiveData } from "../security-boundary.js";

export function createApplicationErrorBoundary({ logger = console } = {}) {
  const errors = [];
  return Object.freeze({
    capture(error, boundary = "Application") {
      const entry = createUserFacingError(error, boundary);
      errors.push(entry);
      logger.error?.(`[${boundary}]`, redactSensitiveData({
        name: error?.name,
        code: error?.code,
        message: error?.message || String(error),
      }));
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
