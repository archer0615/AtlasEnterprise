# Prompt 03 — Future Architecture 邊界治理

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

防止 Codex 或開發者把 backend、database、ai 誤接為 v1 必要依賴。

## 執行內容

1. 盤點三個資料夾內容及 package scripts 的實際引用。
2. 在各資料夾建立/強化 README：Status、Purpose、Runtime Dependency、Allowed、Prohibited、Promotion Criteria。
3. 建立 `docs/architecture/runtime-boundary.md` 與 Static-first ADR。
4. 新增驗證：production frontend 不 import server-only dependency、不需要 DB credential、不呼叫未核准 server endpoint。
5. 既有純 JS projection/test module 保留並標示 Build-time/Test-time 性質。
6. 把邊界規則加入 `.codex/` 治理文件。

## 驗收標準

- 無 backend、DB、credential 時 `npm run dev` 可啟動。
- Production PWA 無必要 server fetch。
- 文件與自動驗證一致。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
