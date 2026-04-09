## 1. Data Layer

- [x] 1.1 Create TypeScript types for Member, Vacation, Schedule, ScheduleDay
- [x] 1.2 Create localStorage utility functions (load, save, clear)
- [x] 1.3 Create member store with signals (members, addMember, updateMember, archiveMember)
- [x] 1.4 Create vacation store with signals (vacations, addVacation, removeVacation)
- [x] 1.5 Create schedule store with signals (schedules, getSchedule, saveSchedule)

## 2. Fairness Algorithm

- [x] 2.1 Create date utilities (getDaysInMonth, isWeekend, isWeekday, getCalendarWeek)
- [x] 2.2 Implement available members filter (exclude vacation)
- [x] 2.3 Implement consecutive days constraint check
- [x] 2.4 Implement weekday limit constraint check
- [x] 2.5 Implement fairness deficit calculation
- [x] 2.6 Implement day assignment logic with constraint filtering
- [x] 2.7 Create schedule generator function (generateSchedule)
- [x] 2.8 Implement manual override function

## 3. Member Management UI

- [x] 3.1 Create MemberList component showing all active members
- [x] 3.2 Create MemberCard component with name, contract, edit/delete actions
- [x] 3.3 Create AddMemberForm component with name input and contract selector
- [x] 3.4 Create EditMemberModal component
- [x] 3.5 Add routing for member management view

## 4. Vacation Tracking UI

- [x] 4.1 Create VacationCalendar component for member vacation entry
- [x] 4.2 Create vacation day toggle (click to add/remove vacation)
- [x] 4.3 Add vacation note input support
- [x] 4.4 Integrate vacation view with member selection

## 5. Calendar View UI

- [x] 5.1 Create Calendar component with month grid layout
- [x] 5.2 Create CalendarCell component showing assigned member
- [x] 5.3 Add month navigation (previous/next buttons)
- [x] 5.4 Display current month name in header
- [x] 5.5 Show conflict indicator for uncovered days
- [x] 5.6 Show violation warning icon (⚠) for soft constraint breaks
- [x] 5.7 Add tooltip for violation explanation on hover
- [x] 5.8 Create day detail panel on cell click

## 6. Schedule Generation UI

- [x] 6.1 Create GenerateSchedule button component
- [x] 6.2 Add schedule generation trigger
- [x] 6.3 Show generation timestamp
- [x] 6.4 Add regenerate option (with confirmation)
- [x] 6.5 Create manual override UI for individual days

## 7. Conflict and Warning Display

- [x] 7.1 Create ConflictSummary component showing uncovered days list
- [x] 7.2 Create ViolationSummary component showing constraint breaks
- [x] 7.3 Add conflict count to calendar header
- [x] 7.4 Add violation count to calendar header

## 8. Integration and Polish

- [x] 8.1 Add routing between member management and calendar views
- [x] 8.2 Update App.tsx with new routes
- [x] 8.3 Add initial data seeding for empty state
- [x] 8.4 Test full workflow (add members → add vacations → generate → view)