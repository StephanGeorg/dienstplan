# Dienstplan

A team on-call duty (Rufdienst) scheduler that automatically generates fair monthly schedules based on work contracts while respecting vacation constraints.

## Features

- 📊 **Fair distribution** proportional to contract percentage (50%, 100%, etc.)
- 🏖️ **Vacation tracking** per team member
- 📅 **Monthly calendar view** with assignment visualization
- ⚠️ **Conflict and warning indicators** for uncovered days
- 🔄 **Manual override** capability per day
- 💾 **Browser localStorage** persistence (no backend required)

## Problem

Team members need to plan on-call duty on a monthly basis. Manual scheduling is:
- Time-consuming
- Prone to unfair distribution
- Difficult to track with multiple vacation days
- Error-prone with conflicting assignments

## Solution

A fairness-based algorithm that:
1. Calculates each member's "capacity" based on contract % × available days
2. Assigns days sequentially, prioritizing members furthest below their fair share
3. Respects constraints (max 3 consecutive, max 1 weekday per week)
4. Surface conflicts and soft constraint violations for manual resolution

## Capabilities

### Member Management
- Add/edit/archive team members
- Contract percentage (40%-100%)
- Unique name validation

### Vacation Tracking
- Per-member vacation calendar
- Click-to-toggle days
- Note support for vacation reasons

### Schedule Generation
- Automatic monthly generation
- Proportional to contract %
- Hard constraints enforced (vacation, 3 consecutive max)
- Soft constraints with warnings (1 weekday/week)
- Weekend = Fri-Sun (3-day block)

### Calendar View
- Monthly grid layout
- Navigate between months
- Day details on click
- Manual override per day

### Conflict & Warning Display
- Red alert for uncovered days
- Amber alert for constraint violations
- Summary lists with explanations

## Algorithm

```
For each day in month:
  1. Filter available members (not on vacation)
  2. Exclude by hard constraints (3 consecutive)
  3. Prefer members obeying soft constraints (weekday limit)
  4. Pick member with lowest fairness deficit
  5. Mark violations if soft constraint broken
```

**Constraint Priority:**
1. Hard: Max 3 consecutive days
2. Hard: Never assign vacation days
3. Soft: Max 1 weekday (Mon-Thu) per calendar week
4. Fairness: Balance by contract %

**Weekend Definition:** Friday counts as weekend (Fri-Sun = 3-day on-call block matching real-world "Freitag nachmittags bis Montag morgens")

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5437](http://localhost:5437) to view it in the browser.

### Production Build

```bash
npm run build
```

Builds to the `dist` folder.

### Preview Production Build

```bash
npm run serve
```

## Tech Stack

- **SolidJS** - Reactive UI framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **localStorage** - Browser persistence

## Localization

German (de-DE) - optimized for German workplace scheduling.

## Deployment

Deploy the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, etc.)

## License

MIT