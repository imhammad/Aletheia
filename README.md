# Aletheia

A full-stack platform helping CS students navigate their field, interactive visual explanations of core CS concepts, an AI-driven skills quiz and career planner, and community-curated learning roadmaps.

**Live site:** https://aletheia-ashen.vercel.app/

## What it does

- **Interactive visualizations** - a reusable rendering engine (step-player for algorithm state changes, node-graph for trees/graphs) where new topics are added as data, not new code
- **AI skills quiz** - a 5-question quiz that uses Gemini to recommend a CS field, with reasoning tied to real roadmap data on the platform
- **AI career planner** - enter a target role and timeline, get a phased plan with skills, certificates, and interview prep
- **Community roadmaps** - learning paths per CS field, with resources and star ratings, gated behind Supabase auth and Row Level Security
- **Auth** - email/password and Google OAuth via Supabase

## Tech stack

- **Frontend:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Framer Motion, React Flow
- **Backend/DB:** Supabase (Postgres, Auth, Row Level Security)
- **AI:** Google Gemini API (free tier)
- **Testing/CI:** Vitest, React Testing Library, GitHub Actions
- **Deployment:** Vercel

## Architecture notes

- **Visualization engine:** topics are stored as `jsonb` configs matched to one of two reusable renderer components, rather than one-off animations per topic - adding a new topic means inserting a row, not writing new code.
- **Row Level Security throughout:** every table enforces access at the database level (public read / owner-only write for roadmaps, fully private for career plans), not just in application code.
- **Shared AI helper (`lib/gemini.ts`):** both AI features route through one function with automatic retry and model fallback, since free-tier AI APIs occasionally return capacity errors - this was found and fixed during development after hitting real 503s from the provider.
- **Note on the AI provider:** Gemini's free tier may use inputs/outputs to improve their models. Fine for a project with no sensitive user data, but worth knowing if extending this further.

## Getting started

```bash
git clone https://github.com/imhammad/Aletheia.git
cd aletheia
npm install
cp .env.local.example .env.local
# fill in your Supabase and Gemini keys in .env.local
npm run dev
```

Run the test suite:

```bash
npm run test
```

Database schema lives in `supabase/migrations/` - run them in order via the Supabase SQL Editor.

## Future work

- Admin UI for adding topics (currently seeded via SQL)
- Expand beyond Data Structures & Algorithms into ML/AI topics using the same renderer engine
- Mobile app (React Native / Expo) reusing the existing API layer

## License

MIT