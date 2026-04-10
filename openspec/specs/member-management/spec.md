# member-management Specification

## Purpose
TBD - created by archiving change on-call-scheduler. Update Purpose after archive.
## Requirements
### Requirement: Member can be created
The system SHALL allow creating a team member with a name and contract percentage.

#### Scenario: Create member with valid data
- **WHEN** user submits name "Anna" and contract 100%
- **THEN** system creates member with unique ID, name "Anna", contract 1.0, and isActive true

#### Scenario: Create member with part-time contract
- **WHEN** user submits name "Ben" and contract 50%
- **THEN** system creates member with contract 0.5

### Requirement: Member can be edited
The system SHALL allow editing a member's name and contract percentage.

#### Scenario: Edit member name
- **WHEN** user changes member name from "Anna" to "Anna Schmidt"
- **THEN** system updates member name

#### Scenario: Edit member contract
- **WHEN** user changes member contract from 50% to 100%
- **THEN** system updates member contract to 1.0

### Requirement: Member can be archived
The system SHALL allow archiving a member to remove them from active scheduling without deleting their history.

#### Scenario: Archive member
- **WHEN** user archives a member
- **THEN** system sets member isActive to false
- **AND** member no longer appears in schedule generationpool

### Requirement: Member list can be viewed
The system SHALL display all members with their name, contract percentage, and active status.

#### Scenario: View active members
- **WHEN** user views member list
- **THEN** system displays all members where isActive is true

#### Scenario: View archived members
- **WHEN** user views archived members
- **THEN** system displays all members where isActive is false

### Requirement: Member name SHALL be unique
The system SHALL prevent duplicate member names.

#### Scenario: Reject duplicate name
- **WHEN** user creates member with name that already exists
- **THEN** system shows error "Member name already exists"

