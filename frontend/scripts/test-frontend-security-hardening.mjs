import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createApplicationErrorBoundary } from "../src/app/application-error-boundary.js";
import { createFrontendCompositionRoot } from "../src/app/composition-root.js";
import { createRuntimeContext } from "../src/app/runtime-context.js";
import {
  authorizeLocalRuntime,
  redactSensitiveData,
  sanitizeDownloadFilename,
  validateServiceWorkerMessage,
} from "../src/security-boundary.js";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");

const redacted = redactSensitiveData({
  token: "abc",
  nested: { password: "secret", items: [{ apiKey: "key" }] },
});
assert.equal(redacted.token, "[REDACTED]");
assert.equal(redacted.nested.password, "[REDACTED]");
assert.equal(redacted.nested.items[0].apiKey, "[REDACTED]");

const loggerEntries = [];
const boundary = createApplicationErrorBoundary({ logger: { error: (...args) => loggerEntries.push(args) } });
const captured = boundary.capture({ name: "DOMException", message: "password leaked", token: "raw" }, "SecurityTest");
assert.equal(captured.schema, "atlas-enterprise.user-facing-error.v1");
assert.equal(captured.message.includes("password leaked"), false);
assert.equal(JSON.stringify(loggerEntries).includes("raw"), false);
assert.equal(JSON.stringify(loggerEntries).includes("password leaked"), false);

assert.equal(sanitizeDownloadFilename("../atlas:backup?.json"), "atlas-backup-.json");
assert.equal(sanitizeDownloadFilename("..."), "atlas-export.json");

const localContext = createRuntimeContext();
assert.equal(authorizeLocalRuntime(localContext).ok, true);
assert.equal(authorizeLocalRuntime(createRuntimeContext({ permission: { mode: "admin" } })).ok, false);
assert.equal(authorizeLocalRuntime(localContext, { sessionStatus: "expired" }).ok, false);
assert.equal(localContext.browserRuntime.localStorage, undefined);
assert.equal(localContext.browserRuntime.sessionStorage, undefined);
assert.equal(localContext.browserRuntime.indexedDB, undefined);

const documentRef = { querySelector: () => null };
const rootInstance = createFrontendCompositionRoot({ documentRef, loadRuntime: async () => ({}) });
assert.equal(rootInstance.services.resolve("frontend-authorization").evaluate().ok, true);
assert.throws(() => rootInstance.services.resolve("frontend-authorization").assertAllowed({ sessionStatus: "expired" }), /Frontend authorization denied/);
rootInstance.dispose();

assert.deepEqual(validateServiceWorkerMessage({ type: "ATLAS_SW_HEALTH" }), { ok: true, type: "ATLAS_SW_HEALTH" });
assert.equal(validateServiceWorkerMessage({ type: "ATLAS_SW_UNKNOWN" }).ok, false);
assert.equal(validateServiceWorkerMessage("ATLAS_SW_HEALTH").ok, false);

const serviceWorker = await readFile(path.join(frontendRoot, "sw.js"), "utf8");
assert(serviceWorker.includes('const allowedMessages = ["ATLAS_SW_HEALTH", "ATLAS_SW_SKIP_WAITING"]'), "service worker message allowlist is missing");
assert(serviceWorker.includes('"src/security-boundary.js"'), "service worker must cache security boundary module");

const runtimeContext = await readFile(path.join(frontendRoot, "src", "app", "runtime-context.js"), "utf8");
assert(!/localStorage|sessionStorage|indexedDB/.test(runtimeContext), "runtime context must not expose raw browser storage");

const legacyMain = await readFile(path.join(frontendRoot, "src", "legacy-main.js"), "utf8");
assert(legacyMain.includes("sanitizeDownloadFilename(filename)"), "legacy JSON downloads must sanitize filenames");

console.log("Frontend security hardening tests passed.");
