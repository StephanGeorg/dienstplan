# vacation-tracking Specification

## Purpose
TBD - created by archiving change on-call-scheduler. Update Purpose after archive.
## Requirements
### Requirement: Vacation day can be added for member
The system SHALL allow marking a day as vacation for a specific member.

#### Scenario: Add vacation day
- **WHEN** user marks March 15, 2025 as vacation for member "Anna"
- **THEN** system stores vacation entry with memberId, date "2025-03-15", and optional note

#### Scenario: Add vacation with note
- **WHEN** user marks March 10, 2025 as vacation for "Anna" with note "Urlaub"
- **THEN** system stores vacation entry with note "Urlaub"

### Requirement: Vacation day can be removed
The system SHALL allow removing a vacation day for a member.

#### Scenario: Remove vacation day
- **WHEN** user removes vacation for member "Anna" on March 15, 2025
- **THEN** system deletes the vacation entry
- **AND** member becomes available for assignment on that day

### Requirement: Vacation days can be viewed by member
The system SHALL display all vacation days for a selected member within a month.

#### Scenario: View member vacations for month
- **WHEN** user views vacation calendar for member "Anna" in March 2025
- **THEN** system displays all days in March where Anna has vacation

### Requirement: Vacation days affect schedule generation
The system SHALL NOT assign on-call duty to a member on their vacation day.

#### Scenario: Member on vacation not assigned
- **WHEN** generating schedule for a day where member "Anna" has vacation
- **THEN** system excludes "Anna" from available pool for that day

