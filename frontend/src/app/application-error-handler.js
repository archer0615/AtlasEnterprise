const safeErrorCodes = new Set([
  "ATLAS_BOOTSTRAP_ERROR",
  "ATLAS_REQUIRED_ELEMENT_MISSING",
  "ATLAS_FEATURE_INITIALIZATION_ERROR",
  "ATLAS_RUNTIME_DATA_ERROR",
  "ATLAS_USER_INPUT_ERROR",
  "ATLAS_PERSISTENCE_ERROR",
  "ATLAS_EXPORT_ERROR",
  "ATLAS_RESTORE_ERROR",
]);

export function createApplicationError(code, message, detail = {}) {
  const error = new Error(message);
  error.code = safeErrorCodes.has(code) ? code : "ATLAS_BOOTSTRAP_ERROR";
  error.detail = detail;
  return error;
}

export function handleApplicationError(error, fallbackCode = "ATLAS_BOOTSTRAP_ERROR") {
  const code = safeErrorCodes.has(error?.code) ? error.code : fallbackCode;
  console.error(code, { message: error?.message || "Application error", detail: error?.detail || {} });
}
