# Prompt 14 — PWA Offline、Update、Storage

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

補齊 PWA 更新、離線、儲存失敗的可靠性與 UX。

## 執行內容

1. 強化 app shell versioning、knowledge cache manifest、cache cleanup、update detection、safe activation。
2. 建立 Offline Indicator、Update Available、Apply Update、Stale Data、Quota Warning、Backup Reminder（依既有規格）。
3. 建立 first install、offline reload/navigation、version upgrade、missing cache asset、IndexedDB unavailable tests。
4. 使用者敏感資料不得放入不適當 Cache Storage。
5. Knowledge static cache 與 user IndexedDB 明確分離。
6. 建立 cache manifest diff report；測試 GitHub Pages `/AtlasEnterprise/` subpath。

## 驗收標準

- 離線可載入核心頁面和 Knowledge。
- 更新不白屏、不遺失資料。
- Cache/DB 不相容有安全處理。

## 統一完成條件

1. 實際修改必要程式、測試與文件，不只提出建議。
2. 建立 `docs/roadmap/` 執行報告，記錄範圍、決策、驗證結果、風險。
3. 列出新增、修改、刪除檔案。
4. 執行與任務直接相關的測試；至少執行 `npm run validate:frontend`。涉及 Knowledge、PWA、Offline、Simulator 時執行對應驗證。
5. 不得聲稱未執行的測試通過。
6. 最後輸出 Summary、Changed Files、Validation、Remaining Risks、Recommended Next Prompt。
