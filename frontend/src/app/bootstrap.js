import { createFrontendCompositionRoot } from "./composition-root.js";
import { createApplicationLifecycle } from "./application-lifecycle.js";
import { handleApplicationError } from "./application-error-handler.js";
import { validateRuntimeConfiguration } from "../validation-contract.js";

export async function bootstrapApplication(options = {}) {
  const runtimeValidation = validateRuntimeConfiguration(options.runtimeOverrides || {});
  if (!runtimeValidation.ok) {
    const error = new Error(runtimeValidation.error.message);
    error.code = runtimeValidation.error.code;
    throw error;
  }
  const compositionRoot = createFrontendCompositionRoot(options);
  const lifecycle = createApplicationLifecycle({
    initialize: compositionRoot.initialize,
    hydrate: compositionRoot.hydrate,
    persist: compositionRoot.persist,
    restore: compositionRoot.restore,
    dispose: compositionRoot.dispose,
  });

  await lifecycle.initialize();

  return {
    context: compositionRoot,
    runtimeContext: compositionRoot.runtimeContext,
    dispose: lifecycle.dispose,
    suspend: lifecycle.suspend,
    resume: lifecycle.resume,
    shutdown: lifecycle.shutdown,
    restore: lifecycle.restore,
    reload: lifecycle.reload,
    isInitialized: lifecycle.isInitialized,
    getStatus: lifecycle.getStatus,
  };
}

export function handleFatalApplicationError(error) {
  handleApplicationError(error, "ATLAS_BOOTSTRAP_ERROR");
}
