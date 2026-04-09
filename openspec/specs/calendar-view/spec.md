# calendar-view Specification

## Purpose
TBD - created by archiving change on-call-scheduler. Update Purpose after archive.
## Requirements
### Requirement: Calendar displays monthly schedule
The system SHALL display a calendar view showing assignments for each day of the selected month.

#### Scenario: Display month calendar
- **WHEN** user views March 2025
- **THEN** system displays calendar grid with 31 day cells
- **AND** each cell shows assigned member name or conflict indicator

#### Scenario: Navigate between months
- **WHEN** user clicks next/previous month navigation
- **THEN** system updates calendar to show the adjacent month

### Requirement: Calendar shows member assignments
The system SHALL display the assigned member name in each calendar cell.

#### Scenario: Show assigned member
- **WHEN** day 5 is assigned to "Anna"
- **THEN** calendar cell for day 5 displays "Anna"

### Requirement: Calendar indicates conflicts
The system SHALL prominently mark days with no assigned member.

#### Scenario: Show conflict day
- **WHEN** day 10 has no available members and status is CONFLICT
- **THEN** calendar cell displays conflict indicator (e.g., "---" or "No coverage")

### Requirement: Calendar shows violation warnings
The system SHALL display a warning icon on days where soft constraints were violated.

#### Scenario: Show weekday limit violation
- **WHEN** member "Anna" is assigned a second weekday in same calendar week
- **THEN** calendar cell displays warning icon (⚠)

#### Scenario: Tooltip explains violation
- **WHEN** user hovers over warning icon
- **THEN** tooltip displays "Anna already has 1 weekday this week"

### Requirement: Calendar supports day selection
The system SHALL allow clicking a day to view or edit details.

#### Scenario: Click day to view details
- **WHEN** user clicks on March 5
- **THEN** system shows detail panel with assignment and vacation info for that day

