## Why

Team members need to plan their on-call duty (Rufdienst) on a monthly basis. Currently, scheduling is manual and prone to unfair distribution. Busy periods and vacation days create conflicts that are hard to track. This tool automates fair assignment based on work contracts while respecting vacation constraints.

## What Changes

- Add team member management (CRUD for members with name and contract percentage)
- Add vacation day tracking per member
- Generate monthly on-call schedules using fairness algorithm
- Display calendar view showing assignments by day
- Show conflict warnings when days have no available members
- Show violation warnings when soft constraints are broken

## Capabilities

### New Capabilities

- `member-management`: Add, edit, archive, and view team members with contract percentages (50%, 100%, etc.)
- `vacation-tracking`: Mark days off (vacation, sick) for each team member
- `schedule-generation`: Automatically generate monthly on-call assignments using the fairness algorithm
- `calendar-view`: Display monthly calendar with assigned member per day
- `conflict-warning`: Surface days with no available members and constraint violations

### Modified Capabilities

- None (new feature)

## Impact

- New data stores for members, vacations, and schedules (localStorage)
- New route components for member list, calendar view, and schedule generation
- Fairness algorithm implementation in scheduling logic
- UI components for calendar grid, member cards, and vacation input