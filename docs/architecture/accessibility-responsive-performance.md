# Accessibility Responsive Performance

## Accessibility Checklist

- Semantic HTML.
- Landmark regions.
- Heading order.
- Label and error association.
- Visible focus.
- Keyboard operation.
- Dialog focus trap.
- Contrast.
- Reduced motion.

## Responsive Matrix

| Viewport | Requirement |
| --- | --- |
| 320px mobile | No horizontal page overflow; cards and controls remain readable. |
| Tablet | Navigation remains reachable without hiding core actions. |
| Desktop | Sidebar and dashboard panels align without overlap. |
| Large desktop | Content width remains constrained and scannable. |

Tables and charts require accessible summaries and controlled overflow.

## Performance Budget

| Operation | Budget |
| --- | --- |
| Startup | 1500 ms |
| Knowledge load | 1000 ms |
| Search | 100 ms |
| IndexedDB query | 250 ms |
| Projection | 50 ms |
| Scenario run | 250 ms |
| Render | 100 ms |

Regression threshold is 1.2x baseline unless a roadmap report accepts the change.

## Rendering Policy

Large knowledge bodies should support pagination, incremental rendering, or virtualization before they become a startup or search bottleneck.

## Validation Targets

- Playwright accessibility smoke.
- Viewport screenshots.
- Keyboard workflow.
- Reduced-motion behavior.
- Startup and search timing baseline.
