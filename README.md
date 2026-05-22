# Mogesh Umapathi — Portfolio

A premium personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS.
Designed after thorough research of Awwwards-winning developer portfolios and HR hiring preferences.

## Design System

- **Font** — Plus Jakarta Sans (200–800 weights) — one family, strong hierarchy via weight
- **Accent** — Indigo `#4F46E5` — vibrant, professional, distinct
- **Theme** — Light-first; clean white background with indigo accents. Dark mode available.
- **No** dark panels, mono fonts, glassmorphism, or neon

## What Makes This Different

| Feature | This Portfolio |
|---|---|
| Projects | Editorial numbered list (not generic cards) |
| Hero | Huge name + live stats card + scrolling tech marquee |
| Skills | Horizontal table layout — instantly scannable |
| Contact | Email displayed at 3.5rem — bold, memorable |
| Metrics | 40%, 30%, 4+ quantified achievements front-and-center |
| Experience | Impact metrics strip before achievement bullets |

## Structure

```
portfolio/
├── app/               # Root layout + page + globals.css
├── components/
│   ├── layout/        # Header, MobileNav, Footer
│   ├── sections/      # Hero, About, Experience, Projects, Skills, Education, Contact
│   └── ui/            # ThemeToggle, FadeIn
├── config/            # nav.ts (links + site meta)
├── data/              # resume.ts (single source of truth)
├── hooks/             # useReveal, useActiveSection
├── lib/               # utils.ts (cn helper)
├── providers/         # ThemeProvider (next-themes)
└── types/             # index.ts (all interfaces)
```

## Quick Start

```bash
unzip mogesh-portfolio-v3.zip
cd portfolio
npm install
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel (zero config)

```bash
npx vercel
```

## Customise

All personal data lives in **`data/resume.ts`** — edit that file only.
Design tokens (colors, fonts) live in **`app/globals.css`** under `:root`.
