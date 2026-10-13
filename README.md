# Himanshu Rana — Portfolio

Personal site built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every page is statically generated.

## Scripts

```bash
npm run dev        # local development
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # route type generation + tsc
```

## Editing content

All copy lives in typed modules under `content/`. Components contain no portfolio text.

| File | What it holds |
| --- | --- |
| `content/profile.ts` | Name, headline, intro, bio, portrait, email, resume path |
| `content/site.ts` | SEO title/description, navigation, socials, section headings, UI labels |
| `content/experience.ts` | Roles, dates (`YYYY-MM`), summaries, highlights |
| `content/capabilities.ts` | Stack, principles, stat card, highlights |
| `content/projects.ts` | Featured case studies (empty until the first write-up is ready) |

Search for `TODO(himanshu)` to find details that still need your input.

## Design system

Tokens (colour, type, motion, layout) are defined once in `app/globals.css`. Visit `/styleguide`
(not indexed) to see them rendered with the real components.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin, e.g. `https://himanshurana.dev`. Enables canonical URLs and absolute sitemap/OG links. On Vercel, the production URL is detected automatically. |
