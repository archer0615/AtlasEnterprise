export const knowledgeExplorerSchema = "atlas-enterprise.knowledge-explorer.v1";

export function rankKnowledgeDocuments(documents = [], query = "", options = {}) {
  const tokens = tokenize(query);
  const category = options.category || "all";
  const filtered = documents.filter((doc) => category === "all" || doc.category === category);

  return filtered
    .map((doc) => {
      const score = scoreDocument(doc, tokens);
      return {
        ...doc,
        score,
        highlights: tokens.length ? buildHighlights(doc, tokens) : [],
        headingAnchors: buildHeadingAnchors(doc.headings || []),
      };
    })
    .filter((doc) => !tokens.length || doc.score > 0)
    .sort((a, b) => b.score - a.score || String(a.title).localeCompare(String(b.title)));
}

export function buildCommandPalette(documents = [], appCommands = []) {
  const navigationCommands = [
    { id: "nav-dashboard", type: "Navigation", title: "Dashboard", target: "#dashboard" },
    { id: "nav-knowledge", type: "Navigation", title: "Knowledge Explorer", target: "#knowledge" },
    { id: "nav-scenarios", type: "Navigation", title: "Scenario Workbench", target: "#scenarios" },
  ];
  const knowledgeCommands = documents.slice(0, 20).map((doc) => ({
    id: `doc-${doc.id}`,
    type: "Knowledge Search",
    title: doc.title,
    target: `#document-${doc.id}`,
  }));
  return [...navigationCommands, ...knowledgeCommands, ...appCommands];
}

export function createRecentSearches(existing = [], query = "", limit = 8) {
  const normalized = query.trim();
  if (!normalized) return existing.slice(0, limit);
  return [normalized, ...existing.filter((item) => item !== normalized)].slice(0, limit);
}

export function buildRelatedDocuments(documentId, documents = []) {
  const current = documents.find((doc) => doc.id === documentId);
  if (!current) return { related: [], backlinks: [] };
  const currentTokens = new Set(tokenize([current.title, current.category, ...(current.keywords || [])].join(" ")));
  const related = documents
    .filter((doc) => doc.id !== documentId)
    .map((doc) => ({ ...doc, relationScore: tokenize([doc.title, doc.category, ...(doc.keywords || [])].join(" ")).filter((token) => currentTokens.has(token)).length }))
    .filter((doc) => doc.relationScore > 0)
    .sort((a, b) => b.relationScore - a.relationScore);
  const backlinks = documents.filter((doc) => (doc.links || []).includes(documentId));
  return { related, backlinks };
}

export function buildRelationshipGraph(documents = []) {
  const nodes = documents.map((doc) => ({ id: doc.id, label: doc.title, category: doc.category }));
  const edges = documents.flatMap((doc) => (doc.links || []).map((target) => ({ source: doc.id, target })));
  return { schema: "atlas-enterprise.knowledge-relationship-graph.v1", nodes, edges };
}

function tokenize(value) {
  return String(value || "").toLowerCase().split(/[^a-z0-9\u4e00-\u9fff]+/u).filter(Boolean);
}

function scoreDocument(doc, tokens) {
  if (!tokens.length) return 0;
  const title = String(doc.title || "").toLowerCase();
  const category = String(doc.category || "").toLowerCase();
  const headings = (doc.headings || []).map((heading) => String(heading.text || heading).toLowerCase()).join(" ");
  const keywords = (doc.keywords || []).join(" ").toLowerCase();
  const body = String(doc.bodyMarkdown || doc.summary || "").toLowerCase();
  return tokens.reduce((total, token) => {
    if (title.includes(token)) total += 10;
    if (keywords.includes(token)) total += 7;
    if (category.includes(token)) total += 5;
    if (headings.includes(token)) total += 4;
    if (body.includes(token)) total += 1;
    return total;
  }, 0);
}

function buildHighlights(doc, tokens) {
  const source = [doc.title, doc.category, ...(doc.keywords || []), doc.summary || ""].join(" ");
  return tokens.filter((token) => source.toLowerCase().includes(token)).map((token) => ({ token, match: token }));
}

function buildHeadingAnchors(headings) {
  return headings.map((heading) => {
    const text = String(heading.text || heading);
    return { text, anchor: text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/gu, "-").replace(/^-|-$/g, "") };
  });
}
