## ADDED Requirements

### Requirement: Conflicts are displayed prominently
The system SHALL display a summary of all uncovered days when a schedule has conflicts.

#### Scenario: Show conflict summary
- **WHEN** generated schedule has 2 days with no available members
- **THEN** system displays conflict list with dates and "No coverage available"

#### Scenario: No conflicts
- **WHEN** generated schedule has all days assigned
- **THEN** no conflict summary is displayed

### Requirement: Violations are displayed with context
The system SHALL display constraint violations with explanation of why they occurred.

#### Scenario: Show violation details
- **WHEN** schedule has a weekday limit violation on March 5
- **THEN** system shows "March 5: Ben assigned 2nd weekday this week (only member available)"

### Requirement: Violations are indicated on calendar cells
The system SHALL show warning icon on calendar cells with violations.

#### Scenario: Warning icon on violation
- **WHEN** day has WEEKDAY_LIMIT_EXCEEDED violation
- **THEN** calendar cell shows ⚠ icon

### Requirement: Conflict count is visible in header
The system SHALL display the number of conflicts in the schedule view header.

#### Scenario: Display conflict count
- **WHEN** schedule has 3 conflicts
- **THEN** header displays "3 conflicts"

### Requirement: Violation count is visible in header
The system SHALL display the number of soft constraint violations in the schedule view header.

#### Scenario: Display violation count
- **WHEN** schedule has 2 violations
- **THEN** header displays "2 warnings"