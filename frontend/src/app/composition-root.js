import { createEventListenerRegistry } from "../shared/event-listener-registry.js";
import { createDomRegistry } from "./dom-registry.js";
import { createRuntimeContext } from "./runtime-context.js";
import { createRuntimeRegistry } from "./runtime-registry.js";
import { createProviderTree } from "./provider-tree.js";
import { createApplicationErrorBoundary } from "./application-error-boundary.js";
import { createStateEventBus } from "./state-events.js";
import { createStateStore, createStateTree } from "./state-store.js";
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
import { createPwaRuntimeSnapshot, createPwaRecoveryPlan, validatePwaRuntimeSnapshot } from "../pwa-runtime-resilience.js";

export function createFrontendCompositionRoot({ documentRef = document, runtimeOverrides = {}, loadRuntime = () => import("../legacy-main.js"), backupRepository = null } = {}) {
  const runtimeContext = createRuntimeContext(runtimeOverrides);
  const errorBoundary = createApplicationErrorBoundary({ logger: runtimeContext.logger });
  const stateEvents = createStateEventBus();
  const listeners = createEventListenerRegistry();
  const dom = createDomRegistry(documentRef);
  const platform = Object.freeze({
    getBackupRepository: async () => backupRepository || (await import("../indexeddb-runtime.js")).indexedDbBackupRepository,
  });
  const shared = Object.freeze({ dom, listeners, runtimeContext, errorBoundary, stateEvents, platform });
  const services = createRuntimeRegistry("service");
  const stores = createRuntimeRegistry("store");
  const routes = createRuntimeRegistry("route");
  const dashboards = createRuntimeRegistry("dashboard");

  registerInfrastructure(services, shared);
  registerStores(stores, shared);
  const stateTree = createStateTree({ stores, eventBus: stateEvents });
  registerRoutes(routes);
  registerDashboard(dashboards);
  const controllers = registerFeatures(services, shared);
  const providers = createProviderTree({ runtime: runtimeContext, stateTree, stateEvents, dom, listeners, services, stores, routes, dashboards, errorBoundary });

  return Object.freeze({
    runtimeContext,
    providers,
    services,
    stores,
    stateTree,
    stateEvents,
    routes,
    dashboards,
    controllers,
    async initialize() {
      await loadRuntime();
      stateTree.initialize();
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
      stateTree.restore(snapshot);
    },
    backup() {
      return stateTree.backup();
    },
    resetState() {
      return stateTree.reset();
    },
    dispose() {
      Object.values(controllers).forEach((controller) => controller.dispose?.());
      providers.dispose();
      dashboards.dispose();
      routes.dispose();
      stateTree.dispose();
      stores.dispose();
      services.dispose();
      errorBoundary.dispose();
      stateEvents.dispose();
      listeners.dispose();
    },
  });
}

function registerInfrastructure(services, shared) {
  services.register("dom", () => shared.dom, { scope: "singleton" });
  services.register("event-listeners", () => shared.listeners, { scope: "singleton" });
  services.register("error-boundary", () => shared.errorBoundary, { scope: "singleton" });
  services.register("pwa-runtime-resilience", () => createPwaRuntimeResilienceService(shared), { scope: "singleton" });
}

function registerStores(stores, shared) {
  const definitions = [
    { id: "runtime", classification: "Runtime Store", initialState: { status: "created" }, persistence: "memory" },
    { id: "session", classification: "Session Store", initialState: { status: "active", expiresAt: "" }, persistence: "session" },
    { id: "user", classification: "User Store", initialState: { ownerId: "local-user" }, persistence: "indexeddb" },
    { id: "dashboard", classification: "Dashboard Store", initialState: { selectedScenarioId: "", refreshCount: 0 }, persistence: "memory" },
    { id: "navigation", classification: "Navigation Store", initialState: { currentRoute: "dashboard" }, persistence: "session" },
    { id: "notification", classification: "Notification Store", initialState: { items: [] }, persistence: "memory" },
    { id: "dialog", classification: "Dialog Store", initialState: { activeDialog: "" }, persistence: "memory" },
    { id: "theme", classification: "Theme Store", initialState: { mode: shared.runtimeContext.theme }, persistence: "settings" },
    { id: "preference", classification: "Preference Store", initialState: { locale: shared.runtimeContext.localization.locale }, persistence: "settings" },
    { id: "cache", classification: "Cache Store", initialState: { entries: {}, metrics: { hits: 0, misses: 0 } }, persistence: "memory", ttlMs: 300000 },
    { id: "feature", classification: "Feature Store", initialState: { initialized: [] }, persistence: "memory" },
  ];
  for (const definition of definitions) {
    stores.register(definition.id, () => createStateStore({ ...definition, eventBus: shared.stateEvents }), { classification: definition.classification, persistence: definition.persistence });
  }
}

function registerRoutes(routes) {
  routes.register("dashboard", () => ({ id: "dashboard", layout: "default", permission: "local-user" }), { path: "#dashboard" });
  routes.register("knowledge", () => ({ id: "knowledge", layout: "default", permission: "local-user" }), { path: "#knowledge" });
  routes.register("scenarios", () => ({ id: "scenarios", layout: "default", permission: "local-user" }), { path: "#scenarios" });
}

function registerDashboard(dashboards) {
  dashboards.register("dashboard-overview", () => ({ id: "dashboard-overview", layout: "main", permission: "local-user", cache: "cache" }), { region: "main" });
}

function registerFeatures(services, shared) {
  const featureShared = Object.freeze({ ...shared, services });
  const factories = {
    dashboard: createDashboardController,
    scenario: createScenarioController,
    decision: createDecisionController,
    knowledge: createKnowledgeController,
    loan: createLoanController,
    portfolio: createPortfolioController,
    backup: (sharedContext) => createBackupController({ ...sharedContext, backupRepository: createLazyBackupRepository(sharedContext.platform) }),
    profile: createProfileController,
    navigation: createNavigationController,
    pwa: createPwaController,
  };
  for (const [id, factory] of Object.entries(factories)) services.register(`feature.${id}`, () => factory(featureShared), { scope: "feature" });
  return Object.freeze(Object.fromEntries(Object.keys(factories).map((id) => [id, services.resolve(`feature.${id}`)])));
}

function createLazyBackupRepository(platform) {
  return Object.freeze({
    async dryRunImport(backup) {
      return (await platform.getBackupRepository()).dryRunImport(backup);
    },
    async importBackup(backup, options) {
      return (await platform.getBackupRepository()).importBackup(backup, options);
    },
  });
}

function createPwaRuntimeResilienceService(shared) {
  let snapshot = createPwaRuntimeSnapshot();

  function publish(type, payload) {
    shared.stateEvents.publish(`pwa.${type}`, payload);
  }

  return Object.freeze({
    update(input = {}) {
      snapshot = createPwaRuntimeSnapshot(input);
      publish("runtime-health-changed", snapshot);
      return snapshot;
    },
    snapshot() {
      return snapshot;
    },
    recoveryPlan() {
      return createPwaRecoveryPlan(snapshot);
    },
    validate() {
      return validatePwaRuntimeSnapshot(snapshot);
    },
    reset() {
      snapshot = createPwaRuntimeSnapshot();
      publish("runtime-health-reset", snapshot);
      return snapshot;
    },
  });
}
