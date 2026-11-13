# Mogesh Umapathi — Portfolio

[![CI](https://github.com/Mogesh-18/portfolio-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Mogesh-18/portfolio-app/actions/workflows/ci.yml)

Personal portfolio of a Full Stack Developer & Technical Lead: a statically generated home page plus a case-study page for each project. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, deployed on Vercel.

## Highlights

- **Content in one file.** All personal content lives in [`data/resume.ts`](data/resume.ts). Years of experience and tenure are computed from start dates, so they never go stale.
- **Case studies.** Every project gets its own page at `/projects/<id>`, with its own metadata, social image and illustrated cover.
- **Fast by default.** Every route is static and revalidates daily. Sections are Server Components, with small client "islands" for the interactive parts, and no animation library is used.
- **Accessible.** All text meets WCAG AA contrast. The site supports keyboard use and screen readers, honours `prefers-reduced-motion`, and keeps content visible without JavaScript.
- **Polished interactions:**
  - ⌘K / Ctrl K command palette.
  - Theme switch with a circular reveal.
  - Scroll-driven timeline.
  - Cursor-spotlight cards and count-up stats.
  - Full-screen mobile menu.
  - Scroll-to-top button with a progress ring.
- **SEO-ready:**
  - Open Graph and Twitter cards with generated images.
  - JSON-LD (Person).
  - Sitemap, robots and web manifest.
  - Security headers.
- **Extras:** an optional contact form (Resend), Vercel Analytics and Speed Insights, a print stylesheet that prints the home page as a resume, and CI on GitHub Actions.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript 5 (strict, `noUncheckedIndexedAccess`, `noUnused*`) |
| Styling | Tailwind CSS 4 (CSS-first `@theme` in `app/globals.css`), OKLCH design tokens |
| Fonts | Geist Sans, Geist Mono and Instrument Serif via `next/font` (self-hosted) |
| Theme | `next-themes`: **light by default** (OS preference is ignored), toggle to dark |
| Icons | `lucide-react` plus inline GitHub / LinkedIn marks |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Quality | ESLint 9 (flat config), GitHub Actions CI |

## Quick start

Requires **Node.js 20.9 or newer**.

```bash
git clone https://github.com/Mogesh-18/portfolio-app.git
cd portfolio-app
npm install
npm run dev          # → http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

No environment variables are needed to run locally. The optional ones are listed in [docs/deployment.md](docs/deployment.md#environment-variables).

## Documentation

| Guide | Covers |
|---|---|
| [Editing content](docs/content.md) | Every field in `data/resume.ts`, adding a project, CV and GitHub links, section copy |
| [Design system](docs/design-system.md) | Colour and type tokens, the vibrant palette, layout, components, motion, accessibility, print |
| [Architecture](docs/architecture.md) | Rendering model, server vs client components, routes, SEO, theme, analytics |
| [Deployment](docs/deployment.md) | Vercel setup, environment variables, contact form (Resend), analytics, CI, troubleshooting |

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, theme, Header/Footer, palette, analytics
  page.tsx                Home page + JSON-LD (Person)
  projects/[slug]/        Case-study pages + per-project social images
  actions/contact.ts      Contact form Server Action (Resend REST API)
  globals.css             Design tokens, Tailwind theme, animations, print styles
  opengraph-image.tsx     Generated 1200×630 social image
  icon.tsx, apple-icon.tsx, manifest.ts, sitemap.ts, robots.ts, not-found.tsx
components/
  layout/                 Header, MobileNav, Footer
  sections/               Hero, About, Experience, Projects, Skills, Contact
  projects/               ProjectCover, covers.tsx (per-project illustrations), StatusBadge
  ui/                     Reveal, SectionHeader, Accent, CommandPalette, ScrollTop, ThemeToggle,
                          CountUp, LocalTime, Magnetic, Spotlight, CopyEmail, CvLink,
                          ContactForm, BrandIcons
config/nav.ts             Navigation links
data/resume.ts            All content — single source of truth
docs/                     Guides (see above)
hooks/useActiveSection.ts Which section is in view (nav highlight)
lib/                      site.ts, dates.ts, theme-switch.ts, og-fonts.ts, utils.ts
providers/ThemeProvider.tsx
types/index.ts            Shared interfaces
.github/workflows/ci.yml  Lint, typecheck and build on push / PR
```

## Deployment

The site is deployed on **Vercel**. Pushes to `main` go to production, and every other branch gets a preview URL. For the one-time setup (Node version, custom domain, analytics, contact form), see [docs/deployment.md](docs/deployment.md).
