# Capability Matrix

The capability matrix identifies which user roles can access major Atlas Enterprise functional areas. It is a planning artifact for authorization, navigation, reporting, and future multi-role expansion.

| Capability | User | Advisor | Admin |
| --- | :---: | :---: | :---: |
| Financial Profile | Yes | Yes | Yes |
| Goal Planning | Yes | Yes | No |
| Scenario Simulation | Yes | Yes | No |
| Portfolio Analysis | Yes | Yes | No |
| Loan Analysis | Yes | Yes | No |
| Retirement Planning | Yes | Yes | No |
| Decision Recommendation | Yes | Yes | No |
| Reports | Yes | Yes | Yes |
| Policy Management | No | No | Yes |
| Configuration | No | No | Yes |
| Feature Flags | No | No | Yes |
| Tenant Management | No | No | Yes |
| Audit Review | No | Yes | Yes |

## Governance Notes

- The User role owns personal financial inputs, scenarios, goals, and decisions.
- The Advisor role may review and explain decisions but should not silently change user-owned assumptions.
- The Admin role manages system policies, configuration, feature flags, tenancy, and audit access.
- Any runtime permission model should preserve audit records for privileged actions.
