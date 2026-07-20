# Prompt 01 — Current Status 與 Traceability

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

建立唯一且可自動更新的專案現況入口，讓規格、Runtime、測試和 UI 可追蹤。

## 執行內容

1. 盤點 Canonical/Generated Knowledge、Frontend features、IndexedDB stores、Simulator、Fixtures、scripts、GitHub Pages workflow。
2. 建立 `docs/status/current-status.md`、`feature-matrix.md`、`architecture-status.md`、`validation-status.md`、`next-priority.md`。
3. 建立 `specification-runtime-traceability.json`，涵蓋既有 User、Asset、Liability、Loan/Mortgage、Income、Expense、CashFlow、Goal、Portfolio、Position、Scenario、Decision、Recommendation、Notification。
4. 每個概念記錄 specification、runtime model、repository、service/projection、fixture、UI、unit/integration test、status。
5. 新增 script 計算文件與產物數量，禁止在現況文件硬編碼數量。
6. 更新 README，使主要入口指向 `docs/status/`；歷史報告保留。
7. 對不存在的實作標示 Not Implemented，不得虛構完成。

## 驗收標準

- 新進開發者從 README 兩次點擊內可理解現況與下一步。
- Traceability JSON 可驗證 schema 與路徑。
- 狀態數據由 script 產生。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
