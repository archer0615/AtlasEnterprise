import { createEventListenerRegistry } from "../shared/event-listener-registry.js";
import { createDomRegistry } from "./dom-registry.js";
import { createRuntimeContext } from "./runtime-context.js";
import { createRuntimeRegistry } from "./runtime-registry.js";
import { createProviderTree } from "./provider-tree.js";
import { createApplicationErrorBoundary } from "./application-error-boundary.js";
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

export function createFrontendCompositionRoot({ documentRef = document, runtimeOverrides = {}, loadRuntime = () => import("../legacy-main.js") } = {}) {
  const runtimeContext = createRuntimeContext(runtimeOverrides);
  const errorBoundary = createApplicationErrorBoundary({ logger: runtimeContext.logger });
  const listeners = createEventListenerRegistry();
  const dom = createDomRegistry(documentRef);
  const shared = Object.freeze({ dom, listeners, runtimeContext, errorBoundary });
  const services = createRuntimeRegistry("service");
  const stores = createRuntimeRegistry("store");
  const routes = createRuntimeRegistry("route");
  const dashboards = createRuntimeRegistry("dashboard");

  registerInfrastructure(services, shared);
  registerStores(stores);
  registerRoutes(routes);
  registerDashboard(dashboards);
  const controllers = registerFeatures(services, shared);
  const providers = createProviderTree({ runtime: runtimeContext, dom, listeners, services, stores, routes, dashboards, errorBoundary });

  return Object.freeze({
    runtimeContext,
    providers,
    services,
    stores,
    routes,
    dashboards,
    controllers,
    async initialize() {
      await loadRuntime();
      Object.values(controllers).forEach((controller) => controller.initialize?.());
      return true;
    },
    async hydrate() {
      await stores.hydrate(shared);
    },
    async persist() {
      await stores.persist();
    },
    async restore(snapshot) {
      await stores.restore(snapshot);
    },
    dispose() {
      Object.values(controllers).forEach((controller) => controller.dispose?.());
      providers.dispose();
      dashboards.dispose();
      routes.dispose();
      stores.dispose();
      services.dispose();
      errorBoundary.dispose();
      listeners.dispose();
    },
  });
}

function registerInfrastructure(services, shared) {
  services.register("dom", () => shared.dom, { scope: "singleton" });
  services.register("event-listeners", () => shared.listeners, { scope: "singleton" });
  services.register("error-boundary", () => shared.errorBoundary, { scope: "singleton" });
}

function registerStores(stores) {
  stores.register("runtime-memory", () => ({ hydrate() {}, persist() {}, restore() {}, dispose() {} }), { persistence: "memory" });
}

function registerRoutes(routes) {
  routes.register("dashboard", () => ({ id: "dashboard", layout: "default", permission: "local-user" }), { path: "#dashboard" });
  routes.register("knowledge", () => ({ id: "knowledge", layout: "default", permission: "local-user" }), { path: "#knowledge" });
  routes.register("scenarios", () => ({ id: "scenarios", layout: "default", permission: "local-user" }), { path: "#scenarios" });
}

function registerDashboard(dashboards) {
  dashboards.register("dashboard-overview", () => ({ id: "dashboard-overview", layout: "main", permission: "local-user", cache: "runtime-memory" }), { region: "main" });
}

function registerFeatures(services, shared) {
  const factories = {
    dashboard: createDashboardController,
    scenario: createScenarioController,
    decision: createDecisionController,
    knowledge: createKnowledgeController,
    loan: createLoanController,
    portfolio: createPortfolioController,
    backup: createBackupController,
    profile: createProfileController,
    navigation: createNavigationController,
    pwa: createPwaController,
  };
  for (const [id, factory] of Object.entries(factories)) services.register(`feature.${id}`, () => factory(shared), { scope: "feature" });
  return Object.freeze(Object.fromEntries(Object.keys(factories).map((id) => [id, services.resolve(`feature.${id}`)])));
}
