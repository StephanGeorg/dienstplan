## Context

A SolidJS + Vite + Tailwind CSS 4 frontend application for planning on-call duty (Rufdienst). Currently a blank slate with routing setup. Data will be persisted in localStorage (browser-only, no backend for v1). Each month's schedule is generated independently with no cumulative fairness tracking across months.

Key constraints discovered during exploration:
- Team members have contract percentages (e.g., 50%, 100%)
- Members can have vacation/sick days
- On-call assignments should be proportional to contract %
- Weekends (Fri-Sun) allow 3 consecutive days
- Weekdays (Mon-Thu) have soft constraint: max 1 per calendar week

## Goals / Non-Goals

**Goals:**
- Fair distribution of on-call days based on contract percentage
- Automatic schedule generation respecting vacation constraints
- Clear visibility of conflicts and constraint violations
- Simple, browser-based persistence (localStorage)

**Non-Goals:**
- Backend/database (v1 is frontend-only)
- Multi-user sync or authentication
- Cumulative fairness tracking across months
- Mobile-responsive design (v1 focuses on desktop)

## Decisions

### 1. Day-by-Day Greedy Assignment
**Decision:** Assign days sequentially, picking the member with lowest fairness deficit among those available.

**Alternatives considered:**
- Pre-calculate target counts, then fill → fails when vacation overlaps assignments
- Optimization solver (linear programming) → overkill for this scale, harder to debug

**Rationale:** Simple, deterministic, handles vacation naturally. Member on vacation that day is simply excluded from the pool.

### 2. Constraint Priority
**Decision:** Hard constraints (3 consecutive max, vacation) always enforced. Soft constraints (1 weekday/week) preferred but breakable.

**Rationale:** Coverage is paramount. We'd rather slightly violate a soft constraint than leave a day uncovered. UI will show warnings.

### 3. Weekend Definition
**Decision:** Friday counts as weekend (Fri-Sun = 3-day weekend block). Mon-Thu = weekdays.

**Rationale:** Matches the real on-call period (Freitag nachmittags bis Montag morgens).

### 4. Storage Structure
**Decision:** Three localStorage keys: `dienstplan_members`, `dienstplan_vacations`, `dienstplan_schedules`.

**Rationale:** Simple, minimal queries, easy to debug in browser DevTools.

### 5. Signal-Based State
**Decision:** Use SolidJS signals and stores for reactive state. Derived signals for computed values (available members, current schedule).

**Rationale:** Idiomatic SolidJS, automatic reactivity for UI updates.

## Risks / Trade-offs

- **localStorage limits (~5MB)** → could fill with many months of schedule history. Mitigation: Export/clear old data or implement data pruning.
- **No sync** → each browser/device has separate data. Mitigation: Future version adds backend.
- **Greedy algorithm may not find optimal distribution** → acceptable for v1. If fairness complaints arise, can improve algorithm later.
- **Soft constraint violations may confuse users** → clear UI with tooltips explaining why violation occurred.