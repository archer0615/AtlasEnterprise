import { createEventListenerRegistry } from "../shared/event-listener-registry.js";
import { createDomRegistry } from "./dom-registry.js";
import { createDashboardController } from "../features/dashboard/dashboard-controller.js";
import { createScenarioController } from "../features/scenario/scenario-controller.js";
import { createDecisionController } from "../features/decision/decision-controller.js";
import { createKnowledgeController } from "../features/knowledge/knowledge-controller.js";
import { createLoanController } from "../features/loan/loan-controller.js";
import { createPortfolioController } from "../features/portfolio/portfolio-controller.js";
import { createBackupController } from "../features/backup/backup-controller.js";
import { createProfileController } from "../features/profile/profile-controller.js";
import { createNavigationController } from "../features/navigation/navigation-controller.js";
import { createPwaController } from "../features/pwa/pwa-controller.js";

export function buildApplicationContext(documentRef = document) {
  const listeners = createEventListenerRegistry();
  const dom = createDomRegistry(documentRef);
  const shared = { dom, listeners };

  const controllers = {
    dashboard: createDashboardController(shared),
    scenario: createScenarioController(shared),
    decision: createDecisionController(shared),
    knowledge: createKnowledgeController(shared),
    loan: createLoanController(shared),
    portfolio: createPortfolioController(shared),
    backup: createBackupController(shared),
    profile: createProfileController(shared),
    navigation: createNavigationController(shared),
    pwa: createPwaController(shared),
  };

  return {
    dom,
    listeners,
    controllers,
    dispose() {
      Object.values(controllers).forEach((controller) => controller.dispose?.());
      listeners.dispose();
    },
  };
}
