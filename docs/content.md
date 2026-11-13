# Editing content

Almost everything on the site comes from **[`data/resume.ts`](../data/resume.ts)**. Change it there, not in the components. TypeScript checks every field against [`types/index.ts`](../types/index.ts), so `npm run typecheck` catches a missing or mistyped value.

## Contact (`contact`)

| Field | Used for |
|---|---|
| `name`, `firstName`, `lastName` | Hero name, header and menu wordmark (`firstName`), metadata, footer, JSON-LD, social images |
| `title`, `secondaryTitle` | "Full Stack Developer" & "Technical Lead". Joined as `headline` for the page title, footer and social images. |
| `email` | Contact section, mobile menu, footer, command palette |
| `phone` | Contact section, behind a "Show phone number" button. A Server Action fetches it on click, so it is never in the page source for scrapers. |
| `linkedin`, `linkedinHandle` | LinkedIn links; the handle is the visible text |
| `github` *(optional)* | GitHub buttons and links appear wherever this is set |
| `resumeUrl` *(optional)* | Shows "Download CV" in the Hero, mobile menu and command palette |
| `address` | `locality`, `region`, `country` (ISO code). Used for the JSON-LD address. |
| `locationShort` | Location shown on the site, e.g. "Tiruvannamalai, IN" |
| `timezone`, `timezoneLabel` | Live local-time clocks, e.g. `"Asia/Kolkata"` / `"IST"` |
| `availability` | Green status badge text (Hero, Contact, mobile menu) |
| `relocation` | Relocation note (Hero › Now panel, About › Based in) |

### Adding your CV

1. Put the PDF at `public/resume.pdf`. Create the `public/` folder if it doesn't exist.
2. In `data/resume.ts`, set `resumeUrl: "/resume.pdf"`.

The download buttons appear automatically and record a `download_cv` analytics event.

## Dates: never hard-code years

- **`careerStart`** (`"YYYY-MM"`) drives `yearsOfExperience`. That value appears in the summary, the Hero, the metrics, the page description and the social images.
- **Each experience** has `startDate` and an optional `endDate` (`"YYYY-MM"`). The date range ("June 2022 – Present") and tenure ("4 yrs 5 mos") are computed from these. An invalid date such as `"2022-13"` fails `npm run typecheck`.
- **The current role** is the experience without an `endDate` (`currentRole`). It feeds Hero › Now, About › Currently and the JSON-LD.
- Every page rebuilds daily, so these values stay current without a redeploy.

## Text and lists

| Export | Where it shows | Notes |
|---|---|---|
| `summary` | About › Summary tile, JSON-LD | Uses `yearsOfExperience`; keep it as a template string |
| `openTo` | About › Summary "Open to", Contact | `kind` is `full-time`, `contract` or `consulting` and picks the icon |
| `primaryStack` | Hero stack line, About summary, Skills › **Core stack** tiles, skill highlighting | Each Core tile's colour, icon and "used for" line come from `CORE` in `components/sections/Skills.tsx`. Typecheck fails until you add an entry there. |
| `marqueeStack` | Scrolling strip under the Hero | |
| `integrations` | Skills › Shipped integrations, project pages | `name` is matched against each project's `techStack` |
| `stats` | About › metric tiles (count up on scroll) | Each `id` maps to an icon and colour in `STAT_STYLE` (`About.tsx`), and typecheck fails if one is missing. Values ending in `%` also get a fill bar. |
| `skillGroups` | Skills › category cards, JSON-LD | Each `category` maps to an icon and colour in `CATEGORY` (`Skills.tsx`), and typecheck fails if one is missing |
| `experiences` | Experience timeline, About › Currently, Hero › Now panel | `highlights` are the timeline items. Numbers in them (e.g. `40%`) are highlighted automatically. |
| `additionalWork` | About › "Also contributed to" | `{ kind, text }`. `kind` is `web`, `mobile`, `cms` or `other` and picks the icon and colour. |
| `education` | About › Education tile | `shortDegree` is the compact form shown on the tile. `grade` isn't displayed. |

## Projects (`projects`)

Each project gets a card on the home page and its own page at `/projects/<id>`.

| Field | Notes |
|---|---|
| `id` | Also the URL slug, so keep it short and kebab-case |
| `index` | Displayed number (`01`, `02`, …). **Display order is the array order**, and the first project is the featured, full-width card. |
| `title`, `description`, `highlights`, `techStack`, `status` | Required |
| `color` | Hex colour for the cover, glows and badges |
| `tagline` *(optional)* | Short line used on cards instead of `description` |
| `role`, `year` *(optional)* | Shown in the case-study fact strip |
| `problem`, `outcome` *(optional)* | Adds "The problem" and "Outcome" sections to the case-study page |
| `url` *(optional)* | Adds a "Visit live site" button |

**Filling in `problem`, `outcome` and `role` is the single best way to strengthen the case-study pages.** A real, measurable outcome (e.g. "invoicing went from 2 days to 10 minutes") is what recruiters look for.

### Adding a project

1. Add an entry to `projects` with a unique `id` and the next `index`.
2. *(Optional)* Give it an illustration. Create `<Name>Cover.tsx` in [`components/projects/covers/`](../components/projects/covers/) from the shared primitives, and register it in `COVERS` in `covers/index.tsx`, keyed by the project `id` (a mistyped id fails typecheck). Without one, the project uses a generic dashboard cover.
3. That's it. The card, the case-study page, its social image, the sitemap entry and the command-palette item are all generated automatically.

## Copy that lives in components

Section headings, their short descriptions and a few labels are written in the section components (`components/sections/*.tsx`). Each heading's highlighted phrase is wrapped in `<Accent>…</Accent>`:

```tsx
<SectionHeader
    index={3}
    label="Selected Projects"
    title={<>Production applications, <Accent>in daily use.</Accent></>}
    description="One or two sentences shown beside the heading."
/>
```

Navigation links live in [`config/nav.ts`](../config/nav.ts). Each `id` must match a section's `id` on the home page.
