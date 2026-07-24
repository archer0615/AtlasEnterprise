export const securityBoundarySchema = "atlas-enterprise.frontend-security-boundary.v1";

const sensitiveFieldPattern = /token|password|passphrase|secret|credential|authorization|apikey|api-key|privatekey|private-key/i;
const allowedLocalPermissionModes = Object.freeze(["local-user"]);

export function redactSensitiveData(value, depth = 0) {
  if (depth > 8) return "[REDACTED_DEPTH_LIMIT]";
  if (Array.isArray(value)) return value.map((item) => redactSensitiveData(item, depth + 1));
  if (value && typeof value === "object") {
    return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, fieldValue]) => [
      key,
      sensitiveFieldPattern.test(key) ? "[REDACTED]" : redactSensitiveData(fieldValue, depth + 1),
    ])));
  }
  if (typeof value === "string" && sensitiveFieldPattern.test(value)) return "[REDACTED]";
  return value;
}

export function createUserFacingError(error, boundary = "Application") {
  const code = typeof error?.code === "string" ? error.code : "ATLAS_FRONTEND_ERROR";
  return Object.freeze({
    schema: "atlas-enterprise.user-facing-error.v1",
    boundary,
    code,
    message: "操作無法完成，請檢查輸入或稍後再試。",
    occurredAt: new Date().toISOString(),
  });
}

export function sanitizeDownloadFilename(filename, fallback = "atlas-export.json") {
  const baseName = String(filename || fallback).split(/[\\/]/).pop() || fallback;
  const sanitized = baseName.replace(/[^\w.-]+/g, "-").replace(/^\.+/, "").slice(0, 120);
  return sanitized || fallback;
}

export function authorizeLocalRuntime(context = {}, requirement = {}) {
  const permissionMode = context.permission?.mode || "local-user";
  const sessionMode = context.session?.mode || "local";
  const sessionStatus = requirement.sessionStatus || "active";
  if (!allowedLocalPermissionModes.includes(permissionMode)) {
    return deny("unknown-permission-mode");
  }
  if (sessionMode !== "local") {
    return deny("unknown-session-mode");
  }
  if (["expired", "invalid", "signing-out"].includes(sessionStatus)) {
    return deny("session-not-active");
  }
  return Object.freeze({
    ok: true,
    schema: securityBoundarySchema,
    principal: "local-user",
    permissionMode,
    sessionMode,
  });
}

export function validateServiceWorkerMessage(message) {
  if (!message || typeof message !== "object" || typeof message.type !== "string") {
    return { ok: false, reason: "invalid-message-schema" };
  }
  if (!["ATLAS_SW_HEALTH", "ATLAS_SW_SKIP_WAITING"].includes(message.type)) {
    return { ok: false, reason: "unknown-service-worker-message" };
  }
  return { ok: true, type: message.type };
}

function deny(reason) {
  return Object.freeze({ ok: false, schema: securityBoundarySchema, reason });
}
