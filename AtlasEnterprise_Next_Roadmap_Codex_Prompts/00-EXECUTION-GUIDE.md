# Atlas Enterprise 後續實作指南

每次只把一份 Prompt 交給 Codex。完成後提交 Git、確認 GitHub Pages Preview 與相關測試，再執行下一份。

## 順序

1. `01-current-status-and-traceability.md`
2. `02-validation-pipeline-profiles.md`
3. `03-future-architecture-boundary.md`
4. `04-frontend-modularization.md`
5. `05-local-data-platform.md`
6. `06-core-financial-data-workflows.md`
7. `07-projection-read-model.md`
8. `08-dashboard-real-data-migration.md`
9. `09-financial-health-goal.md`
10. `10-scenario-workbench.md`
11. `11-decision-recommendation-explainability.md`
12. `12-knowledge-explorer-search.md`
13. `13-home-navigation-design-system.md`
14. `14-pwa-offline-update-storage.md`
15. `15-accessibility-responsive-performance.md`
16. `16-release-hardening.md`

## 優先級

P0：01–08。P1：09–13。P2：14–16。

## Release Gate

- 相關測試通過。
- Preview 可載入，Console 無新增未處理錯誤。
- Knowledge、Fixture、Offline Cache 無非預期 Drift。
- 執行報告存在。
- Future Optional Architecture 未成為 v1 必要依賴。

## 暫不進行

登入、雲端同步、Server Database、正式 ASP.NET Core API、多租戶、訂閱、原生 App、Catalog 未定義的新 Domain。
