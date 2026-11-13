# Editing content

Almost everything on the site comes from **[`data/resume.ts`](../data/resume.ts)**. Change it there, not in the components. TypeScript checks every field against [`types/index.ts`](../types/index.ts), so `npm run typecheck` catches a missing or mistyped value.

## Contact (`contact`)

| Field | Used for |
|---|---|
| `name`, `firstName`, `lastName` | Hero name, metadata, footer, JSON-LD, social images |
| `title` | Role line, e.g. "Full Stack Developer" (the site adds "& Technical Lead") |
| `email`, `phone` | Contact section, mobile menu, footer, command palette |
| `linkedin`, `linkedinHandle` | LinkedIn links; the handle is the visible text |
| `github` *(optional)* | GitHub buttons and links appear wherever this is set |
| `resumeUrl` *(optional)* | Shows "Download CV" in the Hero, mobile menu and command palette |
| `location`, `locationShort` | The full form appears in a few places, the short form in compact UI |
| `timezone`, `timezoneLabel` | Live local-time clocks, e.g. `"Asia/Kolkata"` / `"IST"` |
| `availability` | Green status badge text (Hero, Contact, mobile menu, social image) |

### Adding your CV

1. Put the PDF at `public/resume.pdf`. Create the `public/` folder if it doesn't exist.
2. In `data/resume.ts`, set `resumeUrl: "/resume.pdf"`.

The download buttons appear automatically and record a `download_cv` analytics event.

## Dates: never hard-code years

- **`careerStart`** (`"YYYY-MM"`) drives `yearsOfExperience`. That value appears in the summary, the Hero, the metrics, the page description and the social images.
- **Each experience** has `startDate` and an optional `endDate` (`"YYYY-MM"`). The date range ("June 2022 – Present") and tenure ("4 yrs 5 mos") are computed from these.
- The home page rebuilds daily, so these values stay current without a redeploy.

## Text and lists

| Export | Where it shows | Notes |
|---|---|---|
| `summary` | About › Summary tile, JSON-LD | Uses `yearsOfExperience`; keep it as a template string |
| `primaryStack` | Hero stack line, About summary, Skills › **Core stack** tiles, skill highlighting | The colour, icon and "used for" line of each Core tile come from the `CORE` map in `components/sections/Skills.tsx`. Add an entry there when you add a tool. |
| `marqueeStack` | Scrolling strip under the Hero | |
| `integrations` | Skills › Shipped integrations, project pages | `name` is matched against each project's `techStack` |
| `stats` | About › metric tiles (count up on scroll) | The order matters: icons and colours come from `STAT_STYLE` in `About.tsx`. Values ending in `%` also get a fill bar. |
| `skillGroups` | Skills › category cards | The icon and colour for each category come from `CATEGORY` in `Skills.tsx`; unknown categories fall back to a default |
| `experiences` | Experience timeline, About › Currently, Hero › Now panel | `highlights` are the timeline items. Numbers in them (e.g. `40%`) are highlighted automatically. |
| `additionalWork` | About › "Also contributed to" | Icons are picked by keyword (WordPress, Flutter, Joomla) |
| `education` | About › Education tile | |

## Projects (`projects`)

Each project gets a card on the home page and its own page at `/projects/<id>`.

| Field | Notes |
|---|---|
| `id` | Also the URL slug, so keep it short and kebab-case |
| `index` | Display order and number (`01`, `02`, …). The first project is the featured, full-width card. |
| `title`, `description`, `highlights`, `techStack`, `status` | Required |
| `color` | Hex colour for the cover, glows and badges |
| `tagline` *(optional)* | Short line used on cards instead of `description` |
| `role`, `year` *(optional)* | Shown on the card and the case-study fact strip |
| `problem`, `outcome` *(optional)* | Adds "The problem" and "Outcome" sections to the case-study page |
| `url` *(optional)* | Adds a "Visit live site" button |

**Filling in `problem`, `outcome` and `role` is the single best way to strengthen the case-study pages.** A real, measurable outcome (e.g. "invoicing went from 2 days to 10 minutes") is what recruiters look for.

### Adding a project

1. Add an entry to `projects` with a unique `id` and the next `index`.
2. *(Optional)* Give it an illustration. Add a component to `COVERS` in [`components/projects/covers.tsx`](../components/projects/covers.tsx), keyed by the project `id`. Without one, the project uses a generic dashboard cover.
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
