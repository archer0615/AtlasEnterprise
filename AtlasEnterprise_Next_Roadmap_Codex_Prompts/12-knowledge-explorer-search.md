# Prompt 12 — Knowledge Explorer 與 Global Search

## Atlas 強制邊界

- 先讀取 `README.md`、`package.json`、`.codex/`、相關 Catalog、Entity、Framework、現有程式與測試。
- 以 Repository 現況與既有 Knowledge Base 為準；不重新設計 Atlas，不修改既有 Domain，不新增 Catalog 不存在的 Business Concept。
- 所有命名遵循 Atlas 已建立的 Catalog。
- `knowledge/**/*.md` 是 Canonical Source；`frontend/knowledge/**` 是 Generated Output，不得直接維護。
- Atlas v1 維持 Static-first、Local-first、Offline-first GitHub Pages PWA。
- ASP.NET Core、PostgreSQL、EF Core、Server API、Cloud Database、Authentication Server、Multi-device Sync 不得成為 v1 Runtime Dependency。
- `backend/`、`database/`、`ai/` 僅為 Future Optional Architecture、Prototype、Build-time 或 Test-time 區域。
- 不得移除有效驗證換取通過；Fixture 僅用於 Demo、Development、Test、Visual Regression。
- 優先小步修改、保持向後相容，不更換前端框架。

## 目標

讓大量 Canonical Knowledge 能快速、離線、可關聯地搜尋與閱讀。

## 執行內容

1. 盤點 generated index、search index、document JSON schema。
2. 搜尋支援 title、heading、keyword、catalog、entity、rule、command、event。
3. 建立 ranking、highlight、filter、heading anchor、recent search。
4. 建立 Ctrl/Cmd+K Command Palette，涵蓋 Navigation、Knowledge Search、既有 app commands。
5. 建立 Category、Detail、TOC、Related Documents、Backlinks。
6. Relationship Graph 僅使用文件引用與 Catalog 關聯，不推測。
7. 支援 offline、keyboard、screen reader、mobile；測試 index load、query latency、memory。

## 驗收標準

- 搜尋結果可定位 heading。
- Command Palette 不與表單快捷鍵衝突。
- Offline 搜尋正常。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
