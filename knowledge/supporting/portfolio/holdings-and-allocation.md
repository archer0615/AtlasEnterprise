# Portfolio Holdings and Allocation

## Purpose
This split document isolates portfolio structure, asset classes, allocation rules, rebalancing principles, risk levels, and cash flow inputs from the parent Portfolio Knowledge Base.

## Source
- Parent specification: [Portfolio Knowledge Base](../portfolio.md)

## Portfolio Structure
Each Portfolio includes portfolio ID, name, owner, base currency, target allocation, current allocation, holdings, cost basis, market value, unrealized gain/loss, annual income, and risk level.

## Asset Classes
- Cash
- Fixed Income
- Equity
- Alternative

## Allocation Rules
Every asset class must define target weight, minimum weight, maximum weight, and rebalance threshold.

## Rebalancing
Rebalancing can be triggered by allocation drift, periodic review, life events, and market changes. Preferred execution uses new cash flow before selling assets.

## Cash Flow
Portfolio supplies dividend, coupon, rental income, withdrawal, and asset sale data to Cash Flow Engine.

