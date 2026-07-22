import { buildApplicationContext } from "./application-context.js";
import { createApplicationLifecycle } from "./application-lifecycle.js";
import { handleApplicationError } from "./application-error-handler.js";

export async function bootstrapApplication() {
  const context = buildApplicationContext();
  const lifecycle = createApplicationLifecycle({
    initialize: async () => {
      await import("../legacy-main.js");
    },
    dispose: context.dispose,
  });

  await lifecycle.initialize();

  return {
    context,
    dispose: lifecycle.dispose,
    isInitialized: lifecycle.isInitialized,
  };
}

export function handleFatalApplicationError(error) {
  handleApplicationError(error, "ATLAS_BOOTSTRAP_ERROR");
}
