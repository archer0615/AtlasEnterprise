# Business Calendar Framework

Version: 1.0

## Purpose
Defines the enterprise business calendar used by Project Atlas. It provides a single source of truth for all date, time, scheduling and business-day calculations across every engine.

## Objectives
- Standardize business-day calculations.
- Support recurring financial events.
- Enable deterministic scheduling.
- Ensure regional calendar extensibility.

## Calendar Principles
- Calendar rules are versioned.
- Historical calendars are immutable.
- Regional calendars are supported.
- Time-zone aware processing is mandatory.

## Calendar Domains

### Civil Calendar
- Calendar date
- Time zone
- Leap year
- Daylight saving support

### Business Calendar
- Working days
- Weekends
- Public holidays
- Company holidays

### Banking Calendar
- Bank business days
- Settlement days
- Loan payment dates
- Deposit maturity dates

### Investment Calendar
- Trading days
- Market holidays
- Dividend dates
- Distribution dates
- Rebalancing schedule

### Tax Calendar
- Filing periods
- Tax payment deadlines
- Estimated tax events

### Financial Planning Calendar
- Monthly review
- Quarterly review
- Annual review
- IPS review
- Retirement review

## Event Types
- Salary
- Bonus
- Mortgage payment
- Insurance premium
- Investment contribution
- Dividend
- Tax payment
- Goal review
- Execution milestone
- Notification

## Scheduling Rules
- One-time
- Daily
- Weekly
- Monthly
- Quarterly
- Semi-Annual
- Annual
- Event-driven

## Date Adjustment Rules
- Previous business day
- Next business day
- Nearest business day
- End of month
- Beginning of month

## Metadata
Each calendar event includes:
- Event ID
- Event Type
- Time Zone
- Schedule
- Business-day rule
- Region
- Effective period

## Business Rules
- Business-day adjustments are deterministic.
- Holiday calendars are region-specific.
- Recurring events retain original recurrence definitions.
- Historical schedules never change after execution.

## Explainability
Each scheduled event records:
- Calendar version
- Adjustment rule
- Trigger reason
- Final execution date

## Integration
Consumes:
- System Configuration Framework
- User Preference Framework

Produces:
- Cash Flow Engine
- Investment Engine
- Loan Engine
- Goal Review Framework
- Execution Plan Framework
- Notification Framework

## KPIs
- Schedule accuracy
- Missed event rate
- Calendar coverage
- Holiday adjustment count

## Testing
- Leap years
- Month-end handling
- Consecutive holidays
- Regional calendars
- Time-zone changes
- Business-day adjustments

## Future Enhancements
- Exchange-specific calendars
- Multi-country support
- Calendar synchronization
- AI scheduling optimization
