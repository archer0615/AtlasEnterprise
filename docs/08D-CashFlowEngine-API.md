
# Project Atlas Enterprise
# docs/08D-CashFlowEngine-API.md

Version: 1.0
Status: Draft

# Purpose

This document defines the application-facing API contract for the Cash Flow Engine.

The API exposes forecasting, validation, and analysis capabilities while keeping
business logic inside the Domain Layer.

---

# Design Principles

- REST API
- JSON
- Stateless
- Idempotent where applicable
- Versioned (/api/v1)
- Explainable responses

---

# Endpoint Overview

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v1/cashflow | Retrieve current cash-flow summary |
| POST | /api/v1/cashflow/forecast | Generate forecast |
| POST | /api/v1/cashflow/validate | Validate input data |
| POST | /api/v1/cashflow/scenario | Execute scenario |
| GET | /api/v1/cashflow/history | Forecast history |
| GET | /api/v1/cashflow/{forecastId} | Forecast details |

---

# Forecast Request

POST /api/v1/cashflow/forecast

Required fields:

- UserId
- ScenarioId (optional)
- StartDate
- EndDate
- InflationRate
- ForecastFrequency

---

# Forecast Response

Returns:

- ForecastId
- MonthlyCashFlow
- AnnualCashFlow
- FreeCashFlow
- CashReserveMonths
- HealthScore
- Warnings
- TraceId

---

# Validation API

POST /api/v1/cashflow/validate

Checks:

- Required inputs
- Currency consistency
- Date ranges
- Duplicate records
- Invalid values

Response:

- ValidationStatus
- Errors
- Warnings

---

# Scenario API

POST /api/v1/cashflow/scenario

Supports:

- Income changes
- Expense changes
- Inflation overrides
- One-time events
- Loan changes

Produces isolated scenario output.

---

# Error Model

Standard format:

{
  "success": false,
  "errors": [
    {
      "code": "CF-001",
      "message": "Validation failed."
    }
  ],
  "traceId": "..."
}

---

# Security

- JWT Bearer
- HTTPS
- Authorization Policies
- Audit logging

---

# Performance Targets

Forecast Generation:
< 2 seconds (typical)

Validation:
< 500 ms

Scenario Comparison:
< 5 seconds

---

# Dependencies

Consumes:

- Financial Profile
- Loan Service
- Property Service
- Insurance Service
- Scenario Service

Produces data for:

- Investment Engine
- Retirement Engine
- Home Upgrade Engine
- Decision Engine

---

# Future Endpoints

- Batch Forecast
- Forecast Export
- Forecast Import
- Monte Carlo Forecast
- AI Cash Flow Explanation

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial Cash Flow Engine API specification|
