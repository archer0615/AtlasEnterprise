# Integration Matrices and Mappings

## Purpose
This split document isolates Integration Matrix, System System Matrix, Module Module Matrix, Application Service External Matrix, Domain Event External Matrix, Message External Matrix, and API External Matrix from the parent Integration Framework.

## Source
- Parent specification: [Integration Framework](../integration-framework.md)

## Integration Matrix
| Integration | Source System | Target System | Application Service | Domain Service | API | Message Contract | Domain Event |
|---|---|---|---|---|---|---|---|
| BankingApiIntegration | Banking API | Atlas Integration | DashboardApplicationService, BlueprintApplicationService | CashFlowService | /api/v1/integrations/banking | BankingTransactionImportedMessage | ExpenseRecorded, SalaryReceived |
| BrokerageApiIntegration | Brokerage API | Atlas Integration | PortfolioApplicationService | PortfolioService, AllocationService | /api/v1/integrations/brokerage | PortfolioImportedMessage | PortfolioCreated, SecurityPurchased, SecuritySold |
| MarketDataIntegration | Market Data Provider | Atlas Integration | PortfolioApplicationService, ScenarioApplicationService | PortfolioService, ScenarioService | /api/v1/integrations/market-data | MarketDataUpdatedMessage | ScoreAdjusted |
| ExchangeRateIntegration | Exchange Rate Provider | Atlas Integration | DashboardApplicationService, ScenarioApplicationService | CashFlowService, ScenarioService | /api/v1/integrations/exchange-rates | ExchangeRateUpdatedMessage | ScenarioEvaluated |
| GovernmentOpenDataIntegration | Government Open Data | Atlas Integration | ScenarioApplicationService, AdministrationApplicationService | ScenarioService | /api/v1/integrations/government-open-data | AssumptionVersionLoadedMessage | AssumptionVersionLoaded |
| NotificationProviderIntegration | Notification Provider | Atlas Notification | NotificationApplicationService | ExplainabilityService | /api/v1/notifications | NotificationRequestedMessage | DecisionAccepted, RecommendationGenerated |
| EmailIntegration | Email Provider | Atlas Notification | NotificationApplicationService | ExplainabilityService | /api/v1/notifications | NotificationRequestedMessage | DecisionAccepted, DecisionRejected |
| SmsIntegration | SMS Provider | Atlas Notification | NotificationApplicationService | ExplainabilityService | /api/v1/notifications | NotificationRequestedMessage | DecisionAccepted |
| PushNotificationIntegration | Push Provider | Atlas Notification | NotificationApplicationService | ExplainabilityService | /api/v1/notifications | NotificationRequestedMessage | RecommendationGenerated |
| CalendarIntegration | Calendar Provider | Atlas Automation | NotificationApplicationService, AdministrationApplicationService | DecisionService | /api/v1/integrations/calendar | CalendarEventRequestedMessage | DecisionAccepted |
| ReportExportIntegration | Atlas Reporting | External File Consumer | ReportApplicationService | ExplainabilityService | /api/v1/reports | ReportGenerationRequestedMessage | Report source events through read models |
| WebhookCallbackIntegration | External System | Atlas API | AdministrationApplicationService | ScenarioService | /api/v1/integrations/webhooks | WebhookReceivedMessage | ReplayCompleted |

## Mapping Matrices
- System System Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.
- Module Module Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.
- Application Service External Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.
- Domain Event External Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.
- Message External Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.
- API External Matrix preserves Catalog-aligned source, target, Adapter, retry, timeout, audit, monitoring, and security required controls.

## Covered Integrations
- BankingApiIntegration
- BrokerageApiIntegration
- MarketDataIntegration
- ExchangeRateIntegration
- GovernmentOpenDataIntegration
- NotificationProviderIntegration
- EmailIntegration
- SmsIntegration
- PushNotificationIntegration
- CalendarIntegration
- ReportExportIntegration
- WebhookCallbackIntegration
