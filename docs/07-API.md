# Project Atlas Enterprise
# docs/07-API.md

Version: 1.0
Status: Draft

# API Specification

## Purpose

This document defines the REST API conventions, resource boundaries, and endpoint groups for Project Atlas.

Business rules remain in the Domain Layer. APIs expose application capabilities and must not contain business decision logic.

---

# Architecture

Client
↓
REST API
↓
Application Layer
↓
Domain Layer
↓
Infrastructure
↓
PostgreSQL

---

# Standards

- RESTful design
- JSON request/response
- UTF-8 encoding
- OpenAPI (Swagger)
- JWT Authentication
- Versioned APIs (`/api/v1`)
- UTC timestamps (ISO-8601)

---

# Common Response

```json
{
  "success": true,
  "data": {},
  "errors": [],
  "traceId": "..."
}
```

---

# Endpoint Groups

## Authentication

- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/logout

## User Profile

- GET /api/v1/users/me
- PUT /api/v1/users/me
- GET /api/v1/users/me/settings

## Financial Profile

- GET /api/v1/financial-profile
- PUT /api/v1/financial-profile

## Assets

- GET /api/v1/assets
- POST /api/v1/assets
- PUT /api/v1/assets/{id}
- DELETE /api/v1/assets/{id}

## Portfolio

- GET /api/v1/portfolios
- POST /api/v1/portfolios
- GET /api/v1/portfolios/{id}
- POST /api/v1/portfolios/{id}/rebalance

## Property

- GET /api/v1/properties
- POST /api/v1/properties
- PUT /api/v1/properties/{id}

## Loans

- GET /api/v1/loans
- POST /api/v1/loans
- POST /api/v1/loans/{id}/early-repayment

## Insurance

- GET /api/v1/insurance-policies
- POST /api/v1/insurance-policies

## Retirement

- GET /api/v1/retirement-plans
- POST /api/v1/retirement-plans
- POST /api/v1/retirement-plans/{id}/simulate

## Cash Flow

- GET /api/v1/cash-flows
- POST /api/v1/cash-flows/forecast

## Scenario

- POST /api/v1/scenarios
- GET /api/v1/scenarios/{id}
- POST /api/v1/scenarios/{id}/compare

## Decision

- POST /api/v1/decisions/evaluate
- GET /api/v1/decisions
- GET /api/v1/decisions/{id}

---

# HTTP Status Codes

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Validation Failed
- 500 Internal Server Error

---

# Security

- JWT Bearer
- HTTPS only
- Authorization by policy
- Audit sensitive operations
- Input validation on all requests

---

# Versioning

- URI versioning
- Backward compatibility within major version
- Breaking changes require new major API version

---

# Future APIs

- Open Banking
- Market Data
- Tax Engine
- Notification Service
- AI Recommendation API

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial API specification|
