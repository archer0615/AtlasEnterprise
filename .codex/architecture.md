# Architecture

## Recommended Structure

```text
backend/
  src/
    LifeOS.Api/
    LifeOS.Application/
    LifeOS.Domain/
    LifeOS.Infrastructure/
  tests/
    LifeOS.Tests/
frontend/
database/
docs/
simulator/
ai/
```

## Backend Layers
- Domain: entities, value objects, enums, domain rules
- Application: use cases, calculators, simulators, decision services
- Infrastructure: EF Core, PostgreSQL, repositories
- API: controllers, DTOs, Swagger

Financial engines must be deterministic.
