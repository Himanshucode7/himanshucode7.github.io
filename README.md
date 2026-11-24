# Himanshu Rana — Portfolio

Personal site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and GSAP.
It is a fully static export, deployed to GitHub Pages by `.github/workflows/deploy.yml`
on every push to `main`.

## Scripts

```bash
npm run dev        # local development
npm run build      # static export to ./out
npm run start      # serve ./out locally (http://localhost:3000)
npm run lint       # ESLint
npm run typecheck  # route type generation + tsc
npm run images     # rebuild photos + Open Graph image from assets/photos
```

## Editing content

All copy lives in typed modules under `content/`. Components contain no portfolio text.

| File | What it holds |
| --- | --- |
| `content/profile.ts` | Name, title, tagline, intro, bio, email, resume path |
| `content/site.ts` | SEO title/description, navigation, socials, section copy, outro, UI labels |
| `content/experience.ts` | Roles, dates (`YYYY-MM`), summaries, highlights |
| `content/capabilities.ts` | Skill groups, principles, stat, highlights |
| `content/projects.ts` | Project tiles (text-only until case studies, links and screenshots exist) |
| `content/media.ts` | Which photo goes where, with alt text and focal point |

Search for `TODO(himanshu)` to find details that still need your input.

## Photos

Masters live in `assets/photos` (not deployed). `npm run images` writes AVIF and WebP files at
several widths to `public/images/photos`, a typed manifest with blurred placeholders to
`content/photos.generated.ts`, and the social card `public/og-image.jpg`. The outputs are committed, so
`npm run build` never needs to process images. To add a photo: drop the master in
`assets/photos`, add it to `PHOTOS` in `scripts/optimize-images.mjs`, run the script, then
reference it from `content/media.ts` and render it with `<Photo>`.

## Design and motion

- Tokens (colour, type, motion, layout) are defined once in `app/globals.css`. Sections set
  `tone-dark` or `tone-light`; components only use semantic tokens. Visit `/styleguide`
  (not indexed) to see them rendered with the real components.
- The page is ordinary document flow. The hero is CSS-sticky (About slides over it) and the
  outro is a CSS-sticky stage; GSAP ScrollTrigger only scrubs transforms and opacity
  (`lib/gsap.ts` registers the plugins once; every animation lives in a `useGSAP` scope inside
  `gsap.matchMedia`).
- Reduced motion: no scroll-scrubbed effects, no custom cursor, no auto-switching portraits;
  every section renders in its finished state. The same applies if JavaScript never runs.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL, including any sub-path. Enables canonical URLs and absolute sitemap links. Set automatically by the Pages workflow. |
| `PAGES_BASE_PATH` | No | Sub-path the site is served from, e.g. `/portfolio`. Set automatically by the Pages workflow; leave empty locally. |
