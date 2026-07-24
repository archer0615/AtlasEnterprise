export const validationContractSchema = "atlas-enterprise.frontend-validation-contract.v1";
export const validationErrorCode = "ATLAS_FRONTEND_ERROR";

const identifierPattern = /^[a-z][a-z0-9-]{1,80}$/i;
const supportedEnvironments = Object.freeze(["browser", "development", "test", "production", "preview"]);
const defaultPagination = Object.freeze({ page: 1, pageSize: 25, maxPageSize: 100 });

export function createValidationProfileRegistry() {
  const profiles = new Map();
  return Object.freeze({
    register(profile) {
      const normalized = normalizeValidationProfile(profile);
      if (profiles.has(normalized.profile)) {
        return validationFailure("validation-profile", "Duplicate validation profile", { profile: normalized.profile });
      }
      profiles.set(normalized.profile, normalized);
      return { ok: true, profile: normalized };
    },
    validateDependencies() {
      for (const profile of profiles.values()) {
        for (const dependency of profile.dependencies) {
          if (!profiles.has(dependency)) {
            return validationFailure("validation-profile", "Missing validation profile dependency", { profile: profile.profile, dependency });
          }
        }
        if (hasCircularDependency(profile.profile, profiles)) {
          return validationFailure("validation-profile", "Circular validation profile dependency", { profile: profile.profile });
        }
      }
      return { ok: true };
    },
    list() {
      return Object.freeze([...profiles.values()]);
    },
  });
}

export function createValidationProfileInventory() {
  return Object.freeze([
    profile("presentation.form", "Presentation", "Form input", "Validation result", "Existing UI interaction contract", "Form submit and field feedback"),
    profile("application.command", "Application", "Command DTO", "Command precondition result", "Existing application service contract", "Application services"),
    profile("application.query", "Application", "Query DTO", "Scoped query result", "Existing query contract", "Repository query adapters"),
    profile("runtime.configuration", "Runtime", "Runtime overrides", "Bootstrap validation result", "Runtime context contract", "Application bootstrap"),
    profile("persistence.record", "Persistence", "IndexedDB record", "Persistence integrity result", "IndexedDB runtime schema", "Repository adapters"),
    profile("backup.restore", "Restore", "Backup payload", "Restore validation result", "IndexedDB backup schema", "Backup repository"),
    profile("security.input", "Security", "Browser/runtime message", "Fail-closed validation result", "Frontend security boundary", "Security boundary and service worker"),
  ]);
}

export function validateIdentifier(value, options = {}) {
  const entityType = options.entityType || "record";
  const normalized = String(value ?? "").trim();
  if (!normalized) return validationFailure("identifier", "Identifier is required", { entityType });
  if (["__proto__", "constructor", "prototype"].includes(normalized)) {
    return validationFailure("identifier", "Identifier is reserved", { entityType });
  }
  if (!identifierPattern.test(normalized)) {
    return validationFailure("identifier", "Identifier format is invalid", { entityType });
  }
  if (options.prefix && !normalized.startsWith(`${options.prefix}-`)) {
    return validationFailure("identifier", "Identifier entity type is invalid", { entityType });
  }
  return { ok: true, value: normalized };
}

export function validateSearchText(value, options = {}) {
  const maxLength = Number(options.maxLength || 120);
  const normalized = String(value ?? "").trim();
  if (normalized.length > maxLength) return validationFailure("search", "Search text is too long", { maxLength });
  if (/[\u0000-\u001f\u007f]/.test(normalized)) return validationFailure("search", "Search text contains control characters");
  if (options.regex === true) return validationFailure("search", "Raw user regex is not supported");
  return { ok: true, value: normalized };
}

export function validateSort(input = {}, allowedFields = []) {
  const field = String(input.field || "").trim();
  const direction = String(input.direction || "asc").toLowerCase();
  if (!allowedFields.includes(field)) return validationFailure("sort", "Sort field is not allowed", { field });
  if (!["asc", "desc"].includes(direction)) return validationFailure("sort", "Sort direction is invalid", { direction });
  return { ok: true, value: Object.freeze({ field, direction }) };
}

export function validatePagination(input = {}) {
  const page = parseInteger(input.page ?? defaultPagination.page, "page");
  if (!page.ok) return page;
  const pageSize = parseInteger(input.pageSize ?? defaultPagination.pageSize, "pageSize");
  if (!pageSize.ok) return pageSize;
  const maxPageSize = Number(input.maxPageSize || defaultPagination.maxPageSize);
  if (page.value < 1) return validationFailure("pagination", "Page must be positive", { field: "page" });
  if (pageSize.value < 1 || pageSize.value > maxPageSize) {
    return validationFailure("pagination", "Page size is outside the allowed range", { field: "pageSize", maxPageSize });
  }
  return { ok: true, value: Object.freeze({ page: page.value, pageSize: pageSize.value, maxPageSize }) };
}

export function validateRuntimeConfiguration(overrides = {}) {
  const environment = overrides.environment || "browser";
  if (!supportedEnvironments.includes(environment)) {
    return validationFailure("runtime", "Runtime environment is invalid", { environment });
  }
  const version = overrides.version || "0.1.0";
  if (!String(version).trim()) return validationFailure("runtime", "Application version is required");
  if (overrides.basePath !== undefined && !/^(\.\/|\/|https?:\/\/[^?#]+)$/i.test(String(overrides.basePath))) {
    return validationFailure("runtime", "Base path is invalid");
  }
  return { ok: true, value: Object.freeze({ environment, version, basePath: overrides.basePath || "./" }) };
}

export function validationFailure(field, message, detail = {}) {
  return Object.freeze({
    ok: false,
    error: Object.freeze({
      code: validationErrorCode,
      field,
      message,
      rule: field,
      valueCategory: "user-input",
      detail: Object.freeze({ ...detail }),
    }),
  });
}

function parseInteger(value, field) {
  if (typeof value === "number" && Number.isSafeInteger(value)) return { ok: true, value };
  const text = String(value ?? "").trim();
  if (!/^-?\d+$/.test(text)) return validationFailure("pagination", "Pagination value must be an integer", { field });
  const parsed = Number(text);
  if (!Number.isSafeInteger(parsed)) return validationFailure("pagination", "Pagination value is outside safe integer range", { field });
  return { ok: true, value: parsed };
}

function normalizeValidationProfile(input = {}) {
  return Object.freeze({
    schema: validationContractSchema,
    profile: String(input.profile || "").trim(),
    owner: String(input.owner || "").trim(),
    input: String(input.input || "").trim(),
    output: String(input.output || "").trim(),
    ruleSource: String(input.ruleSource || "").trim(),
    errorSource: String(input.errorSource || validationErrorCode).trim(),
    consumers: Object.freeze([...(input.consumers || [])]),
    dependencies: Object.freeze([...(input.dependencies || [])]),
  });
}

function profile(profileName, owner, input, output, ruleSource, consumer) {
  return normalizeValidationProfile({
    profile: profileName,
    owner,
    input,
    output,
    ruleSource,
    consumers: [consumer],
  });
}

function hasCircularDependency(profileName, profiles, visiting = new Set(), visited = new Set()) {
  if (visited.has(profileName)) return false;
  if (visiting.has(profileName)) return true;
  visiting.add(profileName);
  for (const dependency of profiles.get(profileName)?.dependencies || []) {
    if (hasCircularDependency(dependency, profiles, visiting, visited)) return true;
  }
  visiting.delete(profileName);
  visited.add(profileName);
  return false;
}
