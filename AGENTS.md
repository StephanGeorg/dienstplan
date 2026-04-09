# Dienstplan

SolidJS + Vite + Tailwind CSS 4 frontend application.

## Commands

```bash
npm run dev      # Start dev server on port 5437
npm run build    # Production build to dist/
npm run serve    # Preview production build
```

## Architecture

- Entry: `src/index.tsx` → `src/App.tsx`
- Routing: `@solidjs/router`
- Styling: Tailwind CSS 4 via `@tailwindcss/vite` (no separate config file)
- JSX: `solid-js` with `jsxImportSource: "solid-js"`

## Conventions

- Route components live in `src/components/`
- No test framework configured