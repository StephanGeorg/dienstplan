## ADDED Requirements

### Requirement: Schedule can be generated for a month
The system SHALL generate on-call assignments for all days in a selected month.

#### Scenario: Generate empty month
- **WHEN** user generates schedule for March 2025 with no members
- **THEN** system creates schedule with all 31 days marked as CONFLICT

#### Scenario: Generate full month
- **WHEN** user generates schedule for March 2025 with active members
- **THEN** system assigns each day to a member according to fairness algorithm
- **AND** schedule includes generatedAt timestamp

### Requirement: Assignments are proportional to contract percentage
The system SHALL distribute assignments based on contract weight.

#### Scenario: 100% member gets twice 50% member
- **WHEN** generating schedule with Anna (100%) and Ben (50%)
- **THEN** Anna receives approximately 2× as many assignments as Ben

### Requirement: Max 3 consecutive days constraint is enforced
The system SHALL NOT assign more than 3 consecutive days to a member.

#### Scenario: Prevent 4th consecutive day
- **WHEN** member "Anna" is assigned days 1, 2, and 3
- **THEN** system SHALL NOT assign day 4 to "Anna"

#### Scenario: Weekend allows 3 consecutive
- **WHEN** member "Ben" is assigned Friday, Saturday, Sunday
- **THEN** this is allowed (3 consecutive maximum)

### Requirement: Weekday limit ispreferred
The system SHALL prefer assigning max 1 weekday (Mon-Thu) per member per calendar week.

#### Scenario: Prefer different members for weekdays
- **WHEN** generating schedule and "Anna" already has Monday assigned
- **THEN** system prefers another available member for Tuesday, Wednesday, Thursday

#### Scenario: Weekday limit can be violated
- **WHEN** generating schedule and only "Anna" is available for Tuesday
- **AND** "Anna" already has Monday assigned
- **THEN** system assigns Tuesday to "Anna" with violation flag

### Requirement: Friday counts as weekend
The system SHALL classify Friday as a weekend day (not weekday).

#### Scenario: Friday does not count toward weekday limit
- **WHEN** member "Anna" is assigned Monday and Friday in same week
- **THEN** no weekday limit violation is flagged

### Requirement: Schedule can be regenerated
The system SHALL allow regenerating a schedule, replacing the existing one.

#### Scenario: Regenerate schedule
- **WHEN** user regenerates schedule for March 2025
- **THEN** previous schedule is replaced with new generated schedule

### Requirement: Manual override can reassign a day
The system SHALL allow manually overriding an assignment for a specific day.

#### Scenario: Manual override assignment
- **WHEN** user manually reassigns March 5 from "Anna" to "Ben"
- **THEN** system updates assignment to "Ben" with status MANUAL_OVERRIDE