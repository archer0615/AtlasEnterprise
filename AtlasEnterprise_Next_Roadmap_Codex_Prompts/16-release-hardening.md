# Prompt 16 — Release Candidate Hardening

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

收斂為 Atlas v1 Release Candidate，不再擴張功能範圍。

## 執行內容

1. 依 feature matrix 封閉 P0/P1 缺口。
2. 執行 knowledge、feature、simulator、projection、repository、browser、backup/security、visual、PWA/offline、deployment、release validations。
3. 建立 Functional、Data Integrity、Offline、Upgrade、Backup、Accessibility、Performance、Security Acceptance Matrix。
4. 清除 dead code、unused generated artifacts、debug logs、未治理 screenshot、broken links。
5. 依既有 Archive Policy 保留必要歷史證據。
6. 生成 release notes、known limitations、upgrade notes、recovery guide、backup guide。
7. 驗證 fresh install、existing-user migration、offline、update、restore、GitHub Pages production path。

## 驗收標準

- Release profile 全通過。
- 所有限制有文件。
- v1 不依賴 Server/DB/Cloud。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
