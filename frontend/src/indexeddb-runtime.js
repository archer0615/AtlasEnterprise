const databaseName = "atlas-pwa-runtime";
const databaseVersion = 1;
const backupSchemaVersion = "atlas-pwa-runtime-backup.v1";
const migrationRecordKey = "schema";
const stores = {
  metadata: "metadata",
  scenarios: "scenarios",
  settings: "settings",
};

let databasePromise;

function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(stores.metadata)) {
        database.createObjectStore(stores.metadata, { keyPath: "key" });
      }
      if (!database.objectStoreNames.contains(stores.scenarios)) {
        database.createObjectStore(stores.scenarios, { keyPath: "scenarioId" });
      }
      if (!database.objectStoreNames.contains(stores.settings)) {
        database.createObjectStore(stores.settings, { keyPath: "key" });
      }
    };

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

  return databasePromise;
}

async function withStore(storeName, mode, action) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = action(store);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function getAll(storeName) {
  return withStore(storeName, "readonly", (store) => store.getAll());
}

export const indexedDbSettingsRepository = {
  async get(key) {
    const record = await withStore(stores.settings, "readonly", (store) => store.get(key));
    return record?.value || "";
  },

  async set(key, value) {
    await withStore(stores.settings, "readwrite", (store) => store.put({ key, value }));
  },
};

export const indexedDbMigrationRepository = {
  async current() {
    const record = await withStore(stores.metadata, "readonly", (store) => store.get(migrationRecordKey));
    return record?.value || { databaseVersion: 0, backupSchemaVersion: "" };
  },

  async markCurrent() {
    const value = {
      databaseVersion,
      backupSchemaVersion,
      migratedAt: new Date().toISOString(),
    };
    await withStore(stores.metadata, "readwrite", (store) => store.put({ key: migrationRecordKey, value }));
    return value;
  },
};

export const indexedDbScenarioRepository = {
  async list() {
    return getAll(stores.scenarios);
  },

  async save(scenario) {
    await withStore(stores.scenarios, "readwrite", (store) => store.put(scenario));
  },

  async delete(scenarioId) {
    await withStore(stores.scenarios, "readwrite", (store) => store.delete(scenarioId));
  },

  async clear() {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      store.clear();
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },

  async replaceAll(scenarios) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(stores.scenarios, "readwrite");
      const store = transaction.objectStore(stores.scenarios);
      store.clear();
      for (const scenario of scenarios) {
        store.put(scenario);
      }
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  },
};

export const indexedDbBackupRepository = {
  async exportBackup() {
    await indexedDbMigrationRepository.markCurrent();
    return {
      schema: backupSchemaVersion,
      exportedAt: new Date().toISOString(),
      databaseVersion,
      scenarios: await indexedDbScenarioRepository.list(),
    };
  },

  async importBackup(backup) {
    if (backup?.schema !== backupSchemaVersion || !Array.isArray(backup.scenarios)) {
      throw new Error("Unsupported backup schema");
    }
    await indexedDbScenarioRepository.replaceAll(backup.scenarios);
  },

  validateBackup(backup) {
    return backup?.schema === backupSchemaVersion && Array.isArray(backup.scenarios);
  },
};
