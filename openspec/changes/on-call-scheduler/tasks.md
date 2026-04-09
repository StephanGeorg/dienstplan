## 1. Data Layer

- [ ] 1.1 Create TypeScript types for Member, Vacation, Schedule, ScheduleDay
- [ ] 1.2 Create localStorage utility functions (load, save, clear)
- [ ] 1.3 Create member store with signals (members, addMember, updateMember, archiveMember)
- [ ] 1.4 Create vacation store with signals (vacations, addVacation, removeVacation)
- [ ] 1.5 Create schedule store with signals (schedules, getSchedule, saveSchedule)

## 2. Fairness Algorithm

- [ ] 2.1 Create date utilities (getDaysInMonth, isWeekend, isWeekday, getCalendarWeek)
- [ ] 2.2 Implement available members filter (exclude vacation)
- [ ] 2.3 Implement consecutive days constraint check
- [ ] 2.4 Implement weekday limit constraint check
- [ ] 2.5 Implement fairness deficit calculation
- [ ] 2.6 Implement day assignment logic with constraint filtering
- [ ] 2.7 Create schedule generator function (generateSchedule)
- [ ] 2.8 Implement manual override function

## 3. Member Management UI

- [ ] 3.1 Create MemberList component showing all active members
- [ ] 3.2 Create MemberCard component with name, contract, edit/delete actions
- [ ] 3.3 Create AddMemberForm component with name input and contract selector
- [ ] 3.4 Create EditMemberModal component
- [ ] 3.5 Add routing for member management view

## 4. Vacation Tracking UI

- [ ] 4.1 Create VacationCalendar component for member vacation entry
- [ ] 4.2 Create vacation day toggle (click to add/remove vacation)
- [ ] 4.3 Add vacation note input support
- [ ] 4.4 Integrate vacation view with member selection

## 5. Calendar View UI

- [ ] 5.1 Create Calendar component with month grid layout
- [ ] 5.2 Create CalendarCell component showing assigned member
- [ ] 5.3 Add month navigation (previous/next buttons)
- [ ] 5.4 Display current month name in header
- [ ] 5.5 Show conflict indicator for uncovered days
- [ ] 5.6 Show violation warning icon (⚠) for soft constraint breaks
- [ ] 5.7 Add tooltip for violation explanation on hover
- [ ] 5.8 Create day detail panel on cell click

## 6. Schedule Generation UI

- [ ] 6.1 Create GenerateSchedule button component
- [ ] 6.2 Add schedule generation trigger
- [ ] 6.3 Show generation timestamp
- [ ] 6.4 Add regenerate option (with confirmation)
- [ ] 6.5 Create manual override UI for individual days

## 7. Conflict and Warning Display

- [ ] 7.1 Create ConflictSummary component showing uncovered days list
- [ ] 7.2 Create ViolationSummary component showing constraint breaks
- [ ] 7.3 Add conflict count to calendar header
- [ ] 7.4 Add violation count to calendar header

## 8. Integration and Polish

- [ ] 8.1 Add routing between member management and calendar views
- [ ] 8.2 Update App.tsx with new routes
- [ ] 8.3 Add initial data seeding for empty state
- [ ] 8.4 Test full workflow (add members → add vacations → generate → view)