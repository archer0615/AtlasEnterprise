> **PWA v1 Architecture Amendment (2026-07-11):** Any PostgreSQL, EF Core, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase mapping. Atlas v1 uses in-process TypeScript Application Use Cases and IndexedDB repositories. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# User Entity Specification (Part 2)

# Commands

## Standard Commands
- CreateUser
- UpdateUser
- DeleteUser
- ArchiveUser
- RestoreUser
- ActivateUser
- DeactivateUser

## Domain Commands
- VerifyEmail
- ChangeEmail
- ChangePhone
- ChangeDisplayName
- ChangeLocale
- ChangeCurrency
- ChangeTimeZone
- JoinHousehold
- LeaveHousehold
- AcceptInvitation
- RejectInvitation
- LockAccount
- UnlockAccount
- ResetPreferences
- RegisterNotificationChannel

---

# Domain Events

- UserCreated
- UserUpdated
- UserDeleted
- UserArchived
- UserRestored
- UserActivated
- UserDeactivated
- UserEmailVerified
- UserEmailChanged
- UserPhoneChanged
- UserCurrencyChanged
- UserLocaleChanged
- UserTimeZoneChanged
- UserJoinedHousehold
- UserLeftHousehold
- UserStatusChanged

Each event shall contain:
- EventId
- AggregateId
- AggregateVersion
- OccurredAt
- CorrelationId
- CausationId
- Actor
- Payload

---

# Repository

## Interface

IUserRepository

## Methods

- GetById
- GetByEmail
- Exists
- Add
- Update
- Delete
- Archive
- Restore
- SaveChanges

## Query Methods

- Search
- SearchActive
- SearchArchived
- SearchByHousehold
- SearchByCurrency
- SearchByLocale
- SearchByStatus

## Specifications

- ActiveUserSpecification
- ArchivedUserSpecification
- EmailVerifiedSpecification
- HouseholdMemberSpecification

---

# Domain Service Interaction

- IdentityValidationService
- HouseholdDomainService
- GoalDomainService
- PortfolioDomainService
- RecommendationDomainService
- DecisionDomainService
- NotificationDomainService
- AuditDomainService

Responsibilities:
- Validate invariants
- Coordinate aggregates
- Publish events
- Resolve conflicts

---

# Application Service Interaction

UserApplicationService

Methods:
- CreateAsync
- UpdateAsync
- ArchiveAsync
- RestoreAsync
- ActivateAsync
- DeactivateAsync
- SearchAsync
- DetailAsync

---

# REST API

GET /api/users

GET /api/users/{id}

POST /api/users

PUT /api/users/{id}

PATCH /api/users/{id}/activate

PATCH /api/users/{id}/deactivate

PATCH /api/users/{id}/archive

PATCH /api/users/{id}/restore

DELETE /api/users/{id}

## Request

- JSON
- UTF-8
- Validation required

## Response

- 200
- 201
- 204
- 400
- 401
- 403
- 404
- 409
- 422
- 500

---

# DTO

## CreateUserDto
- Email
- DisplayName
- Currency
- Locale
- TimeZone

## UpdateUserDto
- DisplayName
- Phone
- Currency
- Locale
- TimeZone

## UserDetailDto
- Complete profile
- Statistics
- Metadata

## UserSummaryDto
- Id
- Name
- Status

## UserSearchDto
- Keyword
- Status
- Currency
- Locale

---

# Database Mapping

Table: Users

Primary Key:
- Id

Unique:
- Email

Indexes:
- Email
- Status
- Currency
- HouseholdId

Foreign Keys:
- HouseholdId

---

# PostgreSQL Schema

```sql
CREATE TABLE users(
 id uuid PRIMARY KEY,
 email varchar(320) NOT NULL UNIQUE,
 display_name varchar(100) NOT NULL,
 currency char(3) NOT NULL,
 locale varchar(20) NOT NULL,
 timezone varchar(50) NOT NULL,
 status varchar(30) NOT NULL,
 household_id uuid NULL,
 created_at timestamptz NOT NULL,
 updated_at timestamptz NOT NULL
);

CREATE INDEX ix_users_status ON users(status);
CREATE INDEX ix_users_currency ON users(currency);
CREATE INDEX ix_users_household ON users(household_id);
```

Constraints
- email unique
- status check
- currency check

---

# EF Core Mapping

- ToTable("users")
- HasKey(Id)
- HasIndex(Email).IsUnique()
- HasIndex(Status)
- Property(DisplayName).HasMaxLength(100)
- Property(Currency).HasMaxLength(3)
- Property(Locale).HasMaxLength(20)
- Property(TimeZone).HasMaxLength(50)
- Use optimistic concurrency
- Configure owned value objects where applicable

---

# Cache Strategy

- Cache by Id
- Cache TTL 15 min
- Invalidate on update
- Distributed cache supported

---

# Security

Authorization
- Authenticated only
- Tenant isolation
- Role based permissions

Permissions
- User.Read
- User.Write
- User.Delete
- User.Admin

Data Masking
- Email
- Phone

---

# Audit

Audit Fields
- CreatedBy
- UpdatedBy
- CreatedAt
- UpdatedAt

Track:
- Status changes
- Email changes
- Permission changes

---

# Performance

- Pagination mandatory
- Projection queries
- Batch updates
- Async repository
- Compiled queries
- Optimized indexes