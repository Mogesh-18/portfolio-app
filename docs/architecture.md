# Architecture

## Rendering

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static, **revalidated daily** | `revalidate = 86400` is set on the root layout, so every page inherits it. Keeps computed values (years, tenure, © year) current. |
| `/projects/[slug]` | Static (SSG via `generateStaticParams`, `dynamicParams = false`), revalidated daily | Unknown slugs return 404 |
| `/opengraph-image`, `/projects/[slug]/opengraph-image` | Generated with `next/og`, revalidated daily | Geist is fetched once per build (8 s timeout). If the fetch fails, the built-in font is used instead and the build carries on. |
| `/icon`, `/apple-icon`, `/manifest.webmanifest`, `/sitemap.xml`, `/robots.txt` | Static, generated | |

## Server vs client components

**Sections are Server Components.** Interactivity is limited to small client islands, so most of the page ships as HTML with very little JavaScript.

- **Client:** `Header`, `MobileNav`, `ThemeToggle`, `ThemeProvider`, `Reveal`, `SpotlightGroup`, `CountUp`, `LocalTime`, `Magnetic`, `CopyEmail`, `CvLink`, `ContactForm`, `CommandPalette`, `ScrollTop`.
- **Server:** everything in `components/sections`, `components/projects`, `SectionHeader`, `Accent`, `Footer` (it renders the `LocalTime` island).

Islands write to the DOM directly (data attributes and CSS variables) wherever possible, so scroll and pointer effects don't cause React re-renders.

## Data flow

```
data/resume.ts ──▶ components/sections/*  (home page)
              ├──▶ app/projects/[slug]   (case studies)
              ├──▶ lib/site.ts           (title, description, canonical URL)
              ├──▶ metadata, JSON-LD, OG images, sitemap, manifest
              └──▶ CommandPalette        (sections, projects, links)
```

## SEO

- **Metadata:** `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production URL. Canonical URLs, Open Graph and Twitter cards are set per page.
- **Structured data:** JSON-LD `Person` on the home page.
- **Generated assets:** social images (home and per project), favicons, sitemap (home and every project) and `robots.txt`.

## Theme

`next-themes` with the `class` strategy:
- Light by default, and the OS preference is ignored.
- An inline script sets the theme class before first paint, so there's no flash.
- `lib/theme-switch.ts` applies the class synchronously inside `document.startViewTransition` to produce the circular reveal.

## Contact form

`app/actions/contact.ts` is a Server Action. It:
1. Runs the spam guards: a honeypot field (`cf_trap`) and a minimum time on the form.
2. Validates input, and strips line breaks from the name because it goes into the subject.
3. Applies a best-effort rate limit of 5 messages per IP per 10 minutes. It is in-memory, so it applies per server instance.
4. POSTs to Resend's REST API (no SDK), with a 10 s timeout.

The form is only rendered when `RESEND_API_KEY` is set at build time. See [deployment.md](deployment.md#contact-form-resend).

## Analytics events

All events are sent with `track()` from `@vercel/analytics`.

| Event | Fired when |
|---|---|
| `copy_email` (`source`) | The email is copied (contact, mobile menu or palette) |
| `download_cv` (`source`) | The CV is downloaded |
| `contact_form_sent` | The contact form succeeds |
| `command_palette_open` | The ⌘K palette opens |

## Security

`next.config.mjs` sets these headers on every route:
- `X-Content-Type-Options`
- `X-Frame-Options: DENY`
- `Referrer-Policy`
- `Permissions-Policy`

It also turns off the `X-Powered-By` header.
