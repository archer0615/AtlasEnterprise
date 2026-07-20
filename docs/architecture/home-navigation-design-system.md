# Home Navigation Design System

## Tokens

| Token | Contract |
| --- | --- |
| Color | CSS custom properties for surface, text, border, accent, success, warning, danger. |
| Typography | Scale tokens for page title, section heading, body, label, metric, and caption. |
| Spacing | 4px base scale. |
| Radius | Card radius at 8px or less unless component-specific. |
| Elevation | Subtle shadow tokens for dialogs and menus only. |
| Motion | Short reduced-motion-safe transitions. |
| Breakpoints | Mobile, tablet, desktop, and wide desktop. |

## Navigation

- Desktop: sidebar navigation.
- Tablet: compact rail or top navigation.
- Mobile: bottom or drawer navigation.
- Breadcrumb: visible on nested document/detail routes.
- Page context: every route should show source mode and as-of date when financial data is shown.

## Home Read Model

Home should summarize:

- Financial Health.
- Net Worth.
- Cash Flow.
- Goal.
- Recommendation.
- Milestone/Action.

Every metric must identify unit, currency, as-of date, and Actual, Projected, Estimated, or Insufficient Data state.

## Components

- Card.
- Metric.
- Status.
- Empty state.
- Error state.
- Skeleton.
- Dialog.
- Form field.

## Validation Targets

- Desktop, tablet, and mobile screenshot baselines.
- No magic values outside tokens for new UI.
- Projection values must not be presented as actual data without source labeling.
