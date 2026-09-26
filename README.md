# FitLog

FitLog is a dark, no-nonsense workout library and daily training log. Browse the exercise library, open detailed workout pages, build a five-lift plan, save workouts for later, and keep the data across reloads with localStorage.

## Technologies

- DaisyUI

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Browser localStorage

## 5 key features

1. **Workout library** — API-powered cards with category tags, equipment, duration, calories, and rating.
2. **Workout details** — Two-column exercise pages with specs, instructions, and plan/save actions.
3. **Daily plan** — A five-lift cap with live exercise, minute, and calorie metrics.
4. **Saved workouts** — Bookmark exercises for later and manage them from the My Plan page.
5. **Search, sort, persistence & feedback** — Search by name/tag, sort by duration/calories/rating, persist data in localStorage, and show action toasts.

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

The app includes small Next.js API proxy routes so the browser does not depend on the remote API exposing CORS headers. The client also normalizes common API field names so the UI can remain stable if the response uses small naming variations.
