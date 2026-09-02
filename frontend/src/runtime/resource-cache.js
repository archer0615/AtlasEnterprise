export function createResourceCache(fetchImpl = globalThis.fetch, { maxEntries = 256 } = {}) {
  const entries = new Map();
  const stats = { hits: 0, misses: 0 };

  async function load(cacheKey, path, parse) {
    if (entries.has(cacheKey)) {
      stats.hits += 1;
      const cached = entries.get(cacheKey);
      entries.delete(cacheKey);
      entries.set(cacheKey, cached);
      return cached;
    }
    stats.misses += 1;
    const request = fetchImpl(path, { cache: "no-cache" }).then(async (response) => {
      if (!response.ok) throw new Error(`資料載入失敗：${response.status}`);
      return parse(response);
    });
    entries.set(cacheKey, request);
    while (entries.size > Math.max(1, Number(maxEntries) || 256)) entries.delete(entries.keys().next().value);
    try { return await request; } catch (error) {
      if (entries.get(cacheKey) === request) entries.delete(cacheKey);
      throw error;
    }
  }

  return Object.freeze({
    json: (path) => load(`json:${path}`, path, (response) => response.json()),
    text: (path) => load(`text:${path}`, path, (response) => response.text()),
    clear: () => entries.clear(),
    getStats: () => ({ ...stats, size: entries.size, maxEntries: Math.max(1, Number(maxEntries) || 256) }),
  });
}
